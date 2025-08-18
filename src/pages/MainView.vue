<script setup>
import MainHeroSection from '@/components/main/MainHeroSection.vue'
import MainActionButtons from '@/components/main/MainActionButtons.vue'
import MainPropertySection from '@/components/main/MainPropertySection.vue'
import { onMounted } from 'vue'
import { useMainStore } from '@/stores/main/main'

// 메인 스토어 사용
const mainStore = useMainStore()

// 컴포넌트 마운트 시 데이터 로드
onMounted(async () => {
  await mainStore.fetchMainData()
})
</script>
<template>
  <div class="bg-white min-h-screen">
    <MainHeroSection />

    <!-- 로딩 상태 -->
    <div v-if="mainStore.loading" class="max-w-7xl mx-auto px-4 py-12 text-center">
      <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      <p class="mt-4 text-gray-600">매물 정보를 불러오는 중...</p>
    </div>

    <MainActionButtons />

    <!-- 매물 섹션들 (로딩이 완료된 후에만 표시) -->
    <template v-if="!mainStore.loading">
      <MainPropertySection title="리뷰 많은 매물" :properties="mainStore.topReviewed" />
      <MainPropertySection title="찜 많은 매물" :properties="mainStore.topLiked" />
      <MainPropertySection title="신규 매물" :properties="mainStore.newRooms" />
    </template>
  </div>
</template>
