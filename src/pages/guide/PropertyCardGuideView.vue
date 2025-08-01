<template>
  <div class="property-card-guide">
    <div class="container">
      <h1 class="page-title">PropertyCard 컴포넌트 가이드</h1>

      <!-- 컴포넌트 예시 -->
      <section class="section">
        <h2 class="section-title">컴포넌트 예시</h2>
        <div class="cards-grid">
          <PropertyCard
            v-for="property in sampleProperties"
            :key="property.id"
            :property="property"
            @bookmark="handleBookmark"
            @detail="handleDetail"
            @delete="handleDelete"
          />
        </div>
      </section>

      <!-- 코드 예시 -->
      <section class="section">
        <h2 class="section-title">코드 예시</h2>
        <div class="code-example">
          <h3>기본 사용법</h3>
          <pre><code>&lt;template&gt;
  &lt;PropertyCard
    :property="propertyData"
    @bookmark="handleBookmark"
    @detail="handleDetail"
    @delete="handleDelete"
  /&gt;
&lt;/template&gt;

&lt;script setup&gt;
import PropertyCard from '@/components/common/PropertyCard.vue'

const propertyData = {
  id: 1,
  title: '홍대 아늑한 스튜디오',
  location: '서울시 마포구',
  imageUrl: '/path/to/image.jpg',
  status: '전세',
  price: '₩300,000,000',
  description: '젊은 전문가에게 완벽한 스튜디오 아파트입니다.',
  savedDate: '1주 전 저장',
  isBookmarked: false
}

const handleBookmark = (data) => {
  console.log('Bookmark:', data)
}

const handleDetail = (property) => {
  console.log('Detail:', property)
}

const handleDelete = (property) => {
  console.log('Delete:', property)
}
&lt;/script&gt;</code></pre>
        </div>
      </section>

      <!-- Props 문서 -->
      <section class="section">
        <h2 class="section-title">Props 문서</h2>
        <div class="table-container">
          <table class="docs-table">
            <thead>
              <tr>
                <th>Prop 이름</th>
                <th>타입</th>
                <th>필수</th>
                <th>기본값</th>
                <th>설명</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>property</td>
                <td>Object</td>
                <td>✅</td>
                <td>-</td>
                <td>매물 정보 객체</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- Props 데이터 구조 -->
      <section class="section">
        <h2 class="section-title">Props 데이터 구조</h2>
        <div class="code-example">
          <h3>Property 객체 구조</h3>
          <pre><code>{
  id: Number,           // 매물 고유 ID
  title: String,        // 매물 제목
  location: String,     // 위치
  imageUrl: String,     // 이미지 URL
  status: String,       // 매물 상태 (매매/전세/월세)
  price: String,        // 가격
  description: String,  // 설명
  savedDate: String,    // 저장 날짜
  isBookmarked: Boolean // 즐겨찾기 여부
}</code></pre>
        </div>
      </section>

      <!-- 이벤트 핸들러 -->
      <section class="section">
        <h2 class="section-title">이벤트 핸들러</h2>
        <div class="code-example">
          <h3>이벤트 처리 예시</h3>
          <pre><code>const handleBookmark = (data) => {
  const { propertyId, isBookmarked } = data
  
  // 즐겨찾기 상태 업데이트
  const property = properties.value.find(p => p.id === propertyId)
  if (property) {
    property.isBookmarked = isBookmarked
  }
  
  console.log('Bookmark:', data.propertyId, data.isBookmarked)
}

const handleDetail = (property) => {
  console.log('Detail:', property)
  // 상세 페이지로 이동
  router.push(`/property/detail/${property.id}`)
}

const handleDelete = (property) => {
  console.log('Delete:', property)
  // 삭제 확인 후 처리
  if (confirm('정말 삭제하시겠습니까?')) {
    deleteProperty(property.id)
  }
}</code></pre>
        </div>
      </section>

      <!-- 이벤트 문서 -->
      <section class="section">
        <h2 class="section-title">이벤트 문서</h2>
        <div class="table-container">
          <table class="docs-table">
            <thead>
              <tr>
                <th>이벤트 이름</th>
                <th>발생 시점</th>
                <th>전달 데이터</th>
                <th>설명</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>bookmark</td>
                <td>북마크 버튼 클릭</td>
                <td>{ propertyId, isBookmarked }</td>
                <td>즐겨찾기 상태 변경 시 발생</td>
              </tr>
              <tr>
                <td>detail</td>
                <td>상세보기 버튼 클릭</td>
                <td>property object</td>
                <td>매물 상세 페이지로 이동 시 발생</td>
              </tr>
              <tr>
                <td>delete</td>
                <td>삭제 버튼 클릭</td>
                <td>property object</td>
                <td>매물 삭제 시 발생</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- 이벤트 구조 코드 -->
      <section class="section">
        <h2 class="section-title">이벤트 구조 코드</h2>
        <div class="code-example">
          <h3>Bookmark 이벤트 데이터 구조</h3>
          <pre><code>{
  propertyId: Number,   // 매물 ID
  isBookmarked: Boolean // 즐겨찾기 상태 (true/false)
}</code></pre>
        </div>
        <div class="code-example">
          <h3>Detail/Delete 이벤트 데이터 구조</h3>
          <pre><code>{
  id: Number,
  title: String,
  location: String,
  imageUrl: String,
  status: String,
  price: String,
  description: String,
  savedDate: String,
  isBookmarked: Boolean
}</code></pre>
        </div>
      </section>

      <!-- 인터랙티브 데모 -->
      <section class="section">
        <h2 class="section-title">인터랙티브 데모</h2>
        <div class="demo-card">
          <PropertyCard
            :property="interactiveProperty"
            @bookmark="handleInteractiveBookmark"
            @detail="handleInteractiveDetail"
            @delete="handleInteractiveDelete"
          />
        </div>
        <div v-if="lastEvent" class="event-log">
          <p>
            마지막 이벤트: <strong>{{ lastEvent }}</strong>
          </p>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import PropertyCard from '@/components/common/PropertyCard.vue'

