<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getDeals } from '@/api/deal/deal.js'
import PropertyCard from '@/components/common/PropertyCard.vue'
import Footer from '@/components/common/footer.vue'

const router = useRouter()

// Reactive data
const deals = ref([])
const loading = ref(false)
const error = ref(null)
const activeFilter = ref('buying') // 기본값을 '구매 중'으로 설정

// Dummy data for testing
const dummyDeals = [
  {
    id: 1,
    status: 'buying',
    user_role: 'buyer',
    created_at: '2024-01-15',
    property: {
      id: 101,
      building_name: '스카이빌',
      address: '서울시 광진구 자양로21길 16-26',
      price: 705000000,
      sale_type: '매매',
      property_type: '아파트',
      image_url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop',
    },
    seller: { nickname: '김판매' },
    buyer: { nickname: '김철수' },
  },
  {
    id: 2,
    status: 'buying',
    user_role: 'buyer',
    created_at: '2024-01-14',
    property: {
      id: 102,
      building_name: '래미안안암',
      address: '서울시 성북구 고려대로17가길 64',
      price: 770000000,
      sale_type: '매매',
      property_type: '아파트',
      image_url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop',
    },
    seller: { nickname: '이판매' },
    buyer: { nickname: '김철수' },
  },
  {
    id: 3,
    status: 'buying',
    user_role: 'buyer',
    created_at: '2024-01-13',
    property: {
      id: 103,
      building_name: '목동한국',
      address: '서울시 양천구 중앙로 332',
      price: 755000000,
      sale_type: '매매',
      property_type: '아파트',
      image_url:
        'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&h=300&fit=crop',
    },
    seller: { nickname: '박판매' },
    buyer: { nickname: '김철수' },
  },
  {
    id: 4,
    status: 'buying',
    user_role: 'buyer',
    created_at: '2024-01-12',
    property: {
      id: 104,
      building_name: '잠실래미안아이파크',
      address: '서울시 송파구 신천동',
      price: 4550000000,
      sale_type: '매매',
      property_type: '아파트',
      image_url:
        'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop',
    },
    seller: { nickname: '최판매' },
    buyer: { nickname: '김철수' },
  },
  {
    id: 5,
    status: 'selling',
    user_role: 'seller',
    created_at: '2024-01-11',
    property: {
      id: 105,
      building_name: '강남아이파크',
      address: '서울시 강남구 테헤란로 123',
      price: 1200000000,
      sale_type: '매매',
      property_type: '아파트',
      image_url:
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=300&fit=crop',
    },
    seller: { nickname: '김철수' },
    buyer: { nickname: '이구매' },
  },
  {
    id: 6,
    status: 'selling',
    user_role: 'seller',
    created_at: '2024-01-10',
    property: {
      id: 106,
      building_name: '마포래미안',
      address: '서울시 마포구 월드컵로 123',
      price: 850000000,
      sale_type: '매매',
      property_type: '아파트',
      image_url:
        'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop',
    },
    seller: { nickname: '김철수' },
    buyer: { nickname: '박구매' },
  },
]

// Fetch deals from API (now using dummy data)
const fetchDeals = async () => {
  loading.value = true
  error.value = null

  try {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Use dummy data instead of API call
    deals.value = dummyDeals

    // Uncomment below to use real API
    // const response = await getDeals()
    // deals.value = response.data || []
  } catch (err) {
    console.error('Failed to fetch deals:', err)
    error.value = '거래 목록을 불러오는데 실패했습니다. 다시 시도해주세요.'
  } finally {
    loading.value = false
  }
}

// Filter deals based on active filter
const filteredDeals = computed(() => {
  if (activeFilter.value === 'all') {
    return deals.value
  } else if (activeFilter.value === 'buying') {
    return deals.value.filter((deal) => deal.user_role === 'buyer' || deal.type === 'buying')
  } else if (activeFilter.value === 'selling') {
    return deals.value.filter((deal) => deal.user_role === 'seller' || deal.type === 'selling')
  }
  return deals.value
})

// Set active filter
const setActiveFilter = (filter) => {
  activeFilter.value = filter
}

// Format deal data for PropertyCard component
const formatDealForPropertyCard = (deal) => {
  return {
    bookmark_id: deal.id,
    building_id: deal.property?.id || deal.id,
    complex_id: deal.property?.complex_id || '',
    seller_nickname: deal.seller?.nickname || '판매자',
    sale_type: deal.property?.sale_type || '매매',
    price: deal.property?.price || deal.price || '',
    deposit: deal.property?.deposit || '',
    bookmark_count: deal.bookmark_count || 0,
    created_at: deal.created_at || '',
    building_name: deal.property?.building_name || deal.property_name || '매물명',
    seller_type: deal.seller?.type || '',
    property_type: deal.property?.property_type || '아파트',
    info_oneline: deal.property?.address || deal.address || '주소 정보',
    image_url: deal.property?.image_url || deal.image_url || '/default-property.jpg',
    facility: deal.property?.facility || '',
    // 거래 관련 추가 정보
    deal_status: deal.status,
    deal_id: deal.id,
    user_role: deal.user_role,
  }
}

