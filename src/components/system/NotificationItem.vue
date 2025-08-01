<template>
  <div class="notification-item" :class="{ unread: !isRead }">
    <div class="icon">{{ icon }}</div>
    <div class="content">
      <div class="title">{{ title }}</div>
      <div class="message">{{ message }}</div>
      <div class="meta">
        <span class="date">{{ createdAt }}</span>
      </div>
    </div>
    <div class="actions">
      <button @click="$emit('mark-read', id)">✓</button>
      <button @click="$emit('delete', id)">✕</button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  id: Number,
  title: String,
  message: String,
  type: String,
  createdAt: String,
  isRead: Boolean,
})

const iconMap = {
  price: '💸',
  deal: '🏠',
  review: '💬',
  default: '🔔',
}

const icon = iconMap[props.type] || iconMap.default
</script>

<style scoped>
.notification-item {
  display: flex;
  align-items: flex-start;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 12px;
  margin-bottom: 10px;
}
.unread {
  background-color: #f5faff;
}
.icon {
  font-size: 24px;
  margin-right: 12px;
}
.content {
  flex: 1;
}
.title {
  font-weight: bold;
}
.message {
  margin-top: 4px;
  color: #555;
}
.meta {
  margin-top: 6px;
  font-size: 12px;
  color: #999;
}
.actions {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.actions button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
}
</style>
