<template>
  <div class="tailwind-guide">
    <div class="container">
      <h1 class="page-title">Tailwind CSS 가이드</h1>

      <!-- 개요 -->
      <section class="section">
        <h2 class="section-title">개요</h2>
        <div class="overview">
          <p>
            이 프로젝트는 Tailwind CSS 3.x를 사용하여 구축되었습니다.
            <br />Tailwind CSS는 유틸리티 우선 CSS 프레임워크로, 빠른 UI 개발과 일관된 디자인
            시스템을 제공합니다.
          </p>
          <div class="features">
            <div class="feature-item">
              <h3>유틸리티 우선</h3>
              <p>미리 정의된 클래스를 조합하여 빠르게 스타일링</p>
            </div>
            <div class="feature-item">
              <h3>반응형 디자인</h3>
              <p>sm:, md:, lg:, xl: 브레이크포인트로 모바일 우선 접근</p>
            </div>
            <div class="feature-item">
              <h3>커스터마이징</h3>
              <p>tailwind.config.js에서 브랜드 색상과 크기 커스터마이징</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 색상 시스템 -->
      <section class="section">
        <h2 class="section-title">색상 시스템</h2>
        <div class="colors-grid">
          <div class="color-card">
            <h3>브랜드 색상</h3>
            <div class="color-swatches">
              <div class="color-swatch">
                <div class="swatch" style="background-color: #1c4025"></div>
                <div class="color-info">
                  <p class="color-name">brand-1</p>
                  <p class="color-value">#1C4025</p>
                  <p class="color-class">bg-brand-1</p>
                </div>
              </div>
              <div class="color-swatch">
                <div class="swatch" style="background-color: #285934"></div>
                <div class="color-info">
                  <p class="color-name">brand-2</p>
                  <p class="color-value">#285934</p>
                  <p class="color-class">bg-brand-2</p>
                </div>
              </div>
              <div class="color-swatch">
                <div class="swatch" style="background-color: #68a63c"></div>
                <div class="color-info">
                  <p class="color-name">brand-3</p>
                  <p class="color-value">#68A63C</p>
                  <p class="color-class">bg-brand-3</p>
                </div>
              </div>
              <div class="color-swatch">
                <div class="swatch" style="background-color: #68a63c"></div>
                <div class="color-info">
                  <p class="color-name">brand-4</p>
                  <p class="color-value">#68A63C</p>
                  <p class="color-class">bg-brand-4</p>
                </div>
              </div>
            </div>
          </div>
          <div class="color-card">
            <h3>상태 색상</h3>
            <div class="color-swatches">
              <div class="color-swatch">
                <div class="swatch" style="background-color: #0d8ce7"></div>
                <div class="color-info">
                  <p class="color-name">status-1</p>
                  <p class="color-value">#0D8CE7</p>
                  <p class="color-class">bg-status-1</p>
                </div>
              </div>
              <div class="color-swatch">
                <div class="swatch" style="background-color: #dc3545"></div>
                <div class="color-info">
                  <p class="color-name">status-2</p>
                  <p class="color-value">#DC3545</p>
                  <p class="color-class">bg-status-2</p>
                </div>
              </div>
            </div>
          </div>
          <div class="color-card">
            <h3>텍스트 색상</h3>
            <div class="color-swatches">
              <div class="color-swatch">
                <div class="swatch" style="background-color: #6b7280"></div>
                <div class="color-info">
                  <p class="color-name">text-1</p>
                  <p class="color-value">#6B7280</p>
                  <p class="color-class">text-text-1</p>
                </div>
              </div>
              <div class="color-swatch">
                <div class="swatch" style="background-color: #555555"></div>
                <div class="color-info">
                  <p class="color-name">text-2</p>
                  <p class="color-value">#555555</p>
                  <p class="color-class">text-text-2</p>
                </div>
              </div>
              <div class="color-swatch">
                <div class="swatch" style="background-color: #ffffff; border: 1px solid #ddd"></div>
                <div class="color-info">
                  <p class="color-name">text-3</p>
                  <p class="color-value">#FFFFFF</p>
                  <p class="color-class">text-text-3</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 레이아웃 유틸리티 -->
      <section class="section">
        <h2 class="section-title">레이아웃 유틸리티</h2>
        <div class="utilities-grid">
          <div class="utility-card">
            <h3>Flexbox</h3>
            <div class="utility-examples">
              <div class="utility-example">
                <div
                  class="example-preview flex items-center justify-between p-3 bg-gray-100 rounded"
                >
                  <span class="text-sm">flex items-center justify-between</span>
                  <div class="flex space-x-2">
                    <div class="w-4 h-4 bg-blue-500 rounded"></div>
                    <div class="w-4 h-4 bg-green-500 rounded"></div>
                    <div class="w-4 h-4 bg-red-500 rounded"></div>
                  </div>
                </div>
                <p class="example-code">flex items-center justify-between</p>
              </div>
              <div class="utility-example">
                <div
                  class="example-preview flex items-center justify-center p-3 bg-gray-100 rounded"
                >
                  <span class="text-sm">flex items-center justify-center</span>
                </div>
                <p class="example-code">flex items-center justify-center</p>
              </div>
            </div>
          </div>
          <div class="utility-card">
            <h3>Grid</h3>
            <div class="utility-examples">
              <div class="utility-example">
                <div class="example-preview grid grid-cols-3 gap-2 p-3 bg-gray-100 rounded">
                  <div class="w-full h-8 bg-blue-500 rounded"></div>
                  <div class="w-full h-8 bg-green-500 rounded"></div>
                  <div class="w-full h-8 bg-red-500 rounded"></div>
                  <span class="text-xs col-span-3 text-center">grid grid-cols-3 gap-2</span>
                </div>
                <p class="example-code">grid grid-cols-3 gap-2</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 간격과 크기 -->
      <section class="section">
        <h2 class="section-title">간격과 크기</h2>
        <div class="utilities-grid">
          <div class="utility-card">
            <h3>패딩과 마진</h3>
            <div class="utility-examples">
              <div class="utility-example">
                <div class="example-preview p-2 bg-blue-100 rounded text-sm">p-2 (8px)</div>
                <p class="example-code">p-2</p>
              </div>
              <div class="utility-example">
                <div class="example-preview p-4 bg-green-100 rounded text-sm">p-4 (16px)</div>
                <p class="example-code">p-4</p>
              </div>
              <div class="utility-example">
                <div class="example-preview p-6 bg-red-100 rounded text-sm">p-6 (24px)</div>
                <p class="example-code">p-6</p>
              </div>
            </div>
          </div>
          <div class="utility-card">
            <h3>너비와 높이</h3>
            <div class="utility-examples">
              <div class="utility-example">
                <div
                  class="example-preview w-full h-8 bg-blue-100 rounded text-sm flex items-center px-2"
                >
                  w-full h-8
                </div>
                <p class="example-code">w-full h-8</p>
              </div>
              <div class="utility-example">
                <div
                  class="example-preview w-1/2 h-12 bg-green-100 rounded text-sm flex items-center px-2"
                >
                  w-1/2 h-12
                </div>
                <p class="example-code">w-1/2 h-12</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 반응형 디자인 -->
      <section class="section">
        <h2 class="section-title">반응형 디자인</h2>
        <div class="responsive-examples">
          <div class="responsive-card">
            <h3>브레이크포인트</h3>
            <div class="breakpoints">
              <div class="breakpoint">
                <span class="breakpoint-name">모바일</span>
                <span class="breakpoint-size">기본 (0px+)</span>
              </div>
              <div class="breakpoint">
                <span class="breakpoint-name">태블릿</span>
                <span class="breakpoint-size">sm: (640px+)</span>
              </div>
              <div class="breakpoint">
                <span class="breakpoint-name">데스크톱</span>
                <span class="breakpoint-size">lg: (1024px+)</span>
              </div>
              <div class="breakpoint">
                <span class="breakpoint-name">대형 화면</span>
                <span class="breakpoint-size">xl: (1280px+)</span>
              </div>
            </div>
          </div>
          <div class="responsive-card">
            <h3>반응형 예시</h3>
            <div class="responsive-demo">
              <div class="hidden sm:block text-green-600 mb-2">
                sm:block - 태블릿 이상에서만 표시
              </div>
              <div class="block sm:hidden text-blue-600 mb-2">sm:hidden - 모바일에서만 표시</div>
              <div class="text-lg lg:text-xl xl:text-2xl">반응형 텍스트 크기</div>
            </div>
          </div>
        </div>
      </section>

      <!-- 코드 예시 -->
      <section class="section">
        <h2 class="section-title">코드 예시</h2>
        <div class="code-example">
          <h3>tailwind.config.js</h3>
          <pre><code>module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // 브랜드 색상
        brand: {
          1: '#1C4025',
          2: '#285934',
          3: '#68A63C',
          4: '#68A63C',
          5: '#F2F2F2',
        },
        // 상태 색상
        status: {
          1: '#0D8CE7',
          2: '#DC3545',
        },
        // 텍스트 색상
        text: {
          1: '#6B7280',
          2: '#555555',
          3: '#FFFFFF',
        },
        // 배경 색상
        bg: {
          1: '#F2F2F2',
          2: '#FFFFFF',
        },
      },
      screens: {
        // 커스텀 breakpoint 설정
        app: { max: '1023px' }, // 1024px 미만 (모바일/태블릿)
        desktop: '1024px', // 1024px 이상 (데스크톱)
      },
    },
  },
  plugins: [],
}</code></pre>
        </div>
      </section>

      <!-- 사용 예시 -->
      <section class="section">
        <h2 class="section-title">사용 예시</h2>
        <div class="examples-grid">
          <div class="example-card">
            <h3>버튼 스타일링</h3>
            <div class="example-content">
              <div class="button-demo">
                <div class="button-group">
                  <div class="button-item">
                    <button class="button-primary">
                      <span class="button-icon">✓</span>
                      기본 버튼
                    </button>
                    <div class="button-info">
                      <span class="button-class">bg-brand-3</span>
                      <span class="button-size">200x50px</span>
                    </div>
                  </div>
                  <div class="button-item">
                    <button class="button-outline">
                      <span class="button-icon">→</span>
                      아웃라인 버튼
                    </button>
                    <div class="button-info">
                      <span class="button-class">border-brand-1</span>
                      <span class="button-size">83x38px</span>
                    </div>
                  </div>
                  <div class="button-item">
                    <button class="button-ghost">
                      <span class="button-icon">⚙</span>
                      고스트 버튼
                    </button>
                    <div class="button-info">
                      <span class="button-class">text-brand-1</span>
                      <span class="button-size">120x40px</span>
                    </div>
                  </div>
                </div>
                <div class="button-variants">
                  <div class="variant-item">
                    <button class="variant-small">작은 버튼</button>
                    <span class="variant-label">Small</span>
                  </div>
                  <div class="variant-item">
                    <button class="variant-medium">중간 버튼</button>
                    <span class="variant-label">Medium</span>
                  </div>
                  <div class="variant-item">
                    <button class="variant-large">큰 버튼</button>
                    <span class="variant-label">Large</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="example-card">
            <h3>카드 스타일링</h3>
            <div class="example-content">
              <div class="card-demo">
                <div class="card-header">
                  <h4 class="card-title">카드 제목</h4>
                  <div class="card-badge">New</div>
                </div>
                <div class="card-body">
                  <p class="card-description">
                    카드 내용이 여기에 표시됩니다. 이 카드는 Tailwind CSS 클래스들을 사용하여
                    스타일링되었습니다.
                  </p>
                  <div class="card-features">
                    <span class="feature-tag">bg-gray-50</span>
                    <span class="feature-tag">p-4</span>
                    <span class="feature-tag">rounded-lg</span>
                  </div>
                </div>
                <div class="card-footer">
                  <button class="card-button-secondary">취소</button>
                  <button class="card-button-primary">확인</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 모범 사례 -->
      <section class="section">
        <h2 class="section-title">모범 사례</h2>
        <div class="best-practices">
          <div class="practice-card good-practices">
            <div class="practice-header">
              <div class="practice-icon">✅</div>
              <h3>권장사항</h3>
            </div>
            <div class="practice-content">
              <div class="practice-item">
                <div class="practice-badge good">Good</div>
                <div class="practice-text">
                  <strong>브랜드 색상 변수 사용</strong>
                  <span class="practice-example">bg-brand-1, text-brand-2</span>
                </div>
              </div>
              <div class="practice-item">
                <div class="practice-badge good">Good</div>
                <div class="practice-text">
                  <strong>반응형 클래스 조합</strong>
                  <span class="practice-example">sm:block md:hidden lg:flex</span>
                </div>
              </div>
              <div class="practice-item">
                <div class="practice-badge good">Good</div>
                <div class="practice-text">
                  <strong>일관된 간격 사용</strong>
                  <span class="practice-example">p-4, m-2, gap-6</span>
                </div>
              </div>
              <div class="practice-item">
                <div class="practice-badge good">Good</div>
                <div class="practice-text">
                  <strong>커스텀 크기 클래스 활용</strong>
                  <span class="practice-example">w-50, h-12.5</span>
                </div>
              </div>
            </div>
          </div>

          <div class="practice-card bad-practices">
            <div class="practice-header">
              <div class="practice-icon">❌</div>
              <h3>피해야 할 것</h3>
            </div>
            <div class="practice-content">
              <div class="practice-item">
                <div class="practice-badge bad">Bad</div>
                <div class="practice-text">
                  <strong>인라인 스타일 사용</strong>
                  <span class="practice-example">style="color: #1c4025"</span>
                </div>
              </div>
              <div class="practice-item">
                <div class="practice-badge bad">Bad</div>
                <div class="practice-text">
                  <strong>하드코딩된 색상 값</strong>
                  <span class="practice-example">bg-[#1c4025]</span>
                </div>
              </div>
              <div class="practice-item">
                <div class="practice-badge bad">Bad</div>
                <div class="practice-text">
                  <strong>과도한 중첩 클래스</strong>
                  <span class="practice-example">p-4 m-2 bg-red-500 text-white...</span>
                </div>
              </div>
              <div class="practice-item">
                <div class="practice-badge bad">Bad</div>
                <div class="practice-text">
                  <strong>일관성 없는 간격 사용</strong>
                  <span class="practice-example">p-2, m-8, gap-1</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 인터랙티브 데모 -->
      <section class="section">
        <h2 class="section-title">인터랙티브 데모</h2>
        <div class="demo-grid">
          <div class="demo-card interactive-demo">
            <div class="demo-header">
              <div class="demo-icon">🎨</div>
              <h3>색상 데모</h3>
            </div>
            <div class="demo-content">
              <div class="color-demo-item">
                <div class="color-preview bg-brand-1">
                  <span class="color-label">bg-brand-1</span>
                </div>
                <div class="color-details">
                  <span class="color-hex">#1c4025</span>
                  <span class="color-usage">배경색</span>
                </div>
              </div>
              <div class="color-demo-item">
                <div class="color-preview bg-brand-2">
                  <span class="color-label">bg-brand-2</span>
                </div>
                <div class="color-details">
                  <span class="color-hex">#285934</span>
                  <span class="color-usage">보조 배경색</span>
                </div>
              </div>
              <div class="color-demo-item">
                <div class="color-preview bg-brand-3">
                  <span class="color-label">bg-brand-3</span>
                </div>
                <div class="color-details">
                  <span class="color-hex">#68a63c</span>
                  <span class="color-usage">강조색</span>
                </div>
              </div>
            </div>
          </div>

          <div class="demo-card interactive-demo">
            <div class="demo-header">
              <div class="demo-icon">📏</div>
              <h3>간격 데모</h3>
            </div>
            <div class="demo-content">
              <div class="spacing-demo-item">
                <div class="spacing-box p-2 bg-blue-100 rounded"></div>
                <div class="spacing-info">
                  <span class="spacing-class">p-2</span>
                  <span class="spacing-size">8px</span>
                </div>
              </div>
              <div class="spacing-demo-item">
                <div class="spacing-box p-4 bg-green-100 rounded"></div>
                <div class="spacing-info">
                  <span class="spacing-class">p-4</span>
                  <span class="spacing-size">16px</span>
                </div>
              </div>
              <div class="spacing-demo-item">
                <div class="spacing-box p-6 bg-red-100 rounded"></div>
                <div class="spacing-info">
                  <span class="spacing-class">p-6</span>
                  <span class="spacing-size">24px</span>
                </div>
              </div>
            </div>
          </div>

          <div class="demo-card interactive-demo">
            <div class="demo-header">
              <div class="demo-icon">📱</div>
              <h3>반응형 데모</h3>
            </div>
            <div class="demo-content">
              <div class="responsive-demo-item">
                <div
                  class="responsive-text text-sm md:text-base lg:text-lg xl:text-xl text-gray-800"
                >
                  반응형 텍스트 크기
                </div>
                <div class="responsive-info">
                  <span class="responsive-breakpoint">sm → md → lg → xl</span>
                </div>
              </div>
              <div class="responsive-demo-item">
                <div class="visibility-demo">
                  <div class="hidden md:block text-green-600 text-sm">md 이상에서만 표시</div>
                  <div class="block md:hidden text-blue-600 text-sm">md 미만에서만 표시</div>
                </div>
                <div class="responsive-info">
                  <span class="responsive-breakpoint">반응형 표시/숨김</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
// Tailwind CSS 가이드 페이지
</script>

<style scoped>
.tailwind-guide {
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
  margin: 0 0 20px 0;
  color: #2c3e50;
  font-size: 16px;
  line-height: 1.6;
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
  transition: all 0.2s;
}

.feature-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
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

.colors-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}

