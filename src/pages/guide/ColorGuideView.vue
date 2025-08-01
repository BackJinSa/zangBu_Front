<template>
  <ComponentGuideTemplate ref="templateRef" component-name="Color">
    <!-- 기본 사용법 슬롯 -->
    <template #basic-usage>
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        <div class="color-card">
          <div class="color-swatch" style="background-color: var(--brand-1)"></div>
          <div class="color-info">
            <p class="font-medium">Brand/1</p>
            <p class="text-sm text-text-1">#1C4025</p>
            <p class="text-xs text-text-1">bg-brand-1</p>
          </div>
        </div>
        <div class="color-card">
          <div class="color-swatch" style="background-color: var(--brand-2)"></div>
          <div class="color-info">
            <p class="font-medium">Brand/2</p>
            <p class="text-sm text-text-1">#285934</p>
            <p class="text-xs text-text-1">bg-brand-2</p>
          </div>
        </div>
        <div class="color-card">
          <div class="color-swatch" style="background-color: var(--brand-3)"></div>
          <div class="color-info">
            <p class="font-medium">Brand/3</p>
            <p class="text-sm text-text-1">#68A63C</p>
            <p class="text-xs text-text-1">bg-brand-3</p>
          </div>
        </div>
      </div>
    </template>

    <!-- 예시 슬롯들 -->
    <template #example-1>
      <div class="space-y-4">
        <h4 class="font-semibold text-text-2">Brand Colors</h4>
        <div class="grid grid-cols-2 gap-2">
          <div class="color-card">
            <div class="color-swatch" style="background-color: var(--brand-1)"></div>
            <div class="color-info">
              <p class="font-medium">Brand/1</p>
              <p class="text-xs text-text-1">#1C4025</p>
            </div>
          </div>
          <div class="color-card">
            <div class="color-swatch" style="background-color: var(--brand-2)"></div>
            <div class="color-info">
              <p class="font-medium">Brand/2</p>
              <p class="text-xs text-text-1">#285934</p>
            </div>
          </div>
        </div>
      </div>
    </template>

    <template #example-2>
      <div class="space-y-4">
        <h4 class="font-semibold text-text-2">Status Colors</h4>
        <div class="grid grid-cols-2 gap-2">
          <div class="color-card">
            <div class="color-swatch" style="background-color: var(--status-1)"></div>
            <div class="color-info">
              <p class="font-medium">Status/1</p>
              <p class="text-xs text-text-1">#0D8CE7</p>
            </div>
          </div>
          <div class="color-card">
            <div class="color-swatch" style="background-color: var(--status-2)"></div>
            <div class="color-info">
              <p class="font-medium">Status/2</p>
              <p class="text-xs text-text-1">#DC3545</p>
            </div>
          </div>
        </div>
      </div>
    </template>

    <template #example-3>
      <div class="space-y-4">
        <h4 class="font-semibold text-text-2">Text Colors</h4>
        <div class="grid grid-cols-2 gap-2">
          <div class="color-card">
            <div class="color-swatch" style="background-color: var(--text-1)"></div>
            <div class="color-info">
              <p class="font-medium">Text/1</p>
              <p class="text-xs text-text-1">#6B7280</p>
            </div>
          </div>
          <div class="color-card">
            <div class="color-swatch" style="background-color: var(--text-2)"></div>
            <div class="color-info">
              <p class="font-medium">Text/2</p>
              <p class="text-xs text-text-1">#555555</p>
            </div>
          </div>
        </div>
      </div>
    </template>

    <!-- 인터랙티브 데모 슬롯 -->
    <template #interactive-demo>
      <div class="space-y-4">
        <div class="grid grid-cols-2 gap-4">
          <button
            @click="handleColorClick('brand-1')"
            class="px-4 py-2 bg-brand-1 text-white rounded-lg"
          >
            Brand/1 버튼
          </button>
          <button
            @click="handleColorClick('brand-2')"
            class="px-4 py-2 bg-brand-2 text-white rounded-lg"
          >
            Brand/2 버튼
          </button>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <button
            @click="handleColorClick('status-1')"
            class="px-4 py-2 bg-status-1 text-white rounded-lg"
          >
            Status/1 버튼
          </button>
          <button
            @click="handleColorClick('status-2')"
            class="px-4 py-2 bg-status-2 text-white rounded-lg"
          >
            Status/2 버튼
          </button>
        </div>
      </div>
    </template>

    <!-- 코드 예시 슬롯들 -->
    <template #basic-usage-code>
      /* CSS 변수 사용 */ .element { background-color: var(--brand-1); color: var(--text-3); } /*
      Tailwind 클래스 사용 */ .element { @apply bg-brand-1 text-text-3; }</template
    >

    <template #props-structure-code>
      /* CSS 변수 정의 */ :root { /* Brand Colors */ --brand-1: #1C4025; --brand-2: #285934;
      --brand-3: #68A63C; --brand-4: #68A63C; --brand-5: #F2F2F2; /* Status Colors */ --status-1:
      #0D8CE7; --status-2: #DC3545; /* Text Colors */ --text-1: #6B7280; --text-2: #555555;
      --text-3: #FFFFFF; /* Background Colors */ --bg-1: #F2F2F2; --bg-2: #FFFFFF; }</template
    >

    <template #event-handlers-code>
      const handleColorClick = (colorName) => { console.log('Color clicked:', colorName)
      addEventLog(`${colorName} 색상이 클릭되었습니다`) // 색상 정보 복사 const colorValue =
      getComputedStyle(document.documentElement) .getPropertyValue(`--${colorName}`)
      navigator.clipboard.writeText(colorValue) addEventLog(`${colorName} 색상값이 클립보드에
      복사되었습니다`) }</template
    >

    <!-- Props 테이블 슬롯 -->
    <template #props-table>
      <tr class="border-b border-bg-1">
        <td class="p-2 text-text-1">--brand-1</td>
        <td class="p-2 text-text-1">Color</td>
        <td class="p-2 text-text-1">Yes</td>
        <td class="p-2 text-text-1">#1C4025</td>
        <td class="p-2 text-text-1">브랜드 메인 컬러</td>
      </tr>
      <tr class="border-b border-bg-1">
        <td class="p-2 text-text-1">--brand-2</td>
        <td class="p-2 text-text-1">Color</td>
        <td class="p-2 text-text-1">Yes</td>
        <td class="p-2 text-text-1">#285934</td>
        <td class="p-2 text-text-1">브랜드 서브 컬러</td>
      </tr>
      <tr class="border-b border-bg-1">
        <td class="p-2 text-text-1">--brand-3</td>
        <td class="p-2 text-text-1">Color</td>
        <td class="p-2 text-text-1">Yes</td>
        <td class="p-2 text-text-1">#68A63C</td>
        <td class="p-2 text-text-1">브랜드 액센트 컬러</td>
      </tr>
      <tr class="border-b border-bg-1">
        <td class="p-2 text-text-1">--status-1</td>
        <td class="p-2 text-text-1">Color</td>
        <td class="p-2 text-text-1">Yes</td>
        <td class="p-2 text-text-1">#0D8CE7</td>
        <td class="p-2 text-text-1">성공/정보 상태 컬러</td>
      </tr>
      <tr class="border-b border-bg-1">
        <td class="p-2 text-text-1">--status-2</td>
        <td class="p-2 text-text-1">Color</td>
        <td class="p-2 text-text-1">Yes</td>
        <td class="p-2 text-text-1">#DC3545</td>
        <td class="p-2 text-text-1">에러/경고 상태 컬러</td>
      </tr>
    </template>

    <!-- Events 테이블 슬롯 -->
    <template #events-table>
      <tr class="border-b border-bg-1">
        <td class="p-2 text-text-1">color-click</td>
        <td class="p-2 text-text-1">colorName: String</td>
        <td class="p-2 text-text-1">색상 클릭 시 발생</td>
      </tr>
      <tr class="border-b border-bg-1">
        <td class="p-2 text-text-1">color-copy</td>
        <td class="p-2 text-text-1">colorValue: String</td>
        <td class="p-2 text-text-1">색상값 복사 시 발생</td>
      </tr>
    </template>
  </ComponentGuideTemplate>
</template>

<script setup>
import { ref } from 'vue'
import ComponentGuideTemplate from './ComponentGuideTemplate.vue'

const templateRef = ref(null)

// 이벤트 핸들러
const handleColorClick = (colorName) => {
  templateRef.value?.addEventLog(`${colorName} 색상이 클릭되었습니다`)

  // 색상 정보 복사
  const colorValue = getComputedStyle(document.documentElement).getPropertyValue(`--${colorName}`)
  navigator.clipboard.writeText(colorValue)
  templateRef.value?.addEventLog(`${colorName} 색상값이 클립보드에 복사되었습니다`)
}
</script>

<style scoped>
.color-card {
  background: var(--bg-2);
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.color-swatch {
  width: 100%;
  height: 60px;
  border-radius: 6px;
  margin-bottom: 8px;
}

.color-info p {
  margin: 0;
}
</style>
