<template>
  <div class="min-h-screen bg-gray-50 py-10 px-4">
    <div class="max-w-6xl mx-auto">
      <h1 class="text-center text-3xl font-bold text-gray-800 mb-10">Button 컴포넌트 가이드</h1>

      <!-- 컴포넌트 예시 -->
      <section class="mb-16">
        <h2 class="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-blue-500 pb-2">
          컴포넌트 예시
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          <div class="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 class="text-lg font-semibold text-gray-800 mb-4">Button 1</h3>
            <Button variant="button1" @click="handleButtonClick('button1')">Button 1</Button>
            <p class="text-sm text-gray-600 mt-3">진한 녹색 배경, 흰색 텍스트 (200x50px)</p>
          </div>
          <div class="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 class="text-lg font-semibold text-gray-800 mb-4">Button 2</h3>
            <Button variant="button2" @click="handleButtonClick('button2')">Button 2</Button>
            <p class="text-sm text-gray-600 mt-3">연한 녹색 배경, 흰색 텍스트 (200x50px)</p>
          </div>
          <div class="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 class="text-lg font-semibold text-gray-800 mb-4">Button 3</h3>
            <Button variant="button3" @click="handleButtonClick('button3')">Button 3</Button>
            <p class="text-sm text-gray-600 mt-3">파란색 배경, 흰색 텍스트 (200x50px)</p>
          </div>
          <div class="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 class="text-lg font-semibold text-gray-800 mb-4">Button 4</h3>
            <Button variant="button4" @click="handleButtonClick('button4')">Button 4</Button>
            <p class="text-sm text-gray-600 mt-3">파란색 배경, 아이콘용 (200x50px)</p>
          </div>
          <div class="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 class="text-lg font-semibold text-gray-800 mb-4">Button 5</h3>
            <Button variant="button5" @click="handleButtonClick('button5')">Button 5</Button>
            <p class="text-sm text-gray-600 mt-3">투명 배경, 녹색 테두리 (83x38px)</p>
          </div>
          <div class="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 class="text-lg font-semibold text-gray-800 mb-4">Button 6</h3>
            <Button variant="button6" @click="handleButtonClick('button6')">Button 6</Button>
            <p class="text-sm text-gray-600 mt-3">진한 녹색 배경, 흰색 텍스트 (83x38px)</p>
          </div>
          <div class="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 class="text-lg font-semibold text-gray-800 mb-4">Button 7</h3>
            <Button variant="button7" @click="handleButtonClick('button7')">Button 7</Button>
            <p class="text-sm text-gray-600 mt-3">투명 배경, 진한 녹색 테두리 (60x38px)</p>
          </div>
          <div class="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 class="text-lg font-semibold text-gray-800 mb-4">Button 8</h3>
            <Button variant="button8" @click="handleButtonClick('button8')">Button 8</Button>
            <p class="text-sm text-gray-600 mt-3">진한 녹색 배경, 전체 너비용 (105x34px)</p>
          </div>
          <div class="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 class="text-lg font-semibold text-gray-800 mb-4">Button 9</h3>
            <Button variant="button9" @click="handleButtonClick('button9')">Button 9</Button>
            <p class="text-sm text-gray-600 mt-3">빨간색 배경, 흰색 텍스트 (183x40px)</p>
          </div>
          <div class="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 class="text-lg font-semibold text-gray-800 mb-4">Button 10</h3>
            <Button variant="button10" @click="handleButtonClick('button10')">Button 10</Button>
            <p class="text-sm text-gray-600 mt-3">흰색 배경, 회색 테두리 (183x40px)</p>
          </div>
          <div class="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 class="text-lg font-semibold text-gray-800 mb-4">Button 11</h3>
            <Button variant="button11" @click="handleButtonClick('button11')">취소하기</Button>
            <p class="text-sm text-gray-600 mt-3">흰색 배경, 빨간색 테두리와 텍스트 (183x40px)</p>
          </div>
        </div>
      </section>

      <!-- 코드 예시 -->
      <section class="mb-16">
        <h2 class="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-blue-500 pb-2">
          코드 예시
        </h2>
        <div class="bg-gray-100 rounded-lg p-6 mb-6 border-l-4 border-blue-500">
          <h3 class="text-lg font-semibold text-gray-800 mb-4">기본 사용법</h3>
          <pre
            class="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm"
          ><code>&lt;template&gt;
  &lt;Button variant="button1" @click="handleClick"&gt;
    클릭하세요
  &lt;/Button&gt;
