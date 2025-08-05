<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-md w-[400px]">
      <h2 class="text-xl font-semibold mb-6 text-center">주소를 입력하세요</h2>

      <!-- 기본 주소 -->
      <div class="mb-4">
        <label class="block mb-1 font-medium text-sm"
          >기본 주소 <span class="text-red-500">*</span></label
        >
        <input
          type="text"
          v-model="baseAddress"
          placeholder="주소 검색"
          readonly
          @click="openAddressSearch"
          class="w-full cursor-pointer px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300 text-sm bg-gray-50"
        />
      </div>

      <!-- 상세 주소 -->
      <div class="mb-6">
        <label class="block mb-1 font-medium text-sm"
          >상세 주소 <span class="text-red-500">*</span></label
        >
        <div class="flex space-x-2">
          <input
            v-model="building"
            placeholder="동"
            class="w-1/2 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300 text-sm"
          />
          <input
            v-model="unit"
            placeholder="호수"
            class="w-1/2 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300 text-sm"
          />
        </div>
      </div>

      <!-- 다음 버튼 -->
      <button
        @click="goToSignUp"
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

const router = useRouter()

const baseAddress = ref('')
const building = ref('')
const unit = ref('')
const errorMessage = ref('')

//주소 api
function openAddressSearch() {
  new window.daum.Postcode({
    oncomplete(data) {
      baseAddress.value = data.address
    },
  }).open()
}

// 다음으로 이동
function goToSignUp() {
  errorMessage.value = ''
  //api 연결 후
  // if (!baseAddress.value || !building.value || !unit.value) {
  //   errorMessage.value = '모든 항목을 입력해주세요.'
  //   return
  // }

  // 주소 정보는 sessionStorage 등에 저장하거나 store에 넘길 수 있음
  sessionStorage.setItem('address', baseAddress.value)
  sessionStorage.setItem('building', building.value)
  sessionStorage.setItem('unit', unit.value)

  router.push('/auth/signup')
}
</script>
