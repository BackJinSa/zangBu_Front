import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useTradeStore = defineStore('trade', () => {
  const trades = ref([])
  const currentTrade = ref(null)
  const tradeStatus = ref('waiting')

  function getTrades() {
    // 거래 목록 조회 로직
  }

  function createTrade(tradeData) {
    // 거래 생성 로직
  }

  function updateTradeStatus(tradeId, status) {
    // 거래 상태 업데이트 로직
  }

  function cancelTrade(tradeId) {
    // 거래 취소 로직
  }

  function completeTrade(tradeId) {
    // 거래 완료 로직
  }

  function getTradeGuide() {
    // 거래 가이드 조회 로직
  }

  return {
    trades,
    currentTrade,
    tradeStatus,
    getTrades,
    createTrade,
    updateTradeStatus,
    cancelTrade,
    completeTrade,
    getTradeGuide,
  }
})
