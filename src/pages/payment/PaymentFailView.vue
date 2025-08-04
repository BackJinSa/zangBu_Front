<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const errorInfo = ref({
  code: '',
  message: '',
})

onMounted(() => {
  // URL 파라미터에서 에러 정보 가져오기
  const urlParams = new URLSearchParams(window.location.search)
  errorInfo.value = {
    code: urlParams.get('code') || 'N/A',
    message: urlParams.get('message') || '결제 처리 중 오류가 발생했습니다.',
  }
})

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
      <div class="flex-column align-center w-100 max-w-540">
        <img
          src="https://static.toss.im/lotties/error-spot-no-loop-space-apng.png"
          width="160"
          height="160"
          alt="에러"
        />
        <h2 class="title">결제를 실패했어요</h2>

        <div class="response-section w-100">
          <div class="flex justify-between">
            <span class="response-label">code</span>
            <span class="response-text">{{ errorInfo.code }}</span>
          </div>
          <div class="flex justify-between">
            <span class="response-label">message</span>
            <span class="response-text">{{ errorInfo.message }}</span>
          </div>
        </div>

        <div class="w-100 button-group">
          <button @click="goToPayment" class="btn">다시 테스트하기</button>
          <div class="flex" style="gap: 16px">
            <button @click="goToHome" class="btn w-100">홈으로 돌아가기</button>
            <a
              href="https://docs.tosspayments.com/reference/error-codes"
              target="_blank"
              rel="noreferrer noopener"
              class="btn w-100"
            >
              에러코드 문서보기
            </a>
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
  text-decoration: none;
  display: inline-block;
  text-align: center;
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
