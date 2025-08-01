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
  set: (value) => mapStore.setSearchQuery(value)
})

const loading = computed(() => mapStore.loading)
const filteredProperties = computed(() => mapStore.filteredProperties)

// 카카오 맵 초기화
const initMap = () => {
  if (window.kakao && window.kakao.maps) {
    const container = mapContainer.value
    const options = {
      center: new window.kakao.maps.LatLng(mapStore.mapCenter.lat, mapStore.mapCenter.lng),
      level: mapStore.mapLevel
    }
    
    map.value = new window.kakao.maps.Map(container, options)
  }
}

// 마커 생성 및 표시
const displayMarkers = (mapData) => {
  // 기존 마커 제거
  markers.value.forEach(marker => marker.setMap(null))
  markers.value = []

  mapData.forEach((property) => {
    const position = new window.kakao.maps.LatLng(property.lat, property.lng)
    
    // 마커 생성
    const marker = new window.kakao.maps.Marker({
      position: position,
      map: map.value
    })

    // 인포윈도우 생성
    const infoWindow = new window.kakao.maps.InfoWindow({
      content: `
        <div style="padding: 10px; min-width: 150px;">
          <h4 style="margin: 0 0 5px 0; font-size: 14px; font-weight: bold;">
            ${property.building_name}
          </h4>
          <p style="margin: 0; font-size: 12px; color: #666;">
            ${property.address}
          </p>
          <p style="margin: 5px 0 0 0; font-size: 13px; color: #007bff; font-weight: bold;">
            ${generateRandomPrice()}
          </p>
        </div>
      `
    })

    // 마커 클릭 이벤트
    window.kakao.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(map.value, marker)
    })

    markers.value.push(marker)
  })
}

// 임시 가격 생성 (실제로는 API에서 가져와야 함)
const generateRandomPrice = () => {
  const prices = ['6억', '8.5억', '10억', '12.9억', '9억', '6.5억']
  return prices[Math.floor(Math.random() * prices.length)]
}

// 샘플 매물 데이터
const sampleProperties = [
  { address: "서울특별시 강남구 테헤란로 123", building_name: "삼성빌딩" },
  { address: "서울특별시 마포구 양화로 45", building_name: "홍익타워" },
  { address: "부산광역시 해운대구 센텀중앙로 40", building_name: "센텀타워" },
  { address: "서울특별시 종로구 종로 1", building_name: "종로타워" },
  { address: "서울특별시 영등포구 여의대로 108", building_name: "파크원타워" }
]

// 매물 데이터 로드
const loadProperties = async () => {
  try {
    const mapData = await mapStore.fetchProperties(sampleProperties)
    displayMarkers(mapData)
  } catch (error) {
    alert('매물을 불러오는데 실패했습니다.')
  }
}

