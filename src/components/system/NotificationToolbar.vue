<template>
  <div class="toolbar">
    <button @click="$emit('mark-all-read')">모두 읽음 처리</button>
  </div>
</template>

<script setup>
// emits: mark-all-read
</script>

<style scoped>
.toolbar {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 16px;
}
button {
  padding: 6px 12px;
  border-radius: 4px;
  border: none;
  background-color: #42b983;
  color: white;
  cursor: pointer;
  font-size: 14px;
}
</style>
