import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useSystemStore = defineStore('system', () => {
  const paymentHistory = ref([])
  const systemSettings = ref({})

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
    paymentHistory,
    systemSettings,
    getPaymentHistory,
    processPayment,
    getSystemSettings,
    updateSystemSettings,
  }
})
