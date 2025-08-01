<template>
  <div class="test-container">
    <h1>지도 API 테스트</h1>
    
    <div class="test-section">
      <h2>1. API 연동 테스트</h2>
      <button @click="testMapAPI" :disabled="loading" class="test-btn">
        {{ loading ? '테스트 중...' : 'API 테스트 실행' }}
      </button>
      
      <div v-if="result" class="result-section">
        <h3>결과:</h3>
        <pre>{{ JSON.stringify(result, null, 2) }}</pre>
      </div>
      
      <div v-if="error" class="error-section">
        <h3>에러:</h3>
        <pre>{{ error }}</pre>
      </div>
    </div>

    <div class="test-section">
      <h2>2. 필터 테스트</h2>
      <div class="filter-test">
        <label>
          <input type="checkbox" v-model="testFilters.apartment" @change="applyTestFilters" />
          아파트
        </label>
        <label>
          <input type="checkbox" v-model="testFilters.officetel" @change="applyTestFilters" />
          오피스텔
        </label>
      </div>
      
      <div v-if="filteredResult.length > 0" class="filtered-result">
        <h3>필터된 결과 ({{ filteredResult.length }}개):</h3>
        <div v-for="property in filteredResult" :key="property.address" class="property-item">
          <strong>{{ property.building_name }}</strong><br>
          <small>{{ property.address }}</small><br>
          <small>위도: {{ property.lat }}, 경도: {{ property.lng }}</small>
        </div>
      </div>
    </div>

    <div class="test-section">
      <h2>3. 검색 테스트</h2>
      <input 
        v-model="searchQuery" 
        placeholder="건물명 또는 주소 검색" 
        @input="searchProperties"
        class="search-input"
      />
      
      <div v-if="searchResult.length > 0" class="search-result">
        <h3>검색 결과 ({{ searchResult.length }}개):</h3>
        <div v-for="property in searchResult" :key="property.address" class="property-item">
          <strong>{{ property.building_name }}</strong><br>
          <small>{{ property.address }}</small>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { getMapList } from '@/api/map/map.js'

const loading = ref(false)
const result = ref(null)
const error = ref(null)
const filteredResult = ref([])
const searchResult = ref([])
const searchQuery = ref('')

const testFilters = reactive({
  apartment: false,
  officetel: false
})

// 테스트용 샘플 데이터
const sampleProperties = [
  { address: "서울특별시 강남구 테헤란로 123", building_name: "삼성빌딩" },
  { address: "서울특별시 마포구 양화로 45", building_name: "홍익타워" },
  { address: "부산광역시 해운대구 센텀중앙로 40", building_name: "센텀타워" },
  { address: "서울특별시 종로구 종로 1", building_name: "종로아파트" },
  { address: "서울특별시 영등포구 여의대로 108", building_name: "파크원오피스텔" }
]

// API 테스트 함수
const testMapAPI = async () => {
  try {
    loading.value = true
    error.value = null
    
    console.log('API 테스트 시작...')
    console.log('요청 데이터:', sampleProperties)
    
    const response = await getMapList(sampleProperties)
    result.value = response
    filteredResult.value = response
    
    console.log('API 응답:', response)
    alert('API 테스트 성공! 콘솔과 결과를 확인하세요.')
    
  } catch (err) {
    error.value = err.message || err.toString()
    console.error('API 테스트 실패:', err)
    alert('API 테스트 실패! 네트워크 탭과 콘솔을 확인하세요.')
  } finally {
    loading.value = false
  }
}

// 필터 테스트
const applyTestFilters = () => {
  if (!result.value) return
  
  let filtered = [...result.value]
  
  if (testFilters.apartment || testFilters.officetel) {
    filtered = filtered.filter(property => {
      if (testFilters.apartment && property.building_name.includes('아파트')) return true
      if (testFilters.officetel && property.building_name.includes('오피스텔')) return true
      return false
    })
  }
  
  filteredResult.value = filtered
}

// 검색 테스트
const searchProperties = () => {
  if (!result.value || !searchQuery.value.trim()) {
    searchResult.value = []
    return
  }
  
  const query = searchQuery.value.toLowerCase()
  searchResult.value = result.value.filter(property => 
    property.building_name.toLowerCase().includes(query) ||
    property.address.toLowerCase().includes(query)
  )
}
</script>

<style scoped>
.test-container {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.test-section {
  margin-bottom: 30px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.test-btn {
  padding: 10px 20px;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.test-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.result-section, .error-section {
  margin-top: 15px;
  padding: 15px;
  border-radius: 4px;
}

.result-section {
  background: #f0f8ff;
  border: 1px solid #4CAF50;
}

.error-section {
  background: #ffe6e6;
  border: 1px solid #f44336;
}

.filter-test {
  margin: 10px 0;
}

.filter-test label {
  margin-right: 15px;
  cursor: pointer;
}

.search-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

.property-item {
  padding: 10px;
  margin: 5px 0;
  background: #f9f9f9;
  border-radius: 4px;
}

.filtered-result, .search-result {
  margin-top: 15px;
}

pre {
  background: #f5f5f5;
  padding: 10px;
  border-radius: 4px;
  overflow-x: auto;
  font-size: 12px;
}

h1 {
  color: #333;
  border-bottom: 2px solid #4CAF50;
  padding-bottom: 10px;
}

h2 {
  color: #555;
  margin-top: 0;
}

h3 {
  color: #666;
  margin: 10px 0 5px 0;
}
</style>