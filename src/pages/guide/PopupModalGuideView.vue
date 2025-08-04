<template>
  <div class="popup-modal-guide">
    <div class="container">
      <h1 class="page-title">PopupModal 컴포넌트 가이드</h1>

      <!-- 컴포넌트 개요 -->
      <section class="section">
        <h2 class="section-title">컴포넌트 개요</h2>
        <div class="overview">
          <p>
            PopupModal 컴포넌트는 사용자에게 확인이나 선택을 요구하는 모달 팝업을 제공합니다.
            깔끔하고 직관적인 디자인으로 제작되었으며, 확인/취소 기능을 포함한 다양한 커스터마이징
            옵션을 제공합니다.
          </p>
        </div>
      </section>

      <!-- 컴포넌트 예시 -->
      <section class="section">
        <h2 class="section-title">컴포넌트 예시</h2>
        <div class="modal-examples">
          <div class="modal-example">
            <h3>기본 모달</h3>
            <button class="demo-button primary" @click="showBasicModal">기본 모달 열기</button>
            <p class="description">기본적인 확인/취소 모달 (기본 텍스트 사용)</p>
          </div>
          <div class="modal-example">
            <h3>커스텀 텍스트 모달</h3>
            <button class="demo-button secondary" @click="showCustomModal">커스텀 모달 열기</button>
            <p class="description">사용자 정의 제목, 메시지, 버튼 텍스트</p>
          </div>
          <div class="modal-example">
            <h3>삭제 확인 모달</h3>
            <button class="demo-button danger" @click="showDeleteModal">삭제 확인 모달 열기</button>
            <p class="description">삭제 작업 전 확인을 위한 모달</p>
          </div>
        </div>
      </section>

      <!-- 코드 예시 -->
      <section class="section">
        <h2 class="section-title">코드 예시</h2>
        <div class="code-example">
          <h3>기본 사용법</h3>
          <pre><code>&lt;template&gt;
  &lt;button @click="showModal = true"&gt;모달 열기&lt;/button&gt;

  &lt;PopupModal
    :is-visible="showModal"
    @cancel="handleCancel"
    @confirm="handleConfirm"
    @close="showModal = false"
  /&gt;
&lt;/template&gt;

&lt;script setup&gt;
import { ref } from 'vue'
import PopupModal from '@/components/common/PopupModal.vue'

const showModal = ref(false)

const handleCancel = () => {
  console.log('취소됨')
}

const handleConfirm = () => {
  console.log('확인됨')
}
&lt;/script&gt;</code></pre>
        </div>
        <div class="code-example">
          <h3>커스텀 텍스트 사용</h3>
          <pre><code>&lt;template&gt;
  &lt;PopupModal
    :is-visible="showModal"
    title="정말 삭제하시겠습니까?"
    message="이 작업은 되돌릴 수 없습니다."
    cancel-text="취소"
    confirm-text="삭제"
    @cancel="handleCancel"
    @confirm="handleConfirm"
    @close="showModal = false"
  /&gt;
&lt;/template&gt;

&lt;script setup&gt;
import { ref } from 'vue'
import PopupModal from '@/components/common/PopupModal.vue'

const showModal = ref(false)

const handleCancel = () => {
  console.log('삭제 취소')
}

const handleConfirm = () => {
  console.log('삭제 확인')
}
&lt;/script&gt;</code></pre>
        </div>
        <div class="code-example">
          <h3>배경 클릭 비활성화</h3>
          <pre><code>&lt;template&gt;
  &lt;PopupModal
    :is-visible="showModal"
    :close-on-overlay="false"
    title="중요한 확인"
    message="배경 클릭으로 닫을 수 없습니다."
    @confirm="handleConfirm"
    @close="showModal = false"
  /&gt;
&lt;/template&gt;

&lt;script setup&gt;
import { ref } from 'vue'
import PopupModal from '@/components/common/PopupModal.vue'

const showModal = ref(false)

