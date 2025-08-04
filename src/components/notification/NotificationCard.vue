<!-- NotificationCard.vue -->
<template>
  <div
    class="flex items-start bg-white p-4 rounded-lg gap-4 shadow-sm border border-gray-200 transition-opacity duration-200"
    :class="{ 'opacity-50': notification.isRead }"
  >
    <NotificationIcon :type="notification.type" />

    <div class="flex-1">
      <NotificationCardHeader :title="notification.title" :message="notification.message" />
      <NotificationCardMeta
        :time="notification.time"
        :tag="notification.tag"
        :type="notification.type"
      />
    </div>

    <NotificationCardActions
      :is-read="notification.isRead"
      @mark-read="handleMarkRead"
      @delete="handleDelete"
    />
  </div>
</template>

<script setup>
import { toRefs } from 'vue'
import NotificationIcon from './NotificationIcon.vue'
import NotificationCardHeader from './NotificationCardHeader.vue'
import NotificationCardMeta from './NotificationCardMeta.vue'
import NotificationCardActions from './NotificationCardActions.vue'

const props = defineProps({ notification: Object })
const emit = defineEmits(['action'])
const { notification } = toRefs(props)
const handleMarkRead = () => emit('action', { type: 'markRead', id: notification.value.id })
const handleDelete = () => emit('action', { type: 'delete', id: notification.value.id })
</script>
