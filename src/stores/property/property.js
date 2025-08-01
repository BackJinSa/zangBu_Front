import { ref } from 'vue'
import { defineStore } from 'pinia'
import {
  getFilteredPropertyList,
  getPropertyDetail,
  registerProperty,
  deleteProperty as deletePropertyApi,
  bookmarkProperty as bookmarkPropertyApi,
  cancelBookmarkProperty as cancelBookmarkPropertyApi,
} from '@/api/property/property'

export const usePropertyStore = defineStore('property', () => {
  // 매물 목록
  const properties = ref([])
  // 현재 선택된 매물 상세 정보
  const currentProperty = ref(null)
  // 매물 검색 필터
  const propertyFilters = ref({})
  // 로딩 상태
  const loading = ref(false)
  // 에러 상태
  const error = ref(null)

  // 필터링된 매물 목록 조회
  async function fetchProperties(params) {
    loading.value = true
    error.value = null
    try {
      const res = await getFilteredPropertyList(params)
      properties.value = res.data
    } catch (err) {
      error.value = err
    } finally {
      loading.value = false
    }
  }

  // 매물 상세 정보 조회
  async function fetchPropertyDetail(params) {
    loading.value = true
    error.value = null
    try {
      const res = await getPropertyDetail(params)
      currentProperty.value = res.data
    } catch (err) {
      error.value = err
    } finally {
      loading.value = false
    }
  }

  // 신규 매물 등록
  async function createProperty(data) {
    loading.value = true
    error.value = null
    try {
      await registerProperty(data)
    } catch (err) {
      error.value = err
    } finally {
      loading.value = false
    }
  }

  // 매물 삭제
  async function removeProperty(buildingId) {
    loading.value = true
    error.value = null
    try {
      await deletePropertyApi(buildingId)
    } catch (err) {
      error.value = err
    } finally {
      loading.value = false
    }
  }

  // 매물 찜하기
  async function bookmarkProperty(data) {
    loading.value = true
    error.value = null
    try {
      await bookmarkPropertyApi(data)
    } catch (err) {
      error.value = err
    } finally {
      loading.value = false
    }
  }

  // 매물 찜하기 취소
  async function cancelBookmark(buildingId) {
    loading.value = true
    error.value = null
    try {
      await cancelBookmarkPropertyApi(buildingId)
    } catch (err) {
      error.value = err
    } finally {
      loading.value = false
    }
  }

  // 검색 필터 설정
  function setFilters(filters) {
    propertyFilters.value = filters
  }

  return {
    properties,
    currentProperty,
    propertyFilters,
    loading,
    error,
    fetchProperties,
    fetchPropertyDetail,
    createProperty,
    removeProperty,
    bookmarkProperty,
    cancelBookmark,
    setFilters,
  }
})
