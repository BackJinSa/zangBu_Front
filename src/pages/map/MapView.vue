<!--
  지도 뷰 컴포넌트

  설정 방법:
  1. 카카오 개발자 사이트(https://developers.kakao.com/)에서 앱 등록
  2. 웹 플랫폼 추가 및 사이트 도메인 등록
  3. .env 파일에 VITE_KAKAO_MAP_API_KEY=여러분의_API_키 추가
  4. npm run dev로 개발 서버 재시작

  주요 기능:
  - 매물 위치 지도 표시
  - 필터링 (매물 유형, 거래 유형, 가격 범위)
  - 검색 기능
  - 마커 클릭 시 상세 정보 표시
-->

<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { useMapStore } from '@/stores/map/map.js'

// Store 사용
const mapStore = useMapStore()

// 지도 관련
const mapContainer = ref(null)
const map = ref(null)
const markers = ref([])

// Computed
const searchQuery = computed({
  get: () => mapStore.filters.searchQuery,
  set: (value) => mapStore.setSearchQuery(value),
})

const loading = computed(() => mapStore.loading)
const filteredProperties = computed(() => mapStore.filteredProperties)

// 카카오 맵 초기화
const initMap = () => {
  if (window.kakao && window.kakao.maps) {
    const container = mapContainer.value
    const options = {
      center: new window.kakao.maps.LatLng(mapStore.mapCenter.lat, mapStore.mapCenter.lng),
      level: mapStore.mapLevel,
    }

    map.value = new window.kakao.maps.Map(container, options)
  }
}

// 마커 생성 및 표시
const displayMarkers = (mapData) => {
  // 기존 마커 제거
  markers.value.forEach((marker) => marker.setMap(null))
  markers.value = []

  mapData.forEach((property) => {
    const position = new window.kakao.maps.LatLng(property.lat, property.lng)

    // 마커 생성
    const marker = new window.kakao.maps.Marker({
      position: position,
      map: map.value,
    })

    // 인포윈도우 생성
    const infoWindow = new window.kakao.maps.InfoWindow({
      content: `
        <div style="padding: 10px; min-width: 200px; position: relative;">
          <button
            id="closeBtn_${property.building_name.replace(/\s+/g, '_')}"
            style="
              position: absolute;
              top: 5px;
              right: 5px;
              background: none;
              border: none;
              font-size: 16px;
              cursor: pointer;
              color: #999;
              padding: 2px 6px;
              border-radius: 3px;
              line-height: 1;
              z-index: 1000;
            "
            title="닫기"
          >
            ×
          </button>
          <h4 style="margin: 0 0 5px 0; font-size: 14px; font-weight: bold; padding-right: 20px;">
            ${property.building_name}
          </h4>
          <p style="margin: 0; font-size: 12px; color: #666;">
            ${property.address}
          </p>
          <p style="margin: 3px 0; font-size: 11px; color: #888;">
            ${property.propertyType} | ${property.saleType}
          </p>
          <p style="margin: 5px 0 0 0; font-size: 13px; color: #007bff; font-weight: bold;">
            ${generatePropertyInfo(property)}
          </p>
        </div>
      `,
    })

    // 마커 클릭 이벤트
    window.kakao.maps.event.addListener(marker, 'click', () => {
      // 다른 인포윈도우들 닫기
      markers.value.forEach((otherMarker) => {
        if (otherMarker.infoWindow && otherMarker.infoWindow !== infoWindow) {
          otherMarker.infoWindow.close()
        }
      })

      infoWindow.open(map.value, marker)

      // 닫기 버튼 이벤트 리스너 추가
      setTimeout(() => {
        const closeBtn = document.getElementById(
          `closeBtn_${property.building_name.replace(/\s+/g, '_')}`
        )
        if (closeBtn) {
          // 이벤트 리스너 제거 후 다시 추가
          const newCloseBtn = closeBtn.cloneNode(true)
          closeBtn.parentNode.replaceChild(newCloseBtn, closeBtn)

          newCloseBtn.addEventListener('click', (e) => {
            e.preventDefault()
            e.stopPropagation()
            infoWindow.close()
          })

          // 호버 효과 추가
          newCloseBtn.addEventListener('mouseover', () => {
            newCloseBtn.style.color = '#666'
            newCloseBtn.style.backgroundColor = '#f0f0f0'
          })

          newCloseBtn.addEventListener('mouseout', () => {
            newCloseBtn.style.color = '#999'
            newCloseBtn.style.backgroundColor = 'transparent'
          })
        }
      }, 100)
    })

    // 인포윈도우를 마커에 저장
    marker.infoWindow = infoWindow
    markers.value.push(marker)
  })
}

// 매물 정보 표시용 가격 생성
const generatePropertyInfo = (property) => {
  if (property.saleType === '매매') {
    return `${(property.price / 100000000).toFixed(1)}억`
  } else if (property.saleType === '전세') {
    return `전세 ${(property.deposit / 100000000).toFixed(1)}억`
  } else if (property.saleType === '월세') {
    return `월세 ${(property.price / 10000).toFixed(0)}만/${(property.deposit / 100000000).toFixed(
      1
    )}억`
  }
  return '가격 정보 없음'
}

// 샘플 매물 데이터 (필터링 테스트용)
const sampleProperties = [
  // 매매 매물들
  {
    address: '서울특별시 강남구 테헤란로 123',
    building_name: '래미안파크 스위트',
    saleType: '매매',
    propertyType: '아파트',
    price: 1500000000,
    deposit: 0,
  },
  {
    address: '서울특별시 마포구 양화로 45',
    building_name: '홍익타워',
    saleType: '매매',
    propertyType: '오피스텔',
    price: 800000000,
    deposit: 0,
  },
  {
    address: '서울특별시 종로구 종로 1',
    building_name: '종로타워',
    saleType: '매매',
    propertyType: '아파트',
    price: 1200000000,
    deposit: 0,
  },

  // 전세 매물들
  {
    address: '서울특별시 영등포구 여의대로 108',
    building_name: '파크원타워',
    saleType: '전세',
    propertyType: '아파트',
    price: 0,
    deposit: 500000000,
  },
  {
    address: '서울특별시 광진구 구의동',
    building_name: '구의건내2 아파트',
    saleType: '전세',
    propertyType: '아파트',
    price: 0,
    deposit: 300000000,
  },
  {
    address: '서울특별시 강남구 역삼동',
    building_name: '역삼동 아파트',
    saleType: '전세',
    propertyType: '아파트',
    price: 0,
    deposit: 400000000,
  },

  // 월세 매물들
  {
    address: '서울특별시 서초구 서초동',
    building_name: '서초동 빌라',
    saleType: '월세',
    propertyType: '빌라',
    price: 50000000,
    deposit: 10000000,
  },
  {
    address: '서울특별시 마포구 합정동',
    building_name: '합정동 오피스텔',
    saleType: '월세',
    propertyType: '오피스텔',
    price: 80000000,
    deposit: 5000000,
  },
  {
    address: '서울특별시 강남구 청담동',
    building_name: '청담동 주택',
    saleType: '월세',
    propertyType: '주택',
    price: 120000000,
    deposit: 20000000,
  },

  // 추가 매물들 (다양한 조합)
  {
    address: '서울특별시 송파구 잠실동',
    building_name: '잠실 아파트',
    saleType: '매매',
    propertyType: '아파트',
    price: 2000000000,
    deposit: 0,
  },
  {
    address: '서울특별시 성동구 성수동',
    building_name: '성수동 오피스텔',
    saleType: '전세',
    propertyType: '오피스텔',
    price: 0,
    deposit: 200000000,
  },
  {
    address: '서울특별시 용산구 이태원동',
    building_name: '이태원 빌라',
    saleType: '월세',
    propertyType: '빌라',
    price: 30000000,
    deposit: 15000000,
  },
]

// 매물 데이터 로드
const loadProperties = async () => {
  try {
    // 초기 로드 시에는 필터링 없이 전체 매물 표시
    const mapData = await mapStore.fetchProperties(sampleProperties)
    displayMarkers(mapData)

    // 필터링된 매물도 초기화
    mapStore.filteredProperties = mapData
  } catch (error) {
    alert('매물을 불러오는데 실패했습니다.')
  }
}

// 필터 적용 (새로운 API 사용)
const applyFilters = async () => {
  try {
    await mapStore.fetchFilteredProperties()
    displayMarkers(filteredProperties.value)
  } catch (error) {
    console.error('필터 적용 실패:', error)
    alert('필터를 적용하는데 실패했습니다.')
  }
}

// 초기화 함수
const initializeKakaoMap = () => {
  if (window.kakao && window.kakao.maps) {
    window.kakao.maps.load(() => {
      initMap()
      loadProperties()
    })
  } else {
    // 카카오 맵 스크립트 로드 (환경변수에서 API 키를 가져옵니다)
    const KAKAO_API_KEY = import.meta.env.VITE_KAKAO_MAP_API_KEY || 'YOUR_APP_KEY'
    const script = document.createElement('script')
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_API_KEY}&autoload=false`
    script.onload = () => {
      window.kakao.maps.load(() => {
        initMap()
        loadProperties()
      })
    }
    document.head.appendChild(script)
  }
}

// 검색 함수
const handleSearch = () => {
  if (searchQuery.value.trim()) {
    console.log('검색어:', searchQuery.value)
    mapStore.setSearchQuery(searchQuery.value)
  }
}

// 매물 유형 토글
const togglePropertyType = (type) => {
  mapStore.filters.propertyTypes[type] = !mapStore.filters.propertyTypes[type]
}

// 거래 유형 토글
const toggleTransactionType = (type) => {
  mapStore.filters.transactionTypes[type] = !mapStore.filters.transactionTypes[type]
}

// 가격 범위 검증 및 조정
const validatePriceRange = () => {
  const min = mapStore.filters.priceRange.min
  const max = mapStore.filters.priceRange.max

  // 최소값이 최대값보다 클 경우 조정
  if (min > max) {
    mapStore.filters.priceRange.max = min
  }

  // 범위 제한 (0-50)
  if (min < 0) mapStore.filters.priceRange.min = 0
  if (min > 50) mapStore.filters.priceRange.min = 50
  if (max < 0) mapStore.filters.priceRange.max = 0
  if (max > 50) mapStore.filters.priceRange.max = 50
}

// 최소 가격 감소
const decreaseMinPrice = () => {
  if (mapStore.filters.priceRange.min > 0) {
    mapStore.filters.priceRange.min--
    validatePriceRange()
  }
}

// 최소 가격 증가
const increaseMinPrice = () => {
  if (mapStore.filters.priceRange.min < mapStore.filters.priceRange.max) {
    mapStore.filters.priceRange.min++
    validatePriceRange()
  }
}

// 최대 가격 감소
const decreaseMaxPrice = () => {
  if (mapStore.filters.priceRange.max > mapStore.filters.priceRange.min) {
    mapStore.filters.priceRange.max--
    validatePriceRange()
  }
}

// 최대 가격 증가
const increaseMaxPrice = () => {
  if (mapStore.filters.priceRange.max < 50) {
    mapStore.filters.priceRange.max++
    validatePriceRange()
  }
}

// 필터 초기화
const resetFilters = async () => {
  try {
    await mapStore.resetFilters()
    displayMarkers(filteredProperties.value)
  } catch (error) {
    console.error('필터 초기화 실패:', error)
    alert('필터를 초기화하는데 실패했습니다.')
  }
}

// 필터 변경 감지
watch(
  () => mapStore.filteredProperties,
  (newProperties) => {
    displayMarkers(newProperties)
  },
  { deep: true }
)

onMounted(() => {
  initializeKakaoMap()
})
</script>

<template>
  <div class="map-container">
    <div class="main-content">
      <!-- 좌측 필터 사이드바 -->
      <div class="sidebar">
        <!-- 검색바 (사이드바 상단으로 이동) -->
        <div class="search-section">
          <div class="search-box">
            <span class="search-icon">🔍</span>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="지역, 지하철, 아파트명 등으로 검색"
              class="search-input"
              @keyup.enter="handleSearch"
            />
          </div>
        </div>

        <!-- 매물 유형 -->
        <div class="filter-section">
          <h3 class="filter-title">매물 유형</h3>
          <div class="filter-options">
            <button
              class="filter-button"
              :class="{ active: mapStore.filters.propertyTypes.apartment }"
              @click="togglePropertyType('apartment')"
            >
              아파트
            </button>
            <button
              class="filter-button"
              :class="{ active: mapStore.filters.propertyTypes.officetel }"
              @click="togglePropertyType('officetel')"
            >
              오피스텔
            </button>
            <button
              class="filter-button"
              :class="{ active: mapStore.filters.propertyTypes.house }"
              @click="togglePropertyType('house')"
            >
              주택
            </button>
            <button
              class="filter-button"
              :class="{ active: mapStore.filters.propertyTypes.villa }"
              @click="togglePropertyType('villa')"
            >
              빌라
            </button>
          </div>
        </div>

        <!-- 거래 유형 -->
        <div class="filter-section">
          <h3 class="filter-title">거래 유형</h3>
          <div class="filter-options">
            <button
              class="filter-button"
              :class="{ active: mapStore.filters.transactionTypes.sale }"
              @click="toggleTransactionType('sale')"
            >
              매매
            </button>
            <button
              class="filter-button"
              :class="{ active: mapStore.filters.transactionTypes.lease }"
              @click="toggleTransactionType('lease')"
            >
              전세
            </button>
            <button
              class="filter-button"
              :class="{ active: mapStore.filters.transactionTypes.rent }"
              @click="toggleTransactionType('rent')"
            >
              월세
            </button>
          </div>
        </div>

        <!-- 시세 범위 -->
        <div class="filter-section">
          <h3 class="filter-title">시세 범위</h3>
          <div class="price-range">
            <div class="price-inputs">
              <!-- 최소값 조작 -->
              <button
                class="price-btn"
                @click="decreaseMinPrice"
                :disabled="mapStore.filters.priceRange.min <= 0"
                title="최소값 감소"
              >
                -
              </button>
              <div class="price-input-container">
                <input
                  type="number"
                  v-model="mapStore.filters.priceRange.min"
                  min="0"
                  max="50"
                  class="price-input"
                  @change="validatePriceRange"
                  @input="validatePriceRange"
                  @wheel.prevent
                  placeholder="0"
                />
                <span class="price-unit">억</span>
              </div>
              <button
                class="price-btn"
                @click="increaseMinPrice"
                :disabled="mapStore.filters.priceRange.min >= mapStore.filters.priceRange.max"
                title="최소값 증가"
              >
                +
              </button>

              <!-- 구분자 -->
              <span class="price-separator">~</span>

              <!-- 최대값 조작 -->
              <button
                class="price-btn"
                @click="decreaseMaxPrice"
                :disabled="mapStore.filters.priceRange.max <= mapStore.filters.priceRange.min"
                title="최대값 감소"
              >
                -
              </button>
              <div class="price-input-container">
                <input
                  type="number"
                  v-model="mapStore.filters.priceRange.max"
                  min="0"
                  max="50"
                  class="price-input"
                  @change="validatePriceRange"
                  @input="validatePriceRange"
                  @wheel.prevent
                  placeholder="50"
                />
                <span class="price-unit">억</span>
              </div>
              <button
                class="price-btn"
                @click="increaseMaxPrice"
                :disabled="mapStore.filters.priceRange.max >= 50"
                title="최대값 증가"
              >
                +
              </button>
            </div>
          </div>
        </div>

        <!-- 필터 적용 버튼 -->
        <button @click="applyFilters" class="apply-filter-btn">필터 적용</button>

        <!-- 초기화 버튼 -->
        <button @click="resetFilters" class="reset-filter-btn">초기화</button>
      </div>

      <!-- 지도 영역 -->
      <div class="map-area">
        <div ref="mapContainer" class="map-canvas" :class="{ loading: loading }">
          <div v-if="loading" class="loading-overlay">
            <div class="loading-spinner">로딩 중...</div>
          </div>
        </div>

        <!-- 우측 컨트롤 버튼들 -->
        <div class="map-controls">
          <button class="control-btn" title="버스/지하철">🚌</button>
          <button class="control-btn" title="병원">🏥</button>
          <button class="control-btn" title="편의점/마트">🛒</button>
          <button class="control-btn" title="숨김">❌</button>
        </div>

        <!-- 우측 하단 집 내놓기 버튼 -->
        <div class="floating-action">
          <button class="floating-btn" title="집 내놓기">🏠</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.map-container {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f5f5f5;
}

.search-section {
  margin-bottom: 20px;
  background: white;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.search-box {
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 12px;
  color: #666;
  font-size: 16px;
  z-index: 1;
}

.search-input {
  width: 100%;
  padding: 12px 12px 12px 40px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 14px;
  outline: none;
  background: #f9f9f9;
}

.search-input:focus {
  border-color: #4caf50;
  background: white;
}

.main-content {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.sidebar {
  width: 420px;
  background: #f8f9fa;
  padding: 20px;
  overflow-y: auto;
  box-shadow: 2px 0 4px rgba(0, 0, 0, 0.1);
}

.filter-section {
  margin-bottom: 24px;
  background: white;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.filter-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 12px;
  color: #2e7d32;
}

.filter-options {
  display: flex;
  flex-wrap: nowrap;
  gap: 8px;
  justify-content: space-between;
}

.filter-button {
  padding: 8px 12px;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  background: white;
  color: #666;
  cursor: pointer;
  font-size: 13px;
  transition: all 0.2s;
  min-width: 70px;
  text-align: center;
  flex: 1;
}

.filter-button:hover {
  border-color: #4caf50;
  color: #4caf50;
}

.filter-button.active {
  background: #4caf50;
  color: white;
  border-color: #4caf50;
}

.price-range {
  margin-top: 8px;
  width: 100%;
}

.price-inputs {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: nowrap;
  justify-content: space-between;
  width: 100%;
}

.price-btn {
  width: 30px;
  height: 30px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  background: #f5f5f5;
  color: #666;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  flex-shrink: 0;
}

.price-btn:hover:not(:disabled) {
  border-color: #4caf50;
  color: #4caf50;
  background: #e8f5e8;
}

.price-btn:disabled {
  background: #f0f0f0;
  color: #ccc;
  cursor: not-allowed;
  border-color: #e0e0e0;
}

.price-input-container {
  position: relative;
  display: flex;
  align-items: center;
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  flex-shrink: 0;
  padding: 0 2px;
}

.price-input {
  width: 40px;
  padding: 4px 6px;
  border: none;
  border-radius: 4px;
  font-size: 13px;
  text-align: center;
  background: transparent;
  outline: none;
  /* Remove spinner arrows */
  -webkit-appearance: none;
  -moz-appearance: textfield;
  appearance: none;
}

/* Remove spinner arrows for all browsers */
.price-input::-webkit-outer-spin-button,
.price-input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.price-input[type='number'] {
  -moz-appearance: textfield;
}

.price-input:focus {
  outline: none;
}

.price-input-container:focus-within {
  border-color: #4caf50;
  box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.2);
}

.price-unit {
  font-size: 13px;
  color: #666;
  margin: 0 2px;
  flex-shrink: 0;
}

.price-separator {
  font-size: 13px;
  color: #666;
  margin: 0 4px;
  flex-shrink: 0;
}

.apply-filter-btn,
.reset-filter-btn {
  width: 100%;
  padding: 12px;
  margin-bottom: 8px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.apply-filter-btn {
  background: #4caf50;
  color: white;
}

.apply-filter-btn:hover {
  background: #45a049;
}

.reset-filter-btn {
  background: #f0f0f0;
  color: #666;
}

.reset-filter-btn:hover {
  background: #e0e0e0;
}

.map-area {
  flex: 1;
  position: relative;
}

.map-canvas {
  width: 100%;
  height: 100%;
  position: relative;
}

.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.loading-spinner {
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.map-controls {
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  z-index: 1000;
}

.control-btn {
  width: 48px;
  height: 48px;
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  cursor: pointer;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.2s;
}

.control-btn:hover {
  background: #f0f0f0;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.floating-action {
  position: absolute;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
}

.floating-btn {
  width: 56px;
  height: 56px;
  background: #4caf50;
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  transition: all 0.2s;
}

.floating-btn:hover {
  background: #45a049;
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);
}

@media (max-width: 768px) {
  .main-content {
    flex-direction: column;
  }

  .sidebar {
    width: 100%;
    height: auto;
    max-height: 300px;
  }

  .filter-options {
    flex-wrap: wrap;
    justify-content: flex-start;
  }

  .filter-button {
    flex: none;
    min-width: 80px;
  }

  .map-area {
    height: 400px;
  }
}

@media (max-width: 1200px) {
  .sidebar {
    width: 380px;
  }
}
</style>
