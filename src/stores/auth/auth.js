import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const isAuthenticated = computed(() => !!user.value)

  function login(credentials) {
    // 로그인 로직
  }

  function logout() {
    user.value = null
  }

  function signup(userData) {
    // 회원가입 로직
  }

  function findId(email) {
    // 아이디 찾기 로직
  }

  function findPassword(email) {
    // 비밀번호 찾기 로직
  }

  return {
    user,
    isAuthenticated,
    login,
    logout,
    signup,
    findId,
    findPassword,
  }
})
