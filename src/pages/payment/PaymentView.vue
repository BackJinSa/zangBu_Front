<script setup>
import { ref, reactive, onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { loadTossPayments, ANONYMOUS } from '@tosspayments/tosspayments-sdk'
import { getBuyerInfo } from '@/api/payment/payment.js'

const router = useRouter()

console.log('PaymentView 스크립트 로드됨')

// 결제 폼 데이터
const paymentForm = reactive({
  amount: 50000,
  orderName: '',
  customerName: '',
  customerEmail: '',
  customerMobilePhone: '',
})

// UI 상태
const loading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')
const tossPayments = ref(null)
const widgets = ref(null)
const buyerInfoLoading = ref(false)

// 결제 금액 옵션
const amountOptions = [
  { value: 5000, label: '5,000원' },
  { value: 10000, label: '10,000원' },
  { value: 15000, label: '15,000원' },
  { value: 20000, label: '20,000원' },
  { value: 50000, label: '50,000원' },
]

// 주문 ID 생성
const generateOrderId = () => {
  return window.btoa(Math.random()).slice(0, 20)
}

// 구매자 정보 로드
const loadBuyerInfo = async () => {
  buyerInfoLoading.value = true
  try {
    const buyerInfo = await getBuyerInfo()
    paymentForm.customerName = buyerInfo.name || ''
    paymentForm.customerEmail = buyerInfo.email || ''
    paymentForm.customerMobilePhone = buyerInfo.phone || ''
    console.log('구매자 정보 로드 완료:', buyerInfo)
  } catch (error) {
    console.error('구매자 정보 로드 실패:', error)
    errorMessage.value = '구매자 정보를 불러오는데 실패했습니다. 수동으로 입력해주세요.'
  } finally {
    buyerInfoLoading.value = false
  }
}

// 토스페이먼츠 초기화
const initializeTossPayments = async () => {
  try {
    console.log('토스페이먼츠 SDK 로딩 시작...')
    console.log('loadTossPayments 함수:', typeof loadTossPayments)
    console.log('ANONYMOUS 상수:', ANONYMOUS)

    if (typeof loadTossPayments !== 'function') {
      throw new Error('loadTossPayments 함수를 찾을 수 없습니다.')
    }

    tossPayments.value = await loadTossPayments('test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm')
    console.log('토스페이먼츠 SDK 로딩 완료')
    console.log('tossPayments 객체:', tossPayments.value)

    widgets.value = tossPayments.value.widgets({
      customerKey: ANONYMOUS,
    })
    console.log('위젯 초기화 완료')
    console.log('widgets 객체:', widgets.value)

    // 결제 금액 설정
    await widgets.value.setAmount({
      currency: 'KRW',
      value: paymentForm.amount,
    })
    console.log('결제 금액 설정 완료')

    // 결제 수단 렌더링
    await widgets.value.renderPaymentMethods({
      selector: '#payment-method',
      variantKey: 'DEFAULT',
    })
    console.log('결제 수단 위젯 렌더링 완료')

    // 약관 렌더링
    await widgets.value.renderAgreement({
      selector: '#agreement',
      variantKey: 'AGREEMENT',
    })
    console.log('약관 위젯 렌더링 완료')

    successMessage.value = '토스페이먼츠 결제 시스템이 준비되었습니다.'
  } catch (error) {
    console.error('토스페이먼츠 초기화 실패:', error)
    errorMessage.value = `결제 시스템 초기화에 실패했습니다: ${error.message}`
  }
}

// 컴포넌트 마운트 시 초기화
onMounted(async () => {
  console.log('PaymentView 컴포넌트 마운트됨')
  await nextTick()
  console.log('nextTick 완료')

  // 구매자 정보 로드
  await loadBuyerInfo()

  // 토스페이먼츠 초기화
  await initializeTossPayments()
})

// 결제 금액 변경 시 위젯 업데이트
const handleAmountChange = async () => {
  if (widgets.value) {
    await widgets.value.setAmount({
      currency: 'KRW',
      value: paymentForm.amount,
    })
  }
}

// 결제 요청
const handlePayment = async () => {
  if (!paymentForm.orderName.trim()) {
    errorMessage.value = '상품명을 입력해주세요.'
    return
  }

  if (!paymentForm.customerName.trim()) {
    errorMessage.value = '구매자 정보를 불러오는 중입니다. 잠시 후 다시 시도해주세요.'
    return
  }

  if (!paymentForm.customerEmail.trim()) {
    errorMessage.value = '구매자 정보를 불러오는 중입니다. 잠시 후 다시 시도해주세요.'
    return
  }

  if (!paymentForm.customerMobilePhone.trim()) {
    errorMessage.value = '구매자 정보를 불러오는 중입니다. 잠시 후 다시 시도해주세요.'
    return
  }

  if (!widgets.value) {
    errorMessage.value =
      '토스페이먼츠 결제 시스템이 초기화되지 않았습니다. 페이지를 새로고침해주세요.'
    return
  }

  loading.value = true
  errorMessage.value = ''
  successMessage.value = ''

  try {
    console.log('결제 요청 시작...')
    await widgets.value.requestPayment({
      orderId: generateOrderId(),
      orderName: paymentForm.orderName,
      successUrl: `${window.location.origin}/payment/success`,
      failUrl: `${window.location.origin}/payment/fail`,
      customerEmail: paymentForm.customerEmail,
      customerName: paymentForm.customerName,
      customerMobilePhone: paymentForm.customerMobilePhone,
    })
    console.log('결제 요청 완료')
  } catch (error) {
    console.error('결제 요청 실패:', error)
    errorMessage.value = `결제 요청 중 오류가 발생했습니다: ${error.message}`
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-2xl mx-auto px-4">
      <!-- 헤더 -->
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">결제 페이지</h1>
        <p class="text-gray-600">토스페이먼츠 위젯을 통한 안전한 결제</p>
      </div>

      <!-- 결제 폼 -->
      <div class="bg-white rounded-lg shadow-md p-6">
        <!-- 에러 메시지 -->
        <div v-if="errorMessage" class="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
          <p class="text-red-600 text-sm">{{ errorMessage }}</p>
        </div>

        <!-- 성공 메시지 -->
        <div v-if="successMessage" class="mb-4 p-4 bg-green-50 border border-green-200 rounded-md">
          <p class="text-green-600 text-sm">{{ successMessage }}</p>
        </div>

        <form @submit.prevent="handlePayment" class="space-y-6">
          <!-- 결제 금액 선택 -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"> 결제 금액 </label>
            <select
              v-model="paymentForm.amount"
              @change="handleAmountChange"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option v-for="option in amountOptions" :key="option.value" :value="option.value">
                {{ option.label }}
              </option>
            </select>
          </div>

          <!-- 상품명 -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              상품명 <span class="text-red-500">*</span>
            </label>
            <input
              type="text"
              v-model="paymentForm.orderName"
              placeholder="상품명을 입력하세요"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <!-- 구매자 정보 섹션 -->
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-medium text-gray-900">구매자 정보</h3>
              <div class="flex items-center space-x-2">
                <div v-if="buyerInfoLoading" class="flex items-center text-sm text-blue-600">
                  <svg
                    class="animate-spin -ml-1 mr-2 h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      class="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      stroke-width="4"
                    ></circle>
                    <path
                      class="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  정보 불러오는 중...
                </div>
                <button
                  v-if="!buyerInfoLoading"
                  type="button"
                  @click="loadBuyerInfo"
                  class="text-sm text-blue-600 hover:text-blue-800 underline"
                >
                  정보 새로고침
                </button>
              </div>
            </div>

            <!-- 구매자 이름 -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"> 구매자 이름 </label>
              <input
                type="text"
                v-model="paymentForm.customerName"
                :placeholder="buyerInfoLoading ? '정보를 불러오는 중...' : '구매자 이름'"
                readonly
                class="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700 cursor-not-allowed"
              />
            </div>

            <!-- 이메일 -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"> 이메일 </label>
              <input
                type="email"
                v-model="paymentForm.customerEmail"
                :placeholder="buyerInfoLoading ? '정보를 불러오는 중...' : '이메일'"
                readonly
                class="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700 cursor-not-allowed"
              />
            </div>

            <!-- 휴대폰 번호 -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"> 휴대폰 번호 </label>
              <input
                type="tel"
                v-model="paymentForm.customerMobilePhone"
                :placeholder="buyerInfoLoading ? '정보를 불러오는 중...' : '휴대폰 번호'"
                readonly
                class="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700 cursor-not-allowed"
              />
            </div>
          </div>

          <!-- 결제 정보 요약 -->
          <div class="bg-gray-50 p-4 rounded-md">
            <h3 class="text-lg font-medium text-gray-900 mb-3">결제 정보</h3>
            <div class="space-y-2 text-sm">
              <div class="flex justify-between">
                <span class="text-gray-600">결제 금액:</span>
                <span class="font-medium">{{ paymentForm.amount.toLocaleString() }}원</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">상품명:</span>
                <span class="font-medium text-gray-900">{{
                  paymentForm.orderName || '입력 필요'
                }}</span>
              </div>
            </div>
          </div>

          <!-- 토스페이먼츠 위젯 -->
          <div class="space-y-4">
            <!-- 결제 수단 선택 위젯 -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"> 결제 수단 선택 </label>
              <div id="payment-method" class="w-full">
                <!-- 위젯 로딩 중 또는 실패 시 대체 UI -->
                <div v-if="!widgets" class="p-4 bg-gray-50 border border-gray-200 rounded-md">
                  <p class="text-gray-600 text-sm">토스페이먼츠 위젯을 로딩 중입니다...</p>
                </div>
              </div>
            </div>

            <!-- 약관 동의 위젯 -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"> 약관 동의 </label>
              <div id="agreement" class="w-full">
                <!-- 위젯 로딩 중 또는 실패 시 대체 UI -->
                <div v-if="!widgets" class="p-4 bg-gray-50 border border-gray-200 rounded-md">
                  <p class="text-gray-600 text-sm">약관 동의 위젯을 로딩 중입니다...</p>
                </div>
              </div>
            </div>
          </div>

          <!-- 결제 버튼 -->
          <div class="btn-wrapper w-full">
            <button
              type="submit"
              :disabled="loading"
              class="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              <span v-if="loading" class="flex items-center justify-center">
                <svg
                  class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                결제 처리 중...
              </span>
              <span v-else>결제하기</span>
            </button>
          </div>
        </form>
      </div>

      <!-- 안내사항 -->
      <div class="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 class="text-sm font-medium text-blue-900 mb-2">💡 안내사항</h3>
        <ul class="text-sm text-blue-800 space-y-1">
          <li>• 구매자 정보(이름, 이메일, 휴대폰 번호)는 백엔드에서 자동으로 불러와집니다.</li>
          <li>• 구매자 정보는 읽기 전용이며, 수정할 수 없습니다.</li>
          <li>• 정보가 표시되지 않으면 "정보 새로고침" 버튼을 클릭해주세요.</li>
          <li>• 이 페이지는 토스페이먼츠 위젯을 사용합니다.</li>
          <li>• 실제 결제가 이루어지지 않으며, 샌드박스 환경에서 테스트됩니다.</li>
          <li>• 결제 완료 후 성공/실패 페이지로 리다이렉트됩니다.</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 토스페이먼츠 위젯 스타일 */
.btn-wrapper {
  padding: 0 24px;
}

#payment-method,
#agreement {
  width: 100%;
  min-height: 100px;
}
</style>
