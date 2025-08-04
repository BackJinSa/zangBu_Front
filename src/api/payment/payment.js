import api from '../axios'

// 결제 내역 조회
export const getPaymentHistory = (params) => {
  return api.get('/payments/history', { params })
}

// 결제 처리
export const processPayment = (paymentData) => {
  return api.post('/payments/process', paymentData)
}

// 결제 취소
export const cancelPayment = (paymentId) => {
  return api.post(`/payments/${paymentId}/cancel`)
}
