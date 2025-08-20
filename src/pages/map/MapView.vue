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

<!-- 리뷰 이동 기능 참고하기
router.push()를 사용하여 Vue Router로 페이지 이동
selectedProperty.value가 존재할 때만 리뷰 페이지로 이동
-->

<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { useMapStore } from '@/stores/map/map.js'
import { useRouter, useRoute } from 'vue-router'
import {
  getPropertyDetailById,
  bookmarkProperty,
  cancelBookmarkProperty,
  setPropertyNotification,
  cancelPropertyNotification,
} from '@/api/property/property.js'
import {
  getAptTrades,
  getCompleteAptInfo,
  getPropertyInfoByBuildingId,
  getAptTradeInfo,
} from '@/api/publicdata/publicdata.js'
import { useMembership } from '@/composables/useMembership'
import { useChatStore } from '@/stores/chat/chat'

// Props 정의
const props = defineProps({
  buildingId: {
    type: String,
    default: null,
  },
})

// Store 사용
const mapStore = useMapStore()
const router = useRouter()
const route = useRoute()
const chatStore = useChatStore()

// 상세 보기 상태
const showDetail = ref(false)
const selectedProperty = ref(null)

// 지도 관련
const mapContainer = ref(null)
const map = ref(null)
const markers = ref([])

// Computed
const searchQuery = computed({
  get: () => mapStore.filters.searchQuery,
  set: (value) => mapStore.setSearchQuery(value),
})

const filteredProperties = computed(() => mapStore.filteredProperties)

const facilityList = computed(() => {
  const facilityString = selectedProperty.value?.resFacility || '엘리베이터, 주차장'
  return facilityString
    .split(',')
    .map((item) => item.trim())
    .filter((item) => item)
})

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

// 주소-좌표 변환 객체
let geocoder = null

