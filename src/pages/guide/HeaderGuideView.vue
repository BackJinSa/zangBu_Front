<template>
  <div class="header-guide">
    <div class="container">
      <h1 class="page-title">Header 컴포넌트 가이드</h1>

      <!-- 컴포넌트 예시 -->
      <section class="section">
        <h2 class="section-title">컴포넌트 예시</h2>
        <div class="header-demo">
          <Header />
        </div>
      </section>

      <!-- 반응형 데모 -->
      <section class="section">
        <h2 class="section-title">반응형 레이아웃</h2>
        <div class="responsive-demo">
          <div class="demo-tabs">
            <button
              @click="activeTab = 'desktop'"
              :class="['tab-button', { active: activeTab === 'desktop' }]"
            >
              데스크톱 (1024px+)
            </button>
            <button
              @click="activeTab = 'mobile'"
              :class="['tab-button', { active: activeTab === 'mobile' }]"
            >
              모바일 (1024px 미만)
            </button>
          </div>

          <div class="demo-preview">
            <div class="preview-container">
              <div class="preview-frame-container">
                <div class="preview-frame" :class="frameClass">
                  <Header />
                </div>
              </div>
            </div>
            <div class="preview-info">
              <h3>{{ previewTitle }}</h3>
              <div class="screen-info">
                <p><strong>화면 크기:</strong> {{ screenSize }}</p>
                <p><strong>헤더 높이:</strong> {{ headerHeight }}</p>
                <p><strong>주요 특징:</strong></p>
              </div>
              <ul>
                <li v-for="feature in previewFeatures" :key="feature">{{ feature }}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- 실제 반응형 테스트 -->
      <section class="section">
        <h2 class="section-title">실제 반응형 테스트</h2>
        <div class="live-responsive-demo">
          <div class="demo-instructions">
            <h3>실시간 반응형 확인</h3>
            <p>
              아래 Header 컴포넌트는 실제로 반응형으로 동작합니다. 브라우저 창 크기를 조절해보세요:
            </p>
            <ul>
              <li><strong>1024px 이상:</strong> 데스크톱 레이아웃 (전체 기능 표시)</li>
              <li><strong>1024px 미만:</strong> 모바일 레이아웃 (컴팩트 헤더 + 사이드 메뉴)</li>
            </ul>
          </div>
          <div class="live-header-container">
            <Header />
          </div>
        </div>
      </section>

      <!-- 코드 예시 -->
      <section class="section">
        <h2 class="section-title">코드 예시</h2>
        <div class="code-example">
          <h3>기본 사용법</h3>
          <pre><code>&lt;template&gt;
  &lt;Header /&gt;
&lt;/template&gt;

&lt;script setup&gt;
import Header from '@/components/common/Header.vue'
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
                <td>사용자 정의 props 없음</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>현재 버전에서는 props 없이 사용</td>
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
                <td>logout</td>
                <td>로그아웃 버튼 클릭</td>
                <td>-</td>
                <td>로그아웃 버튼 클릭 시 발생</td>
              </tr>
              <tr>
                <td>search</td>
                <td>검색 입력</td>
                <td>searchQuery (String)</td>
                <td>검색 입력 시 발생 (향후 구현 예정)</td>
              </tr>
              <tr>
                <td>navigation</td>
                <td>네비게이션 링크 클릭</td>
                <td>route (String)</td>
                <td>네비게이션 링크 클릭 시 발생 (향후 구현 예정)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- 이벤트 핸들러 -->
      <section class="section">
        <h2 class="section-title">이벤트 핸들러</h2>
        <div class="code-example">
          <h3>이벤트 처리 예시</h3>
          <pre><code>const handleLogout = () => {
  // 로그아웃 로직 구현
  console.log('로그아웃 처리')

  // 사용자 상태 초기화
  userStore.logout()

  // 로그인 페이지로 이동
  router.push('/auth/login')
}

const handleSearch = (query) => {
  console.log('검색:', query)
  // 검색 로직 구현
  searchProperties(query)
}

