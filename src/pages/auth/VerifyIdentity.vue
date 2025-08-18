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
                class="h-10 w-full bg-brand-4 hover:bg-brand-3 text-white rounded disabled:opacity-60"
                @click="verifyCaptcha"
                :disabled="loading"
              >
                {{ loading ? '로딩중...' : '확인' }}
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
import { encryptRsa } from '@/utils/rsa'
import { requestAuth, requestAuthStep2 } from '@/api/auth/auth'

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
const captchaImageUrl = ref('')
const captchaInput = ref('')
const captchaVerified = ref(false)
const sessionKey = ref('')
const loading = ref(false)

function getTelecomCode(telecomValue) {
  if (telecomValue.includes('SKT')) return '0'
  if (telecomValue.includes('KT')) return '1'
  if (telecomValue.includes('LGU+')) return '2'
  return ''
}

// base64 string → data:image/png;base64 변환
function toPngDataUrlFromBase64(b64) {
  if (!b64) return ''
  if (b64.startsWith('data:')) return b64

  const clean = b64.replace(/\s/g, '').replace(/-/g, '+').replace(/_/g, '/')
  const pad = clean.length % 4
  const padded = pad ? clean + '='.repeat(4 - pad) : clean

  return `data:image/png;base64,${padded}`
}

// 1단계: 본인인증 제출 -> 캡차 요청
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

  try {
    const payload = {
      name: name.value,
      birth: birth.value,
      identity: encryptRsa(identity.value),
      issueDate: issueDate.value,
      telecom: getTelecomCode(telecom.value),
      phone: phone.value.replace(/[^0-9]/g, ''),
    }

    const { data } = await requestAuth(payload)

    // 응답: sessionKey, captchaDataUri
    sessionKey.value = data.sessionKey
    captchaImageUrl.value = toPngDataUrlFromBase64(data.captchaDataUri)
    showCaptcha.value = true
    captchaVerified.value = false
  } catch (e) {
    errorMessage.value = e?.response?.data?.message || '본인인증 요청 실패'
  }
}

// 2단계: 보안문자 확인
async function verifyCaptcha() {
  if (!captchaInput.value?.trim()) {
    errorMessage.value = '보안문자를 입력해주세요.'
    return
  }

  loading.value = true
  try {
    const payload = {
      sessionKey: sessionKey.value,
      secureNo: captchaInput.value,
    }
    const { data } = await requestAuthStep2(payload)
    // 기대 응답:
    // {
    //   "resUserNm": "",
    //   "resUserIdentiyNo": "",
    //   "resAuthenticity": "",        // "1" = 성공, 그 외 실패
    //   "resAuthenticityDesc": ""     // 예: "성공", "주민번호 불일치"
    // }

    const ok = String(data?.resAuthenticity) === '1'
    captchaVerified.value = ok

    if (ok) {
      errorMessage.value = '' // 성공이면 에러 제거
    } else {
      // 서버 설명이 있으면 그걸 보여주고, 없으면 기본 메시지
      errorMessage.value = data?.resAuthenticityDesc || '보안문자 확인에 실패했어요.'
    }
  } catch (e) {
    captchaVerified.value = false
    errorMessage.value = e?.response?.data?.message || '보안문자 확인 실패'
  } finally {
    loading.value = false
  }
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
</script>
