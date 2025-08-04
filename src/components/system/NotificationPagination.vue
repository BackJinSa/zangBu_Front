<template>
  <div class="pagination">
    <button class="page-button" @click="goToPrevGroup" :disabled="!canGoPrev">＜</button>

    <button
      v-for="page in visiblePages"
      :key="page"
      :class="['page-button', { active: page === currentPage }]"
      @click="$emit('page-change', page)"
    >
      {{ page }}
    </button>

    <button class="page-button" @click="goToNextGroup" :disabled="!canGoNext">＞</button>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  currentPage: Number,
  totalPages: Number,
})
const emit = defineEmits(['page-change'])

const groupSize = 10

const currentGroup = computed(() => Math.floor((props.currentPage - 1) / groupSize))

const startPage = computed(() => currentGroup.value * groupSize + 1)
const endPage = computed(() => Math.min(startPage.value + groupSize - 1, props.totalPages))

const visiblePages = computed(() => {
  const pages = []
  for (let i = startPage.value; i <= endPage.value; i++) {
    pages.push(i)
  }
  return pages
})

const canGoPrev = computed(() => startPage.value > 1)
const canGoNext = computed(() => endPage.value < props.totalPages)

const goToPrevGroup = () => {
  if (canGoPrev.value) {
    const target = startPage.value - 1
    emit('page-change', target)
  }
}

const goToNextGroup = () => {
  if (canGoNext.value) {
    const target = endPage.value + 1
    emit('page-change', target)
  }
}
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  gap: 6px;
  margin-top: 24px;
  flex-wrap: wrap;
}

.page-button {
  background: #f1f3f5;
  border: none;
  padding: 6px 10px;
  font-size: 14px;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.page-button.active {
  background: #343a40;
  color: white;
}

.page-button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
</style>
