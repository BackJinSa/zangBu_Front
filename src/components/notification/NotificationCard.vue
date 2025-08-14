// NotificationCard.vue
<template>
  <div
    class="flex items-start gap-3 px-4 py-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
    :class="notification.isRead ? 'opacity-50' : ''"
    @click="handleClick"
  >
    <NotificationIcon :type="notification.type" />

    <div class="flex-1">
      <NotificationCardHeader
        :title="notification.title"
        :message="notification.message"
        :is-read="notification.isRead"
      />
      <NotificationCardMeta
        :timestamp="notification.createdAt"
        :tag="notification.saleType ? `${notification.saleType} ${notification.price}억` : ''"
      />
    </div>

    <NotificationCardActions
      :is-read="notification.isRead"
      @mark-read="$emit('notification-action', { type: 'markRead', id: notification.id })"
      @delete="$emit('notification-action', { type: 'delete', id: notification.id })"
    />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useNotificationStore } from '@/stores/notification/notification'
import NotificationIcon from './NotificationIcon.vue'
import NotificationCardHeader from './NotificationCardHeader.vue'
import NotificationCardMeta from './NotificationCardMeta.vue'
import NotificationCardActions from './NotificationCardActions.vue'

const props = defineProps({
  notification: {
    type: Object,
    required: true,
  },
})

const router = useRouter()
const store = useNotificationStore()

const handleClick = async () => {
  const n = props.notification
  const type = String(n.type || '').toUpperCase()

  // 읽음 처리 (이미 읽은 건 무시)
  try {
    if (!n.isRead && n.id) {
      await store.markNotificationAsRead(n.id)
    }
  } catch (e) {
    // 실패해도 내비게이션은 진행
    console.warn('[notification] mark as read failed:', e)
  }

  // 라우팅
  const go = (path) => path && router.push(path)

  switch (type) {
    case 'REVIEW': {
      // 우선순위: reviewId → buildingId의 리뷰탭
      if (n.reviewId) return go(`/review/${n.reviewId}`)
      if (n.buildingId) return go(`/property/${n.buildingId}?tab=reviews`)
      break
    }
    case 'TRADE': {
      // 매물 상세의 실거래 탭이 있는 경우
      if (n.buildingId) return go(`/property/${n.buildingId}?tab=trade`)
      // tradeId 전용 상세 라우트가 있다면 사용
      if (n.tradeId) return go(`/trade/${n.tradeId}`)
      break
    }
    case 'BUILDING': {
      // 시세 변동 → 해당 매물 상세
      if (n.buildingId) return go(`/property/${n.buildingId}`)
      break
    }
    default:
      console.warn('Unknown notification type:', type)
  }

  // 모든 조건에 해당 없을 때는 알림 목록으로 안전 이동
  return go('/notification')
}
</script>