// 샘플 매물 데이터
const sampleProperties = ref([
  {
    id: 1,
    title: '홍대 아늑한 스튜디오',
    location: '서울시 마포구',
    imageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop',
    status: '전세',
    price: '₩300,000,000',
    description: '젊은 전문가에게 완벽한 스튜디오 아파트입니다. 밤 문화와 대학가에 가깝습니다.',
    savedDate: '1주 전 저장',
    isBookmarked: false,
  },
  {
    id: 2,
    title: '강남 역세권 신축 아파트',
    location: '서울시 강남구',
    imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop',
    status: '매매',
    price: '₩800,000,000',
    description: '강남역 도보 5분 거리의 신축 아파트입니다. 역세권의 편리함을 누려보세요.',
    savedDate: '3일 전 저장',
    isBookmarked: true,
  },
  {
    id: 3,
    title: '합정동 빌라',
    location: '서울시 마포구',
    imageUrl: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&h=300&fit=crop',
    status: '월세',
    price: '₩50/500',
    description: '합정역 근처의 조용한 빌라입니다. 주변 편의시설이 잘 갖춰져 있습니다.',
    savedDate: '1주 전 저장',
    isBookmarked: false,
  },
  {
    id: 4,
    title: '성수동 원룸',
    location: '서울시 성동구',
    imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop',
    status: '월세',
    price: '₩40/400',
    description: '성수동의 깔끔한 원룸입니다. 창고형 카페와 맛집이 가까이 있습니다.',
    savedDate: '2일 전 저장',
    isBookmarked: false,
  },
])

// 인터랙티브 데모용 매물
const interactiveProperty = ref({
  id: 999,
  title: '인터랙티브 데모 매물',
  location: '서울시 강남구',
  imageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop',
  status: '매매',
  price: '₩500,000,000',
  description: '인터랙티브 데모용 매물입니다. 실제로 조작해보세요.',
  savedDate: '오늘 저장',
  isBookmarked: false,
})

const lastEvent = ref('')

// 이벤트 핸들러
const handleBookmark = (data) => {
  const property = sampleProperties.value.find((p) => p.id === data.propertyId)
  if (property) {
    property.isBookmarked = data.isBookmarked
  }
  console.log('Bookmark:', data)
}

const handleDetail = (property) => {
  console.log('Detail:', property)
}

const handleDelete = (property) => {
  console.log('Delete:', property)
}

const handleInteractiveBookmark = (data) => {
  interactiveProperty.value.isBookmarked = data.isBookmarked
  lastEvent.value = `북마크: ${data.isBookmarked ? '추가' : '제거'}`
  console.log('Interactive Bookmark:', data)
}

const handleInteractiveDetail = (property) => {
  lastEvent.value = `상세보기: ${property.title}`
  console.log('Interactive Detail:', property)
}

const handleInteractiveDelete = (property) => {
  lastEvent.value = `삭제: ${property.title}`
  console.log('Interactive Delete:', property)
}
</script>

<style scoped>
.property-card-guide {
  min-height: 100vh;
  background: #f8f9fa;
  padding: 40px 20px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.page-title {
  text-align: center;
  color: #2c3e50;
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 40px;
  font-family: 'Roboto', sans-serif;
}

/* Section styles */
.section {
  margin-bottom: 60px;
}

.section-title {
  color: #2c3e50;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 24px;
  font-family: 'Roboto', sans-serif;
  border-bottom: 2px solid #3498db;
  padding-bottom: 8px;
}

/* Cards grid */
.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 24px;
  justify-items: center;
}

/* Code example styles */
.code-example {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  border-left: 4px solid #3498db;
}

.code-example h3 {
  color: #2c3e50;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 16px;
  font-family: 'Roboto', sans-serif;
}

.code-example pre {
  background: #2c3e50;
  color: #ecf0f1;
  padding: 16px;
  border-radius: 6px;
  overflow-x: auto;
  font-family: 'Courier New', monospace;
  font-size: 14px;
  line-height: 1.5;
}

.code-example code {
  font-family: 'Courier New', monospace;
}

/* Table styles */
.table-container {
  overflow-x: auto;
  margin-bottom: 20px;
}

.docs-table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
}

.docs-table th {
  background: #3498db;
  color: white;
  padding: 12px 16px;
  text-align: left;
  font-weight: 600;
  font-family: 'Roboto', sans-serif;
}

.docs-table td {
  padding: 12px 16px;
  border-bottom: 1px solid #ecf0f1;
  font-family: 'Roboto', sans-serif;
}

.docs-table tr:last-child td {
  border-bottom: none;
}

.docs-table tr:hover {
  background: #f8f9fa;
}

/* Demo card */
.demo-card {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.event-log {
  background: #e8f5e8;
  border: 1px solid #27ae60;
  border-radius: 8px;
  padding: 16px;
  text-align: center;
}

.event-log p {
  margin: 0;
  color: #2c3e50;
  font-family: 'Roboto', sans-serif;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .property-card-guide {
    padding: 20px 16px;
  }

  .page-title {
    font-size: 24px;
    margin-bottom: 30px;
  }

  .section-title {
    font-size: 20px;
    margin-bottom: 20px;
  }

  .cards-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .code-example {
    padding: 16px;
  }

  .code-example pre {
    font-size: 12px;
    padding: 12px;
  }

  .docs-table {
    font-size: 14px;
  }

  .docs-table th,
  .docs-table td {
    padding: 8px 12px;
  }
}
</style>
