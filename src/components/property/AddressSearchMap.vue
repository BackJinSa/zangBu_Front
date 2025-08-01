<script setup>
import { usePropertyStore } from '@/stores/property/property';

const propertyStore = usePropertyStore();
</script>

<template>
  <div class="address-search-map">
    <!-- 주소 검색 및 지도 연동 내용이 들어갈 자리 -->
  </div>
</template>

<script>
export default {
  name: 'AddressSearchMap',
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
.address-search-map {
  /* 스타일 */
}
</style>
