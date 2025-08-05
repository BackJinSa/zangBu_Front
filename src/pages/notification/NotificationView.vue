// NotificationView.vue
<template>
  <div class="min-h-screen bg-white">
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
import NotificationFilter from '@/components/notification/NotificationFilter.vue'
import NotificationList from '@/components/notification/NotificationList.vue'
import NotificationEmpty from '@/components/notification/NotificationEmpty.vue'
import NotificationPagination from '@/components/notification/NotificationPagination.vue'
import NotificationActionBar from '@/components/notification/NotificationActionBar.vue'
import { useNotificationStore } from '@/stores/notification/notification'
import { requestFcmToken } from '@/utils/fcm'

// 알림 스토어 인스턴스 가져오기
const store = useNotificationStore()

/**
 * onMounted()는 페이지 로딩시 최초 실행되는 함수
 */
onMounted(() => {
  // 스토어에서 더미데이터 가져옴 -> ☆나중에 실제 API로 대체 예정☆
  if (store.notifications.length === 0) {
    store.loadDummyNotifications()
  }

  // 브라우저 알림 권한 요청
  console.log('현재 알림 권한 상태: ', Notification.permission)

  // 디바이스 토큰을 발급 받고 서버에 등록하는 함수
  // -> ☆ 추후 삭제하고 로그인 로직에 추가할예정 ☆
  requestFcmToken()
})

const goBack = () => {
  history.back()
}

// 알림 카드에서 발생한 사용자 액션(읽음 처리 또는 삭제)을 처리하는 함수
const handleNotificationAction = ({ type, id }) => {
  // 읽음 처리 요청인 경우
  if (type === 'markRead') {
    // 알림 ID에 해당하는 항목을 읽음 상태로 변경
    store.markNotificationAsRead(id)
  }
  // 삭제 요청인 경우
  else if (type === 'delete') {
    // 알림 ID에 해당하는 항목을 스토어에서 제거
    store.deleteNotification(id)
  }
}
</script>
