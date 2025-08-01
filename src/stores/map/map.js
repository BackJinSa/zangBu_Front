import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'
import { getMapList, getSingleMapLocation } from '@/api/map/map.js'

export const useMapStore = defineStore('map', () => {
  // 상태
  const properties = ref([])
  const filteredProperties = ref([])
  const loading = ref(false)
  const error = ref(null)
  
  // 필터 상태
  const filters = reactive({
    propertyTypes: {
      apartment: false,
      officetel: false,
      house: false,
      villa: false
    },
    transactionTypes: {
      sale: false,
      lease: false,
      rent: false
    },
    priceRange: {
      min: 0,
      max: 50
    },
    searchQuery: ''
  })

  // 지도 상태
  const mapCenter = ref({
    lat: 37.5665,
    lng: 126.9780
  })
  
  const mapLevel = ref(8)

  // 액션
  const fetchProperties = async (propertyList) => {
    try {
      loading.value = true
      error.value = null
      
      const response = await getMapList(propertyList)
      properties.value = response
      filteredProperties.value = response
      
      return response
    } catch (err) {
      error.value = err.message || '매물을 불러오는데 실패했습니다.'
      console.error('매물 데이터 로드 실패:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const fetchSingleProperty = async (address, buildingName) => {
    try {
      loading.value = true
      error.value = null
      
      const response = await getSingleMapLocation(address, buildingName)
      return response
    } catch (err) {
      error.value = err.message || '매물 좌표를 불러오는데 실패했습니다.'
      console.error('매물 좌표 로드 실패:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // 필터 적용
  const applyFilters = () => {
    let filtered = [...properties.value]

    // 검색어 필터
    if (filters.searchQuery.trim()) {
      filtered = filtered.filter(property => 
        property.address.includes(filters.searchQuery) ||
        property.building_name.includes(filters.searchQuery)
      )
    }

    // 매물 유형 필터 (체크된 것이 있을 때만 적용)
    const selectedPropertyTypes = Object.entries(filters.propertyTypes)
      .filter(([_, checked]) => checked)
      .map(([type, _]) => type)
    
    if (selectedPropertyTypes.length > 0) {
      // 실제로는 API에서 매물 유형 정보를 받아와야 함
      // 여기서는 샘플 로직
      filtered = filtered.filter(property => {
        // 임시로 건물명에 따라 유형 판단
        if (selectedPropertyTypes.includes('apartment') && 
            (property.building_name.includes('아파트') || property.building_name.includes('APT'))) {
          return true
        }
        if (selectedPropertyTypes.includes('officetel') && 
            property.building_name.includes('오피스텔')) {
          return true
        }
        if (selectedPropertyTypes.includes('house') && 
            property.building_name.includes('주택')) {
          return true
        }
        if (selectedPropertyTypes.includes('villa') && 
            property.building_name.includes('빌라')) {
          return true
        }
        return selectedPropertyTypes.length === 0
      })
    }

    // 거래 유형 필터
    const selectedTransactionTypes = Object.entries(filters.transactionTypes)
      .filter(([_, checked]) => checked)
      .map(([type, _]) => type)
    
    if (selectedTransactionTypes.length > 0) {
      // 실제로는 API에서 거래 유형 정보를 받아와야 함
      // 임시 로직으로 모든 매물 표시
    }

    // 가격 범위 필터
    if (filters.priceRange.min > 0 || filters.priceRange.max < 50) {
      // 실제로는 API에서 가격 정보를 받아와야 함
      // 임시 로직으로 모든 매물 표시
    }

    filteredProperties.value = filtered
  }

  // 필터 초기화
  const resetFilters = () => {
    filters.propertyTypes.apartment = false
    filters.propertyTypes.officetel = false
    filters.propertyTypes.house = false
    filters.propertyTypes.villa = false
    
    filters.transactionTypes.sale = false
    filters.transactionTypes.lease = false
    filters.transactionTypes.rent = false
    
    filters.priceRange.min = 0
    filters.priceRange.max = 50
    filters.searchQuery = ''
    
    filteredProperties.value = [...properties.value]
  }

  // 지도 중심 변경
  const setMapCenter = (lat, lng) => {
    mapCenter.value = { lat, lng }
  }

  // 지도 레벨 변경
  const setMapLevel = (level) => {
    mapLevel.value = level
  }

  // 검색어 설정
  const setSearchQuery = (query) => {
    filters.searchQuery = query
    applyFilters()
  }

  return {
    // 상태
    properties,
    filteredProperties,
    loading,
    error,
    filters,
    mapCenter,
    mapLevel,
    
    // 액션
    fetchProperties,
    fetchSingleProperty,
    applyFilters,
    resetFilters,
    setMapCenter,
    setMapLevel,
    setSearchQuery
  }
})