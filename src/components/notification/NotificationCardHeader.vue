<!-- NotificationCardHeader.vue -->
<template>
  <div>
    <h2 class="text-base font-semibold text-gray-900">{{ title }}</h2>
    <p class="mt-1 text-sm text-gray-700">{{ message }}</p>
  </div>
</template>

<script setup>
defineProps({ title: String, message: String })
</script>
