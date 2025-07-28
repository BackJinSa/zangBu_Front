import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useChatStore = defineStore('chat', () => {
  const chatRooms = ref([])
  const currentChat = ref(null)
  const messages = ref([])
  const unreadCount = ref(0)

  function getChatRooms() {
    // 채팅방 목록 조회 로직
  }

  function getChatMessages(roomId) {
    // 채팅 메시지 조회 로직
  }

  function sendMessage(message) {
    // 메시지 전송 로직
  }

  function createChatRoom(participants) {
    // 채팅방 생성 로직
  }

  function leaveChatRoom(roomId) {
    // 채팅방 나가기 로직
  }

  function markAsRead(roomId) {
    // 읽음 처리 로직
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
