<template>
  <div class="dropbox-guide">
    <div class="container">
      <h1 class="page-title">DropBox 컴포넌트 가이드</h1>

      <!-- 컴포넌트 예시 -->
      <section class="section">
        <h2 class="section-title">컴포넌트 예시</h2>
        <div class="dropboxes-grid">
          <div class="dropbox-example">
            <h3>기본 DropBox</h3>
            <Dropbox v-model="selectedValue1" @change="handleChange" />
            <p class="result">선택된 값: {{ selectedValue1 }}</p>
          </div>
          <div class="dropbox-example">
            <h3>도시 선택</h3>
            <Dropbox
              v-model="selectedCity"
              :options="cityOptions"
              placeholder="도시를 선택하세요"
              @change="handleCityChange"
            />
            <p class="result">선택된 도시: {{ selectedCity }}</p>
          </div>
          <div class="dropbox-example">
            <h3>카테고리 선택</h3>
            <Dropbox
              v-model="selectedCategory"
              :options="categoryOptions"
              placeholder="카테고리를 선택하세요"
              @change="handleCategoryChange"
            />
            <p class="result">선택된 카테고리: {{ selectedCategory }}</p>
          </div>
        </div>
      </section>

      <!-- 코드 예시 -->
      <section class="section">
        <h2 class="section-title">코드 예시</h2>
        <div class="code-example">
          <h3>기본 사용법</h3>
          <pre><code>&lt;template&gt;
  &lt;Dropbox v-model="selectedValue" @change="handleChange" /&gt;
&lt;/template&gt;

&lt;script setup&gt;
import { ref } from 'vue'
import Dropbox from '@/components/common/Dropbox.vue'

const selectedValue = ref('3years')

const handleChange = (option) => {
  console.log('선택된 옵션:', option)
}
&lt;/script&gt;</code></pre>
        </div>
        <div class="code-example">
          <h3>커스텀 옵션과 함께 사용</h3>
          <pre><code>&lt;template&gt;
  &lt;Dropbox
    v-model="selectedCity"
    :options="cityOptions"
    placeholder="도시를 선택하세요"
    @change="handleCityChange"
  /&gt;
&lt;/template&gt;

&lt;script setup&gt;
import { ref } from 'vue'
import Dropbox from '@/components/common/Dropbox.vue'

const selectedCity = ref('')
const cityOptions = [
  { value: 'seoul', label: '서울' },
  { value: 'busan', label: '부산' },
  { value: 'daegu', label: '대구' },
  { value: 'incheon', label: '인천' }
]

const handleCityChange = (option) => {
  console.log('선택된 도시:', option)
}
&lt;/script&gt;</code></pre>
        </div>
      </section>

      <!-- Props 문서 -->
      <section class="section">
        <h2 class="section-title">Props 문서</h2>
        <div class="table-container">
          <table class="docs-table">
            <thead>
              <tr>
                <th>Prop 이름</th>
                <th>타입</th>
                <th>필수</th>
                <th>기본값</th>
                <th>설명</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>options</td>
                <td>Array</td>
                <td>❌</td>
                <td>시간 범위 옵션</td>
                <td>드롭다운 옵션 배열 [{value, label}]</td>
              </tr>
              <tr>
                <td>placeholder</td>
                <td>String</td>
                <td>❌</td>
                <td>'선택해주세요'</td>
                <td>플레이스홀더 텍스트</td>
              </tr>
              <tr>
                <td>modelValue</td>
                <td>String/Number</td>
                <td>❌</td>
                <td>null</td>
                <td>v-model 바인딩 값</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- 이벤트 문서 -->
      <section class="section">
        <h2 class="section-title">이벤트 문서</h2>
        <div class="table-container">
          <table class="docs-table">
            <thead>
              <tr>
                <th>이벤트 이름</th>
                <th>발생 시점</th>
                <th>전달 데이터</th>
                <th>설명</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>update:modelValue</td>
                <td>v-model 업데이트</td>
                <td>String/Number</td>
                <td>v-model 업데이트 시 발생</td>
              </tr>
              <tr>
                <td>change</td>
                <td>옵션 선택</td>
                <td>Object</td>
                <td>옵션 선택 시 발생 (선택된 옵션 객체)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- 인터랙티브 데모 -->
      <section class="section">
        <h2 class="section-title">인터랙티브 데모</h2>
        <div class="demo-controls">
          <h3>옵션 동적 변경</h3>
          <div class="control-buttons">
            <button @click="setTimeOptions" class="demo-button">시간 옵션</button>
            <button @click="setColorOptions" class="demo-button">색상 옵션</button>
            <button @click="setSizeOptions" class="demo-button">크기 옵션</button>
          </div>
        </div>
        <div class="demo-dropbox">
          <Dropbox
            v-model="demoValue"
            :options="demoOptions"
            placeholder="옵션을 선택하세요"
            @change="handleDemoChange"
          />
          <p class="result">선택된 값: {{ demoValue }}</p>
        </div>
        <div v-if="lastEvent" class="event-log">
          <p>
            마지막 이벤트: <strong>{{ lastEvent }}</strong>
          </p>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Dropbox from '@/components/common/Dropbox.vue'

// 기본 예시
const selectedValue1 = ref('3years')

// 커스텀 옵션 예시
const selectedCity = ref('')
const selectedCategory = ref('')

const cityOptions = [
  { value: 'seoul', label: '서울' },
  { value: 'busan', label: '부산' },
  { value: 'daegu', label: '대구' },
  { value: 'incheon', label: '인천' },
  { value: 'gwangju', label: '광주' },
]

