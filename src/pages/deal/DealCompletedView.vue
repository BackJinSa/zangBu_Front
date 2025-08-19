<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getDealNotice } from '@/api/deal/deal'
import { DEAL_STATUS } from '@/utils/constants'
import Button from '@/components/common/Button.vue'
import BackButton from '@/components/common/BackButton.vue'

const route = useRoute()
const router = useRouter()

const dealInfo = ref({})
const loading = ref(true)
const error = ref(null)
const showReviewModal = ref(false)

const fetchDealInfo = async () => {
  try {
    loading.value = true
    error.value = null

    const dealId = route.params.dealId
    if (!dealId) {
      throw new Error('거래 ID가 필요합니다')
    }

    // 실제 API 호출 시도
    try {
      const response = await getDealNotice(dealId)
      console.log('거래 상세 정보 응답:', response.data)
      console.log('응답 데이터 전체 구조:', response.data)

      // API 응답 구조에 맞게 데이터 매핑
      dealInfo.value = {
        dealId: dealId,
        buildingId: response.data.buildingId,
        buildingName: response.data.buildingName,
        infoBuilding: response.data.infoBuilding,
        dealStatus: response.data.dealStatus,
        dealStatusEnum: response.data.dealStatus,
        chatRoomId: response.data.chatRoomId,
        address: response.data.address,
        price: response.data.price,
        saleType: response.data.saleType,
        propertyType: response.data.propertyType,
        completedAt: response.data.completedAt || new Date().toISOString().split('T')[0],
        sellerId: response.data.sellerId,
        buyerId: response.data.buyerId,
        // 거래 완료 관련 추가 정보
        contractSignedAt: response.data.contractSignedAt,
        finalPrice: response.data.finalPrice,
        commission: response.data.commission,
        transferTax: response.data.transferTax,
      }

      console.log('매핑된 dealInfo:', dealInfo.value)
    } catch (apiError) {
      console.error('API 호출 실패:', apiError)

      let errorMessage = '거래 정보를 불러올 수 없습니다.'

      if (apiError.response?.status === 404) {
        errorMessage = '해당 거래를 찾을 수 없습니다.'
      } else if (apiError.response?.status === 403) {
        errorMessage = '이 거래에 대한 접근 권한이 없습니다.'
      } else if (apiError.response?.data?.message) {
        errorMessage = apiError.response.data.message
      }

      error.value = errorMessage
    }
  } catch (err) {
    console.error('거래 정보 조회 실패:', err)
    error.value = err.message || '거래 정보를 불러올 수 없습니다'
  } finally {
    loading.value = false
  }
}

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

// 가격 포맷팅
const formatPrice = (price) => {
  if (!price || price === 0) return '가격 협의'
  return `${price.toLocaleString()}만원`
}