.color-card {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.2s;
}

.color-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.color-card h3 {
  color: #2c3e50;
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 20px;
  font-family: 'Roboto', sans-serif;
  letter-spacing: 0.2px;
  line-height: 1.3;
}

.color-swatches {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.color-swatch {
  display: flex;
  align-items: center;
  gap: 12px;
}

.swatch {
  width: 40px;
  height: 40px;
  border-radius: 6px;
  border: 2px solid #e0e0e0;
}

.color-info {
  flex: 1;
}

.color-name {
  font-weight: 600;
  color: #2c3e50;
  margin: 0 0 4px 0;
  font-size: 14px;
}

.color-value {
  color: #7f8c8d;
  margin: 0 0 4px 0;
  font-size: 12px;
}

.color-class {
  color: #3498db;
  margin: 0;
  font-size: 12px;
}

.utilities-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 24px;
}

.utility-card {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.2s;
}

.utility-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.utility-card h3 {
  color: #2c3e50;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 16px;
  font-family: 'Roboto', sans-serif;
}

.utility-examples {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.utility-example {
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  overflow: hidden;
}

.example-preview {
  padding: 12px;
  background: #f8f9fa;
}

.example-code {
  background: #2c3e50;
  color: #ecf0f1;
  padding: 8px 12px;
  margin: 0;
  font-family: 'Courier New', monospace;
  font-size: 12px;
}

.responsive-examples {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}

.responsive-card {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.2s;
}

.responsive-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.responsive-card h3 {
  color: #2c3e50;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 16px;
  font-family: 'Roboto', sans-serif;
}

.breakpoints {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.breakpoint {
  display: flex;
  justify-content: space-between;
  padding: 8px 12px;
  background: #f8f9fa;
  border-radius: 4px;
}

.breakpoint-name {
  font-weight: 600;
  color: #2c3e50;
}

.breakpoint-size {
  color: #7f8c8d;
  font-size: 12px;
  font-family: 'Courier New', monospace;
}

.responsive-demo {
  padding: 16px;
  background: #f8f9fa;
  border-radius: 6px;
}

.examples-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}

.example-card {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.2s;
}

.example-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.example-card h3 {
  color: #2c3e50;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 16px;
  font-family: 'Roboto', sans-serif;
}

.example-content {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.best-practices {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}

.practice-card {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.2s;
}

.practice-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.practice-card h3 {
  color: #2c3e50;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 16px;
  font-family: 'Roboto', sans-serif;
}

.practice-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.practice-list li {
  padding: 8px 0;
  border-bottom: 1px solid #f0f0f0;
  color: #2c3e50;
  font-size: 14px;
}

.practice-list li:last-child {
  border-bottom: none;
}

.good-practices {
  border-left: 4px solid #27ae60;
}

.bad-practices {
  border-left: 4px solid #e74c3c;
}

.practice-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 1px solid #e9ecef;
}

.practice-icon {
  font-size: 24px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #f8f9fa;
}

.good-practices .practice-icon {
  background: rgba(39, 174, 96, 0.1);
  color: #27ae60;
}

.bad-practices .practice-icon {
  background: rgba(231, 76, 60, 0.1);
  color: #e74c3c;
}

.practice-header h3 {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: #2c3e50;
}

.practice-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.practice-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px;
  background: #f8f9fa;
  border-radius: 8px;
  transition: all 0.2s;
}

