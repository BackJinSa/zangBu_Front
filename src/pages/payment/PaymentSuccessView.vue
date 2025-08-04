<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { confirmPayment } from '@/api/payment/payment.js'

const router = useRouter()

const paymentInfo = ref({
  paymentKey: '',
  orderId: '',
  amount: 0,
})

const loading = ref(false)
const confirmed = ref(false)
const errorMessage = ref('')

onMounted(() => {
  // URL 파라미터에서 결제 정보 가져오기
  const urlParams = new URLSearchParams(window.location.search)
  paymentInfo.value = {
    paymentKey: urlParams.get('paymentKey') || '',
    orderId: urlParams.get('orderId') || '',
    amount: parseInt(urlParams.get('amount') || '0'),
  }
})

// 결제 승인
const handleConfirmPayment = async () => {
  if (!paymentInfo.value.paymentKey || !paymentInfo.value.orderId || !paymentInfo.value.amount) {
    errorMessage.value = '결제 정보가 올바르지 않습니다.'
    return
  }

  loading.value = true
  errorMessage.value = ''

  try {
    await confirmPayment({
      paymentKey: paymentInfo.value.paymentKey,
      orderId: paymentInfo.value.orderId,
      amount: paymentInfo.value.amount,
    })

    confirmed.value = true
  } catch (error) {
    console.error('결제 승인 실패:', error)
    errorMessage.value = '결제 승인에 실패했습니다.'
  } finally {
    loading.value = false
  }
}

const goToHome = () => {
  router.push('/')
}

const goToPayment = () => {
  router.push('/payment')
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center py-8">
    <div class="max-w-md mx-auto px-4">
      <!-- 로딩 상태 -->
      <div v-if="!confirmed" class="flex-column align-center confirm-loading w-100 max-w-540">
        <div class="flex-column align-center">
          <img
            src="https://static.toss.im/lotties/loading-spot-apng.png"
            width="120"
            height="120"
            alt="로딩"
          />
          <h2 class="title text-center">결제 요청까지 성공했어요.</h2>
          <h4 class="text-center description">결제 승인하고 완료해보세요.</h4>
        </div>

        <!-- 에러 메시지 -->
        <div v-if="errorMessage" class="w-full mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
          <p class="text-red-600 text-sm">{{ errorMessage }}</p>
        </div>

        <div class="w-100">
          <button
            id="confirmPaymentButton"
            @click="handleConfirmPayment"
            :disabled="loading"
            class="btn primary w-100"
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
              승인 중...
            </span>
            <span v-else>결제 승인하기</span>
          </button>
        </div>
      </div>

      <!-- 성공 상태 -->
      <div v-else class="flex-column align-center confirm-success w-100 max-w-540">
        <img
          src="https://static.toss.im/illusts/check-blue-spot-ending-frame.png"
          width="120"
          height="120"
          alt="성공"
        />
        <h2 class="title">결제를 완료했어요</h2>

        <div class="response-section w-100">
          <div class="flex justify-between">
            <span class="response-label">결제 금액</span>
            <span class="response-text">{{ paymentInfo.amount.toLocaleString() }}원</span>
          </div>
          <div class="flex justify-between">
            <span class="response-label">주문번호</span>
            <span class="response-text">{{ paymentInfo.orderId }}</span>
          </div>
          <div class="flex justify-between">
            <span class="response-label">paymentKey</span>
            <span class="response-text">{{ paymentInfo.paymentKey }}</span>
          </div>
        </div>

        <div class="w-100 button-group">
          <div class="flex" style="gap: 16px">
            <button @click="goToPayment" class="btn w-100">다시 테스트하기</button>
            <button @click="goToHome" class="btn w-100">홈으로 돌아가기</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 토스페이먼츠 스타일 */
.w-100 {
  width: 100%;
}

.h-100 {
  height: 100%;
}

.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;
  overflow: auto;
}

.max-w-540 {
  max-width: 540px;
}

.btn-wrapper {
  padding: 0 24px;
}

.btn {
  padding: 11px 22px;
  border: none;
  border-radius: 8px;
  background-color: #f2f4f6;
  color: #4e5968;
  font-weight: 600;
  font-size: 17px;
  cursor: pointer;
  transition: all 0.2s;
}

.btn:hover {
  background-color: #e5e7eb;
}

.btn.primary {
  background-color: #3282f6;
  color: #f9fcff;
}

.btn.primary:hover {
  background-color: #2563eb;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.text-center {
  text-align: center;
}

.flex {
  display: flex;
}

.flex-column {
  display: flex;
  flex-direction: column;
}

.justify-center {
  justify-content: center;
}

.justify-between {
  justify-content: space-between;
}

.align-center {
  align-items: center;
}

.confirm-loading {
  margin-top: 72px;
  height: 400px;
  justify-content: space-between;
}

.confirm-success {
  margin-top: 72px;
}

.button-group {
  margin-top: 32px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 16px;
}

.title {
  margin-top: 32px;
  margin-bottom: 0;
  color: #191f28;
  font-weight: bold;
  font-size: 24px;
}

.description {
  margin-top: 8px;
  color: #4e5968;
  font-size: 17px;
  font-weight: 500;
}

.response-section {
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  font-size: 20px;
}

.response-section .response-label {
  font-weight: 600;
  color: #333d48;
  font-size: 17px;
}

.response-section .response-text {
  font-weight: 500;
  color: #4e5968;
  font-size: 17px;
  padding-left: 16px;
  word-break: break-word;
  text-align: right;
}

.color-grey {
  color: #b0b8c1;
}
</style>
