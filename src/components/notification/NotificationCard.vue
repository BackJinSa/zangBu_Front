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
  notification: Object,
})

const router = useRouter()
const store = useNotificationStore()

const handleClick = () => {
  const { id, type, buildingId, isRead } = props.notification

  if (!buildingId) return

  // 읽음 처리 (이미 읽은 건 중복 처리 안 해도 무방)
  if (!isRead) {
    store.markNotificationAsRead(id)
  }

  // 페이지 이동
  if (type === 'REVIEW') {
    router.push({ path: '/review', query: { buildingId } })
  } else {
    // 수정 예정
    // router.push({ name: 'register', params: { id: buildingId } })
  }
}
</script>
