<!-- /components/system/NotificationCard.vue -->
<template>
  <div
    class="flex items-start justify-between p-4 rounded-lg shadow-sm border border-gray-200"
    :class="{ 'bg-gray-50': notification.isRead }"
  >
    <!-- 좌측 아이콘 + 본문 -->
    <div class="flex items-start space-x-3">
      <!-- 아이콘 -->
      <NotificationIcon :type="notification.type" />

      <!-- 본문 -->
      <div>
        <NotificationCardHeader :title="notification.title" :message="notification.message" />
        <NotificationCardMeta :type="notification.type" :createdAt="notification.createdAt" />
      </div>
    </div>

    <!-- 오른쪽 ✔ ❌ -->
    <NotificationCardActions
      :isRead="notification.isRead"
      @read="$emit('read')"
      @delete="$emit('delete')"
    />
  </div>
</template>

<script setup>
import NotificationIcon from './NotificationIcon.vue'
import NotificationCardHeader from './NotificationCardHeader.vue'
import NotificationCardMeta from './NotificationCardMeta.vue'
import NotificationCardActions from './NotificationCardActions.vue'

defineProps({
  notification: {
    type: Object,
    required: true,
  },
})
</script>
