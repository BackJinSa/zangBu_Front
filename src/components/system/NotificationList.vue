<!-- /components/system/NotificationList.vue -->
<template>
  <div>
    <NotificationEmpty v-if="notifications.length === 0" />
    <div v-else class="space-y-3">
      <NotificationCard
        v-for="notification in notifications"
        :key="notification.id"
        :notification="notification"
        @read="$emit('read', notification.id)"
        @delete="$emit('delete', notification.id)"
      />
    </div>
  </div>
</template>

<script setup>
import NotificationCard from './NotificationCard.vue'
import NotificationEmpty from './NotificationEmpty.vue'

defineProps({
  notifications: {
    type: Array,
    required: true,
  },
})
</script>
