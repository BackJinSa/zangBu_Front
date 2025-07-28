import api from '../axios'

// 거래 목록 조회
export const getTrades = (params) => {
  return api.get('/trades', { params })
}

// 거래 생성
export const createTrade = (tradeData) => {
  return api.post('/trades', tradeData)
}

// 거래 상세 조회
export const getTradeDetail = (tradeId) => {
  return api.get(`/trades/${tradeId}`)
}

// 거래 상태 업데이트
export const updateTradeStatus = (tradeId, status) => {
  return api.put(`/trades/${tradeId}/status`, { status })
}

// 거래 취소
export const cancelTrade = (tradeId, reason) => {
  return api.put(`/trades/${tradeId}/cancel`, { reason })
}

// 거래 완료
export const completeTrade = (tradeId) => {
  return api.put(`/trades/${tradeId}/complete`)
}

// 거래 가이드 조회
export const getTradeGuide = () => {
  return api.get('/trades/guide')
}

// 거래 이력 조회
export const getTradeHistory = (params) => {
  return api.get('/trades/history', { params })
}

// 거래 평가
export const rateTrade = (tradeId, rating) => {
  return api.post(`/trades/${tradeId}/rating`, rating)
}
