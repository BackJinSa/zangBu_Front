import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const userProfile = ref(null)
  const userSettings = ref({})

  function updateProfile(profileData) {
    // 프로필 수정 로직
  }

  function updateSettings(settings) {
    // 설정 수정 로직
  }

  function withdraw() {
    // 회원탈퇴 로직
  }

  function getUserInfo() {
    // 사용자 정보 조회 로직
  }

  return {
    userProfile,
    userSettings,
    updateProfile,
    updateSettings,
    withdraw,
    getUserInfo,
  }
})
