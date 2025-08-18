<template>
  <section class="min-h-screen bg-gray-50 px-6 py-10">
    <!-- 뒤로가기 링크 -->
    <div class="max-w-4xl mx-auto mb-4">
      <router-link to="/user/mypage" class="text-sm text-brand-3 hover:underline">
        ← 마이 페이지로 돌아가기
      </router-link>
    </div>

    <!-- 제목 -->
    <div class="text-center mb-10">
      <h1 class="text-2xl font-bold">
        <i class="fa-solid fa-user-lock" style="color: var(--brand-3)"></i> 개인정보 수정
      </h1>
      <p class="text-sm text-gray-500">계정 정보와 설정을 업데이트해주세요.</p>
    </div>

    <!-- 사용자 정보 카드 -->
    <div class="bg-white shadow rounded-xl p-6 max-w-4xl mx-auto mb-6 flex items-center">
      <div
        class="w-16 h-16 bg-brand-3 rounded-full flex items-center justify-center text-xl font-bold text-white"
      >
        {{ userInitial }}
      </div>
      <div class="ml-4">
        <p class="font-semibold">{{ displayName }}</p>
        <p class="text-sm text-gray-500">{{ displayEmail }}</p>
        <p class="text-xs text-gray-400 mt-1">가입일: {{ user.joinedAt }}</p>
      </div>
    </div>

    <!-- 비밀번호 변경 섹션 -->
    <div class="bg-white shadow rounded-xl p-6 max-w-4xl mx-auto mb-6">
      <h2 class="font-semibold text-lg mb-1">
        <i class="fa-solid fa-lock" style="color: var(--brand-3)"></i> 비밀번호 변경
      </h2>
      <p class="text-xs mb-4 text-gray-600">보안 강화를 위해 비밀번호를 업데이트하세요.</p>
      <hr />

      <div class="space-y-4 mt-4">
        <!-- 현재 비밀번호 -->
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-1">현재 비밀번호</label>
          <div class="relative">
            <input
              v-model="currentPassword"
              :type="showCurrent ? 'text' : 'password'"
              placeholder="현재 비밀번호를 입력하세요"
              class="input-field w-full has-eye"
              :disabled="isLoading"
            />
            <button
              type="button"
              class="eye-toggle"
              :aria-pressed="showCurrent"
              :aria-label="showCurrent ? '비밀번호 숨기기' : '비밀번호 보이기'"
              @click="showCurrent = !showCurrent"
            >
              <i :class="showCurrent ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
            </button>
          </div>
        </div>

        <!-- 새 비밀번호 -->
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-1">새 비밀번호</label>
          <div class="relative">
            <input
              v-model="newPassword"
              :type="showNew ? 'text' : 'password'"
              placeholder="새 비밀번호를 입력하세요"
              class="input-field w-full has-eye"
              :disabled="isLoading"
            />
            <button
              type="button"
              class="eye-toggle"
              :aria-pressed="showNew"
              :aria-label="showNew ? '비밀번호 숨기기' : '비밀번호 보이기'"
              @click="showNew = !showNew"
            >
              <i :class="showNew ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
            </button>
          </div>
        </div>

        <!-- 조건 불만족 시 안내 -->
        <p v-if="newPassword && !isLengthValid" class="text-xs text-red-500">
          비밀번호는 8자 이상이어야 합니다.
        </p>
        <p v-if="newPassword && !isComplexValid" class="text-xs text-red-500 mb-12">
          비밀번호는 대문자, 소문자, 숫자를 포함해야 합니다.
        </p>

        <!-- 새 비밀번호 확인 -->
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-1">새 비밀번호 확인</label>
          <div class="relative">
            <input
              v-model="confirmPassword"
              :type="showConfirm ? 'text' : 'password'"
              placeholder="새 비밀번호를 다시 입력하세요"
              class="input-field w-full has-eye"
              :disabled="isLoading"
            />
            <button
              type="button"
              class="eye-toggle"
              :aria-pressed="showConfirm"
              :aria-label="showConfirm ? '비밀번호 숨기기' : '비밀번호 보이기'"
              @click="showConfirm = !showConfirm"
            >
              <i :class="showConfirm ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
            </button>
          </div>
        </div>

        <!-- 불일치 경고 -->
        <p v-if="confirmPassword && !isPasswordMatch" class="text-xs text-red-500">
          비밀번호가 다릅니다.
        </p>

        <!-- 서버 메시지 -->
        <p v-if="serverError" class="text-xs text-red-500">{{ serverError }}</p>
        <p v-if="serverSuccess" class="text-xs text-green-600">{{ serverSuccess }}</p>

        <!-- 제출 버튼 -->
        <button
          class="primary-button"
          :disabled="isLoading || !canSubmit"
          @click="onSubmitChangePassword"
        >
          {{ isLoading ? '변경 중...' : '비밀번호 변경' }}
        </button>
      </div>
    </div>

    <div class="bg-white shadow rounded-xl p-6 max-w-4xl mx-auto mb-6">
      <h2 class="font-semibold text-lg mb-1">
        <i class="fa-regular fa-user" style="color: var(--brand-3)"></i> 닉네임 변경
      </h2>
      <p class="text-xs mb-4 text-gray-600">나를 나타내는 고유한 닉네임을 선택하세요.</p>
      <hr />
      <div class="space-y-4 mt-4">
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-1">현재 닉네임</label>
          <input
            type="text"
            disabled
            :value="editNickname || displayName"
            class="input-field w-full bg-gray-100 cursor-not-allowed"
          />
        </div>

        <div class="mb-1">
          <label class="block text-sm font-medium text-gray-700 mb-1">새 닉네임</label>
          <div class="flex gap-2 items-center">
            <input
              v-model="newNickname"
              type="text"
              placeholder="새 닉네임을 입력하세요"
              class="input-field flex-1"
              :class="{ 'is-ok': nickOk === true, 'is-error': nickOk === false }"
            />
            <button
              class="secondary-button whitespace-nowrap h-full"
              :disabled="isCheckingNick || !newNickname"
              @click="onCheckNickname"
            >
              {{ isCheckingNick ? '확인중...' : '중복 확인' }}
            </button>
          </div>
          <p
            v-if="nickMsg"
            class="text-xs mt-1"
            :class="{ 'text-green-600': nickOk === true, 'text-red-500': nickOk === false }"
          >
            {{ nickMsg }}
          </p>
        </div>

        <!-- 저장 결과 메시지 -->
        <p v-if="saveErr" class="text-xs text-red-500">{{ saveErr }}</p>
        <p v-if="saveMsg" class="text-xs text-green-600">{{ saveMsg }}</p>

        <button
          class="primary-button"
          :disabled="isSavingNick || !newNickname"
          @click="onSubmitNickname"
        >
          {{ isSavingNick ? '변경 중...' : '닉네임 변경' }}
        </button>
      </div>
    </div>

    <!-- 알림 설정 섹션 -->
    <div class="bg-white shadow rounded-xl p-6 max-w-4xl mx-auto mb-20">
      <h2 class="font-semibold text-lg mb-4">
        <i class="fa-solid fa-bell" style="color: var(--brand-3)"></i> 알림 수신 설정
      </h2>
      <hr class="mb-4" />
      <h2 class="font-semibold text-lg mb-4">서비스/마케팅 알림</h2>

      <div
        class="flex items-center justify-between px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 hover:bg-gray-100 transition"
      >
        <span
          :class="['text-sm font-semibold', isNotificationOn ? 'text-green-700' : 'text-gray-500']"
        >
          {{ isNotificationOn ? '알림 수신 중' : '알림 수신 꺼짐' }}
        </span>

        <!-- 토글 스위치 -->
        <label class="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            class="sr-only peer"
            v-model="isNotificationOn"
            @change="onToggleNotification"
            :disabled="isToggling"
          />
          <!-- 배경 바 -->
          <div
            class="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-brand-3 transition-colors duration-200"
            :class="{ 'opacity-60 cursor-not-allowed': isToggling }"
          ></div>
          <!-- 안쪽 동그라미 -->
          <div
            class="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow peer-checked:translate-x-5 transition-transform duration-200"
          ></div>
        </label>
      </div>

      <!-- 서버 메시지 -->
      <p v-if="notifyErr" class="text-xs text-red-500 mt-2">{{ notifyErr }}</p>
      <p v-if="notifyMsg" class="text-xs text-green-600 mt-2">{{ notifyMsg }}</p>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth/auth'
