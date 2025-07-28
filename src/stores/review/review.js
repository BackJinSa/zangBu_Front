import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useReviewStore = defineStore('review', () => {
  const reviews = ref([])
  const currentReview = ref(null)
  const reviewStats = ref({})

  function getReviews() {
    // 리뷰 목록 조회 로직
  }

  function getReviewDetail(id) {
    // 리뷰 상세 조회 로직
  }

  function createReview(reviewData) {
    // 리뷰 작성 로직
  }

  function updateReview(id, reviewData) {
    // 리뷰 수정 로직
  }

  function deleteReview(id) {
    // 리뷰 삭제 로직
  }

  function getReviewStats() {
    // 리뷰 통계 조회 로직
  }

  return {
    reviews,
    currentReview,
    reviewStats,
    getReviews,
    getReviewDetail,
    createReview,
    updateReview,
    deleteReview,
    getReviewStats,
  }
})
