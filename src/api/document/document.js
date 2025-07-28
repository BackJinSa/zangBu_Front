import api from '../axios'

// 문서 목록 조회
export const getDocuments = (params) => {
  return api.get('/documents', { params })
}

// 문서 상세 조회
export const getDocumentDetail = (id) => {
  return api.get(`/documents/${id}`)
}

// 문서 업로드
export const uploadDocument = (documentData) => {
  const formData = new FormData()
  formData.append('file', documentData.file)
  formData.append('type', documentData.type)
  formData.append('description', documentData.description)

  return api.post('/documents', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

// 문서 삭제
export const deleteDocument = (id) => {
  return api.delete(`/documents/${id}`)
}

// 분석 리포트 목록 조회
export const getAnalysisReports = (params) => {
  return api.get('/documents/analysis-reports', { params })
}

// 분석 리포트 생성
export const generateAnalysisReport = (propertyId) => {
  return api.post('/documents/analysis-reports', { propertyId })
}

// 분석 리포트 상세 조회
export const getAnalysisReportDetail = (reportId) => {
  return api.get(`/documents/analysis-reports/${reportId}`)
}

// 등본 및 건축물 대장 조회
export const getPropertyDocuments = (propertyId) => {
  return api.get(`/documents/property/${propertyId}`)
}
