// Mock API for testing without backend
export const mockMapAPI = {
  // Mock 응답 데이터
  getMockResponse: (properties) => {
    return properties.map(property => ({
      address: property.address,
      building_name: property.building_name,
      // 실제 좌표값들 (테스트용)
      lat: getRandomLatitude(property.address),
      lng: getRandomLongitude(property.address)
    }))
  },

  // 지연 시뮬레이션
  delay: (ms = 1000) => new Promise(resolve => setTimeout(resolve, ms))
}

// 주소 기반으로 대략적인 좌표 생성 (실제 서비스에서는 사용하지 말 것)
function getRandomLatitude(address) {
  if (address.includes('서울')) {
    return (37.5 + Math.random() * 0.15).toFixed(6) // 서울 지역
  } else if (address.includes('부산')) {
    return (35.1 + Math.random() * 0.15).toFixed(6) // 부산 지역
  } else {
    return (36.5 + Math.random() * 2).toFixed(6) // 기타 지역
  }
}

function getRandomLongitude(address) {
  if (address.includes('서울')) {
    return (126.9 + Math.random() * 0.25).toFixed(6) // 서울 지역
  } else if (address.includes('부산')) {
    return (129.0 + Math.random() * 0.25).toFixed(6) // 부산 지역
  } else {
    return (127.5 + Math.random() * 2).toFixed(6) // 기타 지역
  }
}

// Mock API 함수들
export const getMapListMock = async (properties) => {
  await mockMapAPI.delay(800) // 0.8초 지연
  
  // 실제 API 응답 형식 시뮬레이션
  const response = mockMapAPI.getMockResponse(properties)
  
  console.log('Mock API 호출됨:', {
    request: properties,
    response: response
  })
  
  return response
}

export const getSingleMapLocationMock = async (address, buildingName) => {
  await mockMapAPI.delay(500) // 0.5초 지연
  
  const response = mockMapAPI.getMockResponse([
    { address, building_name: buildingName }
  ])
  
  return response[0]
}