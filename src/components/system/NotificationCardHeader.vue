<!-- /components/system/NotificationCardHeader.vue -->
<template>
  <div class="mb-1">
    <p class="text-sm font-semibold text-gray-900">
      {{ title }}
    </p>
    <p class="text-sm text-gray-600 mt-0.5">
      {{ message }}
    </p>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  message: String,
})
</script>
