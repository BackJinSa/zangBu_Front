import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useSystemStore = defineStore('system', () => {
  const notifications = ref([])
  const unreadNotifications = ref(0)
  const paymentHistory = ref([])
  const systemSettings = ref({})

  function getNotifications() {
    // 알림 목록 조회 로직
  }

  function markNotificationAsRead(id) {
    // 알림 읽음 처리 로직
  }

  function deleteNotification(id) {
    // 알림 삭제 로직
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
    deleteNotification,
    getPaymentHistory,
    processPayment,
    getSystemSettings,
    updateSystemSettings,
  }
})
