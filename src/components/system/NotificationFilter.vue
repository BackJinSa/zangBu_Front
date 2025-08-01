<!-- /components/system/NotificationFilter.vue -->
<template>
  <div class="flex space-x-6 border-b border-gray-200 mb-4">
    <button
      v-for="item in tabs"
      :key="item.value"
      @click="$emit('change', item.value)"
      class="relative pb-2 text-sm font-medium"
      :class="[
        activeType === item.value
          ? 'text-black border-b-2 border-black'
          : 'text-gray-400 hover:text-black',
      ]"
    >
      {{ item.label }}
      <span
        v-if="item.count !== undefined"
        class="ml-1 text-xs text-white bg-neutral-400 rounded-full px-1.5 py-0.5"
      >
        ●
      </span>
    </button>
  </div>
</template>

<script setup>
defineProps({
  activeType: {
    type: String,
    default: 'all',
  },
})

// 필요 시 count도 넘길 수 있음
const tabs = [
  { label: '전체', value: 'all' },
  { label: '매물 알림', value: 'price' },
  { label: '실거래 알림', value: 'deal' },
  { label: '리뷰 알림', value: 'review' },
]
</script>
