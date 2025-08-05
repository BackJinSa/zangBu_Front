import { Client } from '@stomp/stompjs'
import SockJS from 'sockjs-client'
import { useAuthStore } from '@/stores/auth/auth'

//STOMP 연결을 담당하는 Client 객체
let stompClient = null
//현재 연결 상태
let isConnected = false
//현재 구독을 저장하는 변수(구독 해제 시 필요)
let currentSubscription = null

// STOMP 연결
export function useStomp() {
  //JWT 토큰을 가져와 연결
  const connect = (onConnectedCallback = () => {}) => {
    const authStore = useAuthStore()
    const token = authStore.accessToken

    stompClient = new Client({
      webSocketFactory: () => new SockJS('http://localhost:8080/ws-stomp'),
      reconnectDelay: 5000,

      // JWT를 Authorization 헤더로 포함
      connectHeaders: {
        Authorization: `Bearer ${token}`,
      },

      onConnect: () => {
        isConnected = true
        console.log('STOMP 연결 성공')
        onConnectedCallback() //연결 성공 후 구독
      },

      onStompError: (frame) => {
        console.error('STOMP 오류:', frame)
      },
    })

    stompClient.activate()
  }

  //topic 구독
  const subscribe = (destination, callback) => {
    if (!isConnected || !stompClient) return

    if (currentSubscription) {
      currentSubscription.unsubscribe()
      currentSubscription = null
    }

    currentSubscription = stompClient.subscribe(destination, (message) => {
      callback(JSON.parse(message.body))
    })
  }

  //STOMP 메시지 전송
  const sendStompMessage = (destination, body) => {
    if (!isConnected || !stompClient) return
    stompClient.publish({
      destination,
      body: JSON.stringify(body),
    })
  }

  //연결 종료
  const disconnect = () => {
    if (stompClient) {
      stompClient.deactivate()
      stompClient = null
      isConnected = false
    }
  }

  return {
    connect,
    subscribe,
    sendStompMessage,
    disconnect,
  }
}
