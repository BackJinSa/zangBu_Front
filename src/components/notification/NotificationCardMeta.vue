<!-- NotificationCardMeta.vue -->
<template>
  <div class="mt-2 text-sm text-gray-500 flex items-center gap-2">
    <span>{{ time }}</span>
    <NotificationBadge v-if="tag" :text="tag" :type="type" />
  </div>
</template>

<script setup>
import NotificationBadge from './NotificationBadge.vue'
defineProps({ time: String, tag: String, type: String })
</script>
