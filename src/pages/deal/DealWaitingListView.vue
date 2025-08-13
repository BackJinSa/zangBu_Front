<script setup>
// Vue 3 Composition API 관련 import
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

// API 및 컴포넌트 import
import { getDeals } from '@/api/deal/deal.js'
import PropertyCardWaiting from '@/components/common/PropertyCardWaiting.vue'
import Button from '@/components/common/Button.vue'
import LoadingSpinner from '@/components/common/LoadingSpinner.vue'
import PopupModal from '@/components/common/PopupModal.vue'

// 스토어 import
import { useAuthStore } from '@/stores/auth/auth.js'

// Vue Router 인스턴스 생성
const router = useRouter()

// 인증 스토어 사용
const authStore = useAuthStore()

// ===== 반응형 데이터 정의 =====
const deals = ref([]) // 거래 목록 데이터
const loading = ref(false) // 로딩 상태
const error = ref(null) // 에러 상태
const activeFilter = ref('buying') // 활성화된 필터 (기본값: '구매 중')

// 로그인 필요 모달 상태
const showLoginModal = ref(false)

// ===== API에서 거래 목록 가져오기 =====
// /deal/waitinglist 엔드포인트를 통해 실제 거래 데이터를 가져옴
const fetchDeals = async () => {
  console.log('🎯 fetchDeals 함수 실행됨')
  loading.value = true // 로딩 상태 활성화
  error.value = null // 에러 상태 초기화

  try {
    console.log('=== fetchDeals 시작 ===')
    console.log('인증 상태:', authStore.isAuthenticated)
    console.log('토큰 유효성:', authStore.isTokenValid())
    console.log('저장된 토큰:', localStorage.getItem('token'))
    console.log('저장된 사용자:', localStorage.getItem('user'))
    // JWT 토큰 확인 및 유효성 검사
    if (!authStore.isAuthenticated || !authStore.isTokenValid()) {
      console.log('인증 실패 - 토큰 유효성 검사 실패')
      console.log('⚠️ reissue 기능이 아직 개발되지 않아 기존 토큰으로 시도')

      // TODO: reissue 기능 개발 완료 후 활성화
      // 토큰 갱신 시도
      /*
      try {
        console.log('🔄 토큰 갱신 시작...')
        await authStore.refreshAccessToken()
        console.log('✅ 토큰 갱신 성공')
        
        // 갱신된 토큰으로 다시 API 호출
        console.log('🔄 갱신된 토큰으로 API 재호출')
        const response = await getDeals()
        console.log('📡 API 응답 전체:', response)
        console.log('📊 API 응답 데이터:', response.data)
        console.log('📋 API 응답 상태:', response.status)
        console.log('🔧 API 응답 헤더:', response.headers)

        // API 응답 데이터 처리 - Postman 응답 구조에 맞게 처리
        if (response.data && response.data.deals) {
          // 페이지네이션된 응답 구조 처리 (Postman 응답과 동일)
          deals.value = response.data.deals
          console.log('✅ 페이지네이션 데이터 처리 성공:', {
            pageNum: response.data.pageNum,
            pageSize: response.data.pageSize,
            total: response.data.total,
            pages: response.data.pages,
            dealsCount: response.data.deals.length,
          })
        } else if (response.data && Array.isArray(response.data)) {
          // 배열 형태로 직접 응답하는 경우
          deals.value = response.data
          console.log('✅ 배열 데이터 처리 성공:', response.data.length)
        } else if (response.data) {
          // 단일 객체인 경우 배열로 변환
          deals.value = [response.data]
          console.log('✅ 단일 객체를 배열로 변환:', response.data)
        } else {
          // API 응답이 없는 경우 빈 배열로 설정
          deals.value = []
          console.log('⚠️ 응답 데이터 없음 - 빈 배열 설정')
        }

        console.log('🎯 최종 처리된 거래 목록:', deals.value)
        console.log('📊 거래 목록 길이:', deals.value.length)

        // 각 거래 데이터 상세 로깅
        deals.value.forEach((deal, index) => {
          console.log(`🏠 거래 ${index + 1}:`, {
            buildingId: deal.buildingId,
            buildingName: deal.buildingName,
            price: deal.price,
            userStatus: deal.userStatus,
            dealStatus: deal.dealStatus,
          })
        })

        return // 성공적으로 처리되었으므로 함수 종료
      } catch (refreshError) {
        console.error('❌ 토큰 갱신 실패:', refreshError)
        // 토큰 갱신 실패 시 로그인 필요 팝업 표시
        showLoginRequiredPopup()
        return
      }
      */

      // 일단 기존 토큰으로 API 호출 시도
      console.log('🔄 기존 토큰으로 API 호출 시도')
    }

    // 실제 API 호출
    console.log('🔍 API 호출 시작: /deal/waitinglist')
    const response = await getDeals()
    console.log('📡 API 응답 전체:', response)
    console.log('📊 API 응답 데이터:', response.data)
    console.log('📋 API 응답 상태:', response.status)
    console.log('🔧 API 응답 헤더:', response.headers)

    // API 응답 데이터 처리 - Postman 응답 구조에 맞게 처리
    if (response.data && response.data.deals) {
      // 페이지네이션된 응답 구조 처리 (Postman 응답과 동일)
      deals.value = response.data.deals
      console.log('✅ 페이지네이션 데이터 처리 성공:', {
        pageNum: response.data.pageNum,
        pageSize: response.data.pageSize,
        total: response.data.total,
        pages: response.data.pages,
        dealsCount: response.data.deals.length,
      })
    } else if (response.data && Array.isArray(response.data)) {
      // 배열 형태로 직접 응답하는 경우
      deals.value = response.data
      console.log('✅ 배열 데이터 처리 성공:', response.data.length)
    } else if (response.data) {
      // 단일 객체인 경우 배열로 변환
      deals.value = [response.data]
      console.log('✅ 단일 객체를 배열로 변환:', response.data)
    } else {
      // API 응답이 없는 경우 빈 배열로 설정
      deals.value = []
      console.log('⚠️ 응답 데이터 없음 - 빈 배열 설정')
    }

    console.log('🎯 최종 처리된 거래 목록:', deals.value)
    console.log('📊 거래 목록 길이:', deals.value.length)

    // 각 거래 데이터 상세 로깅
    deals.value.forEach((deal, index) => {
      console.log(`🏠 거래 ${index + 1}:`, {
        buildingId: deal.buildingId,
        buildingName: deal.buildingName,
        price: deal.price,
        userStatus: deal.userStatus,
        dealStatus: deal.dealStatus,
      })
    })
  } catch (err) {
    console.error('❌ API 호출 중 오류 발생 ===')
    console.error('🚨 에러 객체:', err)
    console.error('📡 에러 응답:', err.response)
    console.error('🌐 에러 요청:', err.request)
    console.error('💬 에러 메시지:', err.message)
    console.error('🔢 에러 코드:', err.code)
    console.error('📊 에러 상태:', err.response?.status)
    console.error('📋 에러 데이터:', err.response?.data)

    // 401 Unauthorized 에러인 경우 로그인 페이지로 이동
    if (err.response?.status === 401) {
      showLoginRequiredPopup()
      return
    }

    // API 오류 발생 시 빈 배열로 설정
    deals.value = []

    // 에러 발생 시 사용자에게 친화적인 메시지 표시
    if (err.response) {
      // 서버 응답이 있는 경우
      switch (err.response.status) {
        case 401:
          error.value = '인증이 필요합니다. 다시 로그인해주세요.'
          showLoginRequiredPopup()
          break
        case 403:
          error.value = '접근 권한이 없습니다. 로그인이 필요합니다.'
          showLoginRequiredPopup()
          break
        case 404:
          error.value = '거래 목록을 찾을 수 없습니다.'
          break
        case 500:
          error.value = '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.'
          break
        default:
          error.value = `거래 목록을 불러오는데 실패했습니다. (${err.response.status})`
      }
    } else if (err.request) {
      // 네트워크 오류
      error.value = '백엔드 서버에 연결할 수 없습니다. 서버가 실행 중인지 확인해주세요.'
    } else {
      // 기타 오류
      error.value = '거래 목록을 불러오는데 실패했습니다. 다시 시도해주세요.'
    }
  } finally {
    loading.value = false // 로딩 상태 비활성화
  }
}

