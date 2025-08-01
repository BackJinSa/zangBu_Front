import api from '../axios.js'
import { getMapListMock, getSingleMapLocationMock } from './map.mock.js'

// 개발 환경에서 Mock 사용 여부 (환경변수로 제어)
const USE_MOCK = import.meta.env.VITE_USE_MOCK_API === 'true'

/**
 * 매물 목록을 위한 지도 좌표 조회
 * @param {Array} properties - 주소와 건물명이 포함된 매물 배열
 * @returns {Promise} 위도, 경도가 포함된 매물 배열
 */
export const getMapList = async (properties) => {
  // Mock API 사용
  if (USE_MOCK) {
    console.log('🔧 Mock API 사용 중...')
    return await getMapListMock(properties)
  }

  // 실제 API 사용
  try {
    console.log('🌐 실제 API 호출 중...')
    const response = await api.post('/map/list', properties)
    return response.data
  } catch (error) {
    console.error('매물 지도 정보 조회 실패:', error)
    
    // API 실패 시 Mock으로 대체 (개발 환경에서만)
    if (import.meta.env.DEV) {
      console.log('⚠️ API 실패로 Mock 데이터 사용')
      return await getMapListMock(properties)
    }
    
    throw error
  }
}

/**
 * 단일 매물의 지도 좌표 조회
 * @param {string} address - 주소
 * @param {string} buildingName - 건물명
 * @returns {Promise} 위도, 경도가 포함된 매물 정보
 */
export const getSingleMapLocation = async (address, buildingName) => {
  // Mock API 사용
  if (USE_MOCK) {
    console.log('🔧 Mock API 사용 중...')
    return await getSingleMapLocationMock(address, buildingName)
  }

  // 실제 API 사용
  try {
    console.log('🌐 실제 API 호출 중...')
    const response = await api.post('/map/list', [
      {
        address,
        building_name: buildingName
      }
    ])
    return response.data[0]
  } catch (error) {
    console.error('매물 좌표 조회 실패:', error)
    
    // API 실패 시 Mock으로 대체 (개발 환경에서만)
    if (import.meta.env.DEV) {
      console.log('⚠️ API 실패로 Mock 데이터 사용')
      return await getSingleMapLocationMock(address, buildingName)
    }
    
    throw error
  }
}