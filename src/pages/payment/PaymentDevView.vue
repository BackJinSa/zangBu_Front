<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import {
  getEntitlements,
  consumePerCaseCredit,
  recordDownload,
  confirmPayment,
} from '@/api/payment/payment'

const router = useRouter()

const apiBaseUrl = ref(localStorage.getItem('apiBaseUrl') || 'http://localhost:8080')
const debugMemberId = ref(localStorage.getItem('debugMemberId') || 'test-member-1')

const logs = ref([])
const addLog = (msg) => logs.value.unshift(`[${new Date().toLocaleTimeString()}] ${msg}`)

const saveDevSettings = () => {
  localStorage.setItem('apiBaseUrl', apiBaseUrl.value)
  localStorage.setItem('debugMemberId', debugMemberId.value)
  addLog('개발 설정 저장 완료 (apiBaseUrl, debugMemberId)')
}

const testEntitlements = async () => {
  try {
    const res = await getEntitlements()
    addLog(`권한 조회: ${JSON.stringify(res)}`)
  } catch (e) {
    addLog(`권한 조회 실패: ${e?.message || e}`)
  }
}

const testConsume = async () => {
  try {
    const res = await consumePerCaseCredit({
      resourceType: 'DEAL_DOCUMENT',
      resourceId: '123:register',
    })
    addLog(`건당 차감 완료: ${JSON.stringify(res)}`)
  } catch (e) {
    addLog(`건당 차감 실패: ${e?.message || e}`)
  }
}

const testRecordDownload = async () => {
  try {
    const res = await recordDownload({
      resourceType: 'DEAL_DOCUMENT',
      resourceId: '123:register',
      usedPaymentType: 'PER_CASE',
      orderId: 'zb_dev',
    })
    addLog(`다운로드 기록 완료: ${JSON.stringify(res)}`)
  } catch (e) {
    addLog(`다운로드 기록 실패: ${e?.message || e}`)
  }
}

const testConfirmPaymentPerCase = async () => {
  try {
    const res = await confirmPayment({
      paymentKey: 'pk_dev',
      orderId: `zb_${Date.now()}`,
      amount: 5000,
      productType: 'PER_CASE',
      productId: 'per-case',
      price: 5000,
      orderName: '건당 결제(DEV)',
    })
    addLog(`건당 결제 승인 완료: ${JSON.stringify(res)}`)
  } catch (e) {
    addLog(`건당 결제 승인 실패: ${e?.message || e}`)
  }
}

const testConfirmPaymentMembership = async () => {
  try {
    const res = await confirmPayment({
      paymentKey: 'pk_dev',
      orderId: `zb_${Date.now()}`,
      amount: 29000,
      productType: 'MEMBERSHIP',
      productId: 'membership',
      price: 29000,
      orderName: '멤버십(DEV)',
    })
    addLog(`멤버십 결제 승인 완료: ${JSON.stringify(res)}`)
  } catch (e) {
    addLog(`멤버십 결제 승인 실패: ${e?.message || e}`)
  }
}

const goPayment = () => router.push('/payment')
</script>

<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="mx-auto px-4 max-w-4xl">
      <h1 class="text-2xl font-bold mb-4">Payment Dev Tools</h1>

      <div class="bg-white rounded-lg shadow p-4 mb-6">
        <h2 class="font-semibold mb-2">개발 설정</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">API Base URL</label>
            <input
              v-model="apiBaseUrl"
              class="w-full border rounded px-3 py-2"
              placeholder="http://localhost:8080"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Debug Member Id (X-Member-Id)</label
            >
            <input
              v-model="debugMemberId"
              class="w-full border rounded px-3 py-2"
              placeholder="test-member-1"
            />
          </div>
        </div>
        <div class="mt-3">
          <button @click="saveDevSettings" class="bg-blue-600 text-white px-4 py-2 rounded">
            설정 저장
          </button>
          <button @click="goPayment" class="ml-2 bg-gray-600 text-white px-4 py-2 rounded">
            결제 화면으로
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-white rounded-lg shadow p-4">
          <h2 class="font-semibold mb-2">권한/차감/기록 테스트</h2>
          <div class="space-x-2">
            <button @click="testEntitlements" class="bg-gray-800 text-white px-3 py-2 rounded">
              권한 조회
            </button>
            <button @click="testConsume" class="bg-indigo-600 text-white px-3 py-2 rounded">
              건당 차감
            </button>
            <button @click="testRecordDownload" class="bg-green-600 text-white px-3 py-2 rounded">
              다운로드 기록
            </button>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-4">
          <h2 class="font-semibold mb-2">결제 승인(서버 직접 호출)</h2>
          <div class="space-x-2">
            <button
              @click="testConfirmPaymentPerCase"
              class="bg-blue-600 text-white px-3 py-2 rounded"
            >
              건당 승인
            </button>
            <button
              @click="testConfirmPaymentMembership"
              class="bg-teal-600 text-white px-3 py-2 rounded"
            >
              멤버십 승인
            </button>
          </div>
          <p class="mt-2 text-sm text-gray-500">토스 결제 없이 서버 승인 API만 직접 호출합니다.</p>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow p-4 mt-6">
        <h2 class="font-semibold mb-2">Logs</h2>
        <div class="h-64 overflow-auto bg-gray-50 border p-2 text-sm">
          <div v-for="(line, idx) in logs" :key="idx" class="whitespace-pre-wrap">{{ line }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