// 마커 생성 및 표시 (주소 기반)
const displayMarkersFromAddresses = (properties) => {
  if (!window.kakao || !map.value) return
  if (!geocoder) {
    geocoder = new window.kakao.maps.services.Geocoder()
  }

  // 기존 마커 제거
  markers.value.forEach((marker) => marker.setMap(null))
  markers.value = []

  properties.forEach((property) => {
    geocoder.addressSearch(property.address, (result, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x)

        // 마커 생성
        const marker = new window.kakao.maps.Marker({
          position: coords,
          map: map.value,
        })

        // 마커에 클릭 이벤트를 등록합니다
        window.kakao.maps.event.addListener(marker, 'click', () => {
          showPropertyDetail(property)
        })

        markers.value.push(marker)
      } else {
        console.warn(`주소 변환 실패: ${property.address}`)
      }
    })
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

// 가격 포맷팅 함수 (실거래가용)
const formatPrice = (price) => {
  if (!price) return '정보 없음'

  // "50000" -> "5억" 또는 "5000" -> "5000만원"
  const numPrice = parseInt(price)
  if (numPrice >= 10000) {
    return `${Math.floor(numPrice / 10000)}억 ${numPrice % 10000}만원`
  } else {
    return `${numPrice}만원`
  }
}

// 🆕 실제 공공데이터를 사용하여 매물 정보를 가져오는 함수
const loadPropertyWithPublicData = async (buildingId) => {
  try {
    console.log('🏠 매물 ID로 공공데이터 조회 중...', buildingId)

    // 1. 매물 기본 정보 조회
    const propertyInfo = await getPropertyInfoByBuildingId(buildingId)

    if (propertyInfo.success) {
      console.log('✅ 공공데이터 조회 성공:', propertyInfo)

      // 2. 공공데이터로 매물 정보 업데이트
      const updatedProperty = {
        buildingId: buildingId,
        address: propertyInfo.address || '주소 정보 없음',
        buildingName: propertyInfo.complexName || '건물명 정보 없음',
        saleType: '정보 없음', // 공공데이터에서 제공하지 않는 정보
        propertyType: '아파트', // 기본값
        price: 0, // 공공데이터에서 제공하지 않는 정보
        deposit: 0,
        isBookmarked: false,
        isNotification: false,

        // 🆕 공공데이터에서 가져온 정보들
        publicData: {
          area: propertyInfo.areaDisplay || '84.5m²', // 면적
          floorInfo: propertyInfo.floorInfo || '지하 3층 ~ 지상 25층', // 층수
          detailedAddress: propertyInfo.detailedAddress || '101동 1001호', // 상세주소
          heatingType: propertyInfo.heatingType || '지역난방', // 난방
          completionDate: propertyInfo.completionDate || '2019년 12월', // 준공일자
          unitCount: propertyInfo.unitCount || '1200세대', // 세대수
          complexPk: propertyInfo.complexPk, // 단지 고유번호
          dongName: propertyInfo.dongName, // 동명
        },
      }

      return updatedProperty
    } else {
      console.error('❌ 공공데이터 조회 실패:', propertyInfo.message)
      return null
    }
  } catch (error) {
    console.error('❌ 공공데이터 조회 중 오류:', error)
    return null
  }
}

// 매물 데이터 로드
const loadProperties = async () => {
  try {
    const propertiesFromApi = await mapStore.fetchProperties()
    displayMarkersFromAddresses(propertiesFromApi)
    mapStore.properties = propertiesFromApi
  } catch (error) {
    alert('매물을 불러오는데 실패했습니다.')
  }
}

// 필터 적용 (새로운 API 사용)
const applyFilters = async () => {
  try {
    await mapStore.fetchFilteredProperties()
    displayMarkersFromAddresses(filteredProperties.value)
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
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_API_KEY}&autoload=false&libraries=services`
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
    displayMarkersFromAddresses(filteredProperties.value)
  } catch (error) {
    console.error('필터 초기화 실패:', error)
    alert('필터를 초기화하는데 실패했습니다.')
  }
}

// 집 내놓기 페이지로 이동
const goToUpload = () => {
  router.push('/property/register')
}

// 매물 상세 정보 가져오기
const fetchPropertyDetail = async (buildingId) => {
  try {
    console.log('매물 상세 정보 가져오기 시작:', buildingId)
    const response = await getPropertyDetailById(buildingId)
    console.log('API 응답:', response)

    if (response && response.data) {
      // API 응답에 isBookmarked와 isNotification이 없을 경우 기본값 설정
      const propertyData = {
        ...response.data,
        buildingId: buildingId, // buildingId를 명시적으로 추가
        isBookmarked: response.data.isBookmarked ?? false,
        isNotification: response.data.isNotification ?? false,
      }
      selectedProperty.value = propertyData
      showDetail.value = true

      // 실거래가 정보도 함께 불러오기
      // await fetchRealEstateData(propertyData)
    } else {
      console.warn('매물 데이터가 없습니다.')
      // API에서 데이터가 없을 때 사용자에게 알림
      selectedProperty.value = {
        buildingName: `매물 ID: ${buildingId}`,
        address: '주소 정보 없음',
        saleType: '정보 없음',
        propertyType: '정보 없음',
        price: 0,
        deposit: 0,
        isBookmarked: false,
        isNotification: false,
        error: 'API에서 매물 정보를 찾을 수 없습니다.',
      }
      showDetail.value = true
    }
  } catch (error) {
    console.error('매물 상세 정보 가져오기 실패:', error)

    // API 호출 실패 시 에러 상태 표시
    selectedProperty.value = {
      buildingName: `매물 ID: ${buildingId}`,
      address: '주소 정보 없음',
      saleType: '정보 없음',
      propertyType: '정보 없음',
      price: 0,
      deposit: 0,
      isBookmarked: false,
      isNotification: false,
      error: `API 호출 실패: ${error.message}`,
    }
    showDetail.value = true
  }
}

// 실거래가 정보 가져오기
const fetchRealEstateData = async (propertyData) => {
  try {
    if (!propertyData.address) {
      console.log('주소 정보가 없어 실거래가를 조회할 수 없습니다.')
      return
    }

    // 주소에서 시군구 정보 추출 (예: "서울특별시 강남구" → "서울특별시 강남구")
    const addressParts = propertyData.address.split(' ')
    if (addressParts.length >= 2) {
      const locataddNm = `${addressParts[0]} ${addressParts[1]}`
      const currentDate = new Date()
      const dealYmd = `${currentDate.getFullYear()}${String(currentDate.getMonth() + 1).padStart(
        2,
        '0'
      )}`

      console.log('실거래가 조회:', { locataddNm, dealYmd })

      const realEstateResponse = await getAptTrades(locataddNm, dealYmd, 1, 10)
      console.log('실거래가 응답:', realEstateResponse)

      // 실거래가 정보를 selectedProperty에 추가
      if (realEstateResponse && realEstateResponse.data) {
        selectedProperty.value.realEstateData = realEstateResponse.data
      }
    }
  } catch (error) {
    console.error('실거래가 정보 가져오기 실패:', error)
    // 실거래가 조회 실패는 매물 상세 정보 표시에 영향을 주지 않도록 함
  }
}

// 매물 상세 보기 표시
const showPropertyDetail = (property) => {
  try {
    // isBookmarked와 isNotification 속성이 없을 경우 기본값 설정
    const propertyData = {
      ...property,
      isBookmarked: property.isBookmarked ?? false,
      isNotification: property.isNotification ?? false,
    }
    selectedProperty.value = propertyData
    showDetail.value = true
    // URL 업데이트 - buildingId 사용
    const buildingId = property.buildingId
    if (buildingId) {
      router.push(`/map/apt/${buildingId}`)
    } else {
      console.warn('매물에 대한 buildingId를 찾을 수 없습니다:', property.buildingName)
    }
  } catch (error) {
    console.error('매물 상세 보기 표시 실패:', error)
  }
}

// 상세 보기 닫기
const closePropertyDetail = () => {
  try {
    showDetail.value = false
    selectedProperty.value = null
    // URL을 기본 맵 페이지로 변경
    router.push('/map')
  } catch (error) {
    console.error('상세 보기 닫기 실패:', error)
  }
}

// 찜하기 토글
const toggleBookmark = async () => {
  if (!selectedProperty.value) return

  try {
    const buildingId = selectedProperty.value.buildingId

    if (selectedProperty.value.isBookmarked) {
      // 찜하기 취소
      await cancelBookmarkProperty(buildingId)
      selectedProperty.value.isBookmarked = false
    } else {
      // 찜하기 추가
      await bookmarkProperty({ buildingId })
      selectedProperty.value.isBookmarked = true
    }
  } catch (error) {
    console.error('찜하기 토글 실패:', error)
  }
}

// 알림 토글
const toggleNotification = async () => {
  if (!selectedProperty.value) return

  try {
    const buildingId = selectedProperty.value.buildingId

    if (selectedProperty.value.isNotification) {
      // 알림 해제
      await cancelPropertyNotification(buildingId)
      selectedProperty.value.isNotification = false
    } else {
      // 알림 설정
      await setPropertyNotification({ buildingId })
      selectedProperty.value.isNotification = true
    }
  } catch (error) {
    console.error('알림 토글 실패:', error)
  }
}

// 채팅 페이지로 이동
const goToChat = async () => {
  // 로그인 상태 확인
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'
  if (!isLoggedIn) {
    // 로그인되지 않은 경우 로그인 페이지로 리다이렉트
    router.push({
      path: '/auth/login',
      query: { redirect: window.location.pathname },
    })
    return
  }

  // 로그인된 경우
  //const consumerId = localStorage.getItem('consumerId') //TODO: 수정
  const consumerId = '8h9i0j1k-1111-2222-3333-444455556673'
  const { exists, chatRoomId } = await chatStore.existChatRoom(props.buildingId, consumerId)

  //채팅방 존재하면 해당 채팅방으로 이동, 존재하지 않으면 거래 안내페이지로 이동
  if (exists && chatRoomId) {
    router.push({ name: 'chat-room', params: { roomId: chatRoomId } })
  } else {
    router.push({ name: 'deal-notice', params: { buildingId } })
  }
}

// 리뷰 목록 페이지로 이동
const goToReviewList = () => {
  if (selectedProperty.value) {
    const buildingId = selectedProperty.value.buildingId
    if (buildingId) {
      router.push(`/review/${buildingId}`)
    } else {
      console.warn(
        '매물에 대한 buildingId를 찾을 수 없습니다:',
        selectedProperty.value.buildingName
      )
    }
  }
}

// 리뷰 작성 페이지로 이동
const goToReviewWrite = () => {
  if (selectedProperty.value) {
    const buildingId = selectedProperty.value.buildingId
    if (buildingId) {
      router.push(`/review/write/${buildingId}`)
    } else {
      console.warn(
        '매물에 대한 buildingId를 찾을 수 없습니다:',
        selectedProperty.value.buildingName
      )
    }
  }
}

// 등기부등본 다운로드 페이지로 이동
const goToRegistryDownload = async () => {
  if (selectedProperty.value) {
    const buildingId = selectedProperty.value.buildingId
    if (buildingId) {
      // 멤버십 검증
      const result = await validateMembership({
        onSuccess: () => {
          router.push(`/deal/consumer/documents/${buildingId}/ESTATE/download`)
        },
        onFailure: (message) => {
          console.warn('멤버십 검증 실패:', message)
        },
      })
    } else {
      console.warn(
        '매물에 대한 buildingId를 찾을 수 없습니다:',
        selectedProperty.value.buildingName
      )
    }
  }
}

// 건축물대장 다운로드 페이지로 이동
const goToBuildingRegisterDownload = async () => {
  if (selectedProperty.value) {
    const buildingId = selectedProperty.value.buildingId
    if (buildingId) {
      // 멤버십 검증
      const result = await validateMembership({
        onSuccess: () => {
          router.push(`/deal/consumer/documents/${buildingId}/BUILDING_REGISTER/download`)
        },
        onFailure: (message) => {
          console.warn('멤버십 검증 실패:', message)
        },
      })
    } else {
      console.warn(
        '매물에 대한 buildingId를 찾을 수 없습니다:',
        selectedProperty.value.buildingName
      )
    }
  }
}

// 멤버십 검증 Hook 사용
const { validateMembership } = useMembership()

// 분석 리포트 다운로드 페이지로 이동
const goToAnalysisReportDownload = async () => {
  if (selectedProperty.value) {
    const buildingId = selectedProperty.value.buildingId
    if (buildingId) {
      // 멤버십 검증
      await validateMembership({
        onSuccess: () => {
          router.push(`/document/analysis-report/${buildingId}`)
        },
        onFailure: (message) => {
          console.warn('멤버십 검증 실패:', message)
          if (
            window.confirm(
              '분석 리포트를 보려면 결제가 필요합니다. 결제 페이지로 이동하시겠습니까?'
            )
          ) {
            router.push('/payment')
          }
        },
      })
    } else {
      console.warn('buildingId를 찾을 수 없습니다.')
    }
  }
}

// 필터 변경 감지
watch(
  () => mapStore.filteredProperties,
  (newProperties) => {
    // 필터링된 주소 목록으로 마커 다시 표시
    displayMarkersFromAddresses(newProperties)
  },
  { deep: true }
)

onMounted(() => {
  console.log('MapView.vue mounted. buildingId prop:', props.buildingId)
  initializeKakaoMap()

  // buildingId가 있으면 매물 상세 정보 가져오기
  if (props.buildingId) {
    try {
      fetchPropertyDetail(parseInt(props.buildingId))
    } catch (error) {
      console.error('매물 상세 정보 가져오기 실패:', error)
    }
  }
})

// 매물 시세 그래프 관련
const formatPriceForGraph = (price) => {
  if (!price) return '정보 없음'
  const priceNum = parseInt(price, 10)
  if (isNaN(priceNum)) return '정보 없음'

  if (priceNum >= 10000) {
    const billions = Math.floor(priceNum / 10000)
    const millions = priceNum % 10000
    if (millions === 0) {
      return `${billions}억`
    }
    return `${billions}억 ${millions}만`
  }
  return `${priceNum}만`
}

const formatPriceRange = (lower, upper) => {
  if (!lower || !upper) return '정보 없음'
  const formattedLower = formatPriceForGraph(lower)
  const formattedUpper = formatPriceForGraph(upper)
  if (formattedLower === '정보 없음' || formattedUpper === '정보 없음') return '정보 없음'
  return `${formattedLower} ~ ${formattedUpper}`
}

const formattedFixedDate = computed(() => {
  if (!selectedProperty.value || !selectedProperty.value.resFixedDate) return ''
  const dateStr = selectedProperty.value.resFixedDate
  if (dateStr.length === 8) {
    return `${dateStr.substring(0, 4)}.${dateStr.substring(4, 6)}.${dateStr.substring(6, 8)}`
  }
  return dateStr
})

const maxPrice = computed(() => {
  if (!selectedProperty.value || !selectedProperty.value.resAreaPriceList) return 0
  let max = 0
  selectedProperty.value.resAreaPriceList.forEach((area) => {
    const topPrice = parseInt(area.resTopAveragePrice, 10)
    const topPrice1 = parseInt(area.resTopAveragePrice1, 10)
    if (!isNaN(topPrice) && topPrice > max) max = topPrice
    if (!isNaN(topPrice1) && topPrice1 > max) max = topPrice1
  })
  return max > 0 ? max : 1 // 0으로 나누는 것 방지
})

const getBarRangeStyle = (lower, upper) => {
  const lowerNum = parseInt(lower, 10)
  const upperNum = parseInt(upper, 10)

  if (maxPrice.value === 0 || isNaN(lowerNum) || isNaN(upperNum)) {
    return { left: '0%', width: '0%' }
  }

  const left = (lowerNum / maxPrice.value) * 100
  const width = ((upperNum - lowerNum) / maxPrice.value) * 100

  return {
    left: `${left}%`,
    width: `${width}%`,
  }
}
</script>

<template>
  <div class="map-container">
    <div class="main-content">
      <!-- 좌측 사이드바 (기본 필터 사이드바) -->
      <div class="sidebar" v-if="!showDetail">
        <!-- 검색바 (사이드바 상단으로 이동) -->
        <div class="search-section">
          <div class="search-box">
            <i class="fas fa-search search-icon"></i>
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

      <!-- 매물 상세 보기 사이드바 (왼쪽에 표시) -->
      <div class="detail-sidebar-left" v-if="showDetail && selectedProperty">
        <!-- 헤더 (고정) -->
        <div class="detail-header">
          <button class="back-btn" @click="closePropertyDetail">
            <span class="back-icon">←</span>
          </button>
          <h2 class="detail-title">
            {{ selectedProperty.buildingName }}
          </h2>
          <div class="header-actions">
            <button
              class="action-btn"
              :title="selectedProperty.isBookmarked ? '찜하기 취소' : '찜하기'"
              :class="{ bookmarked: selectedProperty.isBookmarked }"
              @click="toggleBookmark"
            >
              <i :class="selectedProperty.isBookmarked ? 'fas fa-heart' : 'far fa-heart'"></i>
            </button>
            <button
              class="action-btn"
              :title="selectedProperty.isNotification ? '알림 해제' : '알림 설정'"
              :class="{ notified: selectedProperty.isNotification }"
              @click="toggleNotification"
            >
              <i :class="selectedProperty.isNotification ? 'fas fa-bell' : 'far fa-bell'"></i>
            </button>
          </div>
        </div>

        <!-- 스크롤 가능한 콘텐츠 영역 -->
        <div class="detail-content">
          <!-- 매물 정보 섹션 -->
          <div class="detail-section">
            <h3 class="section-title">
              <span class="section-icon">🏠</span>
              매물 정보
            </h3>

            <!-- 에러 상태 표시 -->
            <div v-if="selectedProperty.error" class="error-message">
              <p class="error-text">{{ selectedProperty.error }}</p>
              <p class="error-hint">백엔드 API 연결을 확인해주세요.</p>
            </div>
            <div class="info-grid">
              <div class="info-item">
                <span class="info-label">등록자 유형</span>
                <span class="info-value">{{ selectedProperty.sellerType }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">매매 종류</span>
                <span class="info-value">{{ selectedProperty.saleType }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">부동산 종류</span>
                <span class="info-value">{{
                  selectedProperty.resType || selectedProperty.propertyType
                }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">면적</span>
                <span class="info-value">{{ selectedProperty.size }}㎡</span>
              </div>
              <div class="info-item">
                <span class="info-label">도로명 주소</span>
                <span class="info-value">{{
                  selectedProperty.commAddrRoadName || selectedProperty.roadName
                }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">층수</span>
                <span class="info-value">{{ selectedProperty.ho }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">상세 주소</span>
                <span class="info-value">{{ selectedProperty.address }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">세대수</span>
                <span class="info-value">{{
                  selectedProperty.resCompositionCnt || '1200세대'
                }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">준공일자</span>
                <span class="info-value">{{
                  selectedProperty.resApprovalDate || '2019년 12월'
                }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">난방</span>
                <span class="info-value">{{
                  selectedProperty.resHeatingSystem || '지역난방'
                }}</span>
              </div>
              <div class="info-item facility-info">
                <span class="info-label">시설</span>
                <div class="info-value">
                  <div class="facility-tags">
                    <span v-for="item in facilityList" :key="item" class="facility-tag">
                      {{ item }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 공공데이터 정보 섹션 -->
          <div
            class="detail-section"
            v-if="selectedProperty.publicDataAvailable && selectedProperty.aptComplexInfo"
          >
            <h3 class="section-title">
              <span class="section-icon">📊</span>
              공공데이터 정보
            </h3>

            <div class="info-grid">
              <div class="info-item" v-if="selectedProperty.aptComplexInfo.length > 0">
                <span class="info-label">아파트 단지 정보</span>
                <span class="info-value">
                  {{ selectedProperty.aptComplexInfo.length }}개 단지 정보 조회됨
                </span>
              </div>
              <div class="info-item" v-if="selectedProperty.errorMessage">
                <span class="info-label">공공데이터 오류</span>
                <span class="info-value error-text">{{ selectedProperty.errorMessage }}</span>
              </div>
            </div>

            <!-- 아파트 단지 상세 정보 -->
            <div
              v-if="selectedProperty.aptComplexInfo && selectedProperty.aptComplexInfo.length > 0"
              class="apt-complex-list"
            >
              <h4 class="sub-section-title">주변 아파트 단지</h4>
              <div
                class="apt-complex-item"
                v-for="(complex, index) in selectedProperty.aptComplexInfo.slice(0, 3)"
                :key="index"
              >
                <div class="complex-name">
                  {{ complex.kaptName || complex.complexName || `단지 ${index + 1}` }}
                </div>
                <div class="complex-details">
                  <span v-if="complex.kaptCode">코드: {{ complex.kaptCode }}</span>
                  <span v-if="complex.kaptAddr">주소: {{ complex.kaptAddr }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- 실거래가 정보 섹션 -->
          <div class="detail-section" v-if="selectedProperty.realEstateData">
            <h3 class="section-title">
              <span class="section-icon">🏠</span>
              실거래가 정보
            </h3>
            <div class="real-estate-data">
              <div
                v-for="(item, index) in selectedProperty.realEstateData.reviews ||
                selectedProperty.realEstateData"
                :key="index"
                class="real-estate-item"
              >
                <div class="item-header">
                  <h4 class="item-title">{{ item.aptNm || item.buildingName || '이름 없음' }}</h4>
                  <span class="deal-date" v-if="item.dealYear && item.dealMonth && item.dealDay">
                    {{ item.dealYear }}.{{ item.dealMonth }}.{{ item.dealDay }}
                  </span>
                </div>
                <div class="item-details">
                  <div class="detail-row">
                    <span class="detail-label">거래가:</span>
                    <span class="detail-value">{{ formatPrice(item.dealAmount) }}</span>
                  </div>
                  <div class="detail-row">
                    <span class="detail-label">면적:</span>
                    <span class="detail-value"
                      >{{ item.excluUseAr || item.size || '정보 없음' }}m²</span
                    >
                  </div>
                  <div class="detail-row">
                    <span class="detail-label">층수:</span>
                    <span class="detail-value">{{ item.floor || '정보 없음' }}층</span>
                  </div>
                  <div class="detail-row">
                    <span class="detail-label">주소:</span>
                    <span class="detail-value">{{
                      item.jibun || item.address || '정보 없음'
                    }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 시세 그래프 섹션 -->
          <div
            class="detail-section"
            v-if="
              selectedProperty &&
              selectedProperty.resAreaPriceList &&
              selectedProperty.resAreaPriceList.length > 0
            "
          >
            <h3 class="section-title">
              <span class="section-icon">📈</span>
              평형별 시세
              <span class="fixed-date-label" v-if="selectedProperty.resFixedDate"
                >(기준일: {{ formattedFixedDate }})</span
              >
            </h3>
            <div class="area-price-list">
              <div
                v-for="areaData in selectedProperty.resAreaPriceList"
                :key="areaData.resArea"
                class="area-price-item"
              >
                <div class="area-info">
                  <span class="area-size-sqm">{{ areaData.resArea }}㎡</span>
                  <span class="area-size-pyeong"
                    >(약 {{ Math.round(parseFloat(areaData.resArea) / 3.3058) }}평)</span
                  >
                </div>

                <div class="price-details-graph">
                  <div class="price-row-graph">
                    <span class="price-type sale">매매</span>
                    <div class="price-bar-wrapper">
                      <div
                        class="price-bar"
                        :style="
                          getBarRangeStyle(
                            areaData.resLowerAveragePrice,
                            areaData.resTopAveragePrice
                          )
                        "
                      ></div>
                    </div>
                    <span class="price-range-text">{{
                      formatPriceRange(areaData.resLowerAveragePrice, areaData.resTopAveragePrice)
                    }}</span>
                  </div>
                  <div class="price-row-graph">
                    <span class="price-type lease">전세</span>
                    <div class="price-bar-wrapper">
                      <div
                        class="price-bar"
                        :style="
                          getBarRangeStyle(
                            areaData.resLowerAveragePrice1,
                            areaData.resTopAveragePrice1
                          )
                        "
                      ></div>
                    </div>
                    <span class="price-range-text">{{
                      formatPriceRange(areaData.resLowerAveragePrice1, areaData.resTopAveragePrice1)
                    }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 매물 설명 섹션 -->
          <div class="detail-section">
            <h3 class="section-title">매물 설명</h3>
            <div class="description-content">
              <div class="desc-item">
                <h4 class="desc-title">한 줄 소개</h4>
                <p class="desc-text">
                  {{ selectedProperty.infoOneline || '한 줄 소개가 없습니다.' }}
                </p>
              </div>
              <div class="desc-item">
                <h4 class="desc-title">매물 제목</h4>
                <p class="desc-text">
                  {{ selectedProperty.title || '제목이 없습니다.' }}
                </p>
              </div>
              <div class="desc-item">
                <h4 class="desc-title">매물 설명</h4>
                <p class="desc-text">
                  {{ selectedProperty.infoBuilding || '상세 설명이 없습니다.' }}
                </p>
              </div>
              <div class="desc-item">
                <h4 class="desc-title">매물 사진</h4>
                <p class="desc-text">
                  {{ selectedProperty.imageUrl ? '사진이 있습니다.' : '사진이 없습니다.' }}
                </p>
              </div>
            </div>
          </div>

          <!-- 담당자 정보 섹션 -->
          <div class="detail-section">
            <h3 class="section-title agent-title">담당자 정보</h3>
            <div class="agent-info">
              <div class="agent-item">
                <span class="agent-label">담당자 이름</span>
                <span class="agent-value">{{ selectedProperty.contactName || '김철수' }}</span>
              </div>
              <div class="agent-item">
                <span class="agent-label">연락처</span>
                <span class="agent-value">{{
                  selectedProperty.contactPhone || selectedProperty.resTelNo || '010-1234-5678'
                }}</span>
              </div>
            </div>
          </div>

          <!-- 거주자 리뷰 섹션 -->
          <div class="detail-section">
            <div class="review-header">
              <h3 class="section-title">
                <span class="star-icon">☆</span>
                거주자 리뷰
              </h3>
              <div class="review-actions">
                <button class="write-review-btn" @click="goToReviewWrite">
                  <span class="btn-icon">✏️</span>
                  리뷰 작성
                </button>
                <button class="more-btn" @click="goToReviewList">→</button>
              </div>
            </div>
            <div class="review-list">
              <div
                v-if="selectedProperty.review && selectedProperty.review.length > 0"
                v-for="review in selectedProperty.review.slice(0, 3)"
                :key="review.reviewId"
                class="review-item"
              >
                <div class="review-header-info">
                  <span class="reviewer-name">{{ review.reviewerNickname }}</span>
                  <div class="star-rating">
                    <span
                      v-for="i in 5"
                      :key="i"
                      class="star"
                      :class="{ filled: i <= parseFloat(review.rank) }"
                      >★</span
                    >
                  </div>
                </div>
                <p class="review-text">{{ review.content }}</p>
                <div class="review-footer">
                  <span class="helpful-count">도움됨 12</span>
                  <span class="review-date">{{ review.createdAt }}</span>
                </div>
              </div>
              <div v-else class="review-item">
                <p class="review-text">아직 리뷰가 없습니다.</p>
              </div>
            </div>
          </div>
        </div>

        <!-- 액션 버튼 섹션 (고정) -->
        <div class="action-buttons-section">
          <div class="action-buttons">
            <div class="download-buttons-row">
              <button class="action-btn-download" @click="goToRegistryDownload">
                <span class="btn-icon">▼</span>
                <span class="btn-text">등기부등본</span>
              </button>
              <button class="action-btn-download" @click="goToBuildingRegisterDownload">
                <span class="btn-icon">▼</span>
                <span class="btn-text">건축물대장</span>
              </button>
              <button class="action-btn-download" @click="goToAnalysisReportDownload">
                <span class="btn-icon">▼</span>
                <span class="btn-text">분석 리포트</span>
              </button>
            </div>
            <button class="action-btn-chat" @click="goToChat">
              <span class="btn-icon">💬</span>
              <span class="btn-text">임대인과 채팅하기</span>
            </button>
          </div>
        </div>
      </div>

      <!-- 지도 영역 -->
      <div class="map-area">
        <div ref="mapContainer" class="map-canvas"></div>

        <!-- 우측 컨트롤 버튼들 -->
        <div class="map-controls">
          <button class="control-btn" title="버스/지하철">🚌</button>
          <button class="control-btn" title="병원">🏥</button>
          <button class="control-btn" title="편의점/마트">🛒</button>
          <button class="control-btn" title="숨김">❌</button>
        </div>

        <!-- 우측 하단 집 내놓기 버튼 -->
        <div class="floating-action">
          <button class="floating-btn" title="집 내놓기" @click="goToUpload">
            <span class="house-icon">🏠</span>
            <span class="btn-text">집 내놓기</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.map-container {
  width: 100%;
  height: calc(100vh - 97px); /* 헤더 높이만큼 뺀 높이 */
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
  top: 50%;
  transform: translateY(-50%);
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
  height: calc(100vh - 97px); /* 헤더 높이만큼 뺀 높이 */
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  border-radius: 12px;
  background: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.3s;
  padding: 8px;
}

.floating-btn:hover {
  background: #45a049;
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.25);
}

.house-icon {
  font-size: 20px;
  margin-bottom: 4px;
}

.btn-text {
  font-size: 11px;
  font-weight: 500;
  line-height: 1.2;
  text-align: center;
}

/* 매물 상세 보기 사이드바 (왼쪽) */
.detail-sidebar-left {
  width: 420px;
  background: white;
  padding: 0;
  overflow: hidden;
  box-shadow: 2px 0 4px rgba(0, 0, 0, 0.1);

  position: relative;
  z-index: 1000;

  height: calc(100vh - 97px); /* 헤더 높이만큼 뺀 높이 */
  display: flex;
  flex-direction: column;
}

.detail-content {
  flex: 1;
  overflow-y: auto;
  padding-bottom: 20px;
}

/* detail-content 스크롤바 스타일링 */
.detail-content::-webkit-scrollbar {
  width: 8px;
}

.detail-content::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.detail-content::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}

.detail-content::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

.detail-header {
  display: flex;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #e0e0e0;
  background: #f8f9fa;
  flex-shrink: 0;
}

.back-btn {
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  padding: 8px;
  border-radius: 4px;
  margin-right: 12px;
  transition: background-color 0.2s;
}

.back-btn:hover {
  background: #e9ecef;
}

.detail-title {
  flex: 1;
  margin: 0;
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

.header-actions {
  display: flex;
  gap: 8px;
}

.action-btn {
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
  padding: 8px;
  border-radius: 4px;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
}

.action-btn:hover {
  background: #e9ecef;
}

.action-btn.bookmarked {
  color: #e74c3c;
}

.action-btn.notified {
  color: #f39c12;
}

.detail-section {
  padding: 20px;
  border-bottom: 1px solid #e0e0e0;
}

.section-title {
  display: flex;
  align-items: center;
  margin: 0 0 16px 0;
  font-size: 16px;
  font-weight: bold;
  color: #333;
}

.section-icon {
  margin-right: 8px;
  font-size: 18px;
}

.info-grid {
  display: grid;
  gap: 12px;
}

.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #f0f0f0;
}

.info-label {
  font-size: 14px;
  color: #666;
  font-weight: 500;
}

.info-value {
  font-size: 14px;
  color: #333;
  font-weight: 400;
}

.graph-controls {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.graph-select {
  padding: 6px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 12px;
  background: white;
}

.graph-placeholder {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 16px;
}

.graph-area {
  height: 120px;
  background: white;
  border-radius: 4px;
  margin-bottom: 16px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.graph-line {
  width: 80%;
  height: 2px;
  background: #4caf50;
  position: relative;
}

.graph-line::before {
  content: '';
  position: absolute;
  top: -4px;
  left: 0;
  width: 100%;
  height: 10px;
  background: linear-gradient(90deg, #4caf50 0%, #45a049 100%);
  border-radius: 5px;
}

.graph-labels {
  position: absolute;
  bottom: -20px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  font-size: 10px;
  color: #666;
}

.price-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.current-price {
  display: flex;
  flex-direction: column;
}

.price-label {
  font-size: 12px;
  color: #666;
  margin-bottom: 4px;
}

.price-value {
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

.price-change {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.change-label {
  font-size: 12px;
  color: #666;
  margin-bottom: 4px;
}

.change-value {
  font-size: 14px;
  font-weight: bold;
}

.change-value.positive {
  color: #4caf50;
}

.description-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.desc-item {
  border-bottom: 1px solid #f0f0f0;
  padding-bottom: 16px;
}

.desc-title {
  font-size: 14px;
  font-weight: bold;
  color: #333;
  margin: 0 0 8px 0;
}

.desc-text {
  font-size: 14px;
  color: #666;
  line-height: 1.5;
  margin: 0;
}

/* 담당자 정보 스타일 */
.agent-title {
  color: #4caf50 !important;
}

.agent-info {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.agent-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #f0f0f0;
}

.agent-label {
  font-size: 14px;
  color: #666;
  font-weight: 500;
}

.agent-value {
  font-size: 14px;
  color: #333;
  font-weight: 400;
}

/* 거주자 리뷰 스타일 */
.review-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.review-actions {
  display: flex;
  gap: 8px;
  align-items: center;
}

.write-review-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  background: #4caf50;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 12px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.write-review-btn:hover {
  background: #45a049;
}

.write-review-btn .btn-icon {
  font-size: 14px;
}

.star-icon {
  color: #ffc107;
  margin-right: 8px;
  font-size: 18px;
}

.more-btn {
  background: none;
  border: none;
  font-size: 16px;
  color: #666;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  transition: color 0.2s;
}

.more-btn:hover {
  color: #4caf50;
}

.review-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.review-item {
  padding: 12px;
  background: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.review-header-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.reviewer-name {
  font-size: 14px;
  font-weight: 500;
  color: #333;
}

.star-rating {
  display: flex;
  gap: 2px;
}

.star {
  font-size: 14px;
  color: #ddd;
}

.star.filled {
  color: #ffc107;
}

.review-text {
  font-size: 14px;
  color: #333;
  line-height: 1.4;
  margin: 0 0 8px 0;
}

.review-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: #666;
}

.helpful-count {
  color: #4caf50;
  font-weight: 500;
}

/* 액션 버튼 스타일 */
.action-buttons-section {
  padding: 20px;
  background: #f8f9fa;
  border-top: 1px solid #e0e0e0;
  flex-shrink: 0;
}

.action-buttons {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.download-buttons-row {
  display: flex;
  gap: 8px;
  width: 100%;
}

.action-btn-download,
.action-btn-chat {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 16px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.action-btn-download {
  flex: 1;
  min-width: 0;
}

.action-btn-chat {
  width: 100%;
}

.action-btn-download {
  background: #007bff;
  color: white;
}

.action-btn-download:hover {
  background: #0056b3;
  transform: translateY(-1px);
}

.action-btn-chat {
  background: #4caf50;
  color: white;
}

.action-btn-chat:hover {
  background: #45a049;
  transform: translateY(-1px);
}

.btn-icon {
  font-size: 16px;
}

.btn-text {
  font-size: 14px;
}

/* 반응형 디자인 */
@media (max-width: 1200px) {
  .sidebar {
    width: 380px;
  }

  .detail-sidebar-left {
    width: 380px;
  }
}

@media (max-width: 1024px) {
  .sidebar {
    width: 350px;
  }

  .detail-sidebar-left {
    width: 350px;
  }

  .filter-options {
    flex-wrap: wrap;
    gap: 6px;
  }

  .filter-button {
    min-width: 60px;
    font-size: 12px;
    padding: 6px 8px;
  }
}

@media (max-width: 768px) {
  .main-content {
    flex-direction: column;
  }

  .sidebar {
    width: 100%;
    height: auto;
    max-height: 400px;
    order: 2;
  }

  .detail-sidebar-left {
    width: 100%;
    height: auto;
    max-height: 60vh;
    order: 2;
    position: relative;
    z-index: 1000;
  }

  .map-area {
    order: 1;
    height: 50vh;
    min-height: 300px;
  }

  .filter-options {
    flex-wrap: wrap;
    justify-content: flex-start;
  }

  .filter-button {
    flex: none;
    min-width: 80px;
    margin-bottom: 4px;
  }

  .price-inputs {
    flex-wrap: wrap;
    gap: 4px;
  }

  .price-input-container {
    margin-bottom: 4px;
  }

  .map-controls {
    top: 10px;
    right: 10px;
  }

  .control-btn {
    width: 40px;
    height: 40px;
    font-size: 16px;
  }

  .floating-action {
    bottom: 10px;
    right: 10px;
  }

  .floating-btn {
    width: 70px;
    height: 70px;
  }

  .detail-header {
    padding: 16px;
  }

  .detail-title {
    font-size: 16px;
  }

  .detail-section {
    padding: 16px;
  }

  .action-buttons-section {
    padding: 16px;
  }

  .download-buttons-row {
    flex-direction: column;
    gap: 6px;
  }
}

@media (max-width: 480px) {
  .search-section {
    padding: 12px;
    margin-bottom: 16px;
  }

  .filter-section {
    padding: 12px;
    margin-bottom: 16px;
  }

  .filter-title {
    font-size: 14px;
    margin-bottom: 8px;
  }

  .filter-button {
    min-width: 70px;
    font-size: 11px;
    padding: 6px 6px;
  }

  .price-inputs {
    justify-content: center;
  }

  .price-btn {
    width: 28px;
    height: 28px;
    font-size: 12px;
  }

  .price-input {
    width: 35px;
    font-size: 12px;
  }

  .detail-header {
    padding: 12px;
  }

  .detail-title {
    font-size: 14px;
  }

  .detail-section {
    padding: 12px;
  }

  .section-title {
    font-size: 14px;
    margin-bottom: 12px;
  }

  .info-item {
    padding: 6px 0;
  }

  .info-label,
  .info-value {
    font-size: 13px;
  }

  .action-buttons-section {
    padding: 12px;
  }

  .action-btn-download,
  .action-btn-chat {
    padding: 10px 12px;
    font-size: 13px;
  }
}

/* Desktop enhancements */
@media (min-width: 1280px) {
  .sidebar {
    width: 440px;
  }

  .detail-sidebar-left {
    width: 440px;
  }
}

@media (min-width: 1536px) {
  .sidebar {
    width: 500px;
  }

  .detail-sidebar-left {
    width: 500px;
  }

  .floating-btn {
    width: 88px;
    height: 88px;
  }
}

/* 태블릿 세로 모드 */
@media (max-width: 768px) and (orientation: portrait) {
  .sidebar {
    max-height: 350px;
  }

  .detail-sidebar-left {
    max-height: 50vh;
  }

  .map-area {
    height: 45vh;
  }
}

/* 태블릿 가로 모드 */
@media (min-width: 768px) and (max-width: 1024px) and (orientation: landscape) {
  .sidebar {
    width: 320px;
  }

  .detail-sidebar-left {
    width: 320px;
  }

  .map-area {
    height: calc(100vh - 97px);
  }
}

/* 모바일 가로 모드 */
@media (max-width: 768px) and (orientation: landscape) {
  .sidebar {
    max-height: 250px;
  }

  .detail-sidebar-left {
    max-height: 40vh;
  }

  .map-area {
    height: 40vh;
  }
}

/* 실거래가 정보 스타일 */
.real-estate-data {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.real-estate-item {
  border: 1px solid #f0f0f0;
  border-radius: 8px;
  padding: 15px;
  background: #fafafa;
}

.item-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.item-title {
  margin: 0;
  color: #333;
  font-size: 16px;
  font-weight: 600;
}

.deal-date {
  color: #666;
  font-size: 14px;
}

.item-details {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.detail-row {
  display: flex;
  justify-content: space-between;
}

.detail-label {
  color: #666;
  font-size: 14px;
  font-weight: 500;
}

.detail-value {
  color: #333;
  font-size: 14px;
  font-weight: 600;
}

/* 에러 메시지 스타일 */
.error-message {
  background: #fee;
  border: 1px solid #fcc;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 20px;
}

.error-text {
  color: #c33;
  font-weight: 600;
  margin: 0 0 8px 0;
}

.error-hint {
  color: #666;
  font-size: 14px;
  margin: 0;
}

.apt-complex-list {
  margin-top: 16px;
}

.apt-complex-item {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 8px;
}

.complex-name {
  font-size: 14px;
  font-weight: 600;
}

.complex-details {
  font-size: 12px;
  color: #666;
}

.sub-section-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
}

/* 가격 변화 스타일 */
.price-increase {
  color: #e74c3c;
  font-weight: bold;
}

.price-decrease {
  color: #27ae60;
  font-weight: bold;
}

.price-neutral {
  color: #7f8c8d;
  font-weight: bold;
}

.facility-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.facility-tag {
  background-color: #e0e0e0;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  color: #333;
}

/* 시설 정보 스타일 */
.facility-info .info-value {
  flex: 1;
  text-align: right;
}

.facility-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  justify-content: flex-end;
}

.facility-tag {
  background-color: #e9ecef;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 13px;
  color: #495057;
  font-weight: 500;
}

.fixed-date-label {
  font-size: 12px;
  font-weight: normal;
  color: #666;
  margin-left: 8px;
}

.area-price-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.area-price-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.area-info {
  display: flex;
  align-items: baseline;
  gap: 6px;
}

.area-size-sqm {
  font-size: 15px;
  font-weight: bold;
  color: #333;
}

.area-size-pyeong {
  font-size: 13px;
  color: #666;
}

.price-details-graph {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.price-row-graph {
  display: grid;
  grid-template-columns: 40px 1fr 1fr;
  align-items: center;
  gap: 8px;
  font-size: 13px;
}

.price-type {
  font-weight: 500;
  padding: 2px 6px;
  border-radius: 4px;
  text-align: center;
  color: white;
}

.price-type.sale {
  background-color: #e57373;
}

.price-type.lease {
  background-color: #64b5f6;
}

.price-bar-wrapper {
  width: 100%;
  height: 16px;
  background-color: #f0f0f0;
  border-radius: 4px;
  position: relative;
  overflow: hidden;
}

.price-bar {
  position: absolute;
  height: 100%;
  background-color: #4caf50;
  border-radius: 4px;
  opacity: 0.7;
}

.price-range-text {
  font-weight: 500;
  color: #333;
  text-align: right;
  white-space: nowrap;
}
</style>