const handleConfirm = () => {
  showModal.value = false
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
                <td>isVisible</td>
                <td>Boolean</td>
                <td>false</td>
                <td>모달 표시 여부</td>
              </tr>
              <tr>
                <td>title</td>
                <td>String</td>
                <td>'최종 확인'</td>
                <td>모달 제목 텍스트</td>
              </tr>
              <tr>
                <td>message</td>
                <td>String</td>
                <td>'멘트'</td>
                <td>모달 내용 텍스트</td>
              </tr>
              <tr>
                <td>cancelText</td>
                <td>String</td>
                <td>'취소하기'</td>
                <td>취소 버튼 텍스트</td>
              </tr>
              <tr>
                <td>confirmText</td>
                <td>String</td>
                <td>'돌아가기'</td>
                <td>확인 버튼 텍스트</td>
              </tr>
              <tr>
                <td>closeOnOverlay</td>
                <td>Boolean</td>
                <td>true</td>
                <td>배경 클릭 시 모달 닫기 여부</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- Events 문서 -->
      <section class="section">
        <h2 class="section-title">Events 문서</h2>
        <div class="table-container">
          <table class="docs-table">
            <thead>
              <tr>
                <th>Event</th>
                <th>설명</th>
                <th>사용 예시</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>@cancel</td>
                <td>취소 버튼 클릭 시 발생</td>
                <td>모달 닫기, 작업 취소 처리</td>
              </tr>
              <tr>
                <td>@confirm</td>
                <td>확인 버튼 클릭 시 발생</td>
                <td>작업 실행, 데이터 저장</td>
              </tr>
              <tr>
                <td>@close</td>
                <td>모달이 닫힐 때 발생</td>
                <td>상태 초기화, 후속 작업</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- 사용 팁 -->
      <section class="section">
        <h2 class="section-title">사용 팁</h2>
        <div class="tips">
          <div class="tip">
            <h3>✅ 권장사항</h3>
            <ul>
              <li>모달 제목은 간결하고 명확하게 작성하세요</li>
              <li>메시지는 사용자가 이해하기 쉽게 구체적으로 작성하세요</li>
              <li>버튼 텍스트는 액션을 명확히 표현하세요 (예: "삭제", "저장", "확인")</li>
              <li>중요한 작업의 경우 <code>closeOnOverlay="false"</code>를 사용하세요</li>
            </ul>
          </div>
          <div class="tip">
            <h3>⚠️ 주의사항</h3>
            <ul>
              <li>모달 내에서 다른 모달을 열지 마세요</li>
              <li>모달이 열려있을 때는 스크롤을 방지하는 것이 좋습니다</li>
              <li>키보드 접근성을 고려하여 ESC 키로 닫기 기능을 추가하는 것을 고려하세요</li>
            </ul>
          </div>
        </div>
      </section>
    </div>

    <!-- PopupModal 컴포넌트들 -->
    <PopupModal
      :is-visible="basicModalVisible"
      @cancel="handleBasicCancel"
      @confirm="handleBasicConfirm"
      @close="closeBasicModal"
    />

    <PopupModal
      :is-visible="customModalVisible"
      title="커스텀 모달"
      message="이것은 사용자 정의 텍스트가 포함된 모달입니다."
      cancel-text="취소"
      confirm-text="확인"
      @cancel="handleCustomCancel"
      @confirm="handleCustomConfirm"
      @close="closeCustomModal"
    />

    <PopupModal
      :is-visible="deleteModalVisible"
      title="정말 삭제하시겠습니까?"
      message="이 작업은 되돌릴 수 없습니다. 삭제된 데이터는 복구할 수 없습니다."
      cancel-text="취소"
      confirm-text="삭제"
      @cancel="handleDeleteCancel"
      @confirm="handleDeleteConfirm"
      @close="closeDeleteModal"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import PopupModal from '@/components/common/PopupModal.vue'

// 모달 상태 관리
const basicModalVisible = ref(false)
const customModalVisible = ref(false)
const deleteModalVisible = ref(false)

// 기본 모달
const showBasicModal = () => {
  basicModalVisible.value = true
}

const closeBasicModal = () => {
  basicModalVisible.value = false
}

const handleBasicCancel = () => {
  console.log('기본 모달 취소')
}

const handleBasicConfirm = () => {
  console.log('기본 모달 확인')
}

// 커스텀 모달
const showCustomModal = () => {
  customModalVisible.value = true
}

const closeCustomModal = () => {
  customModalVisible.value = false
}

const handleCustomCancel = () => {
  console.log('커스텀 모달 취소')
}

const handleCustomConfirm = () => {
  console.log('커스텀 모달 확인')
}

// 삭제 모달
const showDeleteModal = () => {
  deleteModalVisible.value = true
}

const closeDeleteModal = () => {
  deleteModalVisible.value = false
}

const handleDeleteCancel = () => {
  console.log('삭제 취소')
}

const handleDeleteConfirm = () => {
  console.log('삭제 확인 - 실제 삭제 작업 수행')
}
</script>
<style scoped>
.popup-modal-guide {
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

.modal-examples {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 24px;
  justify-items: center;
}

.modal-example {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 100%;
  max-width: 320px;
}

.modal-example h3 {
  color: #2c3e50;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 16px;
  font-family: 'Roboto', sans-serif;
}

.demo-button {
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Roboto', sans-serif;
  margin-bottom: 16px;
}

.demo-button.primary {
  background: var(--brand-3);
  color: white;
}

.demo-button.primary:hover {
  background: var(--brand-2);
  transform: translateY(-2px);
}

.demo-button.secondary {
  background: var(--status-1);
  color: white;
}

.demo-button.secondary:hover {
  background: #0b7bc7;
  transform: translateY(-2px);
}

.demo-button.danger {
  background: #e53950;
  color: white;
}

.demo-button.danger:hover {
  background: #d32f2f;
  transform: translateY(-2px);
}

.description {
  margin-top: 12px;
  font-size: 14px;
  color: #7f8c8d;
  line-height: 1.4;
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

.tips {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 24px;
  justify-items: center;
}

.tip {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 320px;
}

.tip h3 {
  color: #2c3e50;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 16px;
  font-family: 'Roboto', sans-serif;
}

.tip ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.tip li {
  color: #7f8c8d;
  font-size: 14px;
  line-height: 1.6;
  margin-bottom: 8px;
  font-family: 'Roboto', sans-serif;
  padding-left: 16px;
  position: relative;
}

.tip li::before {
  content: '•';
  color: var(--brand-3);
  font-weight: bold;
  position: absolute;
  left: 0;
}

.tip code {
  background: #e9ecef;
  color: #495057;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
  font-size: 13px;
}

@media (max-width: 768px) {
  .popup-modal-guide {
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

  .modal-examples {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .tips {
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
