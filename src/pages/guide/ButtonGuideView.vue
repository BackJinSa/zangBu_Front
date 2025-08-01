<template>
  <div class="button-guide">
    <div class="container">
      <h1 class="page-title">Button 컴포넌트 가이드</h1>

      <!-- 컴포넌트 예시 -->
      <section class="section">
        <h2 class="section-title">컴포넌트 예시</h2>
        <div class="buttons-grid">
          <div class="button-example">
            <h3>Button 1</h3>
            <Button variant="button1" @click="handleButtonClick('button1')">Button 1</Button>
            <p class="description">진한 녹색 배경, 흰색 텍스트 (200x50px)</p>
          </div>
          <div class="button-example">
            <h3>Button 2</h3>
            <Button variant="button2" @click="handleButtonClick('button2')">Button 2</Button>
            <p class="description">연한 녹색 배경, 흰색 텍스트 (200x50px)</p>
          </div>
          <div class="button-example">
            <h3>Button 3</h3>
            <Button variant="button3" @click="handleButtonClick('button3')">Button 3</Button>
            <p class="description">파란색 배경, 흰색 텍스트 (200x50px)</p>
          </div>
          <div class="button-example">
            <h3>Button 4</h3>
            <Button variant="button4" @click="handleButtonClick('button4')">Button 4</Button>
            <p class="description">파란색 배경, 아이콘용 (200x50px)</p>
          </div>
          <div class="button-example">
            <h3>Button 5</h3>
            <Button variant="button5" @click="handleButtonClick('button5')">Button 5</Button>
            <p class="description">투명 배경, 녹색 테두리 (83x38px)</p>
          </div>
          <div class="button-example">
            <h3>Button 6</h3>
            <Button variant="button6" @click="handleButtonClick('button6')">Button 6</Button>
            <p class="description">진한 녹색 배경, 흰색 텍스트 (83x38px)</p>
          </div>
          <div class="button-example">
            <h3>Button 7</h3>
            <Button variant="button7" @click="handleButtonClick('button7')">Button 7</Button>
            <p class="description">투명 배경, 진한 녹색 테두리 (60x38px)</p>
          </div>
          <div class="button-example">
            <h3>Button 8</h3>
            <Button variant="button8" @click="handleButtonClick('button8')">Button 8</Button>
            <p class="description">진한 녹색 배경, 전체 너비용 (105x34px)</p>
          </div>
          <div class="button-example">
            <h3>Button 9</h3>
            <Button variant="button9" @click="handleButtonClick('button9')">Button 9</Button>
            <p class="description">빨간색 배경, 흰색 텍스트 (183x40px)</p>
          </div>
          <div class="button-example">
            <h3>Button 10</h3>
            <Button variant="button10" @click="handleButtonClick('button10')">Button 10</Button>
            <p class="description">흰색 배경, 회색 테두리 (183x40px)</p>
          </div>
        </div>
      </section>

      <!-- 코드 예시 -->
      <section class="section">
        <h2 class="section-title">코드 예시</h2>
        <div class="code-example">
          <h3>기본 사용법</h3>
          <pre><code>&lt;template&gt;
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
        <div class="code-example">
          <h3>아이콘과 함께 사용</h3>
          <pre><code>&lt;template&gt;
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
        <div class="code-example">
          <h3>전체 너비 버튼</h3>
          <pre><code>&lt;template&gt;
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
                <td>variant</td>
                <td>String</td>
                <td>❌</td>
                <td>'primary'</td>
                <td>버튼 스타일 (button1~button10)</td>
              </tr>
              <tr>
                <td>size</td>
                <td>String</td>
                <td>❌</td>
                <td>'md'</td>
                <td>버튼 크기 (sm, md, lg)</td>
              </tr>
              <tr>
                <td>icon</td>
                <td>String/Object</td>
                <td>❌</td>
                <td>null</td>
                <td>아이콘 컴포넌트</td>
              </tr>
              <tr>
                <td>iconRight</td>
                <td>Boolean</td>
                <td>❌</td>
                <td>false</td>
                <td>아이콘을 오른쪽에 배치</td>
              </tr>
              <tr>
                <td>fullWidth</td>
                <td>Boolean</td>
                <td>❌</td>
                <td>false</td>
                <td>전체 너비 사용</td>
              </tr>
              <tr>
                <td>disabled</td>
                <td>Boolean</td>
                <td>❌</td>
                <td>false</td>
                <td>버튼 비활성화</td>
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
                <td>click</td>
                <td>버튼 클릭</td>
                <td>Event</td>
                <td>버튼 클릭 시 발생</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- 인터랙티브 데모 -->
      <section class="section">
        <h2 class="section-title">인터랙티브 데모</h2>
        <div class="demo-buttons">
          <Button variant="button1" @click="handleDemoClick('Primary Button')"
            >Primary Button</Button
          >
          <Button variant="button5" @click="handleDemoClick('Outline Button')"
            >Outline Button</Button
          >
          <Button variant="button9" @click="handleDemoClick('Danger Button')">Danger Button</Button>
          <Button variant="button1" icon="fas fa-plus" @click="handleDemoClick('Icon Button')">
            Icon Button
          </Button>
        </div>
        <div v-if="lastClickedButton" class="event-log">
          <p>
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

const lastClickedButton = ref('')

const handleButtonClick = (buttonType) => {
  lastClickedButton.value = buttonType
  console.log('Button clicked:', buttonType)
}

const handleDemoClick = (buttonType) => {
  lastClickedButton.value = buttonType
  console.log('Demo button clicked:', buttonType)
}
</script>

<style scoped>
.button-guide {
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

.buttons-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 24px;
  justify-items: center;
}

.button-example {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 100%;
  max-width: 320px;
}

.button-example h3 {
  color: #2c3e50;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 16px;
  font-family: 'Roboto', sans-serif;
}

.button-example .description {
  margin-top: 12px;
  font-size: 14px;
  color: #7f8c8d;
  line-height: 1.4;
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

.demo-buttons {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 20px;
}

.event-log {
  background: #e8f5e8;
  border: 1px solid #27ae60;
  border-radius: 8px;
  padding: 16px;
  text-align: center;
}

.event-log p {
  margin: 0;
  color: #2c3e50;
  font-family: 'Roboto', sans-serif;
}

@media (max-width: 768px) {
  .button-guide {
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

  .button-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .size-examples,
  .icon-examples {
    grid-template-columns: 1fr;
    gap: 16px;
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