&lt;/template&gt;

&lt;script setup&gt;
import Button from '@/components/common/Button.vue'

const handleClick = () => {
  console.log('Button clicked!')
}
&lt;/script&gt;</code></pre>
        </div>
        <div class="bg-gray-100 rounded-lg p-6 mb-6 border-l-4 border-blue-500">
          <h3 class="text-lg font-semibold text-gray-800 mb-4">아이콘과 함께 사용</h3>
          <pre
            class="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm"
          ><code>&lt;template&gt;
  &lt;Button
    variant="button1"
    icon="fas fa-plus"
    :iconRight="true"
    @click="handleClick"
  &gt;
    아이콘 버튼
  &lt;/Button&gt;
&lt;/template&gt;

&lt;script setup&gt;
import Button from '@/components/common/Button.vue'

const handleClick = () => {
  console.log('Icon button clicked!')
}
&lt;/script&gt;</code></pre>
        </div>
        <div class="bg-gray-100 rounded-lg p-6 mb-6 border-l-4 border-blue-500">
          <h3 class="text-lg font-semibold text-gray-800 mb-4">전체 너비 버튼</h3>
          <pre
            class="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm"
          ><code>&lt;template&gt;
  &lt;Button
    variant="button1"
    :fullWidth="true"
    @click="handleClick"
  &gt;
    전체 너비 버튼
  &lt;/Button&gt;
&lt;/template&gt;

&lt;script setup&gt;
import Button from '@/components/common/Button.vue'

