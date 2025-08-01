<!-- /src/components/system/NotificationActionBar.vue -->
<template>
  <div class="action-bar">
    <button @click="markAllAsRead">모두 읽음 처리</button>
  </div>
</template>

<script setup>
const markAllAsRead = () => {
  alert('✅ 전체 읽음 처리 로직은 추후 구현됩니다.')
}
</script>

<style scoped>
.action-bar {
  margin-left: auto;
}

button {
  background: #343a40;
  color: white;
  font-size: 13px;
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
