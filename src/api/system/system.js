import api from '../axios'

// 알림 목록 조회
export const getNotifications = (params) => {
  return api.get('/notifications', { params })
}

// 알림 읽음 처리
export const markNotificationAsRead = (id) => {
  return api.put(`/notifications/${id}/read`)
}

// 알림 삭제
export const deleteNotification = (id) => {
  return api.delete(`/notifications/${id}`)
}

// 모든 알림 읽음 처리
export const markAllNotificationsAsRead = () => {
  return api.put('/notifications/read-all')
}

// 결제 내역 조회
export const getPaymentHistory = (params) => {
  return api.get('/payments/history', { params })
}

// 결제 처리
export const processPayment = (paymentData) => {
  return api.post('/payments/process', paymentData)
}

// 결제 취소
export const cancelPayment = (paymentId) => {
  return api.post(`/payments/${paymentId}/cancel`)
}

// 시스템 설정 조회
export const getSystemSettings = () => {
  return api.get('/system/settings')
}

// 시스템 설정 업데이트
export const updateSystemSettings = (settings) => {
  return api.put('/system/settings', settings)
}

// 앱 버전 정보 조회
export const getAppVersion = () => {
  return api.get('/system/version')
}
