<!-- /components/system/NotificationIcon.vue -->
<template>
  <div
    class="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0"
    :class="bgColor"
  >
    {{ iconText }}
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  type: {
    type: String,
    required: true,
  },
})

const bgColor = computed(() => {
  switch (props.type) {
    case 'price':
    case 'deal':
      return 'bg-green-500'
    case 'review':
      return 'bg-yellow-400'
    default:
      return 'bg-gray-400'
  }
})

const iconText = computed(() => {
  switch (props.type) {
    case 'price':
      return '₩' // 시세
    case 'deal':
      return '계' // 거래
    case 'review':
      return '평' // 리뷰
    default:
      return '?'
  }
})
</script>
