import axios from '../axios'

/**
 * 부동산 건물 정보 조회 (추정 면적만 제공)
 * @param {Object} buildingInfo - 건물 정보
 * @param {string} buildingInfo.buildingName - 건물명
 * @param {string} buildingInfo.sido - 시도
 * @param {string} buildingInfo.sigungu - 시군구
 * @param {string} buildingInfo.eupmyeondong - 읍면동
 * @param {string} buildingInfo.roadAddress - 도로명주소
 * @returns {Promise<Object>} 추정 부동산 정보
 */
export const fetchBuildingInfo = async (buildingInfo) => {
  try {
    console.log('🏢 부동산 정보 조회:', buildingInfo)

    // 건물명과 주소를 기반으로 추정 면적 제공
    const estimatedData = getEstimatedBuildingData(buildingInfo)

    return {
      success: true,
      data: {
        availableDong: estimatedData.dong,
        availableHo: estimatedData.ho,
        availableArea: estimatedData.area,
        buildingInfo: estimatedData.buildingInfo,
        dataSource: 'estimated_data',
      },
    }
  } catch (error) {
    console.error('🚨 부동산 정보 조회 오류:', error)
    return {
      success: false,
      message: '부동산 정보 조회 중 오류가 발생했습니다.',
      error: error.message,
    }
  }
}

/**
 * 건물 정보를 기반으로 추정 데이터 생성
 */
const getEstimatedBuildingData = (buildingInfo) => {
  const buildingName = buildingInfo.buildingName || ''
  const suggestions = {
    dong: [],
    ho: [],
    area: [],
    buildingInfo: {
      name: buildingName,
      address: buildingInfo.roadAddress,
      dataSource: 'estimated',
    },
  }

  // 공동주택인 경우 일반적인 동/호수 범위 제안
  if (
    buildingName.includes('아파트') ||
    buildingName.includes('APT') ||
    buildingName.includes('오피스텔') ||
    buildingName.includes('OFFICETEL') ||
    buildingName.includes('빌라') ||
    buildingName.includes('연립')
  ) {
    // 아파트 단지 규모에 따른 동 수 추정
    if (
      buildingName.includes('단지') ||
      buildingName.includes('타운') ||
      buildingName.includes('마을')
    ) {
      // 대규모 단지
      suggestions.dong = Array.from({ length: 15 }, (_, i) => (i + 1).toString())
    } else {
      // 일반 규모
      suggestions.dong = Array.from({ length: 8 }, (_, i) => (i + 1).toString())
    }

    // 일반적인 호수 범위 (20층 × 4호/층 가정)
    const floors = 20
    const unitsPerFloor = 4
    suggestions.ho = []

    for (let floor = 1; floor <= floors; floor++) {
      for (let unit = 1; unit <= unitsPerFloor; unit++) {
        suggestions.ho.push(`${floor}0${unit}`)
      }
    }

    // 부동산 유형별 실제 시장에서 흔한 전용면적
    if (buildingName.includes('아파트') || buildingName.includes('APT')) {
      suggestions.area = ['59.92', '74.93', '84.78', '101.85', '114.93', '134.85', '164.82']
    } else if (buildingName.includes('오피스텔') || buildingName.includes('OFFICETEL')) {
      suggestions.area = ['16.52', '23.14', '29.75', '33.06', '42.97', '59.92']
    } else if (buildingName.includes('빌라') || buildingName.includes('연립')) {
      suggestions.area = ['59.92', '74.93', '84.78', '101.85']
    } else {
      // 일반 공동주택
      suggestions.area = ['59.92', '74.93', '84.78', '101.85']
    }
  } else {
    // 단독주택인 경우
    suggestions.area = ['59.92', '74.93', '84.78', '101.85', '114.93', '134.85']
  }

  return suggestions
}

/**
 * 지역코드 조회 (시군구 → 코드 변환)
 */
export const getRegionCode = async (sido, sigungu) => {
  try {
    const response = await axios.get('/real-estate/region-code', {
      params: { sido, sigungu },
    })

    if (response.data && response.data.success) {
      return response.data.data.code
    }

    return null
  } catch (error) {
    console.error('지역코드 조회 오류:', error)
    return null
  }
}

/**
 * 아파트 단지 상세 정보 조회
 */
export const getApartmentComplexInfo = async (complexName, sido, sigungu) => {
  try {
    const response = await axios.post('/real-estate/complex-info', {
      complexName,
      sido,
      sigungu,
    })

    if (response.data && response.data.success) {
      return {
        success: true,
        data: response.data.data,
      }
    }

    return {
      success: false,
      message: '아파트 단지 정보를 찾을 수 없습니다.',
    }
  } catch (error) {
    console.error('아파트 단지 정보 조회 오류:', error)
    return {
      success: false,
      message: '단지 정보 조회 중 오류가 발생했습니다.',
      error: error.message,
    }
  }
}
