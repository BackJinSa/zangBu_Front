<template>
  <div class="h-screen bg-gradient-to-br from-bg-1 via-bg-2 to-bg-1">
    <div class="p-6 lg:p-12 h-full overflow-y-auto">
      <!-- Header Section -->
      <div class="max-w-2xl mx-auto">
        <div class="text-center mb-12">
          <div
            class="inline-flex items-center justify-center w-16 h-16 bg-brand-1 rounded-2xl mb-6 shadow-lg"
          >
            <i class="fas fa-cube text-2xl text-white"></i>
          </div>
          <h1
            class="text-4xl font-bold mb-4 text-brand-1 bg-gradient-to-r from-brand-1 to-brand-2 bg-clip-text text-transparent"
          >
            {{ componentName }} 컴포넌트 가이드
          </h1>
          <p class="text-text-1 text-lg max-w-2xl mx-auto">
            {{ componentName }} 컴포넌트의 사용법과 예시를 확인해보세요
          </p>
        </div>
      </div>

      <!-- Content Sections -->
      <div class="max-w-2xl mx-auto space-y-12">
        <!-- Basic Usage Section -->
        <section class="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
          <div class="bg-gradient-to-r from-brand-1 to-brand-2 px-8 py-8">
            <h2 class="text-2xl font-bold text-white flex items-center">
              <i class="fas fa-play-circle mr-3"></i>
              기본 사용법
            </h2>
            <p class="text-white/80 mt-2">컴포넌트의 기본적인 사용 방법을 확인하세요</p>
          </div>
          <div class="p-8">
            <div class="flex justify-center">
              <slot name="basic-usage">
                <div class="text-text-1 text-center py-12">
                  <i class="fas fa-code text-4xl text-text-1 mb-4"></i>
                  <p>기본 사용법 예시를 여기에 배치하세요</p>
                </div>
              </slot>
            </div>
          </div>
        </section>

        <!-- Examples Section -->
        <section class="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
          <div class="bg-gradient-to-r from-brand-3 to-brand-4 px-8 py-8">
            <h2 class="text-2xl font-bold text-white flex items-center">
              <i class="fas fa-th-large mr-3"></i>
              예시
            </h2>
            <p class="text-white/80 mt-2">다양한 사용 사례와 변형을 확인하세요</p>
          </div>
          <div class="p-8">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div class="group">
                <div
                  class="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 group-hover:shadow-lg transition-all duration-300"
                >
                  <div class="text-center mb-4">
                    <div
                      class="w-12 h-12 bg-brand-1 rounded-lg flex items-center justify-center mx-auto mb-3"
                    >
                      <span class="text-white font-bold text-lg">1</span>
                    </div>
                    <h4 class="font-semibold text-text-2">예시 1</h4>
                  </div>
                  <div class="flex justify-center items-center min-h-[200px]">
                    <slot name="example-1">
                      <div class="text-text-1 text-center py-8">
                        <i class="fas fa-image text-2xl text-text-1 mb-2"></i>
                        <p class="text-sm">예시 1을 여기에 배치하세요</p>
                      </div>
                    </slot>
                  </div>
                </div>
              </div>

              <div class="group">
                <div
                  class="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 group-hover:shadow-lg transition-all duration-300"
                >
                  <div class="text-center mb-4">
                    <div
                      class="w-12 h-12 bg-brand-2 rounded-lg flex items-center justify-center mx-auto mb-3"
                    >
                      <span class="text-white font-bold text-lg">2</span>
                    </div>
                    <h4 class="font-semibold text-text-2">예시 2</h4>
                  </div>
                  <div class="flex justify-center items-center min-h-[200px]">
                    <slot name="example-2">
                      <div class="text-text-1 text-center py-8">
                        <i class="fas fa-image text-2xl text-text-1 mb-2"></i>
                        <p class="text-sm">예시 2를 여기에 배치하세요</p>
                      </div>
                    </slot>
                  </div>
                </div>
              </div>

              <div class="group">
                <div
                  class="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 group-hover:shadow-lg transition-all duration-300"
                >
                  <div class="text-center mb-4">
                    <div
                      class="w-12 h-12 bg-brand-3 rounded-lg flex items-center justify-center mx-auto mb-3"
                    >
                      <span class="text-white font-bold text-lg">3</span>
                    </div>
                    <h4 class="font-semibold text-text-2">예시 3</h4>
                  </div>
                  <div class="flex justify-center items-center min-h-[200px]">
                    <slot name="example-3">
                      <div class="text-text-1 text-center py-8">
                        <i class="fas fa-image text-2xl text-text-1 mb-2"></i>
                        <p class="text-sm">예시 3을 여기에 배치하세요</p>
                      </div>
                    </slot>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Interactive Demo -->
        <section class="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
          <div class="bg-gradient-to-r from-status-1 to-status-2 px-8 py-8">
            <h2 class="text-2xl font-bold text-white flex items-center">
              <i class="fas fa-mouse-pointer mr-3"></i>
              인터랙티브 데모
            </h2>
            <p class="text-white/80 mt-2">실제로 컴포넌트를 조작해보세요</p>
          </div>
          <div class="p-8">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <!-- Event Log -->
              <div class="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6">
                <h3 class="text-lg font-semibold mb-4 text-text-2 flex items-center">
                  <i class="fas fa-terminal mr-2 text-status-1"></i>
                  이벤트 로그
                </h3>
                <div class="bg-white p-4 rounded-lg max-h-64 overflow-y-auto shadow-inner">
                  <div v-if="eventLogs.length === 0" class="text-center text-text-1 py-8">
                    <i class="fas fa-info-circle text-2xl mb-2"></i>
                    <p class="text-sm">이벤트가 발생하면 여기에 표시됩니다</p>
                  </div>
                  <div v-else>
                    <div
                      v-for="(log, index) in eventLogs"
                      :key="index"
                      class="text-sm text-text-1 mb-2 p-2 bg-gray-50 rounded border-l-4 border-status-1"
                    >
                      {{ log }}
                    </div>
                  </div>
                </div>
              </div>

              <!-- Interactive Component -->
              <div class="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6">
                <h3 class="text-lg font-semibold mb-4 text-text-2 flex items-center">
                  <i class="fas fa-hand-pointer mr-2 text-status-2"></i>
                  컴포넌트
                </h3>
                <div class="flex justify-center items-center min-h-[300px]">
                  <slot name="interactive-demo">
                    <div class="text-text-1 text-center py-12">
                      <i class="fas fa-cube text-4xl text-text-1 mb-4"></i>
                      <p>인터랙티브 데모를 여기에 배치하세요</p>
                    </div>
                  </slot>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Code Examples -->
        <section class="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
          <div class="bg-gradient-to-r from-text-2 to-text-1 px-8 py-8">
            <h2 class="text-2xl font-bold text-white flex items-center">
              <i class="fas fa-code mr-3"></i>
              코드 예시
            </h2>
            <p class="text-white/80 mt-2">실제 구현에 필요한 코드를 확인하세요</p>
          </div>
          <div class="p-8 space-y-6">
            <div class="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6">
              <h3 class="text-lg font-semibold mb-4 text-text-2 flex items-center">
                <i class="fas fa-rocket mr-2 text-brand-1"></i>
                기본 사용법
              </h3>
              <div class="code-block">
                <div class="code-header">
                  <div class="code-dots">
                    <div class="code-dot bg-red-500"></div>
                    <div class="code-dot bg-yellow-500"></div>
                    <div class="code-dot bg-green-500"></div>
                  </div>
                  <span class="code-title">Vue Template</span>
                </div>
                <div class="code-content">
                  <pre
                    class="text-green-400 text-sm overflow-x-auto whitespace-pre-wrap break-words"
                  >
