<template>
  <div class="bg-white px-5 py-3 border-b border-gray-200">
    <!-- 전체 필터 박스 -->
    <div class="flex justify-between items-center bg-gray-100 rounded-lg p-2">
      <button
        v-for="filter in filters"
        :key="filter.key"
        @click="$emit('filter-change', filter.key)"
        :class="[
          'flex-1 text-sm font-medium text-center py-2 rounded-md transition',
          filter.key === activeFilter
            ? 'bg-white text-gray-900 shadow-sm'
            : 'text-gray-500 hover:bg-gray-200',
        ]"
      >
        {{ filter.label }}
        <span class="ml-1 text-xs font-semibold">
          {{ filter.count }}
        </span>
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  filters: Array,
  activeFilter: String,
})
</script>
