<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useReviewStore } from '@/stores/review/review'

const route = useRoute()
const router = useRouter()
const reviewStore = useReviewStore()

const buildingId = route.params.buildingId

// 건물명을 동적으로 가져오기
const buildingName = computed(() => {
  return reviewStore.buildingInfo?.buildingName || '로딩 중...'
})

// 뒤로가기
const goBack = () => {
  router.back()
}

onMounted(async () => {
  if (buildingId) {
    try {
      // 건물 정보 조회
      await reviewStore.getBuildingInfoById(buildingId)
    } catch (error) {
      console.error('건물 정보 조회 실패:', error)
    }
  }
})
</script>

<template>
  <div class="min-h-screen bg-white">
    <!-- Header -->
    <div class="bg-white border-b border-gray-200 px-6 py-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <button @click="goBack" class="text-gray-600 hover:text-gray-800 transition-colors">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 19l-7-7 7-7"
              ></path>
            </svg>
          </button>
          <h1 class="text-2xl font-bold text-green-800">리뷰 작성</h1>
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="p-6">
      <div class="max-w-2xl mx-auto">
        <div class="bg-white rounded-lg border border-gray-200 p-6">
          <h2 class="text-xl font-bold text-gray-800 mb-4">{{ buildingName }}</h2>
          <p class="text-gray-600 mb-4">건물 ID: {{ buildingId }}</p>
          <p class="text-gray-500">리뷰 작성 기능은 추후 구현 예정입니다.</p>
        </div>
      </div>
    </div>
  </div>
</template>
