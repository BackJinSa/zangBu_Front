<!-- /src/components/system/NotificationEmpty.vue -->
<template>
  <div class="empty">
    <i class="fa fa-bell-slash"></i>
    <p>표시할 알림이 없습니다.</p>
  </div>
</template>

<style scoped>
.empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #adb5bd;
  padding: 40px 0;
  gap: 12px;
}

.empty i {
  font-size: 36px;
}

.empty p {
  font-size: 14px;
}
</style>
