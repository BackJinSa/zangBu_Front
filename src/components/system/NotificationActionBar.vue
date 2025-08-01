<!-- /components/system/NotificationActionBar.vue -->
<template>
  <button
    @click="$emit('markAllRead')"
    class="text-sm font-medium text-gray-600 hover:text-black transition"
  >
    모두 읽음 처리
  </button>
</template>
