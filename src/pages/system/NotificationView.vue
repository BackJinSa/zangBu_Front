<!-- /pages/system/NotificationView.vue -->
<template>
  <div class="max-w-4xl mx-auto px-4 py-8">
    <h1 class="text-2xl font-semibold mb-6">알림</h1>

    <!-- 상단 필터 탭 -->
    <NotificationFilter :activeType="activeType" @change="handleTypeChange" />

    <!-- 상단 액션 바 (오른쪽) -->
    <div class="flex justify-end my-4">
      <NotificationActionBar @markAllRead="markAllAsRead" />
    </div>

    <!-- 알림 리스트 -->
    <NotificationList
      :notifications="filteredNotifications"
      @read="markAsRead"
      @delete="deleteNotification"
    />

    <!-- 페이징 -->
    <div class="mt-6">
      <NotificationPagination
        :currentPage="page"
        :totalPages="totalPages"
        @change="handlePageChange"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import NotificationFilter from '@/components/system/NotificationFilter.vue'
import NotificationActionBar from '@/components/system/NotificationActionBar.vue'
import NotificationList from '@/components/system/NotificationList.vue'
import NotificationPagination from '@/components/system/NotificationPagination.vue'

// 🔸 더미 알림 데이터
const notifications = ref([
  {
    id: 1,
    title: '새로운 매물 등록',
    message: '등록한 매물이 서울 아파트로 업로드되었습니다.',
    type: 'price',
    createdAt: '2025-08-01T12:00:00',
    isRead: false,
  },
  {
    id: 2,
    title: '찜한 매물 거래가 업데이트됨',
    message: '서울 강남 아파트의 실거래가 업데이트되었습니다.',
    type: 'deal',
    createdAt: '2025-08-01T11:30:00',
    isRead: true,
  },
  {
    id: 3,
    title: '새로운 리뷰 등록',
    message: '관심 매물에 새 리뷰가 등록되었습니다.',
    type: 'review',
    createdAt: '2025-08-01T10:00:00',
    isRead: false,
  },
])

// 🔸 필터 상태
const activeType = ref('all')

// 🔸 페이지네이션 상태
const page = ref(1)
const perPage = 5

const filteredNotifications = computed(() => {
  const filtered =
    activeType.value === 'all'
      ? notifications.value
      : notifications.value.filter((n) => n.type === activeType.value)

  return filtered.slice((page.value - 1) * perPage, page.value * perPage)
})

const totalPages = computed(() => {
  const count =
    activeType.value === 'all'
      ? notifications.value.length
      : notifications.value.filter((n) => n.type === activeType.value).length
  return Math.ceil(count / perPage)
})

// 🔸 핸들러
const handleTypeChange = (type) => {
  activeType.value = type
  page.value = 1
}

const handlePageChange = (newPage) => {
  page.value = newPage
}

const markAllAsRead = () => {
  notifications.value.forEach((n) => (n.isRead = true))
}

const markAsRead = (id) => {
  const n = notifications.value.find((n) => n.id === id)
  if (n) n.isRead = true
}

const deleteNotification = (id) => {
  notifications.value = notifications.value.filter((n) => n.id !== id)
}
</script>
