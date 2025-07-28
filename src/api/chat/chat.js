import api from '../axios'

// 채팅방 목록 조회
export const getChatRooms = () => {
  return api.get('/chat/rooms')
}

// 채팅방 생성
export const createChatRoom = (participants) => {
  return api.post('/chat/rooms', { participants })
}

// 채팅 메시지 조회
export const getChatMessages = (roomId, params) => {
  return api.get(`/chat/rooms/${roomId}/messages`, { params })
}

// 메시지 전송
export const sendMessage = (roomId, message) => {
  return api.post(`/chat/rooms/${roomId}/messages`, message)
}

// 채팅방 나가기
export const leaveChatRoom = (roomId) => {
  return api.delete(`/chat/rooms/${roomId}/leave`)
}

// 읽음 처리
export const markAsRead = (roomId, messageId) => {
  return api.put(`/chat/rooms/${roomId}/read`, { messageId })
}

// 채팅방 정보 조회
export const getChatRoomInfo = (roomId) => {
  return api.get(`/chat/rooms/${roomId}`)
}

// 파일 전송
export const sendFile = (roomId, file) => {
  const formData = new FormData()
  formData.append('file', file)
  return api.post(`/chat/rooms/${roomId}/files`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}
