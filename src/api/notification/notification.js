import api from '@/api/axios'

/**
 * 전체 알림 목록 조회 (페이징 지원)
 * GET /notification/all?page=1&size=10
 *
 * @param {{ page: number, size: number }} params - 페이지 번호와 항목 수
 * @returns {Promise<AxiosResponse>} 알림 목록과 페이지 정보 포함
 */
export const getNotificationsApi = (params) => {
  return api.get('/notification/all', { params })
}

/**
 * 단일 알림 읽음 처리
 * PATCH /notification/read/{id}
 *
 * @param {number} id - 읽음 처리할 알림 ID
 * @returns {Promise<AxiosResponse>} 처리 결과
 */
export const markNotificationAsReadApi = (id) => {
  return api.patch(`/notification/read/${id}`)
}

/**
 * 전체 알림 읽음 처리
 * PATCH /notification/read/all
 *
 * @returns {Promise<AxiosResponse>} 처리된 알림 수 반환
 */
export const markAllNotificationsAsReadApi = () => {
  return api.patch('/notification/read/all')
}

/**
 * 알림 삭제
 * DELETE /notification/remove/{id}
 *
 * @param {number} id - 삭제할 알림 ID
 * @returns {Promise<AxiosResponse>} 삭제 결과
 */
export const deleteNotificationApi = (id) => {
  return api.delete(`/notification/remove/${id}`)
}
