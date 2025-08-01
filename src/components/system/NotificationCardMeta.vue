<!-- /src/components/system/NotificationCardMeta.vue -->
<template>
  <div class="card-meta">
    <span class="time">{{ time }}</span>
    <NotificationBadge v-if="tag" :text="tag" :type="type" />
  </div>
</template>

<script setup>
import NotificationBadge from './NotificationBadge.vue'

defineProps({
  time: String,
  tag: String,
  type: String,
})
</script>

<style scoped>
.card-meta {
  margin-top: 8px;
  font-size: 13px;
  color: #868e96;
  display: flex;
  align-items: center;
  gap: 8px;
}
</style>
