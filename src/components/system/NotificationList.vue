<!-- /src/components/system/NotificationList.vue -->
<template>
  <div class="notification-list">
    <template v-if="!loading && notifications.length">
      <NotificationCard
        v-for="notification in notifications"
        :key="notification.id"
        :notification="notification"
        @action="$emit('notification-action', $event)"
      />
    </template>
    <NotificationEmpty v-else-if="!loading && !notifications.length" />
    <div v-else class="loading">불러오는 중...</div>
  </div>
</template>

<script setup>
import NotificationCard from './NotificationCard.vue'
import NotificationEmpty from './NotificationEmpty.vue'

defineProps({
  notifications: Array,
  loading: Boolean,
})
</script>

<style scoped>
.notification-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 20px;
}

.loading {
  text-align: center;
  color: #6c757d;
  font-size: 14px;
  margin-top: 40px;
}
</style>