// ===== 로그인 필요 팝업 표시 및 로그인 페이지 이동 =====
const showLoginRequiredPopup = () => {
  // 사용자에게 로그인이 필요하다는 팝업 표시
  showLoginModal.value = true
}

// ===== 모달 이벤트 핸들러 =====
const handleLoginConfirm = () => {
  showLoginModal.value = false
  router.push('/auth/login')
}

const handleLoginCancel = () => {
  showLoginModal.value = false
  router.push('/')
}

const handleLoginModalClose = () => {
  showLoginModal.value = false
}

// ===== 필터링된 거래 목록 계산 =====
// 활성화된 필터에 따라 거래 목록을 동적으로 필터링
const filteredDeals = computed(() => {
  if (activeFilter.value === 'all') {
    return deals.value // 전체 거래 목록 반환
  } else if (activeFilter.value === 'buying') {
    return deals.value.filter((deal) => deal.userStatus === '구매중') // 구매 중인 거래만 필터링
  } else if (activeFilter.value === 'selling') {
    return deals.value.filter((deal) => deal.userStatus === '판매중') // 판매 중인 거래만 필터링
  } else if (activeFilter.value === 'completed') {
    // dealStatus가 CLOSE_DEAL인 경우만 완료된 거래로 간주
    return deals.value.filter((deal) => deal.dealStatus === 'CLOSE_DEAL') // 완료된 거래만 필터링
  }
  return deals.value // 기본값으로 전체 목록 반환
})

