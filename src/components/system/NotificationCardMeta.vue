<!-- /components/system/NotificationCardMeta.vue -->
<template>
  <div class="flex items-center space-x-2 mt-2 text-xs text-gray-500">
    <NotificationBadge :type="type" />
    <span>{{ formatTime(createdAt) }}</span>
  </div>
</template>

<script setup>
import NotificationBadge from './NotificationBadge.vue'

defineProps({
  type: String, // 'price', 'deal', 'review'
  createdAt: String, // ISO 시간 문자열
})

const formatTime = (isoString) => {
  const date = new Date(isoString)
  const now = new Date()
  const diff = Math.floor((now - date) / 1000)

  if (diff < 60) return '방금 전'
  if (diff < 3600) return `${Math.floor(diff / 60)}분 전`
  if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`
  return `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`
}
</script>
