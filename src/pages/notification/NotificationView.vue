<template>
  <div class="min-h-screen bg-white">
    <!-- 헤더 -->
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
          <div class="flex items-center gap-2">
            <h1 class="text-xl font-semibold">알림</h1>
            <span class="text-sm text-gray-500">총 {{ store.totalElements }}개</span>
          </div>
        </div>
      </div>
      <NotificationActionBar @mark-all-read="store.markNotificationAllAsRead" />
    </div>

    <!-- 필터 탭 -->
    <NotificationFilter />

    <!-- 알림 목록 -->
    <NotificationList
      v-if="!store.loading && store.totalElements > 0"
      :notifications="store.notifications"
      :loading="store.loading"
      @open="openNotification"
      @notification-action="handleNotificationAction"
    />

    <!-- 비어있음 -->
    <NotificationEmpty v-else-if="!store.loading" />

    <!-- 로딩 -->
    <div v-else class="py-10 text-center text-gray-500">불러오는 중…</div>

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
import { listenForegroundMessage, requestFcmToken } from '@/utils/fcm'

const store = useNotificationStore()

onMounted(async () => {
  // 1) 백엔드에서 1페이지 로드
  await store.loadNotifications()

  // 2) (선택) FCM 토큰 발급
  try {
    await requestFcmToken()
  } catch (e) {
    console.warn('[FCM] token fail:', e)
  }

  // 3) 포그라운드 메시지 수신 → 스토어 반영
  listenForegroundMessage?.((payload) => {
    store.addNotificationFromFCM(payload)
    // 정확 싱크가 필요하면:
    // store.loadNotifications()
  })
})

function goBack() {
  history.back()
}

function handleNotificationAction({ type, id }) {
  if (type === 'markRead') store.markNotificationAsRead(id)
  else if (type === 'delete') store.deleteNotification(id)
}

/**
 * 알림 클릭 시 타입별로 라우팅
 */
const openNotification = (n) => {
  if (n.type === 'REVIEW') {
    router.push(`/review/${n.id}`)
  } else if (n.type === 'TRADE') {
    router.push(`/building/${n.id}`)
  } else if (n.type === 'BUILDING') {
    router.push(`/building/${n.id}`)
  } else {
    console.warn('Unknown notification type:', n.type)
  }
}
</script>
