// NotificationFilter.vue
<template>
  <div class="flex border-b border-gray-200 text-sm text-gray-600">
    <div
      v-for="filter in filters"
      :key="filter.key"
      class="flex-1 text-center cursor-pointer py-3 border-b-2"
      :class="activeFilter === filter.key ? 'border-black font-bold' : 'border-transparent'"
      @click="setFilter(filter.key)"
    >
      {{ filter.label }}
      <span v-if="filterCountMap[filter.key] > 0"> ({{ filterCountMap[filter.key] }}) </span>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useNotificationStore } from '@/stores/notification/notification'

const store = useNotificationStore()

// 필터에서 '읽지 않음' 제외한 것만 표시
const { activeFilter, filterCountMap } = storeToRefs(store)
const { setNotificationFilter } = store

// 직접 필터 정의 (스토어 filters는 5개라서 여기선 4개만 수동 정의)
const filters = [
  { key: 'all', label: '전체' },
  { key: 'TRADE', label: '실거래' },
  { key: 'BUILDING', label: '시세변동' },
  { key: 'REVIEW', label: '리뷰' },
]

const setFilter = (key) => {
  setNotificationFilter(key)
}
</script>
