<!-- ✅ NotificationView.vue (Tailwind 스타일 적용) -->
<template>
  <div class="min-h-screen bg-gray-100">
    <!-- 헤더 영역 (알림 제목 + 뒤로가기 + 전체 읽음 처리 버튼) -->
    <div class="bg-white px-5 py-4 flex items-center gap-4 border-b border-gray-200">
      <!-- 뒤로가기 버튼 -->
      <button class="p-2 text-gray-500 hover:text-gray-700" @click="goBack">
        <!-- 아이콘 SVG -->
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

      <!-- 알림 헤더 콘텐츠 (아이콘 + 텍스트) -->
      <div class="flex items-center gap-3 flex-1">
        <div class="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
          <!-- 종 모양 알림 아이콘 -->
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
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

        <!-- 텍스트 부분 -->
        <div>
          <h1 class="text-lg font-semibold text-gray-900">알림</h1>
          <p class="text-sm text-gray-500">부동산 관련 알림을 확인하세요</p>
        </div>
      </div>

      <!-- 전체 읽음 처리 버튼 (오른쪽 끝) -->
      <NotificationActionBar @mark-all-read="handleMarkAllRead" />
    </div>

    <!-- 필터 탭 (전체 / 매물 / 실거래 / 리뷰) -->
    <NotificationFilter
      :filters="filters"
      :active-filter="activeFilter"
      @filter-change="handleFilterChange"
    />

    <!-- 알림 목록 + 페이지네이션 -->
    <div class="px-5 pb-8">
      <NotificationList
        :notifications="pagedNotifications"
        :loading="loading"
        @notification-action="handleNotificationAction"
      />

      <!-- 페이지 수가 2페이지 이상일 때만 보여줌 -->
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
import NotificationFilter from '@/components/notification/NotificationFilter.vue'
import NotificationActionBar from '@/components/notification/NotificationActionBar.vue'
import NotificationList from '@/components/notification/NotificationList.vue'
import NotificationPagination from '@/components/notification/NotificationPagination.vue'

// 로딩 상태
const loading = ref(false)

// 필터 상태 (all, property, transaction, review 중 하나)
const activeFilter = ref('all')

// 현재 페이지 번호
const currentPage = ref(1)

// 한 페이지당 표시할 알림 개수
const pageSize = 10

// 알림 데이터 (현재는 더미 데이터, 나중에 API 연동으로 대체 예정)
const notifications = ref([])

// 더미 알림 타입, 아이콘, 태그
const dummyTypes = ['property', 'transaction', 'review']
const dummyIcons = { property: 'home', transaction: 'chart', review: 'star' }
const dummyTags = { property: '전세 5억', transaction: '매매 12억', review: null }

// 더미 알림 1000개 생성 (초기 테스트용)
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

// 필터 목록과 알림 개수 계산 (전체/매물/실거래/리뷰)
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

// 필터에 따라 알림 필터링 (all이면 전체 반환)
const filteredNotifications = computed(() =>
  activeFilter.value === 'all'
    ? notifications.value
    : notifications.value.filter((n) => n.type === activeFilter.value)
)

// 총 페이지 수 계산
const totalPages = computed(() =>
  Math.max(1, Math.ceil(filteredNotifications.value.length / pageSize))
)

// 현재 페이지에 표시할 알림 목록 계산
const pagedNotifications = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return filteredNotifications.value.slice(start, start + pageSize)
})

// 필터 변경 시 호출됨
const handleFilterChange = (key) => {
  activeFilter.value = key
  currentPage.value = 1 // 필터 변경 시 첫 페이지로 이동
}

// 알림 읽음 처리 또는 삭제 처리
const handleNotificationAction = ({ type, id }) => {
  const idx = notifications.value.findIndex((n) => n.id === id)
  if (idx === -1) return
  if (type === 'markRead') notifications.value[idx].isRead = true
  else if (type === 'delete') notifications.value.splice(idx, 1)

  // 삭제 후 페이지 수가 줄어든 경우 보정
  const maxPage = Math.max(1, Math.ceil(filteredNotifications.value.length / pageSize))
  if (currentPage.value > maxPage) currentPage.value = maxPage
}

// 페이지 전환 시 호출됨
const handlePageChange = (page) => {
  currentPage.value = page
}

// 전체 알림 읽음 처리
const handleMarkAllRead = () => {
  notifications.value.forEach((n) => {
    n.isRead = true
  })
}

// 뒤로가기 버튼 핸들러
const goBack = () => console.log('뒤로가기')

// 마운트 시 API 호출 or 로딩 처리 가능
onMounted(() => {})
</script>