.practice-item:hover {
  background: #e9ecef;
  transform: translateX(4px);
}

.practice-badge {
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  min-width: 40px;
  text-align: center;
}

.practice-badge.good {
  background: #27ae60;
  color: white;
}

.practice-badge.bad {
  background: #e74c3c;
  color: white;
}

.practice-text {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
}

.practice-text strong {
  color: #2c3e50;
  font-size: 14px;
  font-weight: 600;
}

.practice-example {
  color: #6c757d;
  font-size: 12px;
  font-family: 'Courier New', monospace;
  background: #e9ecef;
  padding: 2px 6px;
  border-radius: 4px;
  display: inline-block;
  margin-top: 2px;
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

.demo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
}

.demo-card {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.2s;
}

.demo-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.demo-card h3 {
  color: #2c3e50;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 16px;
  font-family: 'Roboto', sans-serif;
}

.demo-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.spacing-demo-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: #f8f9fa;
  border-radius: 8px;
  margin-bottom: 8px;
  transition: all 0.2s;
}

.spacing-demo-item:hover {
  background: #e9ecef;
  transform: translateX(4px);
}

.spacing-box {
  min-width: 60px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  color: #2c3e50;
}

.spacing-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.spacing-class {
  font-weight: 600;
  color: #3498db;
  font-size: 14px;
}

