<!-- /components/system/NotificationPagination.vue -->
<template>
  <div class="flex justify-center items-center space-x-2">
    <button
      v-for="pageNumber in totalPages"
      :key="pageNumber"
      @click="$emit('change', pageNumber)"
      class="w-8 h-8 rounded-full text-sm font-medium flex items-center justify-center transition"
      :class="[
        pageNumber === currentPage
          ? 'bg-black text-white'
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
      ]"
    >
      {{ pageNumber }}
    </button>
  </div>
</template>

<script setup>
defineProps({
  currentPage: {
    type: Number,
    required: true,
  },
  totalPages: {
    type: Number,
    required: true,
  },
})
</script>
