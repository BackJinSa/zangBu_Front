<template>
  <div class="min-h-screen flex flex-col bg-gray-100 p-4">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md mx-auto flex flex-col flex-grow">
      <!-- 상단 폼 영역 -->
      <div class="flex-grow">
        <h2 class="text-xl font-semibold mb-6 text-center">본인인증을 진행해주세요</h2>

        <!-- 이름 -->
        <div class="mb-4">
          <label class="block mb-1 font-medium text-sm">
            이름 <span class="text-red-500">*</span>
          </label>
          <input
            v-model="name"
            type="text"
            placeholder="이름을 입력하세요"
            class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300 text-sm"
          />
        </div>

        <!-- 주민등록번호 -->
        <div class="mb-4">
          <label class="block mb-1 font-medium text-sm">
            주민등록번호 <span class="text-red-500">*</span>
          </label>
          <div class="flex space-x-2">
            <input
              v-model="birth"
              type="text"
              placeholder="ex) 900101"
              class="w-1/2 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300 text-sm"
            />
            <input
              v-model="identity"
              type="text"
              placeholder="주민등록번호 뒤 7자리"
              class="w-1/2 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300 text-sm"
            />
          </div>
        </div>

        <!-- 주민등록번호 발급일자 -->
        <div class="mb-4">
          <label class="block mb-1 font-medium text-sm">
            주민등록번호 발급일자 <span class="text-red-500">*</span>
          </label>
          <input
            v-model="issueDate"
            type="text"
            placeholder="ex) 150809"
            class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300 text-sm"
          />
        </div>

        <!-- 통신사 -->
        <div class="mb-4">
          <label class="block mb-1 font-medium text-sm">
            통신사 <span class="text-red-500">*</span>
          </label>
          <select
            v-model="telecom"
            class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300 text-sm"
          >
            <option value="" disabled>통신사를 선택하세요</option>
            <option value="SKT">SKT</option>
            <option value="KT">KT</option>
            <option value="LGU+">LG U+</option>
            <option value="SKT알뜰폰">SKT 알뜰폰</option>
            <option value="KT알뜰폰">KT 알뜰폰</option>
            <option value="LGU+알뜰폰">LGU+ 알뜰폰</option>
          </select>
        </div>

        <!-- 전화번호 -->
        <div class="mb-6">
          <label class="block mb-1 font-medium text-sm">
            전화번호 <span class="text-red-500">*</span>
          </label>
          <input
            v-model="phone"
            type="text"
            placeholder="ex) 01012345678"
            class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300 text-sm"
          />
        </div>

        <!-- 보안문자 입력: 인증하기 클릭 후 노출 -->
        <div v-if="showCaptcha" class="mt-6 pt-6 border-t">
          <label class="block mb-2 font-medium text-sm">
            보안문자 입력 <span class="text-red-500">*</span>
          </label>

          <div class="flex flex-col sm:flex-row gap-4 items-stretch">
            <!-- 캡차 이미지 (서버 URL 바인딩) -->
            <img
              :src="captchaImageUrl"
              alt="captcha"
              class="w-full sm:w-[240px] h-20 rounded border border-gray-300 object-cover"
            />
            <!-- 우측: 입력 + 확인 버튼 -->
            <div class="flex-1 flex flex-col gap-2 sm:max-w-[260px]">
              <input
                v-model="captchaInput"
                type="text"
                placeholder="보안문자 입력"
                class="h-10 w-full px-3 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300 text-sm"
                @keyup.enter="verifyCaptcha"
              />
              <button
                type="button"
                class="h-10 w-full bg-brand-4 hover:bg-brand-3 text-white rounded"
                @click="verifyCaptcha"
              >
                확인
              </button>
              <p v-if="captchaVerified" class="text-green-600 text-xs">보안문자 확인 완료</p>
            </div>
          </div>
        </div>

        <!-- 에러 -->
        <p v-if="errorMessage" class="text-red-500 text-sm mt-3 text-center">
          {{ errorMessage }}
        </p>
      </div>

      <!-- 하단 메인 버튼: 카드 하단 고정 -->
      <div class="w-full mt-6">
        <button
          @click="onPrimary"
          class="w-full bg-brand-4 hover:bg-brand-3 text-white py-2 rounded disabled:opacity-60"
          :disabled="showCaptcha && !captchaVerified"
        >
          {{ showCaptcha ? '다음' : '인증하기' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()

// 폼 상태
const name = ref('')
const birth = ref('')
const identity = ref('')
const issueDate = ref('')
const telecom = ref('')
const phone = ref('')

// 에러/캡차 상태
const errorMessage = ref('')
const showCaptcha = ref(false)
const captchaImageUrl = ref('https://dummyimage.com/160x48/eeeeee/000000&text=123456') // 서버 URL로 교체
const captchaInput = ref('')
const captchaVerified = ref(false)

function getTelecomCode(telecomValue) {
  if (telecomValue.includes('SKT')) return '0'
  if (telecomValue.includes('KT')) return '1'
  if (telecomValue.includes('LGU+')) return '2'
  return ''
}

// 하단 메인 버튼
async function onPrimary() {
  if (!showCaptcha.value) {
    await handleSubmit() // 1단계: 기본정보 검증 → 캡차 열기
  } else {
    // 2단계: 인증 완료 플래그 저장 후 이동
    if (captchaVerified.value) {
      sessionStorage.setItem('verified', 'true')
      router.push('/auth/signup')
    }
  }
}

// 1단계: 본인인증 제출 -> 캡차 열기
async function handleSubmit() {
  errorMessage.value = ''

  if (
    !name.value ||
    !birth.value ||
    !identity.value ||
    !issueDate.value ||
    !telecom.value ||
    !phone.value
  ) {
    errorMessage.value = '모든 필수 항목을 입력해주세요.'
    return
  }

  // 실제 API 호출 위치:
  // const { data } = await axios.post('/api/identity/verify', {
  //   name: name.value,
  //   birth: birth.value,
  //   identity: identity.value,
  //   issueDate: issueDate.value,
  //   telecom: getTelecomCode(telecom.value),
  //   phone: phone.value.replace(/[^0-9]/g, '')
  // })
  // captchaImageUrl.value = data.captchaImageUrl

  showCaptcha.value = true
  captchaVerified.value = false
  errorMessage.value = ''
}

// 캡차 확인
async function verifyCaptcha() {
  // 실제 API 예시
  // try {
  //   await axios.post('/api/identity/captcha/verify', {
  //     captchaId: ...,   // 서버가 내려준 아이디
  //     answer: captchaInput.value
  //   })
  //   captchaVerified.value = true
  //   errorMessage.value = ''
  // } catch (e) {
  //   captchaVerified.value = false
  //   errorMessage.value = e?.response?.data?.message || '보안문자 검증에 실패했어요.'
  //   return
  // }

  // 임시 로직(입력만 있으면 성공으로 처리)
  if (!captchaInput.value?.trim()) {
    captchaVerified.value = false
    errorMessage.value = '보안문자를 입력해주세요.'
    return
  }
  captchaVerified.value = true
  errorMessage.value = ''
}

// (옵션) 캡차 새로고침이 필요할 때 사용
function refreshCaptcha() {
  captchaImageUrl.value =
    'https://dummyimage.com/160x48/eeeeee/000000&text=' +
    Math.floor(100000 + Math.random() * 900000)
  captchaInput.value = ''
  captchaVerified.value = false
  errorMessage.value = ''
}
</script>
