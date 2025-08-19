// src/utils/useStomp.js
import { Client } from '@stomp/stompjs'
import { useAuthStore } from '@/stores/auth/auth'
import { ref, readonly } from 'vue'

let stompClient = null // STOMP Client
let isConnected = false // 현재 연결 상태 (primitive 캐시)
let connectPromise = null // 중복 connect() 호출 방지용
const subscriptions = new Map() // roomId -> subscription
const subscribeIntents = new Map() // roomId -> callback (재연결 시 복구)

let connectResolve = null
let connectReject = null

// 환경 옵션
const WS_URL = 'ws://localhost:8080/chat'
const SUBSCRIBE_PREFIX = '/topic/chat.' // 예: /topic/chat.{roomId}
const TOPIC_PREFIX = '/app/chat.send' // 예: /app/chat.send/{roomId}

// 반응형 상태
const connectedRef = ref(false)
const activeRoomsRef = ref([])

function refreshActiveRooms() {
  activeRoomsRef.value = Array.from(subscriptions.keys())
}

// === 내부 유틸 ===
function buildClientHeaders() {
  const authStore = useAuthStore()
  const token = authStore?.accessToken
  return {
    Authorization: `Bearer ${token || ''}`,
  }
}

function ensureClient() {
  if (stompClient) return

  stompClient = new Client({
    brokerURL: WS_URL,
    reconnectDelay: 5000,
    heartbeatIncoming: 10000,
    heartbeatOutgoing: 10000,
    connectHeaders: buildClientHeaders(),
    debug: (msg) => console.log('[STOMP FRAMES]', msg),

    // 연결 성공
    onConnect: () => {
      isConnected = true
      connectedRef.value = true
      console.log('[STOMP] CONNECTED')

      // 재연결 시 의도 복구
      subscribeIntents.forEach((cb, roomId) => _subscribeInternal(roomId, cb, true))
      refreshActiveRooms()

      if (connectResolve) {
        const r = connectResolve
        connectResolve = null
        connectReject = null
        // onConnected 체인에서 resolve
        r()
        connectPromise = null
      }
    },

    // STOMP 레벨 에러
    onStompError: (frame) => {
      console.error('[STOMP] ERROR headers=', frame?.headers, ' body=', frame?.body)
    },

    // WS 닫힘
    onWebSocketClose: (evt) => {
      isConnected = false
      connectedRef.value = false
      // 실제 핸들은 무효이므로 현 구독은 비움(의도는 유지하여 자동 재구독)
      subscriptions.forEach((sub) => {
        try {
          sub.unsubscribe?.()
        } catch {}
      })
      subscriptions.clear()
      refreshActiveRooms()
      console.warn('[STOMP] WebSocket closed', evt?.code, evt?.reason)

      // 첫 연결 중 끊긴 케이스라면 reject
      if (connectReject) {
        const rej = connectReject
        connectResolve = null
        connectReject = null
        rej(new Error('WebSocket closed before connect resolved'))
        connectPromise = null
      }
    },
  })
}

