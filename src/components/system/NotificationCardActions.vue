<!-- /src/components/system/NotificationCardActions.vue -->
<template>
  <div class="card-actions">
    <button v-if="!isRead" class="check" @click="$emit('mark-read')">✔</button>
    <button class="delete" @click="$emit('delete')">❌</button>
  </div>
</template>

<script setup>
defineProps({
  isRead: Boolean,
})
</script>

<style scoped>
.card-actions {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-left: auto;
  margin-top: 4px;
}

button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
}

.check {
  color: green;
}

.delete {
  color: red;
}
</style>
