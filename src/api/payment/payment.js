import axios from '../axios.js';

// 토스페이먼츠 결제 승인
export const confirmPayment = async (paymentInfo) => {
  try {
    const response = await axios.post('/payment/confirm', paymentInfo);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 결제 상태 확인
export const checkPaymentStatus = async (orderId) => {
  try {
    const response = await axios.get(`/payment/status/${orderId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
