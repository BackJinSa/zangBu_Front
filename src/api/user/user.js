import api from '../axios'

// 사용자 프로필 조회
export const getProfile = () => {
  return api.get('/user/profile')
}

// 사용자 프로필 수정
export const updateProfile = (profileData) => {
  return api.put('/user/profile', profileData)
}

// 사용자 설정 조회
export const getSettings = () => {
  return api.get('/user/settings')
}

// 사용자 설정 수정
export const updateSettings = (settings) => {
  return api.put('/user/settings', settings)
}

// 회원탈퇴
export const withdraw = (reason) => {
  return api.delete('/user/withdraw', { data: { reason } })
}

// 프로필 이미지 업로드
export const uploadProfileImage = (imageFile) => {
  const formData = new FormData()
  formData.append('image', imageFile)
  return api.post('/user/profile/image', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}
