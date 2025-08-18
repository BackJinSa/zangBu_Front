import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from '@/api/axios'

export const useMainStore = defineStore('main', () => {
  // 상태
  const nickName = ref('')
  const topReviewed = ref([])
  const topLiked = ref([])
  const newRooms = ref([])
  const loading = ref(false)
  const error = ref(null)

  // 액션
  const fetchMainData = async () => {
    loading.value = true
    error.value = null

    try {
      const response = await axios.get('/main')
      const data = response.data

      nickName.value = data.nickName || ''
      topReviewed.value = data.topReviewed || []
      topLiked.value = data.topLiked || []
      newRooms.value = data.newRooms || []

      return { success: true, data }
    } catch (err) {
      error.value = err
      console.error('Failed to load main data:', err)
      return {
        success: false,
        message: err.response?.data?.message || '메인 데이터 로드에 실패했습니다.',
      }
    } finally {
      loading.value = false
    }
  }

  // 찜하기/찜해제 토글
  const toggleBookmark = async (buildingId) => {
    try {
      console.log('toggleBookmark called with buildingId:', buildingId)
      console.log('topReviewed.value:', topReviewed.value)
      console.log('topLiked.value:', topLiked.value)
      console.log('newRooms.value:', newRooms.value)

      // 현재 상태 확인
      const allProperties = [...topReviewed.value, ...topLiked.value, ...newRooms.value]
      console.log('All properties:', allProperties)
      console.log('Looking for buildingId:', buildingId)

      const property = allProperties.find((p) => {
        console.log('Checking property:', p)
        console.log('Property buildingId:', p.buildingId, 'Type:', typeof p.buildingId)
        console.log('Searching for buildingId:', buildingId, 'Type:', typeof buildingId)
        return p.buildingId == buildingId // == 사용하여 타입 비교 무시
      })

      if (!property) {
        console.error('Property not found with buildingId:', buildingId)
        return false
      }

      const isCurrentlyBookmarked = property.isBookmarked
      console.log('Current bookmark status:', isCurrentlyBookmarked)

      // API 호출 (찜하기/찜해제)
      if (isCurrentlyBookmarked) {
        // 찜해제: DELETE /building/bookmark/{buildingId}
        console.log('Sending DELETE request to remove bookmark')
        await axios.delete(`/building/bookmark/${buildingId}`)
      } else {
        // 찜하기: POST /building/bookmark
        console.log('Sending POST request to add bookmark')
        await axios.post('/building/bookmark', { buildingId })
      }

      // 로컬 상태 업데이트
      property.isBookmarked = !isCurrentlyBookmarked
      console.log('Local state updated, new bookmark status:', property.isBookmarked)

      return true
    } catch (err) {
      console.error('Failed to toggle bookmark:', err)
      return false
    }
  }

  return {
    // 상태
    nickName,
    topReviewed,
    topLiked,
    newRooms,
    loading,
    error,

    // 액션
    fetchMainData,
    toggleBookmark,
  }
})
