import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import {
  getNotificationsApi,
  markNotificationAsReadApi,
  markAllNotificationsAsReadApi,
  deleteNotificationApi,
} from '@/api/notification/notification'

export const useNotificationStore = defineStore('notification', () => {
  // ---------- state ----------
  const notifications = ref([]) // 현재 페이지 목록
  const loading = ref(false)
  const error = ref(null)

  // 서버 페이징(1-based)
  const currentPage = ref(1)
  const pageSize = ref(10)
  const totalPages = ref(1)
  const totalElements = ref(0)

  // 필터(서버와 동일)
  const activeFilter = ref('ALL') // 'ALL' | 'BUILDING' | 'TRADE' | 'REVIEW'

  // 서버에서 내려온 전체 기준 카운트 (탭 배지 노출)
  const counts = ref({ ALL: 0, BUILDING: 0, TRADE: 0, REVIEW: 0 })

  // ---------- getters ----------
  const filters = [
    { label: '전체', key: 'ALL' },
    { label: '시세 변동', key: 'BUILDING' },
    { label: '실거래', key: 'TRADE' },
    { label: '리뷰', key: 'REVIEW' },
  ]

  const unreadCountInPage = computed(() => notifications.value.filter((n) => !n.isRead).length)

  // ---------- actions ----------
  async function loadNotifications() {
    loading.value = true
    error.value = null
    try {
      const res = await getNotificationsApi({
        page: currentPage.value,
        size: pageSize.value,
        type: activeFilter.value,
      })

      notifications.value = res.items
      totalElements.value = res.totalElements
      totalPages.value = res.totalPages
      currentPage.value = res.pageNumber // 1-based 그대로
      pageSize.value = res.pageSize
      counts.value = { ...res.filterCounts } // 서버 카운트 반영
    } catch (e) {
      console.error('[notification] load failed:', e)
      error.value = e?.response?.data?.message || e.message || '알림 불러오기 실패'
    } finally {
      loading.value = false
    }
  }

  async function setNotificationPage(page) {
    if (page < 1 || (totalPages.value && page > totalPages.value)) return
    currentPage.value = page
    await loadNotifications()
  }

  async function setPageSize(size) {
    pageSize.value = size
    currentPage.value = 1
    await loadNotifications()
  }

  async function setNotificationFilter(key) {
    const up = String(key).toUpperCase()
    if (!['ALL', 'BUILDING', 'TRADE', 'REVIEW'].includes(up)) return
    if (activeFilter.value === up) return
    activeFilter.value = up
    currentPage.value = 1
    await loadNotifications()
  }

  async function markNotificationAsRead(id) {
    // 낙관적 업데이트
    const idx = notifications.value.findIndex((n) => n.id === id)
    const prev = idx >= 0 ? { ...notifications.value[idx] } : null
    if (idx >= 0 && !notifications.value[idx].isRead) {
      notifications.value[idx] = { ...notifications.value[idx], isRead: true }
      // 전체 카운트에서 "읽지 않음" 카운트가 따로 없다면 서버 리로드가 가장 정확
    }
    try {
      await markNotificationAsReadApi(id)
    } catch (e) {
      if (idx >= 0 && prev) notifications.value[idx] = prev
      console.error('[notification] markAsRead failed:', e)
      throw e
    }
  }

  async function markNotificationAllAsRead() {
    // 낙관적 업데이트
    const prev = notifications.value.map((n) => ({ ...n }))
    notifications.value = notifications.value.map((n) => ({ ...n, isRead: true }))
    try {
      await markAllNotificationsAsReadApi()
      // 서버 카운트와 싱크
      await loadNotifications()
    } catch (e) {
      notifications.value = prev
      console.error('[notification] markAllAsRead failed:', e)
      throw e
    }
  }

  async function deleteNotification(id) {
    const idx = notifications.value.findIndex((n) => n.id === id)
    const prev = idx >= 0 ? { ...notifications.value[idx] } : null
    if (idx >= 0) notifications.value.splice(idx, 1)
    try {
      await deleteNotificationApi(id)
      // 삭제 후 페이지 비면 이전 페이지로 이동, 아니면 현재 페이지 리로드
      if (notifications.value.length === 0 && currentPage.value > 1) {
        await setNotificationPage(currentPage.value - 1)
      } else {
        await loadNotifications()
      }
    } catch (e) {
      if (idx >= 0 && prev) notifications.value.splice(idx, 0, prev)
      console.error('[notification] delete failed:', e)
      throw e
    }
  }

  /** FCM 포그라운드 수신 시 목록/카운트 반영 */
  function addNotificationFromFCM(payload) {
    // payload → UI 매핑(예시는 구조에 맞게 수정)
    const type = (payload?.data?.type || 'UNKNOWN').toUpperCase()
    const item = {
      id: Number(payload?.data?.id || Date.now()),
      title: payload?.notification?.title || '새 알림',
      message: payload?.notification?.body || '',
      type,
      isRead: false,
      createdAt: '방금',
      address: payload?.data?.address || '',
      priceLabel: payload?.data?.priceLabel || '',
      rank: Number(payload?.data?.rank || 0),
    }

    // 현재 필터에 맞으면 화면에 즉시 추가
    if (activeFilter.value === 'ALL' || activeFilter.value === type) {
      notifications.value.unshift(item)
    }

    // 전체 카운트 낙관적 증가 (정확 싱크는 loadNotifications 권장)
    counts.value.ALL += 1
    if (['BUILDING', 'TRADE', 'REVIEW'].includes(type)) {
      counts.value[type] += 1
    }

    // 정확도가 중요하면 아래로 대체:
    // loadNotifications()
  }

  return {
    // state
    loading,
    error,
    notifications,
    currentPage,
    pageSize,
    totalPages,
    totalElements,
    activeFilter,
    counts,

    // getters
    filters,
    unreadCountInPage,

    // actions
    loadNotifications,
    setNotificationPage,
    setPageSize,
    setNotificationFilter,
    markNotificationAsRead,
    markNotificationAllAsRead,
    deleteNotification,
    addNotificationFromFCM,
  }
})
