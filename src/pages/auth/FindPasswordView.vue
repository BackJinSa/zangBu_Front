<script setup>
import { ref, watch, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 상태
const newPassword = ref('')
const confirmPassword = ref('')
const newPasswordErrors = ref([])
const passwordMismatch = ref(false) // ✅ 추가
const formSubmitError = ref('')

// 새 비밀번호 유효성 검사
watch(newPassword, (value) => {
  const errors = []
  if (value.length > 0 && value.length < 8) {
    errors.push('비밀번호는 8자 이상이어야 합니다.')
  }
  if (value.length > 0 && (!/[A-Z]/.test(value) || !/[a-z]/.test(value) || !/\d/.test(value))) {
    errors.push('비밀번호는 대문자, 소문자, 숫자를 포함해야 합니다.')
  }
  newPasswordErrors.value = errors
})

// 비밀번호 일치 여부 실시간 확인
watch([newPassword, confirmPassword], () => {
  passwordMismatch.value =
    confirmPassword.value.length > 0 && confirmPassword.value !== newPassword.value
})

//비밀번호 변경할 준비 되었는지
const isFormValid = computed(() => {
  return (
    newPassword.value.length > 0 &&
    confirmPassword.value.length > 0 &&
    newPasswordErrors.value.length === 0 &&
    !passwordMismatch.value
  )
})

function handleSubmit() {
  formSubmitError.value = ''
  if (newPasswordErrors.value.length > 0) return
  if (passwordMismatch.value) {
    formSubmitError.value = '비밀번호가 일치하지 않습니다.'
    return
  }

  // 실제 API 호출 로직
  alert('비밀번호가 성공적으로 변경되었습니다.')
  router.push('/auth/login')
}
</script>

<template>
  <div class="page-container">
    <div class="form-box">
      <h2 class="title">비밀번호 재설정</h2>

      <!-- 새 비밀번호 -->
      <div class="form-group">
        <label class="label">새 비밀번호</label>
        <input
          v-model="newPassword"
          type="password"
          placeholder="새 비밀번호를 입력하세요 (8자 이상)"
          class="input"
        />
        <ul v-if="newPasswordErrors.length" class="error-list">
          <li v-for="(err, idx) in newPasswordErrors" :key="idx">{{ err }}</li>
        </ul>
      </div>

      <!-- 비밀번호 확인 -->
      <div class="form-group mt-4">
        <label class="label">새 비밀번호 확인</label>
        <input
          v-model="confirmPassword"
          type="password"
          placeholder="새 비밀번호를 다시 입력하세요"
          class="input"
        />
        <!-- 실시간 에러 메시지 -->
        <p v-if="passwordMismatch" class="submit-error">비밀번호가 일치하지 않습니다.</p>
        <!-- 제출 후 에러 메시지 -->
        <p v-if="formSubmitError" class="submit-error">{{ formSubmitError }}</p>
      </div>

      <!-- 버튼 -->
      <button class="btn-primary" @click="handleSubmit" :disabled="!isFormValid">
        비밀번호 변경
      </button>

      <!-- 하단 링크 -->
      <router-link to="/auth/find-id" class="bottom-link">아이디를 잊으셨나요?</router-link>
    </div>
  </div>
</template>

<style scoped>
.page-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f9fafb;
  padding: 1rem;
}

.form-box {
  background-color: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  max-width: 400px;
  width: 100%;
}

.title {
  font-size: 1.25rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 2rem;
}

.label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  font-size: 0.9rem;
  color: #374151;
}

.input {
  width: 100%;
  padding: 0.5rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 1rem;
  outline: none;
  margin-bottom: 0.25rem;
}

.input:focus {
  border-color: #6abf4b;
  box-shadow: 0 0 0 2px rgba(104, 166, 60, 0.2);
}

.btn-primary {
  width: 100%;
  padding: 0.75rem 0;
  background-color: #9dd882;
  color: white;
  border: none;
  border-radius: 0.375rem;
  font-weight: bold;
  font-size: 1rem;
  margin-top: 4rem;
  margin-bottom: 1rem;
  transition: background-color 0.3s;
}

.btn-primary:disabled {
  background-color: #d1d5db; /* 회색 */
  cursor: not-allowed;
  color: white;
}

.btn-primary:hover {
  background-color: #7acb59;
}

.bottom-link {
  display: block;
  text-align: center;
  font-size: 0.85rem;
  color: #7acb59;
  text-decoration: none;
}

.bottom-link:hover {
  text-decoration: underline;
}

.error-list {
  color: #e11d48;
  font-size: 0.85rem;
  margin-top: 0.25rem;
  list-style: none;
  padding-left: 1rem;
}

.error-list li::before {
  content: '⚠ ';
  margin-right: 0.25rem;
}

.submit-error {
  color: #e11d48;
  font-size: 0.85rem;
  margin-top: 0.25rem;
}
</style>
