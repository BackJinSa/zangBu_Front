<!-- NotificationBadge.vue -->
<template>
  <span
    class="text-white text-xs py-1 px-2 rounded-full"
    :class="{
      'bg-green-600': type === 'property' || type === 'transaction',
      'bg-yellow-400': type === 'review',
    }"
    >{{ text }}</span
  >
</template>

<script setup>
defineProps({ text: String, type: String })
</script>
