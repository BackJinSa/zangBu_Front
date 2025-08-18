import api from '../axios'

// 1. 로그인
export const login = (credentials) => {
  return api.post('/auth/login', credentials)
}

// 2. 로그아웃
export const logout = () => {
  const token = localStorage.getItem('token')
  return api.post('/auth/logout', {}, {
    headers: { Authorization: `Bearer ${token}` } // 강제 부착 (디버깅용)
  })
}

// 3. 아이디 찾기
export const findId = (payload) => {
  return api.post('/auth/email', payload)
}

// 4. 비밀번호 재설정
export const findPassword = (email) => {
  return api.post('/auth/password', { email })
}

//5. 본인인증 요청

// 6. 회원가입
export const signup = (userData) => {
  return api.post('/auth/signup', userData)
}

// 7. 이메일 중복 확인
export const checkEmail = (email) => {
  return api.post('/auth/check/email', { email })
}

// 8. 닉네임 중복 확인
export const checkNickname = (nickname) => {
  return api.post('/auth/check/nickname', { nickname })
}

// 9. 토큰 갱신
export const refreshToken = () => {
  return api.post('/auth/reissue')
}