// ===== 필터 설정 함수 =====
// 사용자가 선택한 필터를 활성화
const setActiveFilter = (filter) => {
  activeFilter.value = filter
}

// ===== 거래 데이터 포맷팅 함수 =====
// PropertyCard 컴포넌트에서 사용할 수 있도록 거래 데이터를 포맷팅
const formatDealForPropertyCard = (deal) => {
  console.log('=== formatDealForPropertyCard ===')
  console.log('Original deal:', deal)

  // API 응답 데이터를 PropertyCard 컴포넌트에 맞는 형태로 변환
  const formattedProperty = {
    buildingId: deal.buildingId,
    buildingName: deal.buildingName,
    address: deal.address,
    imageUrl:
      deal.imageUrl && deal.imageUrl !== 'https://example.com/img902.jpg'
        ? deal.imageUrl
        : '/default-property.jpg', // 예시 이미지 URL인 경우 기본 이미지 사용
    price: deal.price || 0, // 가격이 0인 경우도 처리
    dealStatus: deal.userStatus,
    createdAt: new Date().toISOString().split('T')[0],
    saleType: mapSaleType(deal.saleType),
    houseType: mapPropertyType(deal.propertyType),
    dealId: deal.buildingId,
    userRole: deal.userStatus === '구매중' ? 'buyer' : 'seller',
    dealStatusEnum: deal.dealStatus,
    dealStatusText: mapDealStatus(deal.dealStatus), // 한글 상태 텍스트 추가
  }

  // 가격이 0인 경우 "가격 협의"로 표시
  if (deal.price === 0) {
    formattedProperty.priceDisplay = '가격 협의'
  }

  console.log('Formatted property:', formattedProperty)
  return formattedProperty
}

// ===== API 응답 데이터 매핑 함수들 =====

// 판매 유형 매핑 (API → 한글)
const mapSaleType = (apiSaleType) => {
  const saleTypeMap = {
    TRADING: '매매',
    CHARTER: '전세',
    MONTHLY: '월세',
    TRADING_CHARTER: '매매+전세',
    TRADING_MONTHLY: '매매+월세',
  }
  return saleTypeMap[apiSaleType] || apiSaleType
}

// 주택 유형 매핑 (API → 한글)
const mapPropertyType = (apiPropertyType) => {
  const propertyTypeMap = {
    APARTMENT: '아파트',
    OFFICETEL: '오피스텔',
    VILLA: '빌라',
    HOUSE: '단독주택',
    COMMERCIAL: '상가',
    LAND: '토지',
  }
  return propertyTypeMap[apiPropertyType] || apiPropertyType
}

