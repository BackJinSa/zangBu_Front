import api from '../axios'

// 법정동 코드 조회
export const getLawCodes = async (locataddNm) => {
  try {
    const response = await api.get('/publicdata/law', {
      params: { locataddNm }
    })
    return response.data
  } catch (error) {
    console.error('법정동 코드 조회 실패:', error)
    throw error
  }
}

// 아파트 매매 실거래가 조회
export const getAptTrades = async (locataddNm, dealYmd, pageNo = 1, numOfRows = 100) => {
  try {
    const response = await api.get('/publicdata/apt/trade', {
      params: { locataddNm, dealYmd, pageNo, numOfRows }
    })
    return response.data
  } catch (error) {
    console.error('아파트 실거래가 조회 실패:', error)
    throw error
  }
}

// 아파트 월세 실거래가 조회
export const getAptRents = async (locataddNm, dealYmd) => {
  try {
    const response = await api.get('/publicdata/apt/rent', {
      params: { locataddNm, dealYmd }
    })
    return response.data
  } catch (error) {
    console.error('아파트 월세 실거래가 조회 실패:', error)
    throw error
  }
}

// 오피스텔 매매 실거래가 조회
export const getOfficeTrades = async (locataddNm, dealYmd, pageNo = 1, numOfRows = 100) => {
  try {
    const response = await api.get('/publicdata/office/trade', {
      params: { locataddNm, dealYmd, pageNo, numOfRows }
    })
    return response.data
  } catch (error) {
    console.error('오피스텔 매매 실거래가 조회 실패:', error)
    throw error
  }
}

// 빌라/연립 매매 실거래가 조회
export const getVillaTrades = async (locataddNm, dealYmd) => {
  try {
    const response = await api.get('/publicdata/villa/trade', {
      params: { locataddNm, dealYmd }
    })
    return response.data
  } catch (error) {
    console.error('빌라/연립 매매 실거래가 조회 실패:', error)
    throw error
  }
}
