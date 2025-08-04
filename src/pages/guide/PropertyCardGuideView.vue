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
            :key="property.building_id"
            :property="property"
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
    @detail="handleDetail"
    @delete="handleDelete"
  /&gt;
&lt;/template&gt;

&lt;script setup&gt;
import PropertyCard from '@/components/common/PropertyCard.vue'

const propertyData = {
  bookmark_id: "1",
  building_id: "1",
  complex_id: "1",
  seller_nickname: "부동산왕",
  sale_type: "전세",
  price: "300000000",
  deposit: "",
  bookmark_count: "5",
  created_at: "1주 전 등록",
  building_name: "스카이빌",
  seller_type: "개인",
  property_type: "아파트",
  info_oneline: "젊은 전문가에게 완벽한 스튜디오 아파트입니다.",
  image_url: "/path/to/image.jpg",
  facility: "지하철역 도보 5분"
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
  bookmark_id: String,      // 찜한 매물 식별 ID
  building_id: String,      // 매물 식별 ID
  complex_id: String,       // 단지 식별 ID
  seller_nickname: String,  // 판매자 닉네임
  sale_type: String,        // 매물 종류 (월세, 전세, 매매)
  price: String,            // 가격
  deposit: String,          // 보증금
  bookmark_count: String,   // 찜 개수
  created_at: String,       // 생성 날짜
  building_name: String,    // 매물 이름
  seller_type: String,      // 등록자 유형
  property_type: String,    // 부동산 종류
  info_oneline: String,     // 한 줄 소개
  image_url: String,        // 매물 사진 링크
  facility: String          // 주변시설
}</code></pre>
        </div>
      </section>

      <!-- 이벤트 핸들러 -->
      <section class="section">
        <h2 class="section-title">이벤트 핸들러</h2>
        <div class="code-example">
          <h3>이벤트 처리 예시</h3>
          <pre><code>const handleDetail = (property) => {
  console.log('Detail:', property)
  // 상세 페이지로 이동
  router.push(`/property/detail/${property.building_id}`)
}

const handleDelete = (property) => {
  console.log('Delete:', property)
  // 삭제 확인 후 처리
  if (confirm('정말 삭제하시겠습니까?')) {
    deleteProperty(property.building_id)
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
          <h3>Detail/Delete 이벤트 데이터 구조</h3>
          <pre><code>{
  bookmark_id: String,
  building_id: String,
  complex_id: String,
  seller_nickname: String,
  sale_type: String,
  price: String,
  deposit: String,
  bookmark_count: String,
  created_at: String,
  building_name: String,
  seller_type: String,
  property_type: String,
  info_oneline: String,
  image_url: String,
  facility: String
}</code></pre>
        </div>
      </section>

      <!-- 인터랙티브 데모 -->
      <section class="section">
        <h2 class="section-title">인터랙티브 데모</h2>
        <div class="demo-card">
          <PropertyCard
            :property="interactiveProperty"
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
    bookmark_id: '1',
    building_id: '1',
    complex_id: '1',
    seller_nickname: '부동산왕',
    sale_type: '전세',
    price: '300000000',
    deposit: '',
    bookmark_count: '5',
    created_at: '1주 전 등록',
    building_name: '홍대 아늑한 스튜디오',
    seller_type: '개인',
    property_type: '아파트',
    info_oneline: '젊은 전문가에게 완벽한 스튜디오 아파트입니다. 밤 문화와 대학가에 가깝습니다.',
    image_url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop',
    facility: '홍대입구역 도보 3분',
  },
  {
    bookmark_id: '2',
    building_id: '2',
    complex_id: '2',
    seller_nickname: '강남부동산',
    sale_type: '매매',
    price: '800000000',
    deposit: '',
    bookmark_count: '12',
    created_at: '3일 전 등록',
    building_name: '강남 역세권 신축 아파트',
    seller_type: '중개사',
    property_type: '아파트',
    info_oneline: '강남역 도보 5분 거리의 신축 아파트입니다. 역세권의 편리함을 누려보세요.',
    image_url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop',
    facility: '강남역 도보 5분',
  },
  {
    bookmark_id: '',
    building_id: '3',
    complex_id: '3',
    seller_nickname: '마포부동산',
    sale_type: '월세',
    price: '500000',
    deposit: '50000000',
    bookmark_count: '3',
    created_at: '1주 전 등록',
    building_name: '합정동 빌라',
    seller_type: '개인',
    property_type: '빌라',
    info_oneline: '합정역 근처의 조용한 빌라입니다. 주변 편의시설이 잘 갖춰져 있습니다.',
    image_url: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&h=300&fit=crop',
    facility: '합정역 도보 7분',
  },
  {
    bookmark_id: '',
    building_id: '4',
    complex_id: '4',
    seller_nickname: '성수부동산',
    sale_type: '월세',
    price: '400000',
    deposit: '40000000',
    bookmark_count: '8',
    created_at: '2일 전 등록',
    building_name: '성수동 원룸',
    seller_type: '중개사',
    property_type: '원룸',
    info_oneline: '성수동의 깔끔한 원룸입니다. 창고형 카페와 맛집이 가까이 있습니다.',
    image_url: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop',
    facility: '성수역 도보 10분',
  },
])

// 인터랙티브 데모용 매물
const interactiveProperty = ref({
  bookmark_id: '',
  building_id: '999',
  complex_id: '999',
  seller_nickname: '데모부동산',
  sale_type: '매매',
  price: '500000000',
  deposit: '',
  bookmark_count: '0',
  created_at: '오늘 등록',
  building_name: '인터랙티브 데모 매물',
  seller_type: '개인',
  property_type: '아파트',
  info_oneline: '인터랙티브 데모용 매물입니다. 실제로 조작해보세요.',
  image_url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop',
  facility: '강남역 도보 3분',
})

const lastEvent = ref('')

const handleDetail = (property) => {
  console.log('Detail:', property)
}

const handleDelete = (property) => {
  console.log('Delete:', property)
}

const handleInteractiveDetail = (property) => {
  lastEvent.value = `상세보기: ${property.building_name}`
  console.log('Interactive Detail:', property)
}

const handleInteractiveDelete = (property) => {
  lastEvent.value = `삭제: ${property.building_name}`
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
