<!-- /src/components/system/NotificationCardHeader.vue -->
<template>
  <div class="card-header">
    <h2 class="title">{{ title }}</h2>
    <p class="message">{{ message }}</p>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  message: String,
})
</script>

<style scoped>
.card-header .title {
  font-size: 16px;
  font-weight: 600;
  margin: 0;
  color: #212529;
}

.card-header .message {
  margin: 4px 0 0;
  font-size: 14px;
  color: #495057;
}
</style>
