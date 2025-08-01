<!-- /src/components/system/NotificationIcon.vue -->
<template>
  <div class="notification-icon" :class="type">
    <i v-if="type === 'property'" class="fa fa-home" />
    <i v-else-if="type === 'transaction'" class="fa fa-chart-line" />
    <i v-else-if="type === 'review'" class="fa fa-star" />
    <i v-else class="fa fa-bell" />
  </div>
</template>

<script setup>
defineProps({
  type: String,
})
</script>

<style scoped>
.notification-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #e9ecef;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  color: white;
}

.property {
  background: #28a745; /* 초록 */
}

.transaction {
  background: #28a745; /* 초록 */
}

.review {
  background: #ffc107; /* 노랑 */
}
</style>
