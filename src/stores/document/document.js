import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useDocumentStore = defineStore('document', () => {
  const documents = ref([])
  const currentDocument = ref(null)
  const analysisReports = ref([])

  function getDocuments() {
    // 문서 목록 조회 로직
  }

  function getDocumentDetail(id) {
    // 문서 상세 조회 로직
  }

  function uploadDocument(documentData) {
    // 문서 업로드 로직
  }

  function deleteDocument(id) {
    // 문서 삭제 로직
  }

  function getAnalysisReports() {
    // 분석 리포트 조회 로직
  }

  function generateReport(propertyId) {
    // 리포트 생성 로직
  }

  return {
    documents,
    currentDocument,
    analysisReports,
    getDocuments,
    getDocumentDetail,
    uploadDocument,
    deleteDocument,
    getAnalysisReports,
    generateReport,
  }
})
