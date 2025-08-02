<!-- /src/components/system/NotificationBadge.vue -->
<template>
  <span class="badge" :class="type">
    {{ text }}
  </span>
</template>

<script setup>
defineProps({
  text: String,
  type: String,
})
</script>

<style scoped>
.badge {
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 12px;
  color: white;
}

.property {
  background-color: #28a745; /* 초록 */
}

.transaction {
  background-color: #28a745; /* 초록 */
}

.review {
  background-color: #ffc107; /* 노랑 */
}
</style>