// 거래 상태 매핑 (API → 한글)
const mapDealStatus = (apiDealStatus) => {
  const dealStatusMap = {
    BEFORE_OWNER: '소유자 확인 대기',
    BEFORE_CONSUMER: '소비자 확인 대기',
    MIDDLE_DEAL: '거래 진행 중',
    CLOSE_DEAL: '거래 완료',
    CANCEL_DEAL: '거래 취소',
  }
  return dealStatusMap[apiDealStatus] || apiDealStatus
}

// ===== 거래 상세 페이지 이동 처리 =====
// PropertyCard에서 거래 상세 버튼 클릭 시 호출
const handleDealDetail = (property) => {
  console.log('=== handleDealDetail Debug ===')
  console.log('Received property:', property)
  console.log('dealId:', property.dealId)
  console.log('userRole:', property.userRole)
  console.log('buildingId:', property.buildingId)

  const dealId = property.dealId
  // 사용자 역할에 따라 다른 라우트로 이동
  const targetRoute =
    property.userRole === 'seller' ? `/deal/seller/${dealId}` : `/deal/buyer/${dealId}`

  console.log('Target route:', targetRoute)

  // 페이지 이동 전에 Header 아래로 스크롤 (사용자 경험 개선)
  window.scrollTo({
    top: 96, // Header 높이 (h-24 = 96px)
    behavior: 'smooth', // 부드러운 스크롤 애니메이션
  })

  // 판매자인 경우 판매자 페이지로 이동
  if (property.userRole === 'seller') {
    router
      .push(`/deal/seller/${dealId}`)
      .then(() => {
        console.log('Successfully navigated to seller page')
        // 페이지 이동 후에도 Header 아래로 스크롤
        window.scrollTo({
          top: 96,
          behavior: 'smooth',
        })
      })
      .catch((err) => {
        console.error('Failed to navigate to seller page:', err)
      })
  } else {
    // 구매자인 경우 구매자 페이지로 이동
    router
      .push(`/deal/buyer/${dealId}`)
      .then(() => {
        console.log('Successfully navigated to buyer page')
        // 페이지 이동 후에도 Header 아래로 스크롤
        window.scrollTo({
          top: 96,
          behavior: 'smooth',
        })
      })
      .catch((err) => {
        console.error('Failed to navigate to buyer page:', err)
      })
  }
}

// ===== 완료된 거래 상세 보기 처리 =====
// 완료된 거래의 상세 정보를 보기 위한 함수
const handleViewDetails = (property) => {
  console.log('=== handleViewDetails Debug ===')
  console.log('Received property:', property)
  console.log('dealId:', property.dealId)
  console.log('buildingId:', property.buildingId)

  // 거래 내역 페이지로 이동 (예: 거래 완료 상세 페이지)
  router.push(`/deal/completed/${property.dealId}`)
}

// ===== 리뷰 작성 처리 =====
// 완료된 거래에 대한 리뷰를 작성하기 위한 함수
const handleReview = (property) => {
  console.log('=== handleReview Debug ===')
  console.log('Received property:', property)
  console.log('dealId:', property.dealId)
  console.log('buildingId:', property.buildingId)

  // 리뷰 작성 페이지로 이동
  router.push(`/review/write/${property.dealId}`)
}

// ===== 컴포넌트 초기화 =====
// 컴포넌트가 마운트될 때 거래 목록을 가져옴
onMounted(() => {
  console.log('🚀 DealWaitingListView 컴포넌트 마운트됨')
  console.log('📊 초기 상태:', {
    loading: loading.value,
    error: error.value,
    deals: deals.value.length,
    isAuthenticated: authStore.isAuthenticated,
    token: localStorage.getItem('token') ? '있음' : '없음',
  })

  // 거래 목록 가져오기
  console.log('🔍 fetchDeals 함수 호출 시작')
  fetchDeals()
})
</script>

