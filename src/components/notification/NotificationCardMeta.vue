//NotificationCardMeta.vue
<template>
  <div class="text-xs text-gray-400 mt-1 flex items-center gap-2">
    <div>{{ timestamp }}</div>
    <div v-if="price" class="text-gray-500">| {{ price }}원</div>
    <NotificationBadge v-if="tag" :tag="tag" />
  </div>
</template>

<script setup>
import NotificationBadge from './NotificationBadge.vue'

const props = defineProps({
  timestamp: String,
  price: [String, Number],
  tag: String,
})
</script>