<slot name="basic-usage-code">
&lt;!-- 기본 사용법 코드 예시 --&gt;
&lt;ComponentName /&gt;</slot></pre>
                </div>
              </div>
            </div>

            <div class="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6">
              <h3 class="text-lg font-semibold mb-4 text-text-2 flex items-center">
                <i class="fas fa-cogs mr-2 text-brand-2"></i>
                Props 데이터 구조
              </h3>
              <div class="code-block">
                <div class="code-header">
                  <div class="code-dots">
                    <div class="code-dot bg-red-500"></div>
                    <div class="code-dot bg-yellow-500"></div>
                    <div class="code-dot bg-green-500"></div>
                  </div>
                  <span class="code-title">JavaScript</span>
                </div>
                <div class="code-content">
                  <pre
                    class="text-blue-400 text-sm overflow-x-auto whitespace-pre-wrap break-words"
                  >
<slot name="props-structure-code">
const props = {
  // Props 구조 예시
}</slot></pre>
                </div>
              </div>
            </div>

            <div class="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6">
              <h3 class="text-lg font-semibold mb-4 text-text-2 flex items-center">
                <i class="fas fa-bolt mr-2 text-brand-3"></i>
                이벤트 핸들러
              </h3>
              <div class="code-block">
                <div class="code-header">
                  <div class="code-dots">
                    <div class="code-dot bg-red-500"></div>
                    <div class="code-dot bg-yellow-500"></div>
                    <div class="code-dot bg-green-500"></div>
                  </div>
                  <span class="code-title">JavaScript</span>
                </div>
                <div class="code-content">
                  <pre
                    class="text-yellow-400 text-sm overflow-x-auto whitespace-pre-wrap break-words"
                  >
