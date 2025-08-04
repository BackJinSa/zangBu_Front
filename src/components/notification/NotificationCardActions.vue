// NotificationCardActions.vue
<template>
  <div class="flex flex-col gap-1">
    <button
      v-if="!isRead"
      @click.stop="$emit('mark-read')"
      class="text-green-600 hover:underline text-xs"
    >
      ✔
    </button>
    <button @click.stop="$emit('delete')" class="text-red-500 hover:underline text-xs">✖</button>
  </div>
</template>

<script setup>
const props = defineProps({
  isRead: Boolean,
})
</script>
