// NotificationBadge.vue
<template>
  <span class="bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full text-xs">{{ tag }}</span>
</template>

<script setup>
const props = defineProps({
  tag: String,
})
</script>