<template>
  <div class="deal-waiting-list-view">
    <!-- 메인 콘텐츠 영역 -->
    <div class="main-content">
      <!-- 섹션 제목 -->
      <div class="section-title">
        <h1>거래 중인 매물</h1>
      </div>

      <!-- 필터 탭 버튼들 -->
      <div class="filter-tabs">
        <!-- 전체 거래 필터 -->
        <Button
          :variant="activeFilter === 'all' ? 'button1' : 'button10'"
          size="sm"
          @click="setActiveFilter('all')"
        >
          전체
        </Button>
        <!-- 구매 중인 거래 필터 -->
        <Button
          :variant="activeFilter === 'buying' ? 'button1' : 'button10'"
          size="sm"
          @click="setActiveFilter('buying')"
        >
          구매 중
        </Button>
        <!-- 판매 중인 거래 필터 -->
        <Button
          :variant="activeFilter === 'selling' ? 'button1' : 'button10'"
          size="sm"
          @click="setActiveFilter('selling')"
        >
          판매 중
        </Button>
        <!-- 완료된 거래 필터 -->
        <Button
          :variant="activeFilter === 'completed' ? 'button1' : 'button10'"
          size="sm"
          @click="setActiveFilter('completed')"
        >
          거래 완료
        </Button>
      </div>

      <!-- 로딩 상태 표시 -->
      <LoadingSpinner v-if="loading" text="거래 목록을 불러오는 중..." size="medium" />

      <!-- 에러 상태 표시 -->
      <div v-else-if="error" class="error-container">
        <i class="fas fa-exclamation-triangle error-icon"></i>
        <p class="error-text">{{ error }}</p>
        <Button variant="button1" @click="fetchDeals" icon="fas fa-redo"> 다시 시도 </Button>
      </div>

      <!-- 빈 상태 표시 (거래가 없을 때) -->
      <div v-else-if="filteredDeals.length === 0" class="empty-container">
        <i class="fas fa-inbox empty-icon"></i>
        <h3 class="empty-title">거래 중인 매물이 없습니다</h3>
        <p class="empty-text">새로운 거래가 등록되면 여기에 표시됩니다.</p>
      </div>

      <!-- 거래 목록 표시 -->
      <div v-else class="deals-container">
        <div
          class="deals-grid"
          :class="{
            'deals-grid-one': filteredDeals.length === 1, // 거래가 1개일 때 그리드 스타일
            'deals-grid-two': filteredDeals.length === 2, // 거래가 2개일 때 그리드 스타일
          }"
        >
          <!-- PropertyCardWaiting 컴포넌트를 사용하여 각 거래를 카드 형태로 표시 -->
          <PropertyCardWaiting
            v-for="deal in filteredDeals"
            :key="deal.buildingId"
            :property="formatDealForPropertyCard(deal)"
            @edit="handleDealDetail"
            @viewDetails="handleViewDetails"
            @review="handleReview"
          />
        </div>
      </div>
    </div>

    <!-- 로그인 필요 모달 -->
    <PopupModal
      v-if="showLoginModal"
      title="로그인이 필요합니다"
      message="거래 목록을 보려면 로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?"
      cancelText="취소"
      confirmText="로그인하기"
      @close="handleLoginModalClose"
      @confirm="handleLoginConfirm"
      @cancel="handleLoginCancel"
    />
  </div>
</template>

<style scoped>
/* ===== 거래 대기 목록 뷰 전체 스타일 ===== */
.deal-waiting-list-view {
  min-height: 100vh; /* 최소 높이를 뷰포트 높이로 설정 */
  background: var(--bg-1); /* 배경색 설정 */
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: flex-start;
}

