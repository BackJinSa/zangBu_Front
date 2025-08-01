import { ref } from 'vue'
import { defineStore } from 'pinia'
import {
  getNotificationsApi,
  markNotificationAsReadApi,
  deleteNotificationApi,
  markAllNotificationsAsReadApi,
} from '@/api/system/system'

export const useSystemStore = defineStore('system', () => {
  // 알림 리스트
  const notifications = ref([])
  // 읽지 않은 알림 개수
  const unreadNotifications = ref(0)

  const currentPage = ref(1)
  const pageSize = ref(10)
  const totalCount = ref(0)

  const paymentHistory = ref([])
  const systemSettings = ref({})

  async function getNotifications(page = 1, size = 10) {
    const res = await getNotificationsApi({ page, size })
    notifications.value = res.data.notifications || []
    totalCount.value = res.data.totalCount || 0 // 백에서 내려줘야 함
    unreadNotifications.value = notifications.value.filter((n) => !n.isRead).length
    currentPage.value = page
  }

  // 단일 알림 읽음 처리
  async function markNotificationAsRead(id) {
    // 알림을 읽음 처리 하는 함수
    await markNotificationAsReadApi(id)
    // 전체 알림 중에서 id에 맞는 알림 필터링
    const target = notifications.value.find((n) => n.id === id)
    // 필터링한 알림이 존재한다면 알림 읽음 여부 -> true
    if (target) target.isRead = true
    // 읽지 않은 알림 개수
    unreadNotifications.value = notifications.value.filter((n) => !n.isRead).length
  }

  // 전체 알림 읽음 처리
  async function markNotificationAllAsRead() {
    // 전체 알림을 읽음 처리 하는 함수
    await markAllNotificationsAsReadApi()
    // 전체 알림의 읽음 여부 -> true
    notifications.value.forEach((n) => (n.isRead = true))
    // 읽지 않은 알림 개수 -> 0
    unreadNotifications.value = 0
  }

  // 알림 삭제
  async function deleteNotification(id) {
    // 알림을 삭제하는 함수
    await deleteNotificationApi(id)
    // 전체 알림 중에서 id가 다른 알림 필터링
    notifications.value = notifications.value.filter((n) => n.id !== id)
    // 읽지 않은 알림 개수
    unreadNotifications.value = notifications.value.filter((n) => !n.isRead).length
  }

  function getPaymentHistory() {
    // 결제 내역 조회 로직
  }

  function processPayment(paymentData) {
    // 결제 처리 로직
  }

  function getSystemSettings() {
    // 시스템 설정 조회 로직
  }

  function updateSystemSettings(settings) {
    // 시스템 설정 업데이트 로직
  }

  return {
    notifications,
    unreadNotifications,
    paymentHistory,
    systemSettings,
    getNotifications,
    markNotificationAsRead,
    markNotificationAllAsRead,
    deleteNotification,
    getPaymentHistory,
    processPayment,
    getSystemSettings,
    updateSystemSettings,
  }
})