<slot name="event-handlers-code">
const handleEvent = (data) => {
  console.log('Event:', data)
}</slot></pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Documentation -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Props Documentation -->
          <section class="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div class="bg-gradient-to-r from-brand-1 to-brand-2 px-8 py-8">
              <h2 class="text-2xl font-bold text-white flex items-center">
                <i class="fas fa-list-ul mr-3"></i>
                Props 문서
              </h2>
              <p class="text-white/80 mt-2">컴포넌트의 속성들을 확인하세요</p>
            </div>
            <div class="p-8">
              <div class="overflow-x-auto">
                <table class="w-full text-sm">
                  <thead>
                    <tr class="border-b-2 border-brand-1">
                      <th class="text-left p-3 font-semibold text-text-2 bg-brand-1/10">Prop</th>
                      <th class="text-left p-3 font-semibold text-text-2 bg-brand-1/10">Type</th>
                      <th class="text-left p-3 font-semibold text-text-2 bg-brand-1/10">
                        Required
                      </th>
                      <th class="text-left p-3 font-semibold text-text-2 bg-brand-1/10">Default</th>
                      <th class="text-left p-3 font-semibold text-text-2 bg-brand-1/10">
                        Description
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <slot name="props-table">
                      <tr class="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                        <td class="p-3 text-text-1 font-medium">example</td>
                        <td class="p-3 text-text-1">String</td>
                        <td class="p-3 text-text-1">No</td>
                        <td class="p-3 text-text-1">''</td>
                        <td class="p-3 text-text-1">예시 prop</td>
                      </tr>
                    </slot>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <!-- Events Documentation -->
          <section class="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div class="bg-gradient-to-r from-status-1 to-status-2 px-8 py-8">
              <h2 class="text-2xl font-bold text-white flex items-center">
                <i class="fas fa-broadcast-tower mr-3"></i>
                Events 문서
              </h2>
              <p class="text-white/80 mt-2">컴포넌트의 이벤트들을 확인하세요</p>
            </div>
            <div class="p-8">
              <div class="overflow-x-auto">
                <table class="w-full text-sm">
                  <thead>
                    <tr class="border-b-2 border-status-1">
                      <th class="text-left p-3 font-semibold text-text-2 bg-status-1/10">Event</th>
                      <th class="text-left p-3 font-semibold text-text-2 bg-status-1/10">
                        Payload
                      </th>
                      <th class="text-left p-3 font-semibold text-text-2 bg-status-1/10">
                        Description
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <slot name="events-table">
                      <tr class="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                        <td class="p-3 text-text-1 font-medium">example</td>
                        <td class="p-3 text-text-1">data object</td>
                        <td class="p-3 text-text-1">예시 이벤트</td>
                      </tr>
                    </slot>
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps } from 'vue'

const props = defineProps({
  componentName: {
    type: String,
    required: true,
    default: 'Component',
  },
})

// 이벤트 로그
const eventLogs = ref([])

// 이벤트 로그 추가 함수 (외부에서 사용할 수 있도록 expose)
const addEventLog = (message) => {
  const timestamp = new Date().toLocaleTimeString()
  eventLogs.value.unshift(`[${timestamp}] ${message}`)

  // 최대 10개 로그만 유지
  if (eventLogs.value.length > 10) {
    eventLogs.value = eventLogs.value.slice(0, 10)
  }
}

// 외부에서 사용할 수 있도록 expose
defineExpose({
  addEventLog,
})
</script>

<style scoped>
pre {
  font-family: 'Fira Code', 'Courier New', monospace;
  white-space: pre-wrap;
  line-height: 1.5;
}

table {
  border-collapse: collapse;
}

th,
td {
  text-align: left;
  padding: 12px;
}

/* 스크롤바 스타일링 */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

/* 애니메이션 */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

section {
  animation: fadeInUp 0.6s ease-out;
}

/* 호버 효과 */
.group:hover .group-hover\:shadow-lg {
  transform: translateY(-2px);
}

/* 코드 블록 스타일링 */
.code-block {
  background: #1e1e1e;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: 1px solid #333;
  max-width: 90%;
  width: auto;
  margin: 0 auto;
}

.code-header {
  background: #2d2d2d;
  padding: 12px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #404040;
}

.code-dots {
  display: flex;
  gap: 6px;
}

.code-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.code-title {
  color: #d4d4d4;
  font-size: 14px;
  font-weight: 500;
  font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace;
}

.code-content {
  padding: 16px;
  background: #1e1e1e;
  max-width: 100%;
  overflow: hidden;
  width: 100%;
}

.code-content pre {
  margin: 0;
  font-family: 'Fira Code', 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace;
  line-height: 1.6;
  white-space: pre-wrap;
  word-wrap: break-word;
  word-break: break-word;
  max-width: 100%;
  overflow-wrap: break-word;
}

.code-content code {
  font-family: inherit;
  color: inherit;
}

/* 코드 블록 내 텍스트 색상 강제 적용 */
.code-content pre code {
  color: inherit !important;
}

.code-content pre {
  color: inherit;
}

/* 코드 블록 내 모든 텍스트 색상 강제 적용 */
.code-content * {
  color: inherit !important;
}

/* 특정 색상 클래스 강제 적용 */
.code-content .text-green-400 {
  color: #4ade80 !important;
}

.code-content .text-blue-400 {
  color: #60a5fa !important;
}

.code-content .text-yellow-400 {
  color: #facc15 !important;
}
</style>
