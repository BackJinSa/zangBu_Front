<!-- 반응형 예시 -->
<template>
  <div class="responsive-example">
    <!-- 앱에서만 보이는 요소 -->
    <div class="app:block desktop:hidden bg-blue-500 text-white p-4">
      <h2 class="app:text-lg">앱 전용 컨텐츠 (1024px 미만)</h2>
      <p class="app:text-sm">이 내용은 모바일과 태블릿에서만 보입니다.</p>
    </div>

    <!-- 데스크톱에서만 보이는 요소 -->
    <div class="hidden desktop:block bg-green-500 text-white p-6">
      <h2 class="desktop:text-xl">데스크톱 전용 컨텐츠 (1024px 이상)</h2>
      <p class="desktop:text-base">이 내용은 데스크톱에서만 보입니다.</p>
    </div>

    <!-- 반응형 레이아웃 -->
    <div
      class="app:grid app:grid-cols-1 app:gap-4 app:p-4 desktop:grid desktop:grid-cols-2 desktop:gap-8 desktop:p-8"
    >
      <div class="bg-gray-200 p-4 rounded">
        <h3 class="app:text-base desktop:text-lg font-bold">카드 1</h3>
        <p class="app:text-sm desktop:text-base">반응형 카드입니다.</p>
      </div>
      <div class="bg-gray-200 p-4 rounded">
        <h3 class="app:text-base desktop:text-lg font-bold">카드 2</h3>
        <p class="app:text-sm desktop:text-base">반응형 카드입니다.</p>
      </div>
    </div>

    <!-- 유틸리티 함수 사용 예시 -->
    <div :class="responsiveClasses">
      <h3>유틸리티 함수로 생성된 클래스</h3>
      <p>현재 화면 크기: {{ currentBreakpoint }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { breakpointClasses, responsive, mediaQueries } from '@/utils/breakpoints'

const currentBreakpoint = ref('앱')

// 반응형 클래스 예시
const responsiveClasses = computed(() => {
  return responsive.showOnAll('bg-yellow-200 p-4 text-center', 'bg-purple-200 p-8 text-center')
})

// 화면 크기 감지
const updateBreakpoint = () => {
  currentBreakpoint.value = mediaQueries.isDesktop() ? '데스크톱' : '앱'
}

let cleanup = null

onMounted(() => {
  updateBreakpoint()
  cleanup = mediaQueries.onResize(updateBreakpoint)
})

onUnmounted(() => {
  if (cleanup) cleanup()
})
</script>

<style scoped>
.responsive-example {
  min-height: 100vh;
}
</style>
