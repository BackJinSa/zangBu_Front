import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useStomp } from '@/composables/useStomp'
import axios from 'axios'

export const useChatStore = defineStore('chat', () => {
  const chatRooms = ref([])
  const currentChat = ref(null)
  const messages = ref([])
  const unreadCount = ref(0)
  const { sendStompMessage } = useStomp()

  async function getChatRooms(type = 'ALL') {
    // 채팅방 목록 조회 로직
    try {
      const res = await axios.get('/chat/room/list', { params: { type } })
      chatRooms.value = res.data.result
    } catch (err) {
      console.error('채팅방 목록 조회 실패:', err)
    }
  }

  async function getChatMessages(roomId, lastMessageId = null, limit = 30) {
    // 채팅 메시지 조회 로직
    try {
      const res = await axios.get(`/chat/room/${roomId}`, {
        params: { lastMessageId, limit },
      })
      messages.value = res.data.result.messageList
      currentChat.value = {
        chatRoomId: roomId,
        ...res.data.result,
      }
    } catch (err) {
      console.error('채팅 메시지 조회 실패:', err)
    }
  }

  async function sendMessage(message) {
    // 메시지 전송 로직
    try {
      sendStompMessage('/pub/chat.message', message)
    } catch (err) {
      console.error('STOMP 메시지 전송 실패:', err)
    }
  }

  async function createChatRoom(buildingId, consumerId) {
    // 채팅방 생성 로직
    try {
      const res = await axios.post('/chat/room', {
        buildingId,
        consumerId,
      })
      return res.data.result.chatRoomId // 생성된 채팅방 ID
    } catch (err) {
      console.error('채팅방 생성 실패:', err)
      throw err
    }
  }

  async function leaveChatRoom(roomId) {
    // 채팅방 나가기 로직
    try {
      await axios.delete(`/chat/room/${roomId}`)
      chatRooms.value = chatRooms.value.filter((r) => r.chatRoomId !== roomId)
    } catch (err) {
      console.error('채팅방 나가기 실패:', err)
    }
  }

  async function markAsRead(roomId) {
    // 읽음 처리 로직
    try {
      await axios.put(`/chat/room/${roomId}/read`)
      const room = chatRooms.value.find((r) => r.chatRoomId === roomId)
      if (room) room.unreadCount = 0
    } catch (err) {
      console.error('읽음 처리 실패:', err)
    }
  }

  return {
    chatRooms,
    currentChat,
    messages,
    unreadCount,
    getChatRooms,
    getChatMessages,
    sendMessage,
    createChatRoom,
    leaveChatRoom,
    markAsRead,
  }
})
