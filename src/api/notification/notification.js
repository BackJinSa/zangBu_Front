import api from '@/api/axios'

/**
 * 전체 알림 목록 조회 (페이징 지원)
 * GET /notification/all?page=1&size=10
 *
 * @param {{ page: number, size: number }} params - 페이지 번호와 항목 수
 * @returns {Promise<{ data: Notification[], pageInfo: PageInfo }>} 알림 목록과 페이지 정보 포함
 */
export const getNotificationsApi = async (params) => {
  const res = await api.get('/notification/all', { params })
  return res.data
}

/**
 * 단일 알림 읽음 처리
 * PATCH /notification/read/{id}
 *
 * @param {number} id - 읽음 처리할 알림 ID
 * @returns {Promise<number>} - 읽음 처리된 알림 ID가 반환
 */
export const markNotificationAsReadApi = async (id) => {
  const res = await api.patch(`/notification/read/${id}`)
  return res.data
}

/**
 * 전체 알림 읽음 처리
 * PATCH /notification/read/all
 *
 * @returns {Promise<{ count: number }>} 처리된 알림 수 반환
 */
export const markAllNotificationsAsReadApi = async () => {
  const res = await api.patch('/notification/read/all')
  return res.data
}

/**
 * 알림 삭제
 * DELETE /notification/remove/{id}
 *
 * @param {number} id - 삭제할 알림 ID
 * @returns {Promise<number>} - 삭제된 알림  ID가 반환
 */
export const deleteNotificationApi = async (id) => {
  const res = await api.delete(`/notification/remove/${id}`)
  return res.data
}