const categoryOptions = [
  { value: 'electronics', label: '전자제품' },
  { value: 'clothing', label: '의류' },
  { value: 'books', label: '도서' },
  { value: 'sports', label: '스포츠' },
  { value: 'food', label: '식품' },
]

// 인터랙티브 데모
const demoValue = ref('')
const demoOptions = ref([
  { value: '3years', label: '최근 3년' },
  { value: '1year', label: '최근 1년' },
  { value: '6months', label: '최근 6개월' },
  { value: '1month', label: '최근 1개월' },
])

const lastEvent = ref('')

// 이벤트 핸들러
const handleChange = (option) => {
  console.log('기본 변경:', option)
}

const handleCityChange = (option) => {
  console.log('도시 변경:', option)
}

const handleCategoryChange = (option) => {
  console.log('카테고리 변경:', option)
}

const handleDemoChange = (option) => {
  lastEvent.value = `선택: ${option.label}`
  console.log('데모 변경:', option)
}

// 데모 옵션 변경 함수들
const setTimeOptions = () => {
  demoOptions.value = [
    { value: '3years', label: '최근 3년' },
    { value: '1year', label: '최근 1년' },
    { value: '6months', label: '최근 6개월' },
    { value: '1month', label: '최근 1개월' },
  ]
  demoValue.value = ''
}

const setColorOptions = () => {
  demoOptions.value = [
    { value: 'red', label: '빨간색' },
    { value: 'blue', label: '파란색' },
    { value: 'green', label: '초록색' },
    { value: 'yellow', label: '노란색' },
    { value: 'purple', label: '보라색' },
  ]
  demoValue.value = ''
}

const setSizeOptions = () => {
  demoOptions.value = [
    { value: 'xs', label: '매우 작음' },
    { value: 'sm', label: '작음' },
    { value: 'md', label: '보통' },
    { value: 'lg', label: '큼' },
    { value: 'xl', label: '매우 큼' },
  ]
  demoValue.value = ''
}
</script>

<style scoped>
.dropbox-guide {
  min-height: 100vh;
  background: #f8f9fa;
  padding: 40px 20px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.page-title {
  text-align: center;
  color: #2c3e50;
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 40px;
  font-family: 'Roboto', sans-serif;
}

.section {
  margin-bottom: 60px;
}

.section-title {
  color: #2c3e50;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 24px;
  font-family: 'Roboto', sans-serif;
  border-bottom: 2px solid #3498db;
  padding-bottom: 8px;
}

.overview {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.overview p {
  margin: 0;
  color: #2c3e50;
  font-size: 16px;
  line-height: 1.6;
}

.dropboxes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 24px;
  justify-items: center;
}

.dropbox-example {
  background: white;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 320px;
}

.dropbox-example h3 {
  color: #2c3e50;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 16px;
  font-family: 'Roboto', sans-serif;
}

.result {
  margin-top: 16px;
  padding: 12px;
  background: #e8f5e8;
  border: 1px solid #27ae60;
  border-radius: 6px;
  color: #2c3e50;
  font-size: 14px;
  font-family: 'Roboto', sans-serif;
}

.demo-controls {
  margin-bottom: 24px;
}

.demo-controls h3 {
  color: #2c3e50;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 16px;
  font-family: 'Roboto', sans-serif;
}

.control-buttons {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center;
}

.demo-button {
  padding: 8px 16px;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.demo-button:hover {
  background: #2980b9;
}

.demo-dropbox {
  margin-top: 20px;
  text-align: center;
}

.event-log {
  background: #e8f5e8;
  border: 1px solid #27ae60;
  border-radius: 8px;
  padding: 16px;
  text-align: center;
  margin-top: 20px;
}

.event-log p {
  margin: 0;
  color: #2c3e50;
  font-family: 'Roboto', sans-serif;
}

.table-container {
  overflow-x: auto;
  margin-bottom: 20px;
}

.docs-table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.docs-table th {
  background: #3498db;
  color: white;
  padding: 12px 16px;
  text-align: left;
  font-weight: 600;
  font-family: 'Roboto', sans-serif;
}

.docs-table td {
  padding: 12px 16px;
  border-bottom: 1px solid #ecf0f1;
  font-family: 'Roboto', sans-serif;
}

.docs-table tr:last-child td {
  border-bottom: none;
}

.docs-table tr:hover {
  background: #f8f9fa;
}

.code-example {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  border-left: 4px solid #3498db;
}

.code-example h3 {
  color: #2c3e50;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 16px;
  font-family: 'Roboto', sans-serif;
}

.code-example pre {
  background: #2c3e50;
  color: #ecf0f1;
  padding: 16px;
  border-radius: 6px;
  overflow-x: auto;
  font-family: 'Courier New', monospace;
  font-size: 14px;
  line-height: 1.5;
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
}

.feature-item {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.feature-item h3 {
  color: #2c3e50;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 12px;
  font-family: 'Roboto', sans-serif;
}

.feature-item p {
  color: #7f8c8d;
  font-size: 14px;
  line-height: 1.5;
  margin: 0;
}

@media (max-width: 768px) {
  .dropbox-guide {
    padding: 20px 16px;
  }

  .page-title {
    font-size: 24px;
    margin-bottom: 30px;
  }

  .section-title {
    font-size: 20px;
    margin-bottom: 20px;
  }

  .basic-example,
  .custom-examples {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .features {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .control-buttons {
    flex-direction: column;
  }

  .demo-button {
    width: 100%;
  }

  .code-example {
    padding: 16px;
  }

  .code-example pre {
    font-size: 12px;
    padding: 12px;
  }

  .docs-table {
    font-size: 14px;
  }

  .docs-table th,
  .docs-table td {
    padding: 8px 12px;
  }
}
</style>
