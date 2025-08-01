<!-- /src/pages/system/NotificationView.vue -->
<template>
  <div class="notification-view">
    <!-- 상단 헤더 -->
    <div class="notification-header">
      <button class="back-button" @click="goBack">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M15 18L9 12L15 6"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
      <div class="header-content">
        <div class="notification-icon">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <path
              d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M13.73 21a2 2 0 0 1-3.46 0"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <div class="header-text">
          <h1>알림</h1>
          <p>부동산 관련 알림을 확인하세요</p>
        </div>
      </div>
      <NotificationActionBar />
    </div>

    <!-- 필터 탭 -->
    <NotificationFilter
      :filters="filters"
      :active-filter="activeFilter"
      @filter-change="handleFilterChange"
    />

    <!-- 알림 리스트 + 페이지네이션 -->
    <div class="notification-content">
      <NotificationList
        :notifications="pagedNotifications"
        :loading="loading"
        @notification-action="handleNotificationAction"
      />

      <NotificationPagination
        v-if="totalPages > 1"
        :current-page="currentPage"
        :total-pages="totalPages"
        @page-change="handlePageChange"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import NotificationFilter from '../../components/system/NotificationFilter.vue'
import NotificationActionBar from '../../components/system/NotificationActionBar.vue'
import NotificationList from '../../components/system/NotificationList.vue'
import NotificationPagination from '../../components/system/NotificationPagination.vue'

// 상태
const loading = ref(false)
const activeFilter = ref('all')
const currentPage = ref(1)
const pageSize = 10

// 🔸 더미 데이터 생성
const dummyTypes = ['property', 'transaction', 'review']
const dummyIcons = {
  property: 'home',
  transaction: 'chart',
  review: 'star',
}
const dummyTags = {
  property: '전세 5억',
  transaction: '매매 12억',
  review: null,
}

const notifications = ref([])
for (let i = 1; i <= 1000; i++) {
  const type = dummyTypes[i % 3]
  notifications.value.push({
    id: i,
    type,
    title: `알림 제목 ${i}`,
    message: `이것은 ${type} 유형의 더미 알림 ${i}번입니다.`,
    time: `${i}분 전`,
    tag: dummyTags[type],
    isRead: false,
    icon: dummyIcons[type],
  })
}

// 필터
const filters = computed(() => {
  const counts = {
    all: notifications.value.length,
    property: notifications.value.filter((n) => n.type === 'property').length,
    transaction: notifications.value.filter((n) => n.type === 'transaction').length,
    review: notifications.value.filter((n) => n.type === 'review').length,
  }
  return [
    { key: 'all', label: '전체', count: counts.all },
    { key: 'property', label: '매물 알림', count: counts.property },
    { key: 'transaction', label: '실거래 알림', count: counts.transaction },
    { key: 'review', label: '리뷰 알림', count: counts.review },
  ]
})

// 필터 적용된 알림
const filteredNotifications = computed(() => {
  if (activeFilter.value === 'all') return notifications.value
  return notifications.value.filter((n) => n.type === activeFilter.value)
})

// 총 페이지 수 계산
const totalPages = computed(() =>
  Math.max(1, Math.ceil(filteredNotifications.value.length / pageSize))
)

// 현재 페이지 알림 목록
const pagedNotifications = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  const end = start + pageSize
  return filteredNotifications.value.slice(start, end)
})

// 이벤트 핸들러
const handleFilterChange = (filterKey) => {
  activeFilter.value = filterKey
  currentPage.value = 1
}

const handleNotificationAction = (action) => {
  if (action.type === 'markRead') {
    const idx = notifications.value.findIndex((n) => n.id === action.id)
    if (idx !== -1) {
      notifications.value[idx].isRead = true
      notifications.value = [...notifications.value] // 갱신
    }
  } else if (action.type === 'delete') {
    notifications.value = notifications.value.filter((n) => n.id !== action.id)
    // 삭제 후 현재 페이지가 초과되면 한 페이지 앞으로 이동
    const maxPage = Math.max(1, Math.ceil(filteredNotifications.value.length / pageSize))
    if (currentPage.value > maxPage) {
      currentPage.value = maxPage
    }
  }
}

const handlePageChange = (page) => {
  currentPage.value = page
}

const goBack = () => {
  console.log('뒤로가기 실행')
}

onMounted(() => {
  // 초기 데이터 로드 또는 API 호출 가능
})
</script>

<style scoped>
.notification-view {
  min-height: 100vh;
  background-color: #f8f9fa;
}

.notification-header {
  background: white;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  border-bottom: 1px solid #e9ecef;
}

.back-button {
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
  color: #6c757d;
}

.back-button:hover {
  color: #495057;
}

.header-content {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
}

.notification-icon {
  width: 48px;
  height: 48px;
  background: #28a745;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.header-text h1 {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: #212529;
}

.header-text p {
  margin: 4px 0 0 0;
  font-size: 14px;
  color: #6c757d;
}

.notification-content {
  padding: 0 20px 20px;
}
</style>