const handleNavigation = (route) => {
  console.log('네비게이션:', route)
  // 페이지 이동
  router.push(route)
}</code></pre>
        </div>
      </section>

      <!-- 주요 기능 -->
      <section class="section">
        <h2 class="section-title">주요 기능</h2>
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon">
              <i class="fas fa-search"></i>
            </div>
            <h3>검색 기능</h3>
            <p>지역, 매물명, 지하철역으로 검색 가능한 통합 검색창</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">
              <i class="fas fa-mobile-alt"></i>
            </div>
            <h3>반응형 디자인</h3>
            <p>1024px 기준으로 데스크톱과 모바일 레이아웃 자동 전환</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">
              <i class="fas fa-route"></i>
            </div>
            <h3>네비게이션</h3>
            <p>지도, 채팅, 알림, 거래, 마이페이지로의 빠른 이동</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">
              <i class="fas fa-user"></i>
            </div>
            <h3>사용자 관리</h3>
            <p>사용자 프로필 표시 및 로그아웃 기능</p>
          </div>
        </div>
      </section>

      <!-- 스타일 가이드 -->
      <section class="section">
        <h2 class="section-title">스타일 가이드</h2>
        <div class="style-content">
          <div class="code-example">
            <h3>색상 팔레트</h3>
            <pre><code>// 브랜드 컬러
Brand-1: #1C4025 (주요 텍스트, 로고)
Brand-2: #285934 (버튼, 강조 요소)
Brand-3: #68A63C (액센트, 사용자 아바타)

// 텍스트 컬러
Text-1: #6B7280 (검색창 플레이스홀더)
Text-2: #555555 (일반 텍스트)

// 배경 컬러
Background: #FFFFFF (헤더 배경)
Search-BG: #F3F4F6 (검색창 배경)

// SVG 아이콘 컬러
Search-Icon: #555555
User-Icon: #000000</code></pre>
          </div>
          <div class="code-example">
            <h3>타이포그래피</h3>
            <pre><code>// 폰트 패밀리
Roboto: 네비게이션 링크, 사용자 이름
Inter: 검색창, 버튼 텍스트

// 폰트 크기
text-lg: 네비게이션 링크 (18px)
text-base: 검색창, 버튼 (16px)
text-sm: 사용자 이름 (14px)

// 반응형 폰트 크기
모바일: text-sm (14px)
데스크톱: text-base (16px)</code></pre>
          </div>
        </div>
      </section>

      <!-- 인터랙티브 데모 -->
      <section class="section">
        <h2 class="section-title">인터랙티브 데모</h2>
        <div class="demo-container">
          <Header />
        </div>
        <div v-if="lastEvent" class="event-log">
          <p>
            마지막 이벤트: <strong>{{ lastEvent }}</strong>
          </p>
        </div>
        <div class="demo-instructions">
          <h3>데모 사용법</h3>
          <ul>
            <li>검색창에 텍스트를 입력해보세요</li>
            <li>네비게이션 링크를 클릭해보세요</li>
            <li>로그아웃 버튼을 클릭해보세요</li>
            <li>모바일에서는 검색 버튼과 메뉴 버튼을 클릭해보세요</li>
            <li>브라우저 창 크기를 조절하여 반응형 동작을 확인해보세요</li>
          </ul>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import Header from '@/components/common/Header.vue'

const activeTab = ref('desktop')
const lastEvent = ref('')

