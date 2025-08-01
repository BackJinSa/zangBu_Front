<script setup>
import { usePropertyStore } from '@/stores/property/property'

const propertyStore = usePropertyStore()
</script>

<template>
  <div class="property-action-buttons">
    <!-- 매물 등록/취소 버튼들이 들어갈 자리 -->
  </div>
</template>

<script>
export default {
  name: 'PropertyActionButtons',
  data() {
    return {
      // 컴포넌트 데이터
    }
  },
  methods: {
    // 컴포넌트 메서드
  },
}
</script>

<style scoped>
.property-action-buttons {
  /* 스타일 */
}
</style>
