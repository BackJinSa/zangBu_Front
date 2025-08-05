// NotificationList.vue
<template>
  <div class="mt-4 space-y-3">
    <!-- 알림이 있을 경우 -->
    <NotificationCard
      v-for="notification in notifications"
      :key="notification.id"
      :notification="notification"
      @notification-action="$emit('notification-action', $event)"
    />

    <!-- 로딩 중일 때 -->
    <div v-if="loading" class="text-sm text-gray-500 text-center py-8">불러오는 중...</div>

    <!-- 알림이 없을 때는 별도 컴포넌트에서 처리 (NotificationEmpty.vue) -->
  </div>
</template>

<script setup>
// Props
import NotificationCard from './NotificationCard.vue'

defineProps({
  notifications: {
    type: Array,
    required: true,
  },
  loading: {
    type: Boolean,
    default: false,
  },
})

// Emits
defineEmits(['notification-action'])
</script>
