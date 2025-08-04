<!-- NotificationPagination.vue -->
<template>
  <div class="flex justify-center gap-2 mt-6 flex-wrap">
    <button
      class="px-2 py-1 bg-gray-100 rounded text-sm"
      :disabled="!canGoPrev"
      @click="goToPrevGroup"
    >
      ＜
    </button>
    <button
      v-for="page in visiblePages"
      :key="page"
      @click="$emit('page-change', page)"
      :class="[
        'px-2 py-1 rounded text-sm',
        page === currentPage ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-700',
      ]"
    >
      {{ page }}
    </button>
    <button
      class="px-2 py-1 bg-gray-100 rounded text-sm"
      :disabled="!canGoNext"
      @click="goToNextGroup"
    >
      ＞
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({ currentPage: Number, totalPages: Number })
const emit = defineEmits(['page-change'])
const groupSize = 10
const currentGroup = computed(() => Math.floor((props.currentPage - 1) / groupSize))
const startPage = computed(() => currentGroup.value * groupSize + 1)
const endPage = computed(() => Math.min(startPage.value + groupSize - 1, props.totalPages))
const visiblePages = computed(() =>
  Array.from({ length: endPage.value - startPage.value + 1 }, (_, i) => startPage.value + i)
)
const canGoPrev = computed(() => startPage.value > 1)
const canGoNext = computed(() => endPage.value < props.totalPages)
const goToPrevGroup = () => canGoPrev.value && emit('page-change', startPage.value - 1)
const goToNextGroup = () => canGoNext.value && emit('page-change', endPage.value + 1)
</script>
