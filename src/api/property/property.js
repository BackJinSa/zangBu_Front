import api from '../axios'

// 매물 목록 조회
export const getProperties = (params) => {
  return api.get('/properties', { params })
}

// 매물 상세 조회
export const getPropertyDetail = (id) => {
  return api.get(`/properties/${id}`)
}

// 매물 등록
export const registerProperty = (propertyData) => {
  return api.post('/properties', propertyData)
}

// 매물 수정
export const updateProperty = (id, propertyData) => {
  return api.put(`/properties/${id}`, propertyData)
}

// 매물 삭제
export const deleteProperty = (id) => {
  return api.delete(`/properties/${id}`)
}

// 매물 이미지 업로드
export const uploadPropertyImages = (propertyId, images) => {
  const formData = new FormData()
  images.forEach((image, index) => {
    formData.append(`images[${index}]`, image)
  })
  return api.post(`/properties/${propertyId}/images`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

// 매물 찜하기
export const toggleFavorite = (propertyId) => {
  return api.post(`/properties/${propertyId}/favorite`)
}

// 찜한 매물 목록
export const getFavoriteProperties = () => {
  return api.get('/properties/favorites')
}
