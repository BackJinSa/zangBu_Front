// NotificationPagination.vue
<template>
  <div class="flex justify-center gap-1 py-4 text-sm">
    <!-- 이전 그룹 이동 -->
    <button
      v-if="startPage > 1"
      @click="$emit('change-page', startPage - maxVisible)"
      class="px-2 py-1 border rounded bg-white text-gray-600 border-gray-300"
    >
      &laquo;
    </button>

    <!-- 현재 그룹 페이지 -->
    <button
      v-for="p in pageRange"
      :key="p"
      @click="$emit('change-page', p)"
      :class="[
        'px-3 py-1 border rounded',
        p === currentPage ? 'bg-black text-white' : 'bg-white text-black border-gray-200',
      ]"
    >
      {{ p }}
    </button>

    <!-- 다음 그룹 이동 -->
    <button
      v-if="endPage < totalPages"
      @click="$emit('change-page', startPage + maxVisible)"
      class="px-2 py-1 border rounded bg-white text-gray-600 border-gray-300"
    >
      &raquo;
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  currentPage: Number,
  totalPages: Number,
})

const maxVisible = 10

const startPage = computed(() => {
  return Math.floor((props.currentPage - 1) / maxVisible) * maxVisible + 1
})

const endPage = computed(() => {
  return Math.min(startPage.value + maxVisible - 1, props.totalPages)
})

const pageRange = computed(() => {
  return Array.from({ length: endPage.value - startPage.value + 1 }, (_, i) => startPage.value + i)
})
</script>