// 반응형 프리뷰 데이터
const previewData = {
  desktop: {
    title: '데스크톱 레이아웃 (1024px+)',
    screenSize: '1024px 이상',
    headerHeight: '96px (h-24)',
    features: [
      '전체 너비 1536px, 최소 너비 1024px',
      '로고, 검색창, 네비게이션, 사용자 프로필이 한 줄에 배치',
      '검색창은 지역, 매물명, 지하철역으로 검색 가능',
      'SVG 아이콘 사용 (검색, 사용자 아이콘)',
      '네비게이션 링크에 호버 효과 적용',
      '사용자 프로필과 로그아웃 버튼 포함',
      '브랜드 컬러 시스템 적용',
      '모든 기능이 한 화면에 표시',
    ],
  },
  mobile: {
    title: '모바일 레이아웃 (1024px 미만)',
    screenSize: '1024px 미만',
    headerHeight: '64px (h-16)',
    features: [
      '컴팩트한 헤더 높이 (64px)',
      '로고와 액션 버튼만 표시',
      '검색 버튼 클릭 시 검색 오버레이 표시',
      '햄버거 메뉴 클릭 시 사이드 메뉴 표시',
      '사이드 메뉴에서 모든 네비게이션 접근',
      '사용자 프로필과 로그아웃 기능 포함',
      '터치 친화적인 버튼 크기',
      '공간 효율적인 레이아웃',
    ],
  },
}

// Computed properties
const frameClass = computed(() => {
  return {
    'desktop-frame': activeTab.value === 'desktop',
    'mobile-frame': activeTab.value === 'mobile',
  }
})

const previewTitle = computed(() => {
  return previewData[activeTab.value]?.title || '데스크톱 레이아웃'
})

const screenSize = computed(() => {
  return previewData[activeTab.value]?.screenSize || '1024px 이상'
})

const headerHeight = computed(() => {
  return previewData[activeTab.value]?.headerHeight || '96px'
})

const previewFeatures = computed(() => {
  return previewData[activeTab.value]?.features || []
})

// 이벤트 핸들러
const handleLogout = () => {
  lastEvent.value = '로그아웃 버튼 클릭'
  console.log('로그아웃 처리')
}

const handleSearch = (query) => {
  lastEvent.value = `검색: ${query}`
  console.log('검색:', query)
}

const handleNavigation = (route) => {
  lastEvent.value = `네비게이션: ${route}`
  console.log('네비게이션:', route)
}
</script>