// 날짜 포맷팅
const formatDate = (dateString) => {
  if (!dateString) return '날짜 정보 없음'
  const date = new Date(dateString)
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

// 리뷰 작성 페이지로 이동
const handleReview = () => {
  router.push(`/review/write/${dealInfo.value.dealId}`)
}

// 채팅방으로 이동
const handleChat = () => {
  if (dealInfo.value.chatRoomId) {
    router.push(`/chat/room?chatRoomId=${dealInfo.value.chatRoomId}`)
  } else {
    router.push(`/chat/room?dealId=${dealInfo.value.dealId}`)
  }
}

// 거래 목록으로 돌아가기
const goBackToList = () => {
  router.push('/deal/waiting-list')
}

onMounted(() => {
  fetchDealInfo()
})
</script>

<template>
  <div class="min-h-screen" style="background: var(--bg-1)">
    <!-- 뒤로가기 버튼 -->
    <BackButton />

    <!-- 로딩 상태 -->
    <div v-if="loading" class="min-h-screen flex items-center justify-center">
      <div class="text-center">
        <div
          class="animate-spin rounded-full h-16 w-16 border-b-2 mx-auto mb-4"
          style="border-color: var(--brand-3)"
        ></div>
        <p style="color: var(--text-1)">거래 정보를 불러오는 중...</p>
      </div>
    </div>

    <!-- 에러 상태 -->
    <div v-else-if="error" class="min-h-screen flex items-center justify-center px-4">
      <div class="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
        <svg
          class="w-16 h-16 text-red-400 mx-auto mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
          ></path>
        </svg>
        <h3 class="text-xl font-bold mb-2" style="color: var(--text-2)">
          정보를 불러올 수 없습니다
        </h3>
        <p class="mb-6" style="color: var(--text-1)">{{ error }}</p>
        <button
          @click="fetchDealInfo"
          class="px-6 py-3 rounded-lg transition-colors text-white"
          style="background: var(--brand-3)"
          @mouseenter="$event.target.style.background = 'var(--brand-2)'"
          @mouseleave="$event.target.style.background = 'var(--brand-3)'"
        >
          다시 시도
        </button>
      </div>
    </div>

    <!-- 메인 콘텐츠 -->
    <div v-else class="min-h-screen flex items-center justify-center p-4 lg:p-12">
      <div class="w-full max-w-4xl">
        <!-- 통합 헤더 & 거래 정보 카드 -->
        <div class="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <!-- 헤더 섹션 -->
          <div class="p-4 lg:p-8" style="background: var(--bg-2); border-bottom: 1px solid #e5e7eb">
            <div class="flex items-start justify-between">
              <div class="flex-1">
                <div class="flex items-center gap-2 lg:gap-3 mb-3 lg:mb-4">
                  <div
                    class="w-1.5 h-6 lg:w-2 lg:h-8 rounded-full"
                    style="background: var(--bg-3)"
                  ></div>
                  <span
                    class="px-2 lg:px-3 py-0.5 lg:py-1 rounded-full text-xs lg:text-sm font-semibold"
                    style="background: var(--bg-3); color: var(--brand-1)"
                    >거래 완료</span
                  >
                </div>
                <h1 class="text-xl lg:text-3xl font-bold mb-2 lg:mb-3" style="color: var(--text-2)">
                  {{ dealInfo.buildingName }}
                </h1>
                <p class="text-xs lg:text-base mb-2 leading-relaxed" style="color: var(--text-1)">
                  {{ dealInfo.infoBuilding }}
                </p>
              </div>
              <div class="hidden lg:block">
                <div
                  class="w-12 lg:w-16 h-12 lg:h-16 rounded-full flex items-center justify-center"
                  style="background: var(--brand-3)"
                >
                  <svg
                    class="w-8 h-8"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    style="color: var(--text-3)"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <!-- 콘텐츠 섹션 -->
          <div class="p-4 lg:p-12">
            <!-- 거래 완료 정보 섹션 -->
            <div class="bg-green-50 border border-green-200 rounded-xl p-4 lg:p-6 mb-8 lg:mb-12">
              <div class="flex items-center mb-4 lg:mb-6">
                <div class="bg-green-100 rounded-full p-1.5 lg:p-2 mr-3 lg:mr-4">
                  <svg
                    class="w-4 h-4 lg:w-5 lg:h-5 text-green-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
                <h2 class="text-lg lg:text-2xl font-bold text-green-800">거래 완료 정보</h2>
              </div>
              <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                <!-- 거래 기본 정보 -->
                <div class="space-y-3">
                  <div class="flex justify-between">
                    <span class="text-sm font-medium text-green-700">거래 ID</span>
                    <span class="text-sm text-green-800">{{ dealInfo.dealId }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-sm font-medium text-green-700">거래 상태</span>
                    <span class="text-sm text-green-800">{{
                      mapDealStatus(dealInfo.dealStatus)
                    }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-sm font-medium text-green-700">완료일</span>
                    <span class="text-sm text-green-800">{{
                      formatDate(dealInfo.completedAt)
                    }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-sm font-medium text-green-700">매물 유형</span>
                    <span class="text-sm text-green-800">{{
                      mapPropertyType(dealInfo.propertyType)
                    }}</span>
                  </div>
                </div>
                <!-- 거래 상세 정보 -->
                <div class="space-y-3">
                  <div class="flex justify-between">
                    <span class="text-sm font-medium text-green-700">판매 유형</span>
                    <span class="text-sm text-green-800">{{ mapSaleType(dealInfo.saleType) }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-sm font-medium text-green-700">거래 가격</span>
                    <span class="text-sm font-semibold text-green-800">{{
                      formatPrice(dealInfo.price)
                    }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-sm font-medium text-green-700">주소</span>
                    <span class="text-sm text-green-800">{{
                      dealInfo.address || '주소 정보 없음'
                    }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- 거래 상세 내역 섹션 -->
            <div class="bg-blue-50 border border-blue-200 rounded-xl p-4 lg:p-6 mb-8 lg:mb-12">
              <div class="flex items-center mb-4 lg:mb-6">
                <div class="bg-blue-100 rounded-full p-1.5 lg:p-2 mr-3 lg:mr-4">
                  <svg
                    class="w-4 h-4 lg:w-5 lg:h-5 text-blue-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2h12v8H4V6zm2 2a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm0 4a1 1 0 011-1h4a1 1 0 110 2H7a1 1 0 01-1-1z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
                <h2 class="text-lg lg:text-2xl font-bold text-blue-800">거래 상세 내역</h2>
              </div>
              <div class="space-y-4">
                <!-- 계약 체결 정보 -->
                <div class="bg-white rounded-lg p-4 border border-blue-200">
                  <h3 class="font-semibold text-blue-800 mb-3">계약 체결 정보</h3>
                  <div class="grid grid-cols-1 lg:grid-cols-2 gap-3">
                    <div class="flex justify-between">
                      <span class="text-sm text-blue-700">계약 체결일</span>
                      <span class="text-sm text-blue-800">{{
                        formatDate(dealInfo.contractSignedAt)
                      }}</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-sm text-blue-700">최종 거래가</span>
                      <span class="text-sm font-semibold text-blue-800">{{
                        formatPrice(dealInfo.finalPrice || dealInfo.price)
                      }}</span>
                    </div>
                  </div>
                </div>

                <!-- 비용 내역 -->
                <div class="bg-white rounded-lg p-4 border border-blue-200">
                  <h3 class="font-semibold text-blue-800 mb-3">비용 내역</h3>
                  <div class="space-y-2">
                    <div class="flex justify-between">
                      <span class="text-sm text-blue-700">중개 수수료</span>
                      <span class="text-sm text-blue-800">{{
                        dealInfo.commission ? formatPrice(dealInfo.commission) : '정보 없음'
                      }}</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-sm text-blue-700">양도소득세</span>
                      <span class="text-sm text-blue-800">{{
                        dealInfo.transferTax ? formatPrice(dealInfo.transferTax) : '정보 없음'
                      }}</span>
                    </div>
                  </div>
                </div>

                <!-- 거래 참여자 정보 -->
                <div class="bg-white rounded-lg p-4 border border-blue-200">
                  <h3 class="font-semibold text-blue-800 mb-3">거래 참여자</h3>
                  <div class="space-y-2">
                    <div class="flex justify-between">
                      <span class="text-sm text-blue-700">판매자 ID</span>
                      <span class="text-sm text-blue-800">{{
                        dealInfo.sellerId || '정보 없음'
                      }}</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-sm text-blue-700">구매자 ID</span>
                      <span class="text-sm text-blue-800">{{
                        dealInfo.buyerId || '정보 없음'
                      }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- 거래 관련 서류 섹션 -->
            <div class="bg-gray-50 border border-gray-200 rounded-xl p-4 lg:p-6 mb-8 lg:mb-12">
              <div class="flex items-center mb-4 lg:mb-6">
                <div class="bg-gray-100 rounded-full p-1.5 lg:p-2 mr-3 lg:mr-4">
                  <svg
                    class="w-4 h-4 lg:w-5 lg:h-5 text-gray-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2h12v8H4V6zm2 2a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm0 4a1 1 0 011-1h4a1 1 0 110 2H7a1 1 0 01-1-1z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
                <h2 class="text-lg lg:text-2xl font-bold text-gray-800">거래 관련 서류</h2>
              </div>
              <div class="space-y-3">
                <!-- 계약서 -->
                <div
                  class="flex items-center justify-between p-3 rounded-lg border border-gray-200 bg-white"
                >
                  <div class="flex items-center space-x-3">
                    <svg class="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fill-rule="evenodd"
                        d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2h12v8H4V6zm2 2a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm0 4a1 1 0 011-1h4a1 1 0 110 2H7a1 1 0 01-1-1z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    <span class="font-medium text-gray-800">계약서</span>
                  </div>
                  <span class="text-sm text-green-600 font-medium">완료</span>
                </div>

                <!-- 등기부등본 -->
                <div
                  class="flex items-center justify-between p-3 rounded-lg border border-gray-200 bg-white"
                >
                  <div class="flex items-center space-x-3">
                    <svg class="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fill-rule="evenodd"
                        d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2h12v8H4V6zm2 2a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm0 4a1 1 0 011-1h4a1 1 0 110 2H7a1 1 0 01-1-1z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    <span class="font-medium text-gray-800">등기부등본</span>
                  </div>
                  <span class="text-sm text-green-600 font-medium">완료</span>
                </div>

                <!-- 건축물대장 -->
                <div
                  class="flex items-center justify-between p-3 rounded-lg border border-gray-200 bg-white"
                >
                  <div class="flex items-center space-x-3">
                    <svg class="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fill-rule="evenodd"
                        d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2h12v8H4V6zm2 2a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm0 4a1 1 0 011-1h4a1 1 0 110 2H7a1 1 0 01-1-1z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    <span class="font-medium text-gray-800">건축물대장</span>
                  </div>
                  <span class="text-sm text-green-600 font-medium">완료</span>
                </div>
              </div>
            </div>

            <!-- 액션 버튼 섹션 -->
            <div class="rounded-xl p-8 lg:p-12" style="background: var(--bg-2)">
              <div class="text-center">
                <h2 class="text-xl lg:text-3xl font-bold mb-4 lg:mb-6" style="color: var(--text-2)">
                  거래 완료 후 활동
                </h2>
                <p class="text-sm lg:text-base mb-8 lg:mb-12" style="color: var(--text-1)">
                  거래가 완료되었습니다. 리뷰를 작성하거나 채팅방을 통해 추가 문의사항을 확인할 수
                  있습니다.
                </p>
                <div class="flex flex-col sm:flex-row gap-3 lg:gap-4 justify-center items-center">
                  <button
                    @click="goBackToList"
                    class="w-full sm:w-48 py-3 lg:py-4 px-6 lg:px-8 rounded-lg font-semibold flex items-center justify-center gap-2 lg:gap-3 transition-colors text-base lg:text-lg"
                    style="
                      background: var(--bg-2);
                      border: 1px solid var(--text-1);
                      color: var(--text-2);
                    "
                    @mouseenter="$event.target.style.background = 'var(--bg-1)'"
                    @mouseleave="$event.target.style.background = 'var(--bg-2)'"
                  >
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                      ></path>
                    </svg>
                    거래 목록
                  </button>
                  <button
                    @click="handleChat"
                    class="w-full sm:w-48 py-3 lg:py-4 px-6 lg:px-8 rounded-lg font-semibold flex items-center justify-center gap-2 lg:gap-3 transition-colors text-base lg:text-lg text-white"
                    style="background: var(--brand-3)"
                    @mouseenter="$event.target.style.background = 'var(--brand-2)'"
                    @mouseleave="$event.target.style.background = 'var(--brand-3)'"
                  >
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      ></path>
                    </svg>
                    채팅방
                  </button>
                  <button
                    @click="handleReview"
                    class="w-full sm:w-48 py-3 lg:py-4 px-6 lg:px-8 rounded-lg font-semibold flex items-center justify-center gap-2 lg:gap-3 transition-colors text-base lg:text-lg text-white"
                    style="background: #8b5cf6"
                    @mouseenter="$event.target.style.background = '#7c3aed'"
                    @mouseleave="$event.target.style.background = '#8b5cf6'"
                  >
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                      ></path>
                    </svg>
                    리뷰 작성
                  </button>
                </div>

                <!-- 거래 완료 축하 메시지 -->
                <div class="mt-8 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div class="flex items-center justify-center space-x-2">
                    <svg class="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    <p class="text-green-800 font-medium">
                      축하합니다! 거래가 성공적으로 완료되었습니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 추가 스타일이 필요한 경우 여기에 작성 */
</style>