import {
  changePassword,
  checkMyNickname,
  changeNickname,
  updateNotificationConsent,
  getNotificationConsent,
  getEditPage,
} from '@/api/user/user' // ← 실제 경로 확인

// ================== 눈 아이콘 토글 (템플릿과 이름 일치) ==================
const showCurrent = ref(false)
const showNew = ref(false)
const showConfirm = ref(false)

// ================== 알림 수신 동의 ==================
const isNotificationOn = ref(false) // 서버값 로드됨
const isToggling = ref(false)
const notifyMsg = ref('')
const notifyErr = ref('')

async function loadNotificationConsent() {
  notifyErr.value = ''
  try {
    const { data } = await getNotificationConsent() // 서버 반환: boolean
    isNotificationOn.value = !!data
  } catch (e) {
    notifyErr.value = '알림 수신 여부를 불러오지 못했습니다.'
  }
}

async function onToggleNotification() {
  if (isToggling.value) return
  const next = !!isNotificationOn.value
  isToggling.value = true
  notifyMsg.value = ''
  notifyErr.value = ''

  try {
    await updateNotificationConsent(next) // body: { consent: true|false }
    notifyMsg.value = next ? '알림 수신을 켰습니다.' : '알림 수신을 껐습니다.'
  } catch (e) {
    isNotificationOn.value = !next // 실패 시 원복
    notifyErr.value = e?.response?.data || '변경에 실패했습니다. 다시 시도해주세요.'
  } finally {
    isToggling.value = false
  }
}

