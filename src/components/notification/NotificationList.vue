<!-- NotificationList.vue -->
<template>
  <div class="flex flex-col gap-3 mt-5">
    <template v-if="!loading && notifications.length">
      <NotificationCard
        v-for="notification in notifications"
        :key="notification.id"
        :notification="notification"
        @action="$emit('notification-action', $event)"
      />
    </template>
    <NotificationEmpty v-else-if="!loading && !notifications.length" />
    <div v-else class="text-center text-gray-500 text-sm mt-10">불러오는 중...</div>
  </div>
</template>

<script setup>
import NotificationCard from './NotificationCard.vue'
import NotificationEmpty from './NotificationEmpty.vue'
defineProps({ notifications: Array, loading: Boolean })
</script>
