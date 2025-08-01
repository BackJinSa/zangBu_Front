import api from '../axios.js'

/**
 * 매물 목록을 위한 지도 좌표 조회
 * @param {Array} properties - 주소와 건물명이 포함된 매물 배열
 * @returns {Promise} 위도, 경도가 포함된 매물 배열
 */
export const getMapList = async (properties) => {
  try {
    const response = await api.post('/map/list', properties)
    return response.data
  } catch (error) {
    console.error('매물 지도 정보 조회 실패:', error)
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
  try {
    const response = await api.post('/map/list', [
      {
        address,
        building_name: buildingName
      }
    ])
    return response.data[0]
  } catch (error) {
    console.error('매물 좌표 조회 실패:', error)
    throw error
  }
}