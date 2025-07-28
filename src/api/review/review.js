import api from '../axios'

// 리뷰 목록 조회
export const getReviews = (params) => {
  return api.get('/reviews', { params })
}

// 리뷰 상세 조회
export const getReviewDetail = (id) => {
  return api.get(`/reviews/${id}`)
}

// 리뷰 작성
export const createReview = (reviewData) => {
  return api.post('/reviews', reviewData)
}

// 리뷰 수정
export const updateReview = (id, reviewData) => {
  return api.put(`/reviews/${id}`, reviewData)
}

// 리뷰 삭제
export const deleteReview = (id) => {
  return api.delete(`/reviews/${id}`)
}

// 리뷰 통계 조회
export const getReviewStats = (params) => {
  return api.get('/reviews/stats', { params })
}

// 리뷰 이미지 업로드
export const uploadReviewImage = (reviewId, imageFile) => {
  const formData = new FormData()
  formData.append('image', imageFile)
  return api.post(`/reviews/${reviewId}/images`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

// 리뷰 좋아요/싫어요
export const toggleReviewLike = (reviewId, type) => {
  return api.post(`/reviews/${reviewId}/like`, { type })
}

// 내가 작성한 리뷰 목록
export const getMyReviews = (params) => {
  return api.get('/reviews/my', { params })
}
