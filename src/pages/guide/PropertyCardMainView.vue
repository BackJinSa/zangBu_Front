<template>
  <div class="property-card-guide">
    <div class="container">
      <h1 class="page-title">PropertyCardMain 컴포넌트 가이드</h1>

      <!-- 컴포넌트 예시 -->
      <section class="section">
        <h2 class="section-title">컴포넌트 예시</h2>
        <div class="cards-grid">
          <PropertyCardMain
            v-for="property in sampleProperties"
            :key="property.buildingId"
            :property="property"
            @bookmark="handleBookmark"
            @click="handleCardClick"
          />
        </div>
      </section>

      <!-- 코드 예시 -->
      <section class="section">
        <h2 class="section-title">코드 예시</h2>
        <div class="code-example">
          <h3>기본 사용법</h3>
          <pre><code>&lt;template&gt;
  &lt;PropertyCardMain
    :property="propertyData"
    @bookmark="handleBookmark"
    @click="handleCardClick"
  /&gt;
&lt;/template&gt;

&lt;script setup&gt;
import PropertyCardMain from '@/components/common/PropertyCardMain.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const propertyData = {
  buildingId: "1",
  price: "500000000",
  buildingName: "래미안 강남",
  imageUrl: "https://www.rtech.or.kr/MarketPrice/getMarketPriceAptRepImage.do?aptSeq=20333000",
  isBookmarked: false,
  rank: 4.5
}

const handleBookmark = (data) => {
  console.log('Bookmark:', data)
}

const handleCardClick = (property) => {
  router.push(`/property/detail/${property.buildingId}`)
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
                <td>부동산 정보 객체</td>
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
  buildingId: String,   // 부동산 고유 ID
  price: String,        // 가격 (예: '500000000')
  buildingName: String, // 부동산 이름 (예: '래미안 강남')
  imageUrl: String,     // 이미지 URL
  isBookmarked: Boolean, // 즐겨찾기 여부
  rank: Number          // 평점 (예: 4.5)
}</code></pre>
        </div>
      </section>

      <!-- 이벤트 핸들러 -->
      <section class="section">
        <h2 class="section-title">이벤트 핸들러</h2>
        <div class="code-example">
          <h3>Bookmark 이벤트 처리</h3>
          <pre><code>const handleBookmark = (data) => {
  const { propertyId, isBookmarked } = data
  
  // 즐겨찾기 상태 업데이트
  const property = properties.value.find(p => p.buildingId === propertyId)
  if (property) {
    property.isBookmarked = isBookmarked
  }
  
  // API 호출 예시
  updateBookmarkStatus(propertyId, isBookmarked)
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
                <td>하트 버튼 클릭</td>
                <td>{ propertyId, isBookmarked }</td>
                <td>즐겨찾기 상태 변경 시 발생</td>
              </tr>
              <tr>
                <td>click</td>
                <td>카드 클릭</td>
                <td>property object</td>
                <td>카드 클릭 시 발생 (상세 페이지 이동용)</td>
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
  propertyId: String,   // 부동산 ID (buildingId)
  isBookmarked: Boolean // 즐겨찾기 상태 (true/false)
}</code></pre>
        </div>
      </section>

      <!-- 인터랙티브 데모 -->
      <section class="section">
        <h2 class="section-title">인터랙티브 데모</h2>
        <div class="demo-card">
          <PropertyCardMain
            :property="interactiveProperty"
            @bookmark="handleInteractiveBookmark"
            @click="handleInteractiveCardClick"
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
import PropertyCardMain from '@/components/common/PropertyCardMain.vue'

const sampleProperties = ref([
  {
    buildingId: '1',
    price: '500000000',
    buildingName: '래미안 강남',
    imageUrl: 'https://www.rtech.or.kr/MarketPrice/getMarketPriceAptRepImage.do?aptSeq=20333000',
    isBookmarked: false,
    rank: 4.5,
  },
  {
    buildingId: '2',
    price: '300000000',
    buildingName: '청구아파트',
    imageUrl: 'https://www.rtech.or.kr/MarketPrice/getMarketPriceAptRepImage.do?aptSeq=20333000',
    isBookmarked: true,
    rank: 4.2,
  },
  {
    buildingId: '3',
    price: '1500000',
    buildingName: '한양 럭스 아파트',
    imageUrl: 'https://www.rtech.or.kr/MarketPrice/getMarketPriceAptRepImage.do?aptSeq=20333000',
    isBookmarked: false,
    rank: 4.9,
  },
  {
    buildingId: '4',
    price: '800000000',
    buildingName: '센트럴 파크 타워',
    imageUrl: 'https://www.rtech.or.kr/MarketPrice/getMarketPriceAptRepImage.do?aptSeq=20333000',
    isBookmarked: false,
    rank: 4.7,
  },
])

// 인터랙티브 데모용 매물
const interactiveProperty = ref({
  buildingId: '999',
  price: '600000000',
  buildingName: '인터랙티브 데모 매물',
  imageUrl: 'https://www.rtech.or.kr/MarketPrice/getMarketPriceAptRepImage.do?aptSeq=20333000',
  isBookmarked: false,
  rank: 4.8,
})

const lastEvent = ref('')

const handleBookmark = (data) => {
  const property = sampleProperties.value.find((p) => p.buildingId === data.propertyId)
  if (property) {
    property.isBookmarked = data.isBookmarked
    console.log(`Property ${property.buildingName} bookmark: ${data.isBookmarked}`)
  }
}

const handleCardClick = (property) => {
  console.log('Card clicked:', property.buildingName)
  // 실제 구현에서는 여기서 라우팅 처리
  // router.push(`/property/detail/${property.buildingId}`)
}

const handleInteractiveBookmark = (data) => {
  interactiveProperty.value.isBookmarked = data.isBookmarked
  lastEvent.value = `북마크: ${data.isBookmarked ? '추가' : '제거'}`
  console.log('Interactive Bookmark:', data)
}

const handleInteractiveCardClick = (property) => {
  lastEvent.value = `카드 클릭: ${property.buildingName}`
  console.log('Interactive Card Click:', property)
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

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 24px;
  justify-items: center;
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
