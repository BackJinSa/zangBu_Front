<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-md w-[400px]">
      <h2 class="text-xl font-semibold mb-6 text-center">본인인증을 진행해주세요</h2>

      <!-- 이름 -->
      <div class="mb-4">
        <label class="block mb-1 font-medium text-sm"
          >이름 <span class="text-red-500">*</span></label
        >
        <input
          v-model="name"
          type="text"
          placeholder="이름을 입력하세요"
          class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300 text-sm"
        />
      </div>

      <!-- 주민등록번호 -->
      <div class="mb-4">
        <label class="block mb-1 font-medium text-sm"
          >주민등록번호 <span class="text-red-500">*</span></label
        >
        <div class="flex space-x-2">
          <input
            v-model="rrnFront"
            type="text"
            placeholder="ex) 900101"
            class="w-1/2 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300 text-sm"
          />
          <input
            v-model="rrnBack"
            type="text"
            placeholder="주민등록번호 뒤 7자리"
            class="w-1/2 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300 text-sm"
          />
        </div>
      </div>

      <!-- 주민등록번호 발급일자 -->
      <div class="mb-4">
        <label class="block mb-1 font-medium text-sm"
          >주민등록번호 발급일자 <span class="text-red-500">*</span></label
        >
        <input
          v-model="issuedDate"
          type="text"
          placeholder="ex) 150809"
          class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300 text-sm"
        />
      </div>

      <!-- 통신사 -->
      <div class="mb-4">
        <label class="block mb-1 font-medium text-sm"
          >통신사 <span class="text-red-500">*</span></label
        >
        <select
          v-model="carrier"
          class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300 text-sm"
        >
          <option value="" disabled selected>통신사를 선택하세요</option>
          <option value="SKT">SKT</option>
          <option value="KT">KT</option>
          <option value="LGU+">LG U+</option>
          <option value="알뜰폰">알뜰폰</option>
        </select>
      </div>

      <!-- 전화번호 -->
      <div class="mb-6">
        <label class="block mb-1 font-medium text-sm"
          >전화번호 <span class="text-red-500">*</span></label
        >
        <input
          v-model="phone"
          type="text"
          placeholder="ex) 010 - 1234 - 5678"
          class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300 text-sm"
        />
      </div>

      <!-- 다음 버튼 -->
      <button
        @click="handleSubmit"
        class="w-full bg-brand-4 hover:bg-brand-3 text-white py-2 rounded"
      >
        다음
      </button>

      <p v-if="errorMessage" class="text-red-500 text-sm mt-3 text-center">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()

// 상태
const name = ref('')
const rrnFront = ref('')
const rrnBack = ref('')
const issuedDate = ref('')
const carrier = ref('')
const phone = ref('')
const errorMessage = ref('')

// 본인인증 제출
async function handleSubmit() {
  errorMessage.value = ''

  if (!name.value || !rrnFront.value || !rrnBack.value || !issuedDate.value) {
    errorMessage.value = '모든 필수 항목을 입력해주세요.'
    return
  }

  const payload = {
    name: name.value,
    identity: rrnFront.value + rrnBack.value,
    issuedDate: issuedDate.value,
    carrier: carrier.value,
    phone: phone.value.replace(/[^0-9]/g, ''),
  }

  // try {
  //   const response = await axios.post('/auth/verify', payload)
  //   const result = response.data

  //   if (result.resAuthenticity === 'Y') {
  //     sessionStorage.setItem('verified', 'true')
  //     router.push('/auth/signup')
  //   } else {
  //     errorMessage.value = '본인 인증에 실패했습니다: ' + result.resAuthenticityDesc
  //   }
  // } catch (err) {
  //   errorMessage.value = '인증 요청 중 오류가 발생했습니다.'
  // }
  router.push('/auth/enter-address')
}
</script>