/* ===== 메인 콘텐츠 영역 스타일 ===== */
.main-content {
  flex: 1; /* 남은 공간을 모두 차지 */
  padding: 1.25rem; /* 내부 여백 */
  max-width: 75rem; /* 최대 너비 제한 */
  margin: 0 auto; /* 가운데 정렬 */
  width: 100%;
  min-height: calc(100vh - 12.5rem); /* Header + Footer 높이를 고려한 최소 높이 */
  overflow-y: auto; /* 세로 스크롤 허용 */
  background: var(--bg-1);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

/* ===== 섹션 제목 스타일 ===== */
.section-title {
  text-align: left;
  margin-bottom: 2rem;
  padding-left: 1.25rem;
  max-width: 100%;
  width: 100%;
  align-self: flex-start;
}

.section-title h1 {
  color: #374151; /* 제목 색상 */
  font-size: 1.75rem; /* 제목 폰트 크기 */
  font-weight: bold;
  font-family: 'Roboto', sans-serif;
  margin: 0;
}

/* ===== 필터 탭 버튼 스타일 ===== */
.filter-tabs {
  display: flex;
  justify-content: flex-start; /* 왼쪽 정렬 */
  gap: 0.75rem; /* 버튼 간 간격 */
  margin-bottom: 2.5rem;
  padding-left: 1.25rem;
  max-width: 100%;
  width: 100%;
  align-self: flex-start;
  flex-wrap: wrap; /* 버튼이 많을 때 줄바꿈 */
}

/* 필터 탭 버튼 호버 효과 */
.filter-tabs :deep(button) {
  transition: all 0.2s ease; /* 부드러운 전환 효과 */
  white-space: nowrap; /* 텍스트 줄바꿈 방지 */
}

.filter-tabs :deep(button:hover) {
  transform: translateY(-1px); /* 호버 시 위로 살짝 이동 */
}

/* ===== 거래 목록 컨테이너 스타일 ===== */
.deals-container {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  max-width: 100%;
  align-self: stretch;
}

/* 거래 그리드 레이아웃 */
.deals-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(25rem, 1fr)); /* 반응형 그리드 */
  gap: 1.5rem; /* 그리드 간격 */
  width: 100%;
  max-width: 75rem;
  justify-items: start;
  transition: all 0.3s ease; /* 부드러운 전환 효과 */
}

/* 거래가 1개일 때 그리드 스타일 */
.deals-grid-one {
  grid-template-columns: 1fr; /* 단일 컬럼 */
  justify-items: start;
}

/* 거래가 2개일 때 그리드 스타일 */
.deals-grid-two {
  grid-template-columns: repeat(2, 1fr); /* 2개 컬럼 */
}

/* 모바일에서 2개 거래일 때 단일 컬럼으로 변경 */
@media (max-width: 640px) {
  .deals-grid-two {
    grid-template-columns: 1fr;
  }
}

/* ===== 카드 전환 효과 ===== */
.deals-grid :deep(.property-card-waiting) {
  transition: all 0.3s ease; /* 부드러운 전환 효과 */
}

.deals-grid :deep(.property-card-waiting:hover) {
  transform: translateY(-4px); /* 호버 시 위로 이동 */
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.15); /* 호버 시 그림자 효과 */
}

/* ===== 에러 상태 스타일 ===== */
.error-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 1.25rem;
  text-align: center;
  width: 100%;
  min-height: 50vh; /* 최소 높이 설정 */
  margin: 2rem 0;
}

.error-icon {
  font-size: 3rem;
  color: var(--status-2); /* 에러 아이콘 색상 */
  margin-bottom: 1rem;
}

.error-text {
  color: var(--text-2);
  font-size: 1rem;
  margin-bottom: 1.25rem;
  font-family: 'Roboto', sans-serif;
}

/* ===== 빈 상태 스타일 ===== */
.empty-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 1.25rem;
  text-align: center;
  width: 100%;
  min-height: 50vh; /* 최소 높이 설정 */
  margin: 2rem 0;
}

.empty-icon {
  font-size: 4rem;
  color: var(--text-1);
  margin-bottom: 1rem;
}

.empty-title {
  color: var(--text-2);
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  font-family: 'Roboto', sans-serif;
}

.empty-text {
  color: var(--text-1);
  font-size: 0.875rem;
  font-family: 'Roboto', sans-serif;
}

