<!-- /components/system/NotificationBadge.vue -->
<template>
  <span class="text-xs font-medium px-2 py-0.5 rounded-full text-white" :class="badgeClass">
    {{ label }}
  </span>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  type: {
    type: String, // 'price' | 'deal' | 'review'
    required: true,
  },
})

const badgeClass = computed(() => {
  switch (props.type) {
    case 'price':
      return 'bg-green-500'
    case 'deal':
      return 'bg-green-500'
    case 'review':
      return 'bg-yellow-400 text-black'
    default:
      return 'bg-gray-400'
  }
})

const label = computed(() => {
  switch (props.type) {
    case 'price':
      return '시세 알림'
    case 'deal':
      return '실거래 알림'
    case 'review':
      return '리뷰 알림'
    default:
      return '알림'
  }
})
</script>
