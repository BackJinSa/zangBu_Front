import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getReviewsByBuilding, getReviewDetail, getBuildingInfo } from '@/api/review/review'

export const useReviewStore = defineStore('review', () => {
  const reviews = ref([])
  const currentReview = ref(null)
  const reviewStats = ref({})
  const pagination = ref({
    total: 0,
    hasNext: false,
    currentPage: 1,
    pageSize: 5
  })
  const loading = ref(false)
  const buildingInfo = ref(null)

  // 건물 정보 조회
  async function getBuildingInfoById(buildingId) {
    try {
      loading.value = true
      const response = await getBuildingInfo(buildingId)

      if (response.data) {
        buildingInfo.value = response.data
      }
    } catch (error) {
      console.error('건물 정보 조회 실패:', error)
      // 에러 시 기본값 설정
      buildingInfo.value = {
        buildingName: '알 수 없는 건물',
        address: '주소 정보 없음'
      }
    } finally {
      loading.value = false
    }
  }

  // 특정 건물의 리뷰 목록 조회
  async function getReviewsByBuildingId(buildingId, page = 1, size = 5) {
    try {
      loading.value = true
      const response = await getReviewsByBuilding(buildingId, page, size)

      if (response.data) {
        reviews.value = response.data.reviews || []
        pagination.value = {
          total: response.data.total || 0,
          hasNext: response.data.hasNext || false,
          currentPage: page,
          pageSize: size
        }
        // 최신 리뷰 별점 정보 저장
        if (response.data.latestReviewRank) {
          reviewStats.value.latestReviewRank = response.data.latestReviewRank
        }
      }
    } catch (error) {
      console.error('리뷰 목록 조회 실패:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  // 리뷰 상세 조회
  async function getReviewDetailById(reviewId) {
    try {
      loading.value = true
      const response = await getReviewDetail(reviewId)

      if (response.data) {
        currentReview.value = response.data
      }
    } catch (error) {
      console.error('리뷰 상세 조회 실패:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  // 페이지 변경
  function changePage(page, buildingId) {
    return getReviewsByBuildingId(buildingId, page, pagination.value.pageSize)
  }

  // 건물 정보 설정
  function setBuildingInfo(info) {
    buildingInfo.value = info
  }

  // 리뷰 선택
  function selectReview(reviewId) {
    return getReviewDetailById(reviewId)
  }

  function getReviews() {
    // 리뷰 목록 조회 로직 (기존)
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
    pagination,
    loading,
    buildingInfo,
    getBuildingInfoById,
    getReviewsByBuildingId,
    getReviewDetailById,
    changePage,
    setBuildingInfo,
    selectReview,
    getReviews,
    getReviewDetail,
    createReview,
    updateReview,
    deleteReview,
    getReviewStats,
  }
})