// Handle deal detail
const handleDealDetail = (property) => {
  const dealId = property.deal_id
  if (property.user_role === 'seller') {
    router.push(`/deal/seller/${dealId}`)
  } else {
    router.push(`/deal/buyer/${dealId}`)
  }
}

// Initialize component
onMounted(() => {
  fetchDeals()
})
</script>

<template>
  <div class="deal-waiting-list-view">
    <!-- Header (비워둠) -->
    <div class="header-placeholder"></div>

    <!-- Main Content -->
    <div class="main-content">
      <!-- Section Title -->
      <div class="section-title">
        <h1>거래 중인 매물</h1>
      </div>

      <!-- Filter Tabs -->
      <div class="filter-tabs">
        <button
          @click="setActiveFilter('all')"
          :class="['filter-tab', { active: activeFilter === 'all' }]"
        >
          전체
        </button>
        <button
          @click="setActiveFilter('buying')"
          :class="['filter-tab', { active: activeFilter === 'buying' }]"
        >
          구매 중
        </button>
        <button
          @click="setActiveFilter('selling')"
          :class="['filter-tab', { active: activeFilter === 'selling' }]"
        >
          판매 중
        </button>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="loading-container">
        <div class="loading-spinner"></div>
        <p class="loading-text">거래 목록을 불러오는 중...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="error-container">
        <i class="fas fa-exclamation-triangle error-icon"></i>
        <p class="error-text">{{ error }}</p>
        <button @click="fetchDeals" class="retry-button">
          <i class="fas fa-redo"></i>
          다시 시도
        </button>
      </div>

      <!-- Empty State -->
      <div v-else-if="filteredDeals.length === 0" class="empty-container">
        <i class="fas fa-inbox empty-icon"></i>
        <h3 class="empty-title">거래 중인 매물이 없습니다</h3>
        <p class="empty-text">새로운 거래가 등록되면 여기에 표시됩니다.</p>
      </div>

      <!-- Deals List -->
      <div v-else class="deals-container">
        <div class="deals-grid">
          <PropertyCard
            v-for="deal in filteredDeals"
            :key="deal.id"
            :property="formatDealForPropertyCard(deal)"
            @detail="handleDealDetail"
          />
        </div>
      </div>
    </div>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<style scoped>
.deal-waiting-list-view {
  min-height: 100vh;
  background: var(--bg-1);
  display: flex;
  flex-direction: column;
}

/* Header Placeholder */
.header-placeholder {
  height: 80px; /* 헤더 높이만큼 공간 확보 */
}

/* Main Content */
.main-content {
  flex: 1;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

/* Section Title */
.section-title {
  text-align: center;
  margin-bottom: 32px;
}

.section-title h1 {
  color: #374151; /* 더 진한 회색으로 변경 */
  font-size: 28px;
  font-weight: bold;
  font-family: 'Roboto', sans-serif;
  margin: 0;
}

/* Filter Tabs */
.filter-tabs {
  display: flex;
  justify-content: center;
  gap: 12px; /* 간격 줄임 */
  margin-bottom: 40px;
}

.filter-tab {
  padding: 12px 24px;
  border: 1px solid #e0e0e0; /* 테두리 색상 변경 */
  background: #f2f2f2; /* 기본 배경색을 연한 회색으로 */
  color: #374151; /* 텍스트 색상을 진한 회색으로 */
  border-radius: 8px;
  font-size: 18px; /* 폰트 크기 증가 */
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: 'Inter', sans-serif;
  min-width: 100px;
}

.filter-tab:hover {
  border-color: var(--brand-3);
  color: var(--brand-3);
}

.filter-tab.active {
  background: var(--brand-3); /* 초록색 배경 */
  color: var(--text-3); /* 흰색 텍스트 */
  border-color: var(--brand-3);
}

/* Loading State */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid var(--bg-2);
  border-top: 4px solid var(--brand-3);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 16px;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.loading-text {
  color: var(--text-2);
  font-size: 16px;
  font-family: 'Roboto', sans-serif;
}

/* Error State */
.error-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
}

.error-icon {
  font-size: 48px;
  color: var(--status-2);
  margin-bottom: 16px;
}

.error-text {
  color: var(--text-2);
  font-size: 16px;
  margin-bottom: 20px;
  font-family: 'Roboto', sans-serif;
}

.retry-button {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: var(--brand-3);
  color: var(--text-3);
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.retry-button:hover {
  background: var(--brand-2);
}

/* Empty State */
.empty-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
}

.empty-icon {
  font-size: 64px;
  color: var(--text-1);
  margin-bottom: 16px;
}

.empty-title {
  color: var(--text-2);
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 8px;
  font-family: 'Roboto', sans-serif;
}

.empty-text {
  color: var(--text-1);
  font-size: 14px;
  font-family: 'Roboto', sans-serif;
}

/* Deals Container */
.deals-container {
  width: 100%;
}

.deals-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
  justify-items: center;
}

/* Responsive Design */
@media (max-width: 768px) {
  .main-content {
    padding: 16px;
  }

  .section-title h1 {
    font-size: 24px;
  }

  .filter-tabs {
    flex-direction: column;
    align-items: center;
    gap: 12px;
  }

  .filter-tab {
    width: 200px;
  }

  .deals-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
}

@media (max-width: 480px) {
  .header-placeholder {
    height: 60px;
  }
}
</style>
