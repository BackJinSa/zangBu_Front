<script setup>
import { ref, computed } from 'vue'
import PropertyCardWaiting from '@/components/common/PropertyCardWaiting.vue'

// API 응답 형식의 샘플 데이터
const apiResponse = ref({
  deals: [
    {
      building_id: '1',
      price: '750000000',
      building_name: '스카이빌',
      house_type: '아파트',
      sale_type: '매매',
      image_url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop',
      address: '서울시 광진구 자양로 21길 16-26',
      deal_status: '구매중',
      created_at: '1일 전 등록',
    },
    {
      building_id: '2',
      price: '520000000',
      building_name: '한강하이츠',
      house_type: '오피스텔',
      sale_type: '전세',
      image_url:
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop',
      address: '서울시 마포구 합정동 123-45',
      deal_status: '판매중',
      created_at: '2일 전 등록',
    },
    {
      building_id: '3',
      price: '980000000',
      building_name: '롯데캐슬',
      house_type: '아파트',
      sale_type: '매매',
      image_url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop',
      address: '서울시 송파구 잠실로 222',
      deal_status: '판매중',
      created_at: '3일 전 등록',
    },
    {
      building_id: '4',
      price: '130000000',
      building_name: '행복한빌라',
      house_type: '빌라',
      sale_type: '월세',
      image_url:
        'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&h=300&fit=crop',
      address: '경기도 성남시 분당구 수내동 88-1',
      deal_status: '구매중',
      created_at: '1주 전 등록',
    },
  ],
})

// API 데이터를 컴포넌트 형식으로 변환하는 함수
const transformApiData = (deals) => {
  return deals.map((deal) => ({
    buildingId: deal.building_id,
    buildingName: deal.building_name,
    address: deal.address,
    imageUrl: deal.image_url,
    price: formatPrice(deal.price),
    dealStatus: deal.deal_status,
    createdAt: deal.created_at,
    saleType: deal.sale_type,
    houseType: deal.house_type,
  }))
}

// 가격 포맷팅 함수
const formatPrice = (price) => {
  const numPrice = parseInt(price)
  if (numPrice >= 100000000) {
    return `₩${(numPrice / 100000000).toFixed(0)}억`
  } else if (numPrice >= 10000) {
    return `₩${(numPrice / 10000).toFixed(0)}만`
  } else {
    return `₩${numPrice.toLocaleString()}`
  }
}

// 변환된 샘플 매물 데이터
const sampleProperties = computed(() => transformApiData(apiResponse.value.deals))

// 인터랙티브 데모용 매물
const interactiveProperty = ref({
  id: 999,
  title: '인터랙티브 데모 매물',
  location: '서울시 강남구',
  imageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop',
  price: '₩500,000,000',
  description: '인터랙티브 데모용 매물입니다. 실제로 조작해보세요.',
  waitingStatus: '구매중',
  waitingMessage: '구매 진행 중입니다',
  submittedDate: '오늘 등록',
  isBookmarked: false,
})

const lastEvent = ref('')
const currentFilter = ref('all')

// 필터 설정
const filters = computed(() => [
  { label: '전체', value: 'all', count: sampleProperties.value.length },
  {
    label: '구매중',
    value: '구매중',
    count: sampleProperties.value.filter((p) => p.waitingStatus === '구매중').length,
  },
  {
    label: '판매중',
    value: '판매중',
    count: sampleProperties.value.filter((p) => p.waitingStatus === '판매중').length,
  },
])

// 필터링된 매물
const filteredProperties = computed(() => {
  if (currentFilter.value === 'all') {
    return sampleProperties.value
  }
  return sampleProperties.value.filter((p) => p.waitingStatus === currentFilter.value)
})

// 필터 설정 함수
const setFilter = (filter) => {
  currentFilter.value = filter
}

// 이벤트 핸들러
const handleContinue = (property) => {
  console.log('Continue:', property)
}

const handleCancel = (property) => {
  console.log('Cancel:', property)
}

const handleInteractiveContinue = (property) => {
  lastEvent.value = `거래 이어가기: ${property.title}`
  console.log('Interactive Continue:', property)
}

const handleInteractiveCancel = (property) => {
  lastEvent.value = `취소: ${property.title}`
  console.log('Interactive Cancel:', property)
}
</script>

<template>
  <div class="property-card-waiting-guide">
    <div class="container">
      <h1 class="page-title">PropertyCardWaiting 컴포넌트 가이드</h1>

      <!-- 컴포넌트 예시 -->
      <section class="section">
        <h2 class="section-title">컴포넌트 예시</h2>
        <div class="cards-grid">
          <PropertyCardWaiting
            v-for="property in sampleProperties"
            :key="property.id"
            :property="property"
            @edit="handleContinue"
            @cancel="handleCancel"
          />
        </div>
      </section>

      <!-- 코드 예시 -->
      <section class="section">
        <h2 class="section-title">코드 예시</h2>
        <div class="code-example">
          <h3>기본 사용법</h3>
          <pre><code>&lt;template&gt;
  &lt;PropertyCardWaiting
    v-for="property in properties"
    :key="property.buildingId"
    :property="property"
    @edit="handleContinue"
    @cancel="handleCancel"
  /&gt;
&lt;/template&gt;