const handleClick = () => {
  console.log('Full width button clicked!')
}
&lt;/script&gt;</code></pre>
        </div>
      </section>

      <!-- Props 문서 -->
      <section class="mb-16">
        <h2 class="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-blue-500 pb-2">
          Props 문서
        </h2>
        <div class="overflow-x-auto mb-6">
          <table class="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-md">
            <thead>
              <tr>
                <th class="bg-blue-500 text-white py-3 px-4 text-left font-semibold">Prop 이름</th>
                <th class="bg-blue-500 text-white py-3 px-4 text-left font-semibold">타입</th>
                <th class="bg-blue-500 text-white py-3 px-4 text-left font-semibold">필수</th>
                <th class="bg-blue-500 text-white py-3 px-4 text-left font-semibold">기본값</th>
                <th class="bg-blue-500 text-white py-3 px-4 text-left font-semibold">설명</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="py-3 px-4 border-b border-gray-200">variant</td>
                <td class="py-3 px-4 border-b border-gray-200">String</td>
                <td class="py-3 px-4 border-b border-gray-200">❌</td>
                <td class="py-3 px-4 border-b border-gray-200">primary</td>
                <td class="py-3 px-4 border-b border-gray-200">버튼 스타일 (button1~button11)</td>
              </tr>
              <tr>
                <td class="py-3 px-4 border-b border-gray-200">size</td>
                <td class="py-3 px-4 border-b border-gray-200">String</td>
                <td class="py-3 px-4 border-b border-gray-200">❌</td>
                <td class="py-3 px-4 border-b border-gray-200">md</td>
                <td class="py-3 px-4 border-b border-gray-200">버튼 크기 (sm, md, lg)</td>
              </tr>
              <tr>
                <td class="py-3 px-4 border-b border-gray-200">icon</td>
                <td class="py-3 px-4 border-b border-gray-200">String/Object</td>
                <td class="py-3 px-4 border-b border-gray-200">❌</td>
                <td class="py-3 px-4 border-b border-gray-200">null</td>
                <td class="py-3 px-4 border-b border-gray-200">아이콘 컴포넌트</td>
              </tr>
              <tr>
                <td class="py-3 px-4 border-b border-gray-200">iconRight</td>
                <td class="py-3 px-4 border-b border-gray-200">Boolean</td>
                <td class="py-3 px-4 border-b border-gray-200">❌</td>
                <td class="py-3 px-4 border-b border-gray-200">false</td>
                <td class="py-3 px-4 border-b border-gray-200">아이콘을 오른쪽에 배치</td>
              </tr>
              <tr>
                <td class="py-3 px-4 border-b border-gray-200">fullWidth</td>
                <td class="py-3 px-4 border-b border-gray-200">Boolean</td>
                <td class="py-3 px-4 border-b border-gray-200">❌</td>
                <td class="py-3 px-4 border-b border-gray-200">false</td>
                <td class="py-3 px-4 border-b border-gray-200">전체 너비 사용</td>
              </tr>
              <tr>
                <td class="py-3 px-4 border-b border-gray-200">disabled</td>
                <td class="py-3 px-4 border-b border-gray-200">Boolean</td>
                <td class="py-3 px-4 border-b border-gray-200">❌</td>
                <td class="py-3 px-4 border-b border-gray-200">false</td>
                <td class="py-3 px-4 border-b border-gray-200">버튼 비활성화</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- 이벤트 문서 -->
      <section class="mb-16">
        <h2 class="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-blue-500 pb-2">
          이벤트 문서
        </h2>
        <div class="overflow-x-auto mb-6">
          <table class="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-md">
            <thead>
              <tr>
                <th class="bg-blue-500 text-white py-3 px-4 text-left font-semibold">
                  이벤트 이름
                </th>
                <th class="bg-blue-500 text-white py-3 px-4 text-left font-semibold">발생 시점</th>
                <th class="bg-blue-500 text-white py-3 px-4 text-left font-semibold">
                  전달 데이터
                </th>
                <th class="bg-blue-500 text-white py-3 px-4 text-left font-semibold">설명</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="py-3 px-4 border-b border-gray-200">click</td>
                <td class="py-3 px-4 border-b border-gray-200">버튼 클릭</td>
                <td class="py-3 px-4 border-b border-gray-200">Event</td>
                <td class="py-3 px-4 border-b border-gray-200">버튼 클릭 시 발생</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- 인터랙티브 데모 -->
      <section class="mb-16">
        <h2 class="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-blue-500 pb-2">
          인터랙티브 데모
        </h2>
        <div class="flex flex-wrap gap-4 justify-center mb-6">
          <Button variant="button1" @click="handleDemoClick('Primary Button')"
            >Primary Button</Button
          >
          <Button variant="button2" @click="handleDemoClick('Secondary Button')"
            >Secondary Button</Button
          >
          <Button variant="button3" @click="handleDemoClick('Info Button')">Info Button</Button>
          <Button variant="button5" @click="handleDemoClick('Outline Button')"
            >Outline Button</Button
          >
          <Button variant="button9" @click="handleDemoClick('Danger Button')">Danger Button</Button>
          <Button variant="button11" @click="handleDemoClick('Cancel Button')">취소하기</Button>
          <Button variant="button1" icon="fas fa-plus" @click="handleDemoClick('Icon Button')"
            >Icon Button</Button
          >
          <Button
            variant="button1"
            icon="fas fa-arrow-right"
            :iconRight="true"
            @click="handleDemoClick('Right Icon Button')"
            >Right Icon</Button
          >
          <Button variant="button1" :fullWidth="true" @click="handleDemoClick('Full Width Button')"
            >Full Width Button</Button
          >
          <Button variant="button1" :disabled="true" @click="handleDemoClick('Disabled Button')"
            >Disabled Button</Button
          >
        </div>
        <div
          v-if="lastClickedButton"
          class="bg-green-100 border border-green-200 rounded-lg p-4 text-center"
        >
          <p class="text-gray-800">
            마지막 클릭된 버튼: <strong>{{ lastClickedButton }}</strong>
          </p>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Button from '@/components/common/Button.vue'

// 반응형 데이터
const lastClickedButton = ref('')

// 메서드들
const handleButtonClick = (buttonName) => {
  console.log(`${buttonName} clicked!`)
}

const handleDemoClick = (buttonName) => {
  lastClickedButton.value = buttonName
  console.log(`${buttonName} clicked!`)
}
</script>