<style scoped>
.header-guide {
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

/* Header demo */
.header-demo {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
}

/* Responsive demo */
.responsive-demo {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
}

.demo-tabs {
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
}

.tab-button {
  background: #f8f9fa;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  padding: 12px 20px;
  color: #7f8c8d;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.tab-button.active {
  background: #3498db;
  border-color: #3498db;
  color: white;
}

.tab-button:hover {
  border-color: #3498db;
}

.demo-preview {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.preview-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.preview-frame-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.preview-frame {
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  overflow: visible;
  background: white;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  min-height: 120px;
}

.desktop-frame {
  width: 1200px;
  height: 120px;
}

.mobile-frame {
  width: 600px;
  height: 80px;
}

/* 모바일에서 프레임 크기 조정 */
@media (max-width: 768px) {
  .desktop-frame,
  .mobile-frame {
    width: 100%;
    max-width: 100%;
    height: auto;
    min-height: 80px;
  }
}

/* 프레임 내부의 Header 컴포넌트 스타일 조정 */
.preview-frame :deep(header) {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 16px;
  gap: 16px;
}

.preview-logo {
  width: 80px;
  height: 20px;
  background: #1c4025;
  border-radius: 4px;
}

.preview-search {
  flex: 1;
  height: 16px;
  background: #f3f4f6;
  border-radius: 8px;
}

.preview-nav {
  display: flex;
  gap: 8px;
}

.nav-item {
  padding: 4px 8px;
  background: #68a63c;
  color: white;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
}

.preview-user {
  display: flex;
  align-items: center;
  gap: 8px;
}

.user-avatar {
  width: 16px;
  height: 16px;
  background: #68a63c;
  border-radius: 50%;
}

.user-name {
  font-size: 12px;
  color: #1c4025;
  font-weight: 500;
}

.logout-btn {
  padding: 4px 8px;
  background: #285934;
  color: white;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 500;
}

.preview-header-mobile {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
}

.preview-logo-mobile {
  width: 60px;
  height: 16px;
  background: #1c4025;
  border-radius: 4px;
}

.preview-actions {
  display: flex;
  gap: 8px;
}

.action-btn {
  width: 20px;
  height: 20px;
  background: #68a63c;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.menu-btn {
  flex-direction: column;
  gap: 2px;
  padding: 4px;
}

.hamburger-line {
  width: 12px;
  height: 2px;
  background: white;
  border-radius: 1px;
}

.preview-info {
  flex: 1;
}

.preview-info h3 {
  color: #2c3e50;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 16px;
  font-family: 'Roboto', sans-serif;
}

.preview-info ul {
  list-style: none;
  padding: 0;
}

.preview-info li {
  color: #7f8c8d;
  font-size: 14px;
  line-height: 1.6;
  margin-bottom: 8px;
  padding-left: 20px;
  position: relative;
  font-family: 'Roboto', sans-serif;
}

.preview-info li::before {
  content: '•';
  color: #3498db;
  position: absolute;
  left: 0;
  font-weight: bold;
}

/* Screen info styles */
.screen-info {
  background: #f8f9fa;
  border-radius: 6px;
  padding: 12px;
  margin-bottom: 16px;
  border-left: 3px solid #3498db;
}

.screen-info p {
  margin: 4px 0;
  color: #2c3e50;
  font-size: 14px;
  font-family: 'Roboto', sans-serif;
}

/* Responsive controls */

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

/* Features grid */
.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
}

.feature-card {
  background: white;
  border-radius: 8px;
  padding: 24px;
  text-align: center;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
}

.feature-card:hover {
  transform: translateY(-2px);
}

.feature-icon {
  width: 48px;
  height: 48px;
  background: #3498db;
  color: white;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
  font-size: 20px;
}

.feature-card h3 {
  color: #2c3e50;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 12px;
  font-family: 'Roboto', sans-serif;
}

.feature-card p {
  color: #7f8c8d;
  font-size: 14px;
  line-height: 1.5;
  font-family: 'Roboto', sans-serif;
}

/* Style content */
.style-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

/* Demo container */
.demo-container {
  background: white;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
}

.event-log {
  background: #e8f5e8;
  border: 1px solid #27ae60;
  border-radius: 8px;
  padding: 16px;
  text-align: center;
  margin-bottom: 20px;
}

.event-log p {
  margin: 0;
  color: #2c3e50;
  font-family: 'Roboto', sans-serif;
}

.demo-instructions {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 20px;
  border-left: 4px solid #3498db;
}

.demo-instructions h3 {
  color: #2c3e50;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 16px;
  font-family: 'Roboto', sans-serif;
}

.demo-instructions ul {
  list-style: none;
  padding: 0;
}

.demo-instructions li {
  color: #7f8c8d;
  font-size: 14px;
  line-height: 1.6;
  margin-bottom: 8px;
  padding-left: 20px;
  position: relative;
  font-family: 'Roboto', sans-serif;
}

.demo-instructions li::before {
  content: '•';
  color: #3498db;
  position: absolute;
  left: 0;
  font-weight: bold;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .header-guide {
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

  .demo-preview {
    flex-direction: column;
    gap: 24px;
  }

  .preview-container {
    flex-direction: column;
    gap: 24px;
  }

  .preview-container {
    width: 100%;
  }

  .preview-frame-container {
    width: 100%;
  }

  .desktop-frame,
  .mobile-frame {
    width: 100%;
    max-width: 100%;
    height: auto;
    min-height: 80px;
  }

  .preview-info {
    max-width: 100%;
    padding: 0 20px;
  }

  .demo-tabs {
    flex-wrap: wrap;
    gap: 8px;
  }

  .tab-button {
    font-size: 12px;
    padding: 8px 12px;
  }

  .control-buttons {
    flex-direction: column;
  }

  .control-btn {
    width: 100%;
    text-align: center;
  }

  .style-content {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .features-grid {
    grid-template-columns: 1fr;
    gap: 20px;
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
