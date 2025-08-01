<template>
  <div class="notification-card" :class="{ read: notification.isRead }">
    <NotificationIcon :type="notification.type" />

    <div class="card-content">
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
import { reactive, toRefs } from 'vue'
import NotificationIcon from './NotificationIcon.vue'
import NotificationCardHeader from './NotificationCardHeader.vue'
import NotificationCardMeta from './NotificationCardMeta.vue'
import NotificationCardActions from './NotificationCardActions.vue'

const props = defineProps({
  notification: Object,
})

const emit = defineEmits(['action'])

// 반응성을 보장하기 위해 직접 참조 사용하지 않고, props 자체를 사용
const { notification } = toRefs(props)

const handleMarkRead = () => {
  emit('action', { type: 'markRead', id: notification.value.id })
}

const handleDelete = () => {
  emit('action', { type: 'delete', id: notification.value.id })
}
</script>

<style scoped>
.notification-card {
  display: flex;
  align-items: flex-start;
  background: white;
  padding: 16px;
  border-radius: 8px;
  gap: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
  border: 1px solid #dee2e6;
  transition: opacity 0.2s ease;
}

.notification-card.read {
  opacity: 0.5;
}
</style>