onMounted(async () => {
  loadNotificationConsent()
  try {
    const { data } = await getEditPage() // { nickname, currentPassword } 가정
    editNickname.value = data?.nickname || ''
  } catch (e) {
    console.warn('getEditPage 실패:', e)
  }
})
// ================== 상단 카드용 사용자 표시 ==================
const authStore = useAuthStore()
const user = { joinedAt: '2023년 6월 1일' }

function decodeJwt(token) {
  try {
    const payload = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')
    return JSON.parse(atob(payload))
  } catch {
    return null
  }
}
const token = computed(() => authStore.accessToken || localStorage.getItem('token') || '')
const claims = computed(() => (token.value ? decodeJwt(token.value) : null) || {})

const displayEmail = computed(
  () => authStore.user?.email ?? claims.value.email ?? claims.value.sub ?? ''
)

const editNickname = ref('')

const displayName = computed(
  () =>
    editNickname.value ||
    authStore.user?.nickname ||
    authStore.user?.name ||
    claims.value.nickname ||
    claims.value.name ||
    (displayEmail.value ? displayEmail.value.split('@')[0] : '사용자')
)
const userInitial = computed(() => displayName.value?.charAt(0) || '?')

// ================== 비밀번호 변경 ==================
const currentPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')
const isLoading = ref(false)
const serverError = ref('')
const serverSuccess = ref('')
const isCurrentPasswordFilled = computed(() => !!currentPassword.value)
const isLengthValid = computed(() => newPassword.value.length >= 8)
const isComplexValid = computed(
  () =>
    /[A-Z]/.test(newPassword.value) &&
    /[a-z]/.test(newPassword.value) &&
    /[0-9]/.test(newPassword.value)
)
const isPasswordMatch = computed(
  () => confirmPassword.value === '' || confirmPassword.value === newPassword.value
)
const canSubmit = computed(
  () =>
    !!currentPassword.value &&
    !!newPassword.value &&
    !!confirmPassword.value &&
    isLengthValid.value &&
    isComplexValid.value &&
    isPasswordMatch.value
)

async function onSubmitChangePassword() {
  serverError.value = ''
  serverSuccess.value = ''

  if (!currentPassword.value || !newPassword.value || !confirmPassword.value) {
    serverError.value = '모든 항목을 입력해주세요.'
    return
  }
  if (!isLengthValid.value || !isComplexValid.value || !isPasswordMatch.value) {
    serverError.value = '새 비밀번호 조건을 확인해주세요.'
    return
  }

  try {
    isLoading.value = true
    await changePassword({
      currentPassword: currentPassword.value,
      newPassword: newPassword.value,
    })
    serverSuccess.value = '비밀번호가 변경되었습니다.'
    currentPassword.value = ''
    newPassword.value = ''
    confirmPassword.value = ''
  } catch (err) {
    // 서버가 400 같은 걸로 "현재 비밀번호 불일치" 알려줌
    const msg =
      err?.response?.data ||
      (err?.response?.status === 400
        ? '현재 비밀번호가 올바르지 않습니다.'
        : '비밀번호 변경 중 오류가 발생했습니다.')
    serverError.value = msg
  } finally {
    isLoading.value = false
  }
}

