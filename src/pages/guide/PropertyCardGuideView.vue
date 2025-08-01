<template>
  <ComponentGuideTemplate ref="templateRef" component-name="PropertyCard">
    <!-- 기본 사용법 슬롯 -->
    <template #basic-usage>
      <PropertyCard
        :property="sampleProperties[0]"
        @bookmark="handleBookmark"
        @detail="handleDetail"
        @delete="handleDelete"
      />
    </template>

    <!-- 예시 슬롯들 -->
    <template #example-1>
      <PropertyCard
        :property="sampleProperties[1]"
        @bookmark="handleBookmark"
        @detail="handleDetail"
        @delete="handleDelete"
      />
    </template>

    <template #example-2>
      <PropertyCard
        :property="sampleProperties[2]"
        @bookmark="handleBookmark"
        @detail="handleDetail"
        @delete="handleDelete"
      />
    </template>

    <template #example-3>
      <PropertyCard
        :property="sampleProperties[3]"
        @bookmark="handleBookmark"
        @detail="handleDetail"
        @delete="handleDelete"
      />
    </template>

    <!-- 인터랙티브 데모 슬롯 -->
    <template #interactive-demo>
      <PropertyCard
        :property="interactiveProperty"
        @bookmark="handleInteractiveBookmark"
        @detail="handleInteractiveDetail"
        @delete="handleInteractiveDelete"
      />
    </template>

    <!-- 코드 예시 슬롯들 -->
    <template #basic-usage-code>
      &lt;PropertyCard :property="propertyData" @bookmark="handleBookmark" @detail="handleDetail"
      @delete="handleDelete" /&gt;</template
    >

    <template #props-structure-code>
      const property = { id: 1, title: '홍대 아늑한 스튜디오', location: '서울시 마포구', imageUrl:
      '/path/to/image.jpg', status: '전세', price: '₩300,000,000', description: '젊은 전문가에게
      완벽한 스튜디오 아파트입니다.', savedDate: '1주 전 저장', isBookmarked: false }</template
    >

    <template #event-handlers-code>
      const handleBookmark = (data) => { console.log('Bookmark:', data.propertyId,
      data.isBookmarked) addEventLog(`북마크: ${data.isBookmarked ? '추가' : '제거'}`) } const
      handleDetail = (property) => { console.log('Detail:', property) addEventLog(`상세보기:
      ${property.title}`) } const handleDelete = (property) => { console.log('Delete:', property)
      addEventLog(`삭제: ${property.title}`) }</template
    >

    <!-- Props 테이블 슬롯 -->
    <template #props-table>
      <tr class="border-b border-bg-1">
        <td class="p-2 text-text-1">property</td>
        <td class="p-2 text-text-1">Object</td>
        <td class="p-2 text-text-1">Yes</td>
        <td class="p-2 text-text-1">-</td>
        <td class="p-2 text-text-1">매물 정보 객체</td>
      </tr>
    </template>

    <!-- Events 테이블 슬롯 -->
    <template #events-table>
      <tr class="border-b border-bg-1">
        <td class="p-2 text-text-1">bookmark</td>
        <td class="p-2 text-text-1">{ propertyId, isBookmarked }</td>
        <td class="p-2 text-text-1">북마크 버튼 클릭 시 발생</td>
      </tr>
      <tr class="border-b border-bg-1">
        <td class="p-2 text-text-1">detail</td>
        <td class="p-2 text-text-1">property object</td>
        <td class="p-2 text-text-1">상세보기 버튼 클릭 시 발생</td>
      </tr>
      <tr class="border-b border-bg-1">
        <td class="p-2 text-text-1">delete</td>
        <td class="p-2 text-text-1">property object</td>
        <td class="p-2 text-text-1">삭제 버튼 클릭 시 발생</td>
      </tr>
    </template>
  </ComponentGuideTemplate>
</template>

<script setup>
import { ref } from 'vue'
import ComponentGuideTemplate from './ComponentGuideTemplate.vue'
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

const templateRef = ref(null)

// 이벤트 핸들러
const handleBookmark = (data) => {
  const property = sampleProperties.value.find((p) => p.id === data.propertyId)
  if (property) {
    property.isBookmarked = data.isBookmarked
  }
  templateRef.value?.addEventLog(
    `북마크: ${property?.title} - ${data.isBookmarked ? '추가' : '제거'}`
  )
}

const handleDetail = (property) => {
  templateRef.value?.addEventLog(`상세보기: ${property.title}`)
}

const handleDelete = (property) => {
  templateRef.value?.addEventLog(`삭제: ${property.title}`)
}

const handleInteractiveBookmark = (data) => {
  interactiveProperty.value.isBookmarked = data.isBookmarked
  templateRef.value?.addEventLog(`인터랙티브 북마크: ${data.isBookmarked ? '추가' : '제거'}`)
}

const handleInteractiveDetail = (property) => {
  templateRef.value?.addEventLog(`인터랙티브 상세보기: ${property.title}`)
}

const handleInteractiveDelete = (property) => {
  templateRef.value?.addEventLog(`인터랙티브 삭제: ${property.title}`)
}
</script>

<style scoped>
.color-card {
  background: var(--bg-2);
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.color-swatch {
  width: 100%;
  height: 60px;
  border-radius: 6px;
  margin-bottom: 8px;
}

.color-info p {
  margin: 0;
}

pre {
  font-family: 'Courier New', monospace;
  white-space: pre-wrap;
}

table {
  border-collapse: collapse;
}

th,
td {
  text-align: left;
  padding: 8px;
}
</style>
