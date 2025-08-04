<!-- NotificationIcon.vue -->
<template>
  <div
    class="w-10 h-10 rounded-full flex items-center justify-center text-white text-base"
    :class="{
      'bg-green-600': type === 'property' || type === 'transaction',
      'bg-yellow-400': type === 'review',
      'bg-gray-400': !['property', 'transaction', 'review'].includes(type),
    }"
  >
    <i :class="iconClass" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({ type: String })
const iconClass = computed(() => {
  switch (props.type) {
    case 'property':
      return 'fa fa-home'
    case 'transaction':
      return 'fa fa-chart-line'
    case 'review':
      return 'fa fa-star'
    default:
      return 'fa fa-bell'
  }
})
</script>
