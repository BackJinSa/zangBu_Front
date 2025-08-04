import api from '../axios'

// 전체 알림 목록 조회 (페이징 지원)
export const getNotificationsApi = (params) => {
  return api.get('/notification/all', { params })
}

// 알림 읽음 처리 (PATCH /notification/read/{id})
export const markNotificationAsReadApi = (id) => {
  return api.patch(`/notification/read/${id}`)
}

// 모든 알림 읽음 처리 (PATCH /notification/read/all)
export const markAllNotificationsAsReadApi = () => {
  return api.patch('/notification/read/all')
}

// 알림 삭제 (DELETE /notification/remove/{id})
export const deleteNotificationApi = (id) => {
  return api.delete(`/notification/remove/${id}`)
}