// 필터 적용
const applyFilters = () => {
  mapStore.applyFilters()
  displayMarkers(filteredProperties.value)
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

// 필터 초기화
const resetFilters = () => {
  mapStore.resetFilters()
  displayMarkers(filteredProperties.value)
}

// 필터 변경 감지
watch(() => mapStore.filteredProperties, (newProperties) => {
  displayMarkers(newProperties)
}, { deep: true })

onMounted(() => {
  initializeKakaoMap()
})
</script>

<template>
  <div class="map-container">
    <!-- 상단 검색바 -->
    <div class="search-container">
      <div class="search-box">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="지역, 지하철, 아파트명 등으로 검색"
          class="search-input"
          @keyup.enter="handleSearch"
        />
        <button @click="handleSearch" class="search-button">
          🔍
        </button>
      </div>
    </div>

    <div class="main-content">
      <!-- 좌측 필터 사이드바 -->
      <div class="sidebar">
        <!-- 매물 유형 -->
        <div class="filter-section">
          <h3 class="filter-title">매물 유형</h3>
          <div class="filter-options">
            <label class="filter-option">
              <input type="checkbox" v-model="mapStore.filters.propertyTypes.apartment" @change="applyFilters" />
              아파트
            </label>
            <label class="filter-option">
              <input type="checkbox" v-model="mapStore.filters.propertyTypes.officetel" @change="applyFilters" />
              오피스텔
            </label>
            <label class="filter-option">
              <input type="checkbox" v-model="mapStore.filters.propertyTypes.house" @change="applyFilters" />
              주택
            </label>
            <label class="filter-option">
              <input type="checkbox" v-model="mapStore.filters.propertyTypes.villa" @change="applyFilters" />
              빌라
            </label>
          </div>
        </div>

        <!-- 거래 유형 -->
        <div class="filter-section">
          <h3 class="filter-title">거래 유형</h3>
          <div class="filter-options">
            <label class="filter-option">
              <input type="checkbox" v-model="mapStore.filters.transactionTypes.sale" @change="applyFilters" />
              매매
            </label>
            <label class="filter-option">
              <input type="checkbox" v-model="mapStore.filters.transactionTypes.lease" @change="applyFilters" />
              전세
            </label>
            <label class="filter-option">
              <input type="checkbox" v-model="mapStore.filters.transactionTypes.rent" @change="applyFilters" />
              월세
            </label>
          </div>
        </div>

        <!-- 시세 범위 -->
        <div class="filter-section">
          <h3 class="filter-title">시세 범위</h3>
          <div class="price-range">
            <div class="price-inputs">
              <input 
                type="number" 
                v-model="mapStore.filters.priceRange.min" 
                min="0" 
                placeholder="0억"
                class="price-input"
                @change="applyFilters"
              />
              <span>~</span>
              <input 
                type="number" 
                v-model="mapStore.filters.priceRange.max" 
                min="0" 
                placeholder="50억 이상"
                class="price-input"
                @change="applyFilters"
              />
            </div>
          </div>
        </div>

        <!-- 필터 적용 버튼 -->
        <button @click="applyFilters" class="apply-filter-btn">
          필터 적용
        </button>

        <!-- 초기화 버튼 -->
        <button @click="resetFilters" class="reset-filter-btn">
          초기화
        </button>
      </div>

      <!-- 지도 영역 -->
      <div class="map-area">
        <div 
          ref="mapContainer" 
          class="map-canvas"
          :class="{ 'loading': loading }"
        >
          <div v-if="loading" class="loading-overlay">
            <div class="loading-spinner">로딩 중...</div>
          </div>
        </div>
        
        <!-- 우측 컨트롤 버튼들 -->
        <div class="map-controls">
          <button class="control-btn" title="버스/지하철">
            🚌
          </button>
          <button class="control-btn" title="편의시설">
            🏪
          </button>
          <button class="control-btn" title="편의점/마트">
            🛒
          </button>
          <button class="control-btn" title="숨김">
            ❌
          </button>
          <button class="control-btn" title="집 내놓기">
            🏠
          </button>
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

.search-container {
  padding: 16px;
  background: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  z-index: 1000;
}

.search-box {
  display: flex;
  max-width: 600px;
  margin: 0 auto;
}

.search-input {
  flex: 1;
  padding: 12px 16px;
  border: 2px solid #e0e0e0;
  border-radius: 8px 0 0 8px;
  font-size: 16px;
  outline: none;
}

.search-input:focus {
  border-color: #4CAF50;
}

.search-button {
  padding: 12px 20px;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 0 8px 8px 0;
  cursor: pointer;
  font-size: 16px;
}

.search-button:hover {
  background: #45a049;
}

.main-content {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.sidebar {
  width: 280px;
  background: white;
  padding: 20px;
  overflow-y: auto;
  box-shadow: 2px 0 4px rgba(0,0,0,0.1);
}

.filter-section {
  margin-bottom: 24px;
}

.filter-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 12px;
  color: #333;
}

.filter-options {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.filter-option {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 4px 0;
}

.filter-option input[type="checkbox"] {
  width: 16px;
  height: 16px;
  cursor: pointer;
}

.price-range {
  margin-top: 8px;
}

.price-inputs {
  display: flex;
  align-items: center;
  gap: 8px;
}

.price-input {
  flex: 1;
  padding: 8px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 14px;
}

.apply-filter-btn, .reset-filter-btn {
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
  background: #4CAF50;
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
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
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
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: all 0.2s;
}

.control-btn:hover {
  background: #f0f0f0;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.15);
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
  
  .map-area {
    height: 400px;
  }
}
</style>
