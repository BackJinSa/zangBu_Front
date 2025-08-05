// NotificationCardHeader.vue
<template>
  <div class="text-sm">
    <div class="font-semibold flex items-center gap-2">
      {{ title }}
      <span v-if="!isRead" class="text-xs text-white bg-brand-3 px-2 py-0.5 rounded">
        새로운 알림
      </span>
    </div>
    <div class="text-gray-600 mt-0.5">
      {{ message }}
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: String,
  message: String,
  isRead: Boolean,
})
</script>
