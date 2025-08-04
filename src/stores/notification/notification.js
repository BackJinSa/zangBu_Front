// /stores/notification/useNotificationStore.js

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
// import axios from 'axios' // ⬅실제 API 연동 시 주석 해제

export const useNotificationStore = defineStore('notification', () => {
  // 상태 정의
  const notifications = ref([])
  const loading = ref(false)
  const currentPage = ref(1)
  const pageSize = ref(10)
  const activeFilter = ref('all')

  // 더미 알림 로드
  const loadDummyNotifications = () => {
    loading.value = true
    setTimeout(() => {
      const types = ['BUILDING', 'TRADE', 'REVIEW']
      const saleTypes = ['전세', '매매']

      notifications.value = Array.from({ length: 1000 }, (_, i) => {
        const type = types[i % 3]
        const saleType = saleTypes[i % 2]
        const price = (Math.random() * 10 + 1).toFixed(1) // 예: 3.5억
        return {
          id: i + 1,
          type,
          title: `알림 제목 ${i + 1}`,
          message: `이것은 ${type} 유형의 더미 알림입니다.`,
          createdAt: `2025-08-${String((i % 28) + 1).padStart(2, '0')}`,
          isRead: i % 4 === 0,
          saleType,
          price,
          buildingId: (i % 30) + 1,
        }
      })

      loading.value = false
    }, 300)
  }

  // ⬇실제 API 연동 예시
  /*
  const getNotifications = async () => {
    loading.value = true
    try {
      const res = await axios.get('/api/notifications')
      notifications.value = res.data
    } catch (err) {
      console.error('알림 불러오기 실패:', err)
    } finally {
      loading.value = false
    }
  }
  */

  // 필터 옵션
  const filters = [
    { label: '전체', key: 'all' },
    { label: '시세 변동', key: 'BUILDING' },
    { label: '실거래', key: 'TRADE' },
    { label: '리뷰', key: 'REVIEW' },
  ]

  // 필터 카운트 계산
  const filterCountMap = computed(() => {
    const map = {
      all: 0,
      BUILDING: 0,
      TRADE: 0,
      REVIEW: 0,
    }

    notifications.value.forEach((n) => {
      if (!n.isRead) {
        map.all++
        if (n.type === 'BUILDING') map.BUILDING++
        if (n.type === 'TRADE') map.TRADE++
        if (n.type === 'REVIEW') map.REVIEW++
      }
    })

    return map
  })
  // 필터링된 알림 목록
  const filteredNotifications = computed(() => {
    if (activeFilter.value === 'all') return notifications.value
    if (activeFilter.value === 'unread') return notifications.value.filter((n) => !n.isRead)
    return notifications.value.filter((n) => n.type === activeFilter.value)
  })

  // 페이지네이션 계산
  const totalPages = computed(() => Math.ceil(filteredNotifications.value.length / pageSize.value))

  const pagedNotifications = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value
    return filteredNotifications.value.slice(start, start + pageSize.value)
  })

  // 필터 변경
  const setNotificationFilter = (key) => {
    activeFilter.value = key
    currentPage.value = 1
  }

  // 페이지 변경
  const setNotificationPage = (page) => {
    currentPage.value = page
  }

  // 단일 알림 읽음 처리
  const markNotificationAsRead = (id) => {
    const target = notifications.value.find((n) => n.id === id)
    if (target) target.isRead = true
  }

  // 알림 삭제
  const deleteNotification = (id) => {
    notifications.value = notifications.value.filter((n) => n.id !== id)
  }

  // 전체 읽음 처리
  const markNotificationAllAsRead = () => {
    notifications.value = notifications.value.map((n) => ({ ...n, isRead: true }))
  }

  return {
    loading,
    filters,
    filterCountMap, // 필터 카운트
    notifications,
    filteredNotifications,
    pagedNotifications,
    currentPage,
    totalPages,
    activeFilter,

    loadDummyNotifications,
    // getNotifications,
    setNotificationFilter,
    setNotificationPage,
    markNotificationAsRead,
    // readNotification,
    deleteNotification,
    // removeNotification,
    markNotificationAllAsRead,
    // readAllNotifications,
  }
})
