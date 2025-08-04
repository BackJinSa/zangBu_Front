// NotificationView.vue
<template>
  <div class="min-h-screen bg-white">
    <!-- 헤더 -->
    <Header />

    <!-- 알림 헤더 -->
    <div class="bg-white px-4 py-4 flex items-center justify-between border-b border-gray-100">
      <div class="flex items-center gap-3">
        <button class="p-1 text-gray-600" @click="goBack">
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
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"
                stroke="#fff"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <h1 class="text-xl font-semibold">알림</h1>
        </div>
      </div>
      <NotificationActionBar @mark-all-read="store.markNotificationAllAsRead" />
    </div>

    <!-- 필터 탭 -->
    <NotificationFilter
      :currentFilter="store.activeFilter"
      :filterCounts="store.filterCountMap"
      @update-filter="store.setNotificationFilter"
    />

    <!-- 알림 목록 -->
    <NotificationList
      :notifications="store.pagedNotifications"
      :loading="store.loading"
      @notification-action="handleNotificationAction"
    />
    <!-- 알림 없을 때 -->
    <NotificationEmpty v-if="store.pagedNotifications.length === 0" />

    <!-- 페이지네이션 -->
    <NotificationPagination
      :currentPage="store.currentPage"
      :totalPages="store.totalPages"
      @change-page="store.setNotificationPage"
    />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import Header from '@/components/common/Header.vue'
import NotificationFilter from '@/components/notification/NotificationFilter.vue'
import NotificationList from '@/components/notification/NotificationList.vue'
import NotificationEmpty from '@/components/notification/NotificationEmpty.vue'
import NotificationPagination from '@/components/notification/NotificationPagination.vue'
import NotificationActionBar from '@/components/notification/NotificationActionBar.vue'
import { useNotificationStore } from '@/stores/notification/notification'

const store = useNotificationStore()

onMounted(() => {
  store.loadDummyNotifications()
})

const goBack = () => {
  history.back()
}

const handleNotificationAction = ({ type, id }) => {
  if (type === 'markRead') {
    store.markNotificationAsRead(id)
  } else if (type === 'delete') {
    store.deleteNotification(id)
  }
}
</script>
