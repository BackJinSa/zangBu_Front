<script setup>
import { usePropertyStore } from '@/stores/property/property'

const propertyStore = usePropertyStore()
</script>

<template>
  <div class="property-detail-form">
    <h3 class="form-title">매물 상세 설명 및 사진</h3>
    <!-- 매물 상세 설명 및 사진 업로드 내용이 들어갈 자리 -->
  </div>
</template>

<script>
export default {
  name: 'PropertyDetailForm',
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
.property-detail-form {
  /* 스타일 */
}
</style>
