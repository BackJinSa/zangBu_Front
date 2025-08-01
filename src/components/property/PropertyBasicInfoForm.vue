<script setup>
import { usePropertyStore } from '@/stores/property/property';

const propertyStore = usePropertyStore();
</script>

<template>
  <div class="property-basic-info-form">
    <h3 class="form-title">매물 기본 정보</h3>
    <!-- 매물 기본 정보 입력 폼 내용이 들어갈 자리 -->
  </div>
</template>

<script>
export default {
  name: 'PropertyBasicInfoForm',
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
.property-basic-info-form {
  /* 스타일 */
}
</style>
