<template>
  <div class="color-guide">
    <div class="container">
      <h1 class="page-title">Color 가이드</h1>

      <!-- 색상 예시 -->
      <section class="section">
        <h2 class="section-title">색상 예시</h2>
        <div class="colors-grid">
          <div class="color-card">
            <div class="color-swatch" style="background-color: var(--brand-1)"></div>
            <div class="color-info">
              <p class="color-name">Brand/1</p>
              <p class="color-value">#1C4025</p>
              <p class="color-class">bg-brand-1</p>
            </div>
          </div>
          <div class="color-card">
            <div class="color-swatch" style="background-color: var(--brand-2)"></div>
            <div class="color-info">
              <p class="color-name">Brand/2</p>
              <p class="color-value">#285934</p>
              <p class="color-class">bg-brand-2</p>
            </div>
          </div>
          <div class="color-card">
            <div class="color-swatch" style="background-color: var(--brand-3)"></div>
            <div class="color-info">
              <p class="color-name">Brand/3</p>
              <p class="color-value">#68A63C</p>
              <p class="color-class">bg-brand-3</p>
            </div>
          </div>
          <div class="color-card">
            <div class="color-swatch" style="background-color: var(--status-1)"></div>
            <div class="color-info">
              <p class="color-name">Status/1</p>
              <p class="color-value">#0D8CE7</p>
              <p class="color-class">bg-status-1</p>
            </div>
          </div>
          <div class="color-card">
            <div class="color-swatch" style="background-color: var(--status-2)"></div>
            <div class="color-info">
              <p class="color-name">Status/2</p>
              <p class="color-value">#DC3545</p>
              <p class="color-class">bg-status-2</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 코드 예시 -->
      <section class="section">
        <h2 class="section-title">코드 예시</h2>
        <div class="code-example">
          <h3>CSS 변수 사용</h3>
          <pre><code>.element {
  background-color: var(--brand-1);
  color: var(--text-3);
}</code></pre>
        </div>
        <div class="code-example">
          <h3>Tailwind 클래스 사용</h3>
          <pre><code>.element {
  @apply bg-brand-1 text-text-3;
}</code></pre>
        </div>
      </section>

      <!-- 색상 변수 문서 -->
      <section class="section">
        <h2 class="section-title">색상 변수 문서</h2>
        <div class="table-container">
          <table class="docs-table">
            <thead>
              <tr>
                <th>변수명</th>
                <th>타입</th>
                <th>값</th>
                <th>설명</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>--brand-1</td>
                <td>Color</td>
                <td>#1C4025</td>
                <td>브랜드 메인 컬러</td>
              </tr>
              <tr>
                <td>--brand-2</td>
                <td>Color</td>
                <td>#285934</td>
                <td>브랜드 서브 컬러</td>
              </tr>
              <tr>
                <td>--brand-3</td>
                <td>Color</td>
                <td>#68A63C</td>
                <td>브랜드 액센트 컬러</td>
              </tr>
              <tr>
                <td>--status-1</td>
                <td>Color</td>
                <td>#0D8CE7</td>
                <td>성공/정보 상태 컬러</td>
              </tr>
              <tr>
                <td>--status-2</td>
                <td>Color</td>
                <td>#DC3545</td>
                <td>에러/경고 상태 컬러</td>
              </tr>
              <tr>
                <td>--text-1</td>
                <td>Color</td>
                <td>#6B7280</td>
                <td>보조 텍스트 컬러</td>
              </tr>
              <tr>
                <td>--text-2</td>
                <td>Color</td>
                <td>#555555</td>
                <td>주요 텍스트 컬러</td>
              </tr>
              <tr>
                <td>--text-3</td>
                <td>Color</td>
                <td>#FFFFFF</td>
                <td>흰색 텍스트 컬러</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- CSS 변수 정의 -->
      <section class="section">
        <h2 class="section-title">CSS 변수 정의</h2>
        <div class="code-example">
          <h3>전체 색상 변수</h3>
          <pre><code>:root {
  /* Brand Colors */
  --brand-1: #1C4025;
  --brand-2: #285934;
  --brand-3: #68A63C;
  --brand-4: #68A63C;
  --brand-5: #F2F2F2;
  
  /* Status Colors */
  --status-1: #0D8CE7;
  --status-2: #DC3545;
  
  /* Text Colors */
  --text-1: #6B7280;
  --text-2: #555555;
  --text-3: #FFFFFF;
  
  /* Background Colors */
  --bg-1: #F2F2F2;
  --bg-2: #FFFFFF;
}</code></pre>
        </div>
      </section>

      <!-- 인터랙티브 데모 -->
      <section class="section">
        <h2 class="section-title">인터랙티브 데모</h2>
        <div class="demo-buttons">
          <button @click="handleColorClick('brand-1')" class="demo-button brand-1">
            Brand/1 버튼
          </button>
          <button @click="handleColorClick('brand-2')" class="demo-button brand-2">
            Brand/2 버튼
          </button>
          <button @click="handleColorClick('status-1')" class="demo-button status-1">
            Status/1 버튼
          </button>
          <button @click="handleColorClick('status-2')" class="demo-button status-2">
            Status/2 버튼
          </button>
        </div>
        <div v-if="lastClickedColor" class="click-result">
          <p>
            마지막 클릭된 색상: <strong>{{ lastClickedColor }}</strong>
          </p>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const lastClickedColor = ref('')

// 이벤트 핸들러
const handleColorClick = (colorName) => {
  lastClickedColor.value = colorName
  console.log('Color clicked:', colorName)

  // 색상 정보 복사
  const colorValue = getComputedStyle(document.documentElement).getPropertyValue(`--${colorName}`)
  navigator.clipboard.writeText(colorValue)
  console.log(`${colorName} 색상값이 클립보드에 복사되었습니다: ${colorValue}`)
}
</script>

<style scoped>
.color-guide {
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

/* Section styles */
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

/* Colors grid */
.colors-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.color-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.color-card:hover {
  transform: translateY(-2px);
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.15);
}

.color-swatch {
  width: 100%;
  height: 80px;
  border-radius: 8px;
  margin-bottom: 12px;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.color-info p {
  margin: 0;
  font-family: 'Roboto', sans-serif;
}

.color-name {
  font-weight: 600;
  font-size: 16px;
  color: #2c3e50;
  margin-bottom: 4px;
}

.color-value {
  font-size: 14px;
  color: #7f8c8d;
  margin-bottom: 4px;
}

.color-class {
  font-size: 12px;
  color: #95a5a6;
  font-family: 'Courier New', monospace;
}

/* Code example styles */
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

.code-example code {
  font-family: 'Courier New', monospace;
}

/* Table styles */
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
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
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

/* Demo buttons */
.demo-buttons {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 16px;
  margin-bottom: 20px;
}

.demo-button {
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  color: white;
  font-weight: 600;
  font-family: 'Roboto', sans-serif;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.demo-button:hover {
  transform: translateY(-1px);
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2);
}

.demo-button.brand-1 {
  background-color: var(--brand-1);
}

.demo-button.brand-2 {
  background-color: var(--brand-2);
}

.demo-button.status-1 {
  background-color: var(--status-1);
}

.demo-button.status-2 {
  background-color: var(--status-2);
}

.click-result {
  background: #e8f5e8;
  border: 1px solid #27ae60;
  border-radius: 8px;
  padding: 16px;
  margin-top: 16px;
}

.click-result p {
  margin: 0;
  color: #2c3e50;
  font-family: 'Roboto', sans-serif;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .color-guide {
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

  .colors-grid {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
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

  .demo-buttons {
    grid-template-columns: 1fr;
  }
}
</style>