&lt;script setup&gt;
import { ref, computed } from 'vue'
import PropertyCardWaiting from '@/components/common/PropertyCardWaiting.vue'

// API 응답 데이터
const apiResponse = ref({
  deals: [
    {
      building_id: "1",
      price: "750000000",
      building_name: "스카이빌",
      house_type: "아파트",
      sale_type: "매매",
      image_url: "/path/to/image.jpg",
      address: "서울시 광진구 자양로 21길 16-26",
      deal_status: "구매중",
      created_at: "1일 전 등록"
    }
  ]
})

// API 데이터를 컴포넌트 형식으로 변환
const properties = computed(() => transformApiData(apiResponse.value.deals))

// 데이터 변환 함수
const transformApiData = (deals) => {
  return deals.map(deal => ({
    buildingId: deal.building_id,
    buildingName: deal.building_name,
    address: deal.address,
    imageUrl: deal.image_url,
    price: formatPrice(deal.price),
    dealStatus: deal.deal_status,
    createdAt: deal.created_at,
    saleType: deal.sale_type,
    houseType: deal.house_type
  }))
}

// 가격 포맷팅
const formatPrice = (price) => {
  const numPrice = parseInt(price)
  if (numPrice >= 100000000) {
    return `₩${(numPrice / 100000000).toFixed(0)}억`
  }
  return `₩${(numPrice / 10000).toFixed(0)}만`
}



const handleContinue = (property) => {
  console.log('Continue:', property)
}

const handleCancel = (property) => {
  console.log('Cancel:', property)
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
                <td>대기 중인 매물 정보 객체</td>
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
  buildingId: String,      // 매물 고유 ID
  buildingName: String,    // 매물 이름
  address: String,         // 주소
  imageUrl: String,        // 이미지 URL
  price: String,           // 가격
  dealStatus: String,      // 거래 상태 (구매중/판매중)
  createdAt: String,       // 등록 날짜
  saleType: String,        // 거래 유형 (매매/전세/월세)
  houseType: String        // 부동산 유형 (아파트/오피스텔/빌라)
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

const handleContinue = (property) => {
  console.log('Continue:', property)
  // 거래 이어가기 처리
  router.push(`/trade/continue/${property.id}`)
}

const handleCancel = (property) => {
  console.log('Cancel:', property)
  // 취소 확인 후 처리
  if (confirm('정말 취소하시겠습니까?')) {
    cancelTransaction(property.id)
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
                <td>edit</td>
                <td>거래 이어가기 버튼 클릭</td>
                <td>property object</td>
                <td>거래를 계속 진행할 때 발생</td>
              </tr>
              <tr>
                <td>cancel</td>
                <td>취소하기 버튼 클릭</td>
                <td>property object</td>
                <td>거래를 취소할 때 발생</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- 이벤트 구조 코드 -->
      <section class="section">
        <h2 class="section-title">이벤트 구조 코드</h2>
        <div class="code-example">
          <h3>Edit/Cancel 이벤트 데이터 구조</h3>
          <pre><code>{
  buildingId: String,
  buildingName: String,
  address: String,
  imageUrl: String,
  price: String,
  dealStatus: String,
  createdAt: String,
  saleType: String,
  houseType: String
}</code></pre>
        </div>
      </section>

      <!-- 인터랙티브 데모 -->
      <section class="section">
        <h2 class="section-title">인터랙티브 데모</h2>
        <div class="demo-card">
          <PropertyCardWaiting
            :property="interactiveProperty"
            @edit="handleInteractiveContinue"
            @cancel="handleInteractiveCancel"
          />
        </div>
        <div v-if="lastEvent" class="event-log">
          <p>
            마지막 이벤트: <strong>{{ lastEvent }}</strong>
          </p>
        </div>
      </section>

      <!-- 필터링 데모 -->
      <section class="section">
        <h2 class="section-title">필터링 데모</h2>
        <div class="filter-demo">
          <div class="filter-buttons">
            <button
              v-for="filter in filters"
              :key="filter.value"
              @click="setFilter(filter.value)"
              :class="['filter-btn', { active: currentFilter === filter.value }]"
            >
              {{ filter.label }} ({{ filter.count }})
            </button>
          </div>
          <div class="filtered-cards">
            <PropertyCardWaiting
              v-for="property in filteredProperties"
              :key="property.buildingId"
              :property="property"
              @edit="handleContinue"
              @cancel="handleCancel"
            />
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.property-card-waiting-guide {
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

/* Filter demo */
.filter-demo {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.1);
}

.filter-buttons {
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  justify-content: center;
  flex-wrap: wrap;
}

.filter-btn {
  padding: 8px 16px;
  border: 2px solid #3498db;
  background: white;
  color: #3498db;
  border-radius: 20px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: 'Roboto', sans-serif;
}

.filter-btn:hover {
  background: #3498db;
  color: white;
}

.filter-btn.active {
  background: #3498db;
  color: white;
}

.filtered-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 24px;
  justify-items: center;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .property-card-waiting-guide {
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

  .cards-grid,
  .filtered-cards {
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

  .filter-buttons {
    flex-direction: column;
    align-items: center;
  }

  .filter-btn {
    width: 100%;
    max-width: 200px;
  }
}
</style>
