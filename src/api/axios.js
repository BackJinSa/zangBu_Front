// src/api/instance.js
import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  withCredentials: true,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
})

let isRefreshing = false
let failedQueue = []
const processQueue = (error, token = null) => {
  failedQueue.forEach(({ resolve, reject }) => (error ? reject(error) : resolve(token)))
  failedQueue = []
}

// 요청 인터셉터
api.interceptors.request.use(
  (config) => {
    // reissue/login 에만 Authorization 생략 (logout엔 붙임)
    const skipAuth = config.url?.includes('/auth/reissue') || config.url?.includes('/auth/login')

    if (!skipAuth) {
      const at = localStorage.getItem('token')
      if (at) config.headers.Authorization = `Bearer ${at}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// 응답 인터셉터
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config || {}
    const status = error.response?.status
    const isReissue = originalRequest?.url?.includes('/auth/reissue')
    const isLogout = originalRequest?.url?.includes('/auth/logout')

    // 로그아웃 401: 재발급 시도하지 말고 바로 정리
    if (isLogout && status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      localStorage.removeItem('isLoggedIn')
      window.location.href = '/auth/login?relogin=1'
      return Promise.reject(error)
    }

    // 401: reissue가 아니고, 아직 재시도 안 했을 때만 재발급
    if (status === 401 && !originalRequest._retry && !isReissue) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        })
          .then((newAT) => {
            if (newAT) originalRequest.headers.Authorization = `Bearer ${newAT}`
            return api(originalRequest)
          })
          .catch((err) => Promise.reject(err))
      }

      originalRequest._retry = true
      isRefreshing = true

      try {
        // 쿠키 기반 reissue (body 비움)
        const res = await api.post('/auth/reissue', {})
        const { accessToken } = res.data || {}
        if (!accessToken) throw new Error('No accessToken in reissue response')

        localStorage.setItem('token', accessToken)
        processQueue(null, accessToken)

        originalRequest.headers.Authorization = `Bearer ${accessToken}`
        return api(originalRequest)
      } catch (refreshErr) {
        processQueue(refreshErr, null)
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        localStorage.removeItem('isLoggedIn')
        window.location.href = '/auth/login?relogin=1'
        return Promise.reject(refreshErr)
      } finally {
        isRefreshing = false
      }
    }

    // reissue 자체 실패(400/409) → 상태 정리 후 로그인 이동
    if (isReissue && (status === 400 || status === 409)) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      localStorage.removeItem('isLoggedIn')
      window.location.href = '/auth/login?relogin=1'
    }

    return Promise.reject(error)
  }
)

export default api
