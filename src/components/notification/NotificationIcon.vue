// NotificationIcon.vue
<template>
  <div
    class="w-10 h-10 flex items-center justify-center rounded-md"
    :style="{ backgroundColor: iconColor }"
  >
    <i :class="iconClass" class="text-white text-base"></i>
  </div>
</template>

<script setup>
const props = defineProps({
  type: String,
})

const iconMap = {
  BUILDING: 'fa-solid fa-building', // 시세변동
  TRADE: 'fa-solid fa-handshake', // 실거래
  REVIEW: 'fa-solid fa-comment-dots', // 리뷰
}

// 우리 브랜드 컬러 시스템에 맞춰 색상 매핑
const colorMap = {
  BUILDING: 'var(--brand-3)',
  TRADE: 'var(--brand-4)',
  REVIEW: 'var(--bg-3)',
}

const iconClass = iconMap[props.type] || 'fa-solid fa-bell'
const iconColor = colorMap[props.type] || 'var(--text-1)'
</script>
