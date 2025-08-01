<script setup>
import { usePropertyStore } from '@/stores/property/property';

const propertyStore = usePropertyStore();
</script>

<template>
  <div class="contact-person-form">
    <h3 class="form-title">담당자 정보</h3>
    <!-- 담당자 정보 입력 내용이 들어갈 자리 -->
  </div>
</template>

<script>
export default {
  name: 'ContactPersonForm',
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
.contact-person-form {
  /* 스타일 */
}
</style>
