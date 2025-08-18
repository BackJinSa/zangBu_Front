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

// 구매자 정보 조회 (결제용)
export const getBuyerInfo = async () => {
  try {
    const response = await axios.get('/auth/me')
    return {
      name: response.data.name,        // 구매자 이름
      email: response.data.email,      // 이메일
      phone: response.data.phone       // 휴대폰 번호
    }
  } catch (error) {
    console.error('구매자 정보 조회 실패:', error)
    throw error
  }
}

// 멤버십 상태 확인
export const checkMembershipStatus = async () => {
  try {
    const response = await axios.get('/membership/status')
    return response.data
  } catch (error) {
    console.error('멤버십 상태 확인 실패:', error)
    throw error
  }
}

// 멤버 자격(권한/크레딧) 조회: 멤버십 활성 여부 및 건당 잔여 횟수
export const getEntitlements = async () => {
  try {
    const response = await axios.get('/payment/entitlements')
    return response.data // { membershipActive: boolean, perCaseRemaining: number }
  } catch (error) {
    console.error('권한 정보 조회 실패:', error)
    throw error
  }
}

// 건당 크레딧 사용(다운로드 시 차감)
export const consumePerCaseCredit = async (payload) => {
  // payload: { resourceType, resourceId, orderId?: string }
  try {
    const response = await axios.post('/payment/consume', payload)
    return response.data
  } catch (error) {
    console.error('건당 크레딧 차감 실패:', error)
    throw error
  }
}

// 다운로드 기록 저장(무엇을 어떤 결제수단으로 받았는지 서버에 기록)
export const recordDownload = async (payload) => {
  // payload: { resourceType, resourceId, usedPaymentType: 'PER_CASE'|'MEMBERSHIP'|'FREE', orderId?: string }
  try {
    const response = await axios.post('/downloads/record', payload)
    return response.data
  } catch (error) {
    console.error('다운로드 기록 실패:', error)
    throw error
  }
}

// 결제 주문 컨텍스트를 로컬에 저장/조회 (결제 성공 리디렉트 후 확인 단계에 보조적으로 사용)
export const saveOrderContext = (orderId, context) => {
  try {
    const key = `payment:order:${orderId}`
    localStorage.setItem(key, JSON.stringify(context))
  } catch {}
}

export const loadOrderContext = (orderId) => {
  try {
    const key = `payment:order:${orderId}`
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export const clearOrderContext = (orderId) => {
  try {
    const key = `payment:order:${orderId}`
    localStorage.removeItem(key)
  } catch {}
}
