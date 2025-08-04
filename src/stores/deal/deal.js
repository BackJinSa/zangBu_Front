import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useDealStore = defineStore('deal', () => {
  const deals = ref([])
  const currentDeal = ref(null)
  const dealStatus = ref('waiting')

  // 거래 목록 조회
  function getDeals() {
    // API 호출 로직
  }

  // 거래 생성
  function createDeal(dealData) {
    // API 호출 로직
  }

  // 거래 상태 업데이트
  function updateDealStatus(dealId, status) {
    // API 호출 로직
  }

  // 거래 취소
  function cancelDeal(dealId) {
    // API 호출 로직
  }

  // 거래 완료
  function completeDeal(dealId) {
    // API 호출 로직
  }

  // 거래 가이드 조회
  function getDealGuide() {
    // API 호출 로직
  }

  return {
    deals,
    currentDeal,
    dealStatus,
    getDeals,
    createDeal,
    updateDealStatus,
    cancelDeal,
    completeDeal,
    getDealGuide,
  }
})
