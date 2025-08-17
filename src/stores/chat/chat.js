import { ref, computed, watch } from 'vue'
import { useRoute, onBeforeRouteUpdate } from 'vue-router'
import { defineStore } from 'pinia'
import { useStomp } from '@/utils/useStomp'
import { useAuthStore } from '@/stores/auth/auth'
import axios from 'axios'

// 보낸사람 ID 후보를 senderId로 통일
function getSenderId(m) {
  const candidates = [m.senderId, m.userId, m.memberId, m.sender_id, m?.sender?.id].filter(Boolean)
  return candidates.length ? String(candidates[0]).trim() : null
}

function getType(m) {
  const t = String(m?.type || '').toUpperCase()
  if (t === 'SYSTEM') return 'SYSTEM'
  // REST로 받은 과거 메시지엔 type이 없을 수 있음 → senderId로 판별
  const isSystemSender = String(m?.senderId || '').toLowerCase() === 'system'
  return isSystemSender ? 'SYSTEM' : 'USER'
}

function normalizeMessage(m) {
  const type = getType(m)
  return {
    ...m,
    type,
    isSystem: type === 'SYSTEM',
    senderId: getSenderId(m), // 통일!
  }
}

export const useChatStore = defineStore('chat', () => {
  const chatRooms = ref([])
  const currentChat = ref(null)
  const messages = ref([])
  const unreadCount = ref(0)
  const route = useRoute()
  const roomId = computed(() => String(route.params.roomId || ''))
  const { sendToRoom, subscribeRoom, unsubscribeRoom, connected } = useStomp()
  const oldestMessageId = ref(null) //가장 오래 로드된(리스트 맨 앞) 메시지 id 기억 → 더보기 요청용

  const authStore = useAuthStore()
  const myUserId = computed(() => authStore.userId || authStore.memberId || '')

  // 채팅방 목록 조회 로직
  async function getChatRooms(type = 'ALL') {
    try {
      const res = await axios.get('/chat/list', { params: { type } })
      chatRooms.value = res.data.result
    } catch (err) {
      console.error('채팅방 목록 조회 실패:', err)
    }
  }

  //서버는 최신부터(DESC) 반환 → 여기서 reverse()로 ASC로 맞춤
  async function fetchMessages(lastMessageId = null, limit = 5) {
    const { data } = await axios.get(`http://localhost:8080/chat/room/${roomId.value}`, {
      params: { lastMessageId, limit },
    })
    const list = Array.isArray(data) ? data : []
    return list.reverse().map(normalizeMessage) // 오래→최근 순으로 변환
  }

  // 최초 로드: 화면엔 오래→최근, 스크롤은 맨 아래로
  async function loadInitialMessages(limit = 5) {
    try {
      const asc = await fetchMessages(null, limit)
      messages.value = asc
      oldestMessageId.value = asc[0]?.chatMessageId ?? null
      currentChat.value = { chatRoomId: roomId.value }
      return asc.length
    } catch (err) {
      console.error('초기 메시지 로드 실패:', err)
      messages.value = []
      oldestMessageId.value = null
      return 0
    }
  }

  // 더보기(위로 스크롤): 가장 오래 로드된 id보다 더 오래된 묶음을 앞쪽에 붙임
  async function loadOlderMessages(limit = 30) {
    if (!oldestMessageId.value) return 0
    try {
      const olderAsc = await fetchMessages(oldestMessageId.value, limit)
      if (olderAsc.length === 0) return 0
      messages.value = [...olderAsc, ...messages.value]
      oldestMessageId.value = messages.value[0]?.chatMessageId ?? oldestMessageId.value
      return olderAsc.length
    } catch (err) {
      console.error('이전 메시지 로드 실패:', err)
      return 0
    }
  }

  // 메시지 전송 로직
  async function sendMessage(message) {
    try {
      sendToRoom(roomId.value, { message: message, senderId: myUserId.value })
    } catch (err) {
      console.error('STOMP 메시지 전송 실패:', err)
    }
  }

  function pushIncoming(raw) {
    const msg = normalizeMessage(raw)
    messages.value.push(msg)
    return msg
  }

  // 채팅방 생성 로직
  async function createChatRoom(buildingId) {
    try {
      const res = await axios.post(`http://localhost:8080/chat/room/${buildingId}`)
      console.log('createChatRoom result:', res.data)
      return res.data // 생성된 채팅방 ChatRoom 반환
    } catch (err) {
      console.error('채팅방 생성 실패:', err)
      throw err
    }
  }

  //채팅방 삭제 로직
  async function deleteChatRoom(roomId) {
    try {
      await axios.delete(`http://localhost:8080/chat/room/${roomId}`)
      // 성공적으로 삭제되면 목록에서 제거
      chatRooms.value = chatRooms.value.filter((r) => r.chatRoomId !== roomId)
      if (currentChat.value?.chatRoomId === roomId) {
        currentChat.value = null
        messages.value = []
        oldestMessageId.value = null
      }
    } catch (err) {
      console.error('채팅방 삭제 실패:', err)
      throw err
    }
  }

  // 채팅방 나가기 로직
  async function leaveChatRoom() {
    const id = roomId.value
    if (!id) return

    // 1) 낙관적 UI: 목록/카운트/현재방 상태를 미리 정리
    const prevRooms = [...chatRooms.value]
    const roomIdx = chatRooms.value.findIndex((r) => r.chatRoomId === id)
    const prevRoom = roomIdx >= 0 ? { ...chatRooms.value[roomIdx] } : null

    // 목록에서 제거 & 현재방/메시지 초기화
    chatRooms.value = chatRooms.value.filter((r) => r.chatRoomId !== id)
    if (currentChat.value?.chatRoomId === id) {
      currentChat.value = null
      messages.value = []
      oldestMessageId.value = null
    }

    try {
      await axios.patch(`http://localhost:8080/chat/list/exit/${id}`)

      unsubscribeRoom(id) // STOMP 구독 해제

      // 4) 남은 구독 없으면 소켓 연결 종료(선택 사항)
      if ((typeof getActiveRooms === 'function' && getActiveRooms()?.length === 0) || false) {
        // connected는 readonly ref 라서 길이만 체크
        // 필요 시 자동 재연결을 막고 싶다면 아래 호출
        // disconnect()

        // 성공적으로 종료됨
        return true
      }
    } catch (err) {
      console.error('채팅방 나가기 실패:', err)
      // 실패 시 낙관적 UI 롤백
      if (roomIdx >= 0) {
        // 삭제했던 방 되돌리기
        chatRooms.value = [...prevRooms]
      }
      if (prevRoom) {
        currentChat.value = { chatRoomId: id }
        // 메시지까지 복원할 필요가 있다면, 필요 시 서버 재조회
      }

      throw err
    }
  }

  // 읽음 처리 로직
  async function markAsRead() {
    try {
      //await axios.put(`/chat/room/${roomId.value}/read`)
      await axios.put(`http://localhost:8080/chat/room/${roomId.value}/read`)
      const room = chatRooms.value.find((r) => r.chatRoomId === roomId.value)
      if (room) room.unreadCount = 0
    } catch (err) {
      console.error('읽음 처리 실패:', err)
    }
  }

  //채팅방 존재하는지 확인
  async function existChatRoom(buildingId, consumerId) {
    try {
      const res = await axios.get(`http://localhost:8080/chat/room/${buildingId}/${consumerId}`)
      return { exists: res.data.exists, chatRoomId: res.data.chatRoomId }
    } catch (err) {
      console.error('채팅방 존재 여부 확인 실패:', err)
    }
  }

  return {
    chatRooms,
    currentChat,
    messages,
    unreadCount,
    oldestMessageId,
    getChatRooms,
    loadInitialMessages,
    loadOlderMessages,
    sendMessage,
    createChatRoom,
    leaveChatRoom,
    deleteChatRoom,
    markAsRead,
    pushIncoming,
    existChatRoom,
  }
})
