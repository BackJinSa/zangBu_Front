import api from '../axios'

// 거래 전체 목록 조회
export const getDeals = () => {
  return api.get('/deal/waitinglist')
}

// 거래 생성
export const createDeal = (dealData) => {
  return api.post('/deals', dealData)
}

// 거래 상세 조회
export const getDealDetail = (dealId) => {
  return api.get(`/deals/${dealId}`)
}

// 거래 상태 업데이트
export const updateDealStatus = (dealId, status) => {
  return api.put(`/deals/${dealId}/status`, { status })
}

// 거래 취소
export const cancelDeal = (dealId, reason) => {
  return api.put(`/deals/${dealId}/cancel`, { reason })
}

// 거래 완료
export const completeDeal = (dealId) => {
  return api.put(`/deals/${dealId}/complete`)
}

// 거래 가이드 조회
export const getDealGuide = () => {
  return api.get('/deals/guide')
}

// 거래 이력 조회
export const getDealHistory = (params) => {
  return api.get('/deals/history', { params })
}

// 거래 평가
export const rateDeal = (dealId, rating) => {
  return api.post(`/deals/${dealId}/rating`, rating)
}

// 거래전 안내 정보 조회
export const getDealNotice = (buildingId) => {
  return api.get(`/deal/notice/${buildingId}`)
}

// 소비자 문서 다운로드 URL 조회
export const getConsumerDocumentUrl = (dealId, type) => {
  return api.get(`/deal/consumer/documents/${dealId}/${type}/download`)
}
