<script setup>
import { usePropertyStore } from '@/stores/property/property';

const propertyStore = usePropertyStore();
</script>

<template>
  <div class="move-in-date-picker">
    <!-- 입주 가능 날짜 선택 내용이 들어갈 자리 -->
  </div>
</template>

<script>
export default {
  name: 'MoveInDatePicker',
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
.move-in-date-picker {
  /* 스타일 */
}
</style>