// ================== 닉네임 변경 ==================
const newNickname = ref('')
const isCheckingNick = ref(false)
const nickOk = ref(null) // null | true | false
const nickMsg = ref('')
const isSavingNick = ref(false)
const saveMsg = ref('')
const saveErr = ref('')

const nicknameValid = (n) => {
  const t = n.trim()
  return t.length >= 2 && t.length <= 20
}

async function onCheckNickname() {
  nickOk.value = null
  nickMsg.value = ''

  const nick = newNickname.value.trim()
  if (!nicknameValid(nick)) {
    nickOk.value = false
    nickMsg.value = '닉네임은 2~20자여야 합니다.'
    return
  }

  isCheckingNick.value = true
  try {
    const { data } = await checkMyNickname(nick)
    nickOk.value = true
    nickMsg.value = typeof data === 'string' ? data : '사용 가능한 닉네임입니다.'
  } catch (err) {
    if (err?.response?.status === 400) {
      nickOk.value = false
      nickMsg.value = err.response?.data || '중복되는 닉네임이 있습니다.'
    } else {
      nickOk.value = false
      nickMsg.value = '확인 중 오류가 발생했습니다.'
    }
  } finally {
    isCheckingNick.value = false
  }
}

async function onSubmitNickname() {
  saveMsg.value = ''
  saveErr.value = ''

  const nick = newNickname.value.trim()
  if (!nicknameValid(nick)) {
    saveErr.value = '닉네임은 2~20자여야 합니다.'
    return
  }

  if (nickOk.value !== true) {
    await onCheckNickname()
    if (nickOk.value !== true) return
  }

  isSavingNick.value = true
  try {
    const { data } = await changeNickname(nick)
    const updatedNickname = data?.nickname ?? data?.newNickname ?? nick

    authStore.setUser({
      ...(authStore.user || {}),
      nickname: updatedNickname,
    })

    saveMsg.value = '닉네임이 변경되었습니다.'
    newNickname.value = ''
  } catch (err) {
    saveErr.value =
      err?.response?.data || '닉네임 변경 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.'
  } finally {
    isSavingNick.value = false
  }
}
</script>

<style scoped>
.input-field {
  padding: 0.5rem 1rem;
  border: 1px solid var(--brand-3);
  border-radius: 8px;
  font-size: 14px;
  font-family: 'Inter', sans-serif;
  outline: none;
  transition: border-color 0.2s ease;
}
.input-field:focus {
  border-color: var(--brand-2);
}
.primary-button {
  padding: 10px 20px;
  background: var(--brand-3);
  color: var(--text-3);
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  font-family: 'Inter', sans-serif;
  cursor: pointer;
  transition: background-color 0.2s ease;
}
.primary-button:hover {
  background: var(--brand-2);
}
.secondary-button {
  padding: 10px 16px;
  background: var(--bg-2);
  border: 2px solid var(--brand-3);
  color: var(--brand-3);
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  font-family: 'Inter', sans-serif;
  cursor: pointer;
  transition: all 0.2s ease;
}
.secondary-button:hover {
  background: #f1f1f1;
}

/* 아이콘이 겹치지 않도록 우측 여백 */
.input-field.has-eye {
  padding-right: 40px; /* 아이콘 클릭 영역까지 확보 */
}

/* 눈 아이콘 버튼 */
.eye-toggle {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  color: #9ca3af; /* text-gray-400 */
  background: transparent;
  border: none;
  cursor: pointer;
}

/* 호버/포커스 접근성 */
.eye-toggle:hover {
  color: #6b7280;
} /* text-gray-500 */
.eye-toggle:focus-visible {
  outline: 2px solid var(--brand-2);
  outline-offset: 2px;
  border-radius: 6px;
}
</style>