.spacing-size {
  color: #7f8c8d;
  font-size: 12px;
}

.responsive-demo-item {
  padding: 12px;
  background: #f8f9fa;
  border-radius: 8px;
  margin-bottom: 8px;
  transition: all 0.2s;
}

.responsive-demo-item:hover {
  background: #e9ecef;
  transform: translateX(4px);
}

.responsive-text {
  font-weight: 600;
  margin-bottom: 8px;
  text-align: center;
}

.responsive-info {
  text-align: center;
}

.responsive-breakpoint {
  color: #7f8c8d;
  font-size: 12px;
  font-weight: 500;
}

.visibility-demo {
  margin-bottom: 8px;
  text-align: center;
}

.card-demo {
  background: #f8f9fa;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #e9ecef;
}

.card-header {
  background: #ffffff;
  padding: 16px 20px;
  border-bottom: 1px solid #e9ecef;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-title {
  font-size: 18px;
  font-weight: 600;
  color: #2c3e50;
  margin: 0;
}

.card-badge {
  background: #3498db;
  color: white;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.card-body {
  padding: 20px;
  background: #ffffff;
}

.card-description {
  color: #6c757d;
  font-size: 14px;
  line-height: 1.5;
  margin: 0 0 16px 0;
}

.card-features {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
}

.feature-tag {
  background: #e9ecef;
  color: #495057;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 500;
  font-family: 'Courier New', monospace;
}

.card-footer {
  background: #f8f9fa;
  padding: 16px 20px;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  border-top: 1px solid #e9ecef;
}

.card-button-secondary {
  background: transparent;
  color: #6c757d;
  border: 1px solid #dee2e6;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.card-button-secondary:hover {
  background: #f8f9fa;
  border-color: #adb5bd;
}

.card-button-primary {
  background: #3498db;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.card-button-primary:hover {
  background: #2980b9;
}

.button-demo {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.button-group {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.button-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px;
  background: #f8f9fa;
  border-radius: 8px;
}

.button-primary {
  background: #68a63c;
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 200px;
  justify-content: center;
}

.button-primary:hover {
  background: #285934;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(104, 166, 60, 0.3);
}

.button-outline {
  background: transparent;
  color: #1c4025;
  border: 2px solid #1c4025;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 6px;
  min-width: 160px;
  justify-content: center;
}

.button-outline:hover {
  background: #1c4025;
  color: white;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(28, 64, 37, 0.3);
}

.button-ghost {
  background: transparent;
  color: #68a63c;
  border: none;
  padding: 10px 18px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 6px;
  min-width: 140px;
  justify-content: center;
}

.button-ghost:hover {
  background: rgba(104, 166, 60, 0.1);
  transform: translateY(-1px);
}

.button-icon {
  font-size: 12px;
  font-weight: bold;
}

.button-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
}

.button-class {
  font-weight: 600;
  color: #3498db;
  font-size: 12px;
  font-family: 'Courier New', monospace;
}

.button-size {
  color: #7f8c8d;
  font-size: 11px;
}

.button-variants {
  display: flex;
  gap: 16px;
  justify-content: center;
  padding: 16px;
  background: #f8f9fa;
  border-radius: 8px;
}

.variant-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.variant-small {
  background: #3498db;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.variant-small:hover {
  background: #2980b9;
  transform: translateY(-1px);
}

.variant-medium {
  background: #3498db;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.variant-medium:hover {
  background: #2980b9;
  transform: translateY(-1px);
}

.variant-large {
  background: #3498db;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.variant-large:hover {
  background: #2980b9;
  transform: translateY(-1px);
}

.variant-label {
  font-size: 11px;
  color: #7f8c8d;
  font-weight: 500;
}

.interactive-demo {
  border-left: 4px solid #3498db;
}

.demo-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 1px solid #e9ecef;
}

.demo-icon {
  font-size: 24px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: rgba(52, 152, 219, 0.1);
  color: #3498db;
}

.demo-header h3 {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: #2c3e50;
}

.color-demo-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: #f8f9fa;
  border-radius: 8px;
  margin-bottom: 8px;
  transition: all 0.2s;
}

.color-demo-item:hover {
  background: #e9ecef;
  transform: translateX(4px);
}

.color-preview {
  width: 80px;
  height: 50px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.color-label {
  color: white;
  font-size: 11px;
  font-weight: 600;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  font-family: 'Courier New', monospace;
}

.color-details {
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
}

.color-hex {
  font-weight: 600;
  color: #2c3e50;
  font-size: 12px;
  font-family: 'Courier New', monospace;
}

.color-usage {
  color: #7f8c8d;
  font-size: 11px;
}

@media (max-width: 768px) {
  .tailwind-guide {
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

  .utilities-grid,
  .colors-grid,
  .responsive-examples,
  .examples-grid,
  .best-practices,
  .demo-grid {
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
