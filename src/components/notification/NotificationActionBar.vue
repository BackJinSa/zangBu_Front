<!-- NotificationActionBar.vue -->
<template>
  <div class="ml-auto">
    <button
      class="bg-gray-800 text-white text-sm px-3 py-1 rounded"
      @click="$emit('mark-all-read')"
    >
      모두 읽음 처리
    </button>
  </div>
</template>

<script setup>
// emit 방식으로 변경됨
</script>
