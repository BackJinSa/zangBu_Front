// /stores/notification/useNotificationStore.js

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
// import axios from 'axios' // ⬅실제 API 연동 시 주석 해제

import {
  getNotificationsApi,
  markNotificationAsReadApi,
  markAllNotificationsAsReadApi,
  deleteNotificationApi,
} from '@/api/notification/notification'

export const useNotificationStore = defineStore('notification', () => {
  // ------------------------
  // 상태 정의
  // ------------------------
  const notifications = ref([])
  const loading = ref(false)
  const currentPage = ref(1)
  const pageSize = ref(10)
  const activeFilter = ref('all')

  // ------------------------
  // 알림 더미 데이터 (테스트용)
  // ------------------------
  const loadDummyNotifications = () => {
    loading.value = true
    setTimeout(() => {
      const types = ['BUILDING', 'TRADE', 'REVIEW']
      const saleTypes = ['전세', '매매']

      notifications.value = Array.from({ length: 10 }, (_, i) => {
        const type = types[i % 3]
        const saleType = saleTypes[i % 2]
        const price = (Math.random() * 10 + 1).toFixed(1)

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

  // ------------------------
  // FCM 알림 수신 시 store에 추가
  // ------------------------
  const addNotificationFromFCM = (payload) => {
    const newNotification = {
      id: Date.now(), // FCM은 고유 ID가 없기 때문에 임시로 사용
      type: payload.data?.type || 'BUILDING',
      title: payload.notification?.title || '새로운 알림',
      message: payload.notification?.body || '새로운 알림이 도착했습니다.',
      createdAt: new Date().toISOString().split('T')[0],
      isRead: false,
      saleType: payload.data?.saleType || '매매',
      price: payload.data?.price || '0.0',
      buildingId: payload.data?.buildingId || 1,
    }

    notifications.value.unshift(newNotification)
  }

  // ------------------------
  // 실제 API 연동 (비동기)
  // ------------------------
  /*
  const loadNotificationsFromApi = async () => {
    loading.value = true
    try {
      const res = await getNotificationsApi()
      notifications.value = res.data // ← 실제 백엔드 포맷 맞게 수정 필요
    } catch (e) {
      console.error('알림 불러오기 실패:', e)
    } finally {
      loading.value = false
    }
  }
  */

  // ------------------------
  // 읽지 않은 알림 개수
  // ------------------------
  const unreadCount = computed(() => notifications.value.filter((n) => !n.isRead).length)

  // ------------------------
  // 필터 관련
  // ------------------------
  const filters = [
    { label: '전체', key: 'all' },
    { label: '시세 변동', key: 'BUILDING' },
    { label: '실거래', key: 'TRADE' },
    { label: '리뷰', key: 'REVIEW' },
  ]

  const filterCountMap = computed(() => {
    const map = { all: 0, BUILDING: 0, TRADE: 0, REVIEW: 0 }

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

  const filteredNotifications = computed(() => {
    if (activeFilter.value === 'all') return notifications.value
    return notifications.value.filter((n) => n.type === activeFilter.value)
  })

  // ------------------------
  // 페이지네이션
  // ------------------------
  const totalPages = computed(() => Math.ceil(filteredNotifications.value.length / pageSize.value))

  const pagedNotifications = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value
    return filteredNotifications.value.slice(start, start + pageSize.value)
  })

  const setNotificationPage = (page) => {
    currentPage.value = page
  }

  const setNotificationFilter = (key) => {
    activeFilter.value = key
    currentPage.value = 1
  }

  // ------------------------
  // 알림 처리 기능들
  // ------------------------
  const markNotificationAsRead = (id) => {
    const target = notifications.value.find((n) => n.id === id)
    if (target) target.isRead = true
  }

  const deleteNotification = (id) => {
    notifications.value = notifications.value.filter((n) => n.id !== id)
  }

  const markNotificationAllAsRead = () => {
    notifications.value = notifications.value.map((n) => ({
      ...n,
      isRead: true,
    }))
  }

  return {
    loading,
    filters,
    unreadCount,
    filterCountMap,
    notifications,
    filteredNotifications,
    pagedNotifications,
    currentPage,
    totalPages,
    activeFilter,

    addNotificationFromFCM,
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
