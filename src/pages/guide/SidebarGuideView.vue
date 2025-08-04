<template>
  <div class="sidebar-guide">
    <div class="container">
      <h1 class="page-title">Sidebar 컴포넌트 가이드</h1>

      <!-- 컴포넌트 개요 -->
      <section class="section">
        <h2 class="section-title">컴포넌트 개요</h2>
        <div class="overview">
          <p>
            Sidebar 컴포넌트는 모바일 환경에서 사용되는 슬라이드 네비게이션 메뉴입니다.
            <br />타입 A와 타입 B 두 가지 스타일을 지원하며, 부드러운 애니메이션과 반응형 디자인을
            제공합니다.
          </p>
        </div>
      </section>

      <!-- 컴포넌트 예시 -->
      <section class="section">
        <h2 class="section-title">컴포넌트 예시</h2>
        <div class="sidebar-examples">
          <div class="sidebar-example">
            <h3>타입 A (메뉴 사이드바)</h3>
            <div class="demo-container">
              <Button variant="button1" @click="showTypeA = true">타입 A 열기</Button>
              <p class="description">지도, 채팅, 거래, 알림, 마이페이지 메뉴</p>
            </div>
          </div>
          <div class="sidebar-example">
            <h3>타입 B (계정 사이드바)</h3>
            <div class="demo-container">
              <Button variant="button2" @click="showTypeB = true">타입 B 열기</Button>
              <p class="description">로그인, 회원가입 메뉴</p>
            </div>
          </div>
          <div class="sidebar-example">
            <h3>커스텀 메뉴</h3>
            <div class="demo-container">
              <Button variant="button3" @click="showCustom = true">커스텀 메뉴 열기</Button>
              <p class="description">사용자 정의 메뉴 아이템</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 코드 예시 -->
      <section class="section">
        <h2 class="section-title">코드 예시</h2>
        <div class="code-example">
          <h3>기본 사용법</h3>
          <pre><code>&lt;template&gt;
  &lt;div&gt;
    &lt;Button @click="showSidebar = true"&gt;사이드바 열기&lt;/Button&gt;

    &lt;Sidebar
      type="A"
      :isOpen="showSidebar"
      @close="showSidebar = false"
      @menu-click="handleMenuClick"
    /&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script setup&gt;
import { ref } from 'vue'
import Sidebar from '@/components/common/Sidebar.vue'
import Button from '@/components/common/Button.vue'

const showSidebar = ref(false)

const handleMenuClick = (item) => {
  console.log('메뉴 클릭:', item)
  showSidebar.value = false
}
&lt;/script&gt;</code></pre>
        </div>
        <div class="code-example">
          <h3>커스텀 메뉴 아이템</h3>
          <pre><code>&lt;template&gt;
  &lt;Sidebar
    type="A"
    :isOpen="showSidebar"
    :customMenuItems="customMenuItems"
    @close="showSidebar = false"
    @menu-click="handleMenuClick"
  /&gt;
&lt;/template&gt;

&lt;script setup&gt;
import { ref } from 'vue'
import Sidebar from '@/components/common/Sidebar.vue'

const showSidebar = ref(false)

const customMenuItems = ref([
  { id: 'home', label: '홈', action: 'navigate' },
  { id: 'profile', label: '프로필', action: 'navigate' },
  { id: 'settings', label: '설정', action: 'navigate' },
  { id: 'logout', label: '로그아웃', action: 'logout' }
])

const handleMenuClick = (item) => {
  console.log('커스텀 메뉴 클릭:', item)
  showSidebar.value = false
}
&lt;/script&gt;</code></pre>
        </div>
        <div class="code-example">
          <h3>타입 B 사용법</h3>
          <pre><code>&lt;template&gt;
  &lt;Sidebar
    type="B"
    :isOpen="showAccountSidebar"
    @close="showAccountSidebar = false"
    @menu-click="handleAccountMenuClick"
  /&gt;
&lt;/template&gt;

&lt;script setup&gt;
import { ref } from 'vue'
import Sidebar from '@/components/common/Sidebar.vue'

const showAccountSidebar = ref(false)

