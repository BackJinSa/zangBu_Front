// NotificationActionBar.vue
<template>
  <button class="text-sm text-gray-600 hover:underline" @click="$emit('mark-all-read')">
    모두 읽음 처리
  </button>
</template>

<script setup>
// props 불필요, 단순 이벤트 발생
</script>
