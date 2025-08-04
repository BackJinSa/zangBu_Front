import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import {
  getNotificationsApi,
  markNotificationAsReadApi,
  deleteNotificationApi,
  markAllNotificationsAsReadApi,
} from '@/api/system/system'

export const useSystemStore = defineStore('system', () => {
  // 상태: 알림
  const loading = ref(false)
  const notifications = ref([])
  const unreadNotifications = ref(0)
  const activeFilter = ref('all')
  const currentPage = ref(1)
  const pageSize = 10
  const totalCount = ref(0)

  // 더미 데이터 생성용 (테스트용)
  const dummyTypes = ['property', 'transaction', 'review']
  const dummyIcons = { property: 'home', transaction: 'chart', review: 'star' }
  const dummyTags = { property: '전세 5억', transaction: '매매 12억', review: null }

  function loadDummyNotifications() {
    notifications.value = []
    for (let i = 1; i <= 1000; i++) {
      const type = dummyTypes[i % 3]
      notifications.value.push({
        id: i,
        type,
        title: `알림 제목 ${i}`,
        message: `이것은 ${type} 유형의 더미 알림 ${i}번입니다.`,
        time: `${i}분 전`,
        tag: dummyTags[type],
        isRead: false,
        icon: dummyIcons[type],
      })
    }
    unreadNotifications.value = notifications.value.filter((n) => !n.isRead).length
    totalCount.value = notifications.value.length
  }

  // 필터링 & 페이징
  const filters = computed(() => {
    const counts = {
      all: notifications.value.length,
      property: notifications.value.filter((n) => n.type === 'property').length,
      transaction: notifications.value.filter((n) => n.type === 'transaction').length,
      review: notifications.value.filter((n) => n.type === 'review').length,
    }
    return [
      { key: 'all', label: '전체', count: counts.all },
      { key: 'property', label: '매물 알림', count: counts.property },
      { key: 'transaction', label: '실거래 알림', count: counts.transaction },
      { key: 'review', label: '리뷰 알림', count: counts.review },
    ]
  })

  const filteredNotifications = computed(() =>
    activeFilter.value === 'all'
      ? notifications.value
      : notifications.value.filter((n) => n.type === activeFilter.value)
  )

  const totalPages = computed(() =>
    Math.max(1, Math.ceil(filteredNotifications.value.length / pageSize))
  )

  const pagedNotifications = computed(() => {
    const start = (currentPage.value - 1) * pageSize
    return filteredNotifications.value.slice(start, start + pageSize)
  })

  // 알림 API 연동 함수들
  async function getNotifications(page = 1, size = 10) {
    loading.value = true
    try {
      const res = await getNotificationsApi({ page, size })
      notifications.value = res.data.notifications || []
      totalCount.value = res.data.totalCount || 0
      unreadNotifications.value = notifications.value.filter((n) => !n.isRead).length
      currentPage.value = page
    } finally {
      loading.value = false
    }
  }

  async function markNotificationAsRead(id) {
    await markNotificationAsReadApi(id)
    const target = notifications.value.find((n) => n.id === id)
    if (target) target.isRead = true
    unreadNotifications.value = notifications.value.filter((n) => !n.isRead).length
  }

  async function markNotificationAllAsRead() {
    await markAllNotificationsAsReadApi()
    notifications.value.forEach((n) => (n.isRead = true))
    unreadNotifications.value = 0
  }

  async function deleteNotification(id) {
    await deleteNotificationApi(id)
    notifications.value = notifications.value.filter((n) => n.id !== id)
    unreadNotifications.value = notifications.value.filter((n) => !n.isRead).length
  }

  function setNotificationFilter(filterKey) {
    activeFilter.value = filterKey
    currentPage.value = 1
  }

  function setNotificationPage(page) {
    currentPage.value = page
  }

  return {
    // 상태
    loading,
    notifications,
    unreadNotifications,
    paymentHistory,
    systemSettings,
    activeFilter,
    currentPage,
    totalCount,

    // 계산
    filters,
    filteredNotifications,
    pagedNotifications,
    totalPages,

    // 액션
    getNotifications,
    markNotificationAsRead,
    markNotificationAllAsRead,
    deleteNotification,
    setNotificationFilter,
    setNotificationPage,
    loadDummyNotifications,
  }
})
