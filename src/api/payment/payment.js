import axios from '@/api/axios'

// 결제 승인 API
export const confirmPayment = async (paymentInfo) => {
  try {
    const response = await axios.post('/payment/confirm', paymentInfo)
    return response.data
  } catch (error) {
    console.error('결제 승인 API 호출 실패:', error)
    throw error
  }
}

// 결제 상태 확인
export const checkPaymentStatus = async (orderId) => {
  try {
    const response = await axios.get(`/payment/status/${orderId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 결제 내역 조회
export const getPaymentHistory = (params) => {
  return axios.get('/payments/history', { params })
}

// 결제 처리
export const processPayment = (paymentData) => {
  return axios.post('/payments/process', paymentData)
}

// 결제 취소
export const cancelPayment = (paymentId) => {
  return axios.post(`/payments/${paymentId}/cancel`)
}
