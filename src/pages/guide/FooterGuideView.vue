<template>
  <div class="footer-guide">
    <div class="container">
      <h1 class="page-title">Footer 컴포넌트 가이드</h1>

      <!-- 컴포넌트 예시 -->
      <section class="section">
        <h2 class="section-title">컴포넌트 예시</h2>
        <div class="footer-example">
          <Footer />
        </div>
      </section>

      <!-- 코드 예시 -->
      <section class="section">
        <h2 class="section-title">코드 예시</h2>
        <div class="code-example">
          <h3>기본 사용법</h3>
          <pre><code>&lt;template&gt;
  &lt;div class="app"&gt;
    &lt;!-- 메인 콘텐츠 --&gt;
    &lt;main&gt;
      &lt;!-- 페이지 콘텐츠 --&gt;
    &lt;/main&gt;

    &lt;!-- Footer 컴포넌트 --&gt;
    &lt;Footer /&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script setup&gt;
import Footer from '@/components/common/footer.vue'
&lt;/script&gt;</code></pre>
        </div>
        <div class="code-example">
          <h3>App.vue에서 사용</h3>
          <pre><code>&lt;template&gt;
  &lt;div id="app"&gt;
    &lt;router-view /&gt;
    &lt;Footer /&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script setup&gt;
import Footer from '@/components/common/footer.vue'
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
                <td colspan="5" style="text-align: center; color: #7f8c8d">
                  Footer 컴포넌트는 Props를 받지 않습니다.
                </td>
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
                <td colspan="4" style="text-align: center; color: #7f8c8d">
                  Footer 컴포넌트는 이벤트를 발생시키지 않습니다.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- 구조 분석 -->
      <section class="section">
        <h2 class="section-title">구조 분석</h2>
        <div class="structure-analysis">
          <div class="structure-item">
            <h3>회사 정보 섹션</h3>
            <div class="structure-content">
              <ul>
                <li>상호: (주)장부</li>
                <li>대표: 백현빈</li>
                <li>사업자등록번호: 178-98-665222</li>
                <li>주소: 서울 광진구 능동로 195-16 5층, 6층</li>
                <li>통신판매업 신고번호: 제2029-서울광진-78875호</li>
              </ul>
            </div>
          </div>
          <div class="structure-item">
            <h3>연락처 정보 섹션</h3>
            <div class="structure-content">
              <ul>
                <li>이메일: cs@zangbu.com</li>
                <li>서비스제휴문의: partnership@zangbu.com</li>
                <li>분양광고 문의: ad@zangbu.com</li>
                <li>팩스: 02-999-1234</li>
              </ul>
            </div>
          </div>
          <div class="structure-item">
            <h3>저작권 정보 섹션</h3>
            <div class="structure-content">
              <ul>
                <li>Copyright © ZANGBU. All Rights Reserved.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- 반응형 브레이크포인트 -->
      <section class="section">
        <h2 class="section-title">반응형 브레이크포인트</h2>
        <div class="breakpoints">
          <div class="breakpoint-item">
            <h3>1024px 이상 (데스크톱)</h3>
            <ul>
              <li>라벨과 값이 가로 배치</li>
              <li>최대 너비 1200px</li>
              <li>패딩: 2rem 0</li>
              <li>라벨 최소 너비: 120px</li>
            </ul>
          </div>
          <div class="breakpoint-item">
            <h3>1024px 미만 (태블릿/모바일)</h3>
            <ul>
              <li>라벨과 값이 세로 배치</li>
              <li>패딩: 1.5rem 0</li>
              <li>라벨 최소 너비 해제</li>
              <li>라벨 하단 여백 추가</li>
            </ul>
          </div>
          <div class="breakpoint-item">
            <h3>640px 미만 (작은 모바일)</h3>
            <ul>
              <li>패딩: 1rem 0</li>
              <li>섹션 간 여백 축소</li>
              <li>컴팩트한 레이아웃</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import Footer from '@/components/common/footer.vue'
</script>

<style scoped>
.footer-guide {
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

.footer-example {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.responsive-info {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}

.responsive-item {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.responsive-item h3 {
  color: #2c3e50;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 16px;
  font-family: 'Roboto', sans-serif;
}

.responsive-item ul {
  margin: 0;
  padding-left: 20px;
  color: #7f8c8d;
  line-height: 1.6;
}

.responsive-item li {
  margin-bottom: 8px;
}

.structure-analysis {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}

.structure-item {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.structure-item h3 {
  color: #2c3e50;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 16px;
  font-family: 'Roboto', sans-serif;
}

.structure-content ul {
  margin: 0;
  padding-left: 20px;
  color: #7f8c8d;
  line-height: 1.6;
}

.structure-content li {
  margin-bottom: 8px;
}

.color-system {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.color-item {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.color-swatch {
  width: 100%;
  height: 60px;
  border-radius: 8px;
  margin-bottom: 12px;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.color-info h4 {
  color: #2c3e50;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 8px;
  font-family: 'Roboto', sans-serif;
}

.color-info p {
  color: #7f8c8d;
  font-size: 14px;
  margin: 0;
  font-family: 'Courier New', monospace;
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

.css-structure {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.css-item h3 {
  color: #2c3e50;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 16px;
  font-family: 'Roboto', sans-serif;
}

.css-item ul {
  margin: 0;
  padding-left: 20px;
  color: #7f8c8d;
  line-height: 1.6;
}

.css-item li {
  margin-bottom: 8px;
}

.css-item code {
  background: #f8f9fa;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
  color: #e74c3c;
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

.breakpoints {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}

.breakpoint-item {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.breakpoint-item h3 {
  color: #2c3e50;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 16px;
  font-family: 'Roboto', sans-serif;
}

.breakpoint-item ul {
  margin: 0;
  padding-left: 20px;
  color: #7f8c8d;
  line-height: 1.6;
}

.breakpoint-item li {
  margin-bottom: 8px;
}

.customization {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 24px;
}

.custom-item {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.custom-item h3 {
  color: #2c3e50;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 16px;
  font-family: 'Roboto', sans-serif;
}

.custom-item pre {
  background: #f8f9fa;
  color: #2c3e50;
  padding: 16px;
  border-radius: 6px;
  overflow-x: auto;
  font-family: 'Courier New', monospace;
  font-size: 14px;
  line-height: 1.5;
  margin: 0;
}

@media (max-width: 768px) {
  .footer-guide {
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

  .structure-analysis,
  .breakpoints {
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
}
</style>
