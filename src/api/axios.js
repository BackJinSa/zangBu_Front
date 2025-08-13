import axios from 'axios'

// axios 인스턴스 생성
const api = axios.create({
  baseURL: '/api', // 프론트엔드에서는 /api 경로 사용
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 요청 인터셉터
api.interceptors.request.use(
  (config) => {
    // baseURL 동적 오버라이드 (개발용): localStorage.apiBaseUrl 존재 시 그 값 사용
    try {
      const overrideBaseUrl = localStorage.getItem('apiBaseUrl')
      if (overrideBaseUrl) {
        config.baseURL = overrideBaseUrl
      }
    } catch {}

    // 토큰이 있으면 헤더에 추가
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    // 개발 편의: 디버그 멤버 헤더 지원 (백엔드에서 X-Member-Id 읽도록 구현된 경우)
    try {
      const debugMemberId = localStorage.getItem('debugMemberId')
      if (debugMemberId) {
        config.headers['X-Member-Id'] = debugMemberId
      }
    } catch {}
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 응답 인터셉터
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    // 401 에러 시 로그아웃 처리
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      // 로그인 페이지로 리다이렉트
      window.location.href = '/auth/login'
    }
    return Promise.reject(error)
  }
)

export default api
