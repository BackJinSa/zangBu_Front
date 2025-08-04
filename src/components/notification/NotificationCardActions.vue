<!-- NotificationCardActions.vue -->
<template>
  <div class="flex flex-col gap-2 ml-auto mt-1">
    <button v-if="!isRead" @click="$emit('mark-read')" class="text-green-600 text-lg">✔</button>
    <button @click="$emit('delete')" class="text-red-500 text-lg">❌</button>
  </div>
</template>

<script setup>
defineProps({ isRead: Boolean })
</script>