/* ===== 모바일 스타일 (768px 이하) ===== */
@media (max-width: 48rem) {
  .main-content {
    padding: 1rem;
    min-height: calc(100vh - 11.25rem);
    margin: 0 auto;
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
    align-items: center;
  }

  .section-title {
    padding-left: 0;
    margin-bottom: 1.5rem;
    text-align: left;
    align-self: flex-start;
    width: 100%;
  }

  .section-title h1 {
    font-size: 1.5rem; /* 모바일에서 제목 크기 축소 */
  }

  .filter-tabs {
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
    padding-left: 0;
    flex-wrap: wrap;
    margin-bottom: 2rem;
    justify-content: flex-start;
    align-self: flex-start;
    width: 100%;
  }

  .deals-container {
    width: 100%;
    padding: 0;
    align-self: stretch;
  }

  .deals-grid {
    grid-template-columns: 1fr; /* 모바일에서 단일 컬럼 */
    gap: 1.25rem;
    justify-items: center;
    width: 100%;
    padding: 0 0.5rem;
  }

  /* 모바일용 버튼 크기 조정 */
  .filter-tabs :deep(button) {
    min-width: 3.75rem !important;
    height: 2rem !important;
    padding: 0.25rem 0.5rem !important;
    font-size: 0.75rem !important;
  }

  .error-container,
  .empty-container {
    min-height: 40vh;
    padding: 3rem 1rem;
    margin: 1rem 0;
  }

  .error-text {
    font-size: 0.875rem;
  }

  .empty-icon {
    font-size: 3rem;
  }

  .empty-title {
    font-size: 1.125rem;
  }

  .empty-text {
    font-size: 0.8125rem;
  }
}

/* ===== 작은 모바일 스타일 (480px 이하) ===== */
@media (max-width: 30rem) {
  .main-content {
    padding: 0.75rem;
  }

  .section-title {
    margin-bottom: 1.25rem;
  }

  .section-title h1 {
    font-size: 1.375rem;
  }

  .filter-tabs {
    gap: 0.375rem;
    margin-bottom: 1.5rem;
  }

  .deals-grid {
    gap: 1rem;
    padding: 0 0.25rem;
  }

  .filter-tabs :deep(button) {
    min-width: 3.25rem !important;
    height: 1.875rem !important;
    padding: 0.25rem 0.375rem !important;
    font-size: 0.6875rem !important;
  }
}

/* ===== 태블릿 스타일 (769px - 1023px) ===== */
@media (min-width: 48.0625rem) and (max-width: 64rem) {
  .main-content {
    padding: 1.25rem;
    min-height: calc(100vh - 12.5rem);
  }

  .deals-grid {
    grid-template-columns: repeat(auto-fit, minmax(22rem, 1fr));
    gap: 1.5rem;
    max-width: 100%;
  }

  .filter-tabs :deep(button) {
    min-width: 4.375rem !important;
    height: 2.25rem !important;
    padding: 0.375rem 0.75rem !important;
    font-size: 0.8125rem !important;
  }
}

/* ===== 데스크톱 스타일 (1024px 이상) ===== */
@media (min-width: 64rem) {
  .main-content {
    padding: 1.25rem;
    min-height: calc(100vh - 12.5rem);
  }

  .section-title {
    padding-left: 1.25rem;
    margin-bottom: 2rem;
  }

  .section-title h1 {
    font-size: 1.75rem;
  }

  .filter-tabs {
    padding-left: 1.25rem;
    margin-bottom: 2.5rem;
  }

  .deals-grid {
    grid-template-columns: repeat(auto-fit, minmax(25rem, 1fr));
    gap: 2rem;
    justify-items: center;
  }

  .filter-tabs :deep(button) {
    min-width: 5rem !important;
    height: 2.5rem !important;
    padding: 0.5rem 1rem !important;
    font-size: 0.875rem !important;
  }
}

/* ===== 대형 데스크톱 스타일 (1440px 이상) ===== */
@media (min-width: 90rem) {
  .main-content {
    padding: 1.5rem;
  }

  .deals-grid {
    grid-template-columns: repeat(auto-fit, minmax(26.875rem, 1fr));
    gap: 2.25rem;
  }
}

/* ===== 초대형 데스크톱 스타일 (1920px 이상) ===== */
@media (min-width: 120rem) {
  .main-content {
    padding: 2rem;
    max-width: 85rem;
  }

  .deals-grid {
    grid-template-columns: repeat(auto-fit, minmax(28.75rem, 1fr));
    gap: 2.5rem;
  }
}
</style>