const handleAccountMenuClick = (item) => {
  if (item.id === 'login') {
    // 로그인 처리
    console.log('로그인 페이지로 이동')
  } else if (item.id === 'signup') {
    // 회원가입 처리
    console.log('회원가입 페이지로 이동')
  }
  showAccountSidebar.value = false
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
                <th>Prop</th>
                <th>타입</th>
                <th>기본값</th>
                <th>설명</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>type</td>
                <td>String</td>
                <td>'A'</td>
                <td>사이드바 타입 ('A' 또는 'B')</td>
              </tr>
              <tr>
                <td>isOpen</td>
                <td>Boolean</td>
                <td>false</td>
                <td>사이드바 열림 상태</td>
              </tr>
              <tr>
                <td>customMenuItems</td>
                <td>Array</td>
                <td>[]</td>
                <td>커스텀 메뉴 아이템 배열</td>
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
                <th>이벤트</th>
                <th>발생 시점</th>
                <th>전달 데이터</th>
                <th>설명</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>close</td>
                <td>닫기 버튼 클릭 또는 배경 클릭</td>
                <td>없음</td>
                <td>사이드바 닫기 시 발생</td>
              </tr>
              <tr>
                <td>menu-click</td>
                <td>메뉴 아이템 클릭</td>
                <td>MenuItem 객체</td>
                <td>메뉴 아이템 클릭 시 발생</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- 타입별 상세 정보 -->
      <section class="section">
        <h2 class="section-title">타입별 상세 정보</h2>
        <div class="type-details">
          <div class="type-card">
            <h3>타입 A (메뉴 사이드바)</h3>
            <ul>
              <li><strong>크기:</strong> 320px x 화면 전체 높이</li>
              <li><strong>헤더:</strong> "메뉴"</li>
              <li><strong>기본 메뉴:</strong></li>
              <li class="menu-list">
                <ul>
                  <li>지도</li>
                  <li>채팅</li>
                  <li>거래</li>
                  <li>알림</li>
                  <li>마이페이지</li>
                </ul>
              </li>
              <li><strong>용도:</strong> 메인 네비게이션 메뉴</li>
            </ul>
          </div>
          <div class="type-card">
            <h3>타입 B (계정 사이드바)</h3>
            <ul>
              <li><strong>크기:</strong> 320px x 화면 전체 높이</li>
              <li><strong>헤더:</strong> "계정"</li>
              <li><strong>기본 메뉴:</strong></li>
              <li class="menu-list">
                <ul>
                  <li>로그인</li>
                  <li>회원가입</li>
                </ul>
              </li>
              <li><strong>용도:</strong> 계정 관련 메뉴</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- 인터랙티브 데모 -->
      <section class="section">
        <h2 class="section-title">인터랙티브 데모</h2>
        <div class="demo-section">
          <div class="demo-buttons">
            <Button variant="button1" @click="showTypeA = true">타입 A 열기</Button>
            <Button variant="button2" @click="showTypeB = true">타입 B 열기</Button>
            <Button variant="button3" @click="showCustom = true">커스텀 메뉴 열기</Button>
          </div>

          <div v-if="lastClickedMenu" class="demo-result">
            <p>
              마지막 클릭된 메뉴: <strong>{{ lastClickedMenu }}</strong>
            </p>
          </div>
        </div>
      </section>
    </div>

    <!-- 사이드바 컴포넌트들 -->
    <Sidebar
      type="A"
      :isOpen="showTypeA"
      @close="showTypeA = false"
      @menu-click="handleMenuClick"
    />

    <Sidebar
      type="B"
      :isOpen="showTypeB"
      @close="showTypeB = false"
      @menu-click="handleMenuClick"
    />

    <Sidebar
      type="A"
      :isOpen="showCustom"
      :customMenuItems="customMenuItems"
      @close="showCustom = false"
      @menu-click="handleCustomMenuClick"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Sidebar from '@/components/common/Sidebar.vue'
import Button from '@/components/common/Button.vue'

// 반응형 데이터
const showTypeA = ref(false)
const showTypeB = ref(false)
const showCustom = ref(false)
const lastClickedMenu = ref('')

// 커스텀 메뉴 아이템
const customMenuItems = ref([
  { id: 'dashboard', label: '대시보드', action: 'navigate' },
  { id: 'analytics', label: '분석', action: 'navigate' },
  { id: 'reports', label: '보고서', action: 'navigate' },
  { id: 'settings', label: '설정', action: 'navigate' },
  { id: 'help', label: '도움말', action: 'navigate' },
])

// 메서드들
const handleMenuClick = (item) => {
  lastClickedMenu.value = `${item.label} (${item.id})`
  console.log('메뉴 클릭:', item)

  // 사이드바 닫기
  if (showTypeA.value) showTypeA.value = false
  if (showTypeB.value) showTypeB.value = false
}

const handleCustomMenuClick = (item) => {
  lastClickedMenu.value = `커스텀: ${item.label} (${item.id})`
  console.log('커스텀 메뉴 클릭:', item)
  showCustom.value = false
}
</script>

<style scoped>
.sidebar-guide {
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
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 16px;
  font-family: 'Roboto', sans-serif;
}

.section {
  margin-bottom: 60px;
}

.section-title {
  color: #2c3e50;
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 24px;
  font-family: 'Roboto', sans-serif;
  border-bottom: 3px solid #3498db;
  padding-bottom: 8px;
}

.overview {
  background: white;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.overview p {
  color: #34495e;
  font-size: 16px;
  line-height: 1.6;
  margin: 0;
  font-family: 'Roboto', sans-serif;
}

.sidebar-examples {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}

.sidebar-example {
  background: white;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.sidebar-example h3 {
  color: #2c3e50;
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 16px;
  font-family: 'Roboto', sans-serif;
}

.demo-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.description {
  color: #7f8c8d;
  font-size: 14px;
  margin: 0;
  font-family: 'Roboto', sans-serif;
}

.code-example {
  background: white;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  margin-bottom: 24px;
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
  padding: 20px;
  border-radius: 8px;
  overflow-x: auto;
  font-family: 'Courier New', monospace;
  font-size: 14px;
  line-height: 1.5;
}

.code-example code {
  font-family: 'Courier New', monospace;
}

.table-container {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.docs-table {
  width: 100%;
  border-collapse: collapse;
}

.docs-table th {
  background: #3498db;
  color: white;
  padding: 16px;
  text-align: left;
  font-weight: 600;
  font-family: 'Roboto', sans-serif;
}

.docs-table td {
  padding: 16px;
  border-bottom: 1px solid #ecf0f1;
  font-family: 'Roboto', sans-serif;
}

.docs-table tr:hover {
  background: #f8f9fa;
}

.type-details {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 24px;
}

.type-card {
  background: white;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.type-card h3 {
  color: #2c3e50;
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 16px;
  font-family: 'Roboto', sans-serif;
}

.type-card ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.type-card li {
  color: #34495e;
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 8px;
  font-family: 'Roboto', sans-serif;
}

.menu-list ul {
  margin-left: 20px;
  margin-top: 8px;
}

.menu-list li {
  color: #7f8c8d;
  font-size: 14px;
  margin-bottom: 4px;
}

.demo-section {
  background: white;
  padding: 32px;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.demo-buttons {
  display: flex;
  gap: 16px;
  justify-content: center;
  margin-bottom: 24px;
  flex-wrap: wrap;
}

.demo-result {
  background: #d4edda;
  color: #155724;
  padding: 16px;
  border-radius: 8px;
  border: 1px solid #c3e6cb;
}

.demo-result p {
  margin: 0;
  font-family: 'Roboto', sans-serif;
}

/* 반응형 디자인 */
@media (max-width: 768px) {
  .sidebar-guide {
    padding: 20px 16px;
  }

  .page-title {
    font-size: 28px;
  }

  .section-title {
    font-size: 24px;
  }

  .sidebar-examples {
    grid-template-columns: 1fr;
  }

  .type-details {
    grid-template-columns: 1fr;
  }

  .demo-buttons {
    flex-direction: column;
    align-items: center;
  }

  .demo-buttons button {
    width: 100%;
    max-width: 300px;
  }
}
</style>