// === 외부 API ===
export function useStomp() {
  /**
   * Promise 기반 connect
   * - 중복 호출 시 최초 호출의 Promise를 그대로 반환(멱등)
   * - 연결되어 있으면 즉시 resolve
   * - 최초 연결 완료(onConnect) 시 resolve
   */
  const connect = (onConnected = () => {}) => {
    // 이미 연결됨
    if (stompClient?.connected) {
      isConnected = true
      connectedRef.value = true
      // onConnected가 async여도 대기해주기
      return Promise.resolve().then(() => onConnected())
    }

    // 이미 connect 진행 중이면 기존 promise 반환
    if (connectPromise) {
      // 추가 콜백도 연결 완료 후 실행되도록 체인
      return connectPromise.then(() => onConnected())
    }

    // 새로 시작
    ensureClient()
    // 최신 토큰으로 교체 (리프레시 후 재시도 대비)
    stompClient.connectHeaders = buildClientHeaders()

    connectPromise = new Promise((resolve, reject) => {
      // 외부 변수에 보관 → onConnect/onWebSocketClose에서 호출
      connectResolve = resolve
      connectReject = reject

      // activate는 멱등하지만, active 중이면 재호출 불필요
      if (!stompClient.active) {
        stompClient.activate()
      }
    }).then(() => {
      // 연결 직후 onConnected 수행 (async 허용)
      return Promise.resolve(onConnected())
    })

    return connectPromise
  }

  /**
   * 연결 해제
   * - 자동 재구독 의도도 함께 제거하려면 withIntent=true로 unsubscribeAll 호출됨
   * - deactivate()는 Promise이므로 대기해 안정화
   */
  const disconnect = async () => {
    unsubscribeAll(true) // 의도도 제거(원치 않으면 false)
    if (stompClient) {
      try {
        await stompClient.deactivate()
      } catch (e) {
        console.warn('[STOMP] deactivate error:', e)
      }
    }
    stompClient = null
    isConnected = false
    connectedRef.value = false
    refreshActiveRooms()
    connectPromise = null
    console.log('[STOMP] DISCONNECTED')
  }

  /**
   * 구독 내부 함수
   * - recovering=true: 재연결 복구 케이스(의도는 이미 있으므로 다시 저장하지 않음)
   */
  function _subscribeInternal(roomId, callback, recovering = false) {
    if (!roomId) return

    // 아직 연결 전이면: 의도만 저장하고 종료 (onConnect에서 자동 복구됨)
    if (!stompClient?.connected) {
      if (!recovering) {
        subscribeIntents.set(roomId, callback)
      }
      console.warn('[STOMP] 연결 전, 구독 의도 저장:', roomId)
      return
    }

    // 중복 구독 방지: 기존 구독 제거
    const prev = subscriptions.get(roomId)
    if (prev) {
      try {
        prev.unsubscribe()
      } catch {}
      subscriptions.delete(roomId)
    }

    const dest = `${SUBSCRIBE_PREFIX}${roomId}`
    const sub = stompClient.subscribe(
      dest,
      (message) => {
        // body가 JSON일 수도 있고 아닐 수도 있으므로 안전 파싱
        const body = message?.body
        try {
          const parsed = body ? JSON.parse(body) : null
          callback?.(parsed ?? body, roomId)
        } catch (e) {
          console.error('[STOMP] parse error @', roomId, e)
          callback?.(body, roomId)
        }
      },
      { id: `room-${roomId}` } // 고정 아이디(중복 구독 방지)
    )

    subscriptions.set(roomId, sub)
    if (!recovering) {
      subscribeIntents.set(roomId, callback)
    }
    console.log('[STOMP] SUBSCRIBE', dest)
    refreshActiveRooms()
  }

  const subscribeRoom = (roomId, callback) => _subscribeInternal(roomId, callback, false)

  const unsubscribeRoom = (roomId) => {
    const sub = subscriptions.get(roomId)
    if (sub) {
      try {
        sub.unsubscribe()
      } catch {}
      subscriptions.delete(roomId)
      subscribeIntents.delete(roomId)
      console.log('[STOMP] UNSUBSCRIBE', `${SUBSCRIBE_PREFIX}${roomId}`)
      refreshActiveRooms()
    } else {
      // 구독 핸들이 없더라도, 의도는 제거(이후 재연결 시 자동 구독되는 걸 방지)
      subscribeIntents.delete(roomId)
    }
  }

  // withIntent=true면 자동 재구독 의도도 함께 제거
  const unsubscribeAll = (withIntent = false) => {
    subscriptions.forEach((sub, roomId) => {
      try {
        sub.unsubscribe()
      } catch {}
      console.log('[STOMP] UNSUBSCRIBE', `${SUBSCRIBE_PREFIX}${roomId}`)
    })
    subscriptions.clear()
    if (withIntent) subscribeIntents.clear()
    refreshActiveRooms()
  }

  const sendToRoom = (roomId, body) => {
    if (!roomId || !isConnected || !stompClient?.connected) return
    stompClient.publish({
      destination: `${TOPIC_PREFIX}/${roomId}`,
      body: JSON.stringify(body ?? {}),
      headers: { 'content-type': 'application/json;charset=UTF-8' },
    })
  }

  // 토큰이 갱신되었을 때(예: refresh token 후) 호출하면 이후 재연결/재시도 시 새 토큰 사용
  const updateToken = () => {
    if (stompClient) {
      stompClient.connectHeaders = buildClientHeaders()
      console.log('[STOMP] connectHeaders updated')
    }
  }

  // 헬퍼
  const getIsConnected = () => !!isConnected
  const getActiveRooms = () => Array.from(subscriptions.keys())

  return {
    connect,
    disconnect,
    subscribeRoom,
    unsubscribeRoom,
    unsubscribeAll,
    sendToRoom,
    updateToken,
    connected: readonly(connectedRef),
    activeRooms: readonly(activeRoomsRef),
    getIsConnected,
    getActiveRooms,
  }
}
