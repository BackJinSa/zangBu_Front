import { ref } from 'vue'
import { defineStore } from 'pinia'

export const usePropertyStore = defineStore('property', () => {
  const properties = ref([])
  const currentProperty = ref(null)
  const propertyFilters = ref({})

  function getProperties() {
    // 매물 목록 조회 로직
  }

  function getPropertyDetail(id) {
    // 매물 상세 조회 로직
  }

  function registerProperty(propertyData) {
    // 매물 등록 로직
  }

  function updateProperty(id, propertyData) {
    // 매물 수정 로직
  }

  function deleteProperty(id) {
    // 매물 삭제 로직
  }

  function setFilters(filters) {
    propertyFilters.value = filters
  }

  return {
    properties,
    currentProperty,
    propertyFilters,
    getProperties,
    getPropertyDetail,
    registerProperty,
    updateProperty,
    deleteProperty,
    setFilters,
  }
})
