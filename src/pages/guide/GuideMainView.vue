<template>
  <div class="guide-main">
    <div class="container">
      <h1 class="page-title">컴포넌트 가이드</h1>
      <p class="page-description">
        프로젝트에서 사용되는 주요 컴포넌트들의 사용법과 예시를 확인할 수 있습니다.
      </p>

      <div class="guides-grid">
        <!-- Color 가이드 -->
        <div class="guide-card" @click="navigateToGuide('color-guide')">
          <div class="guide-icon">
            <div class="color-palette">
              <div class="color-swatch" style="background-color: var(--brand-1)"></div>
              <div class="color-swatch" style="background-color: var(--brand-2)"></div>
              <div class="color-swatch" style="background-color: var(--brand-3)"></div>
              <div class="color-swatch" style="background-color: var(--status-1)"></div>
            </div>
          </div>
          <div class="guide-content">
            <h3 class="guide-title">Color 가이드</h3>
            <p class="guide-description">
              프로젝트에서 사용되는 색상 변수들과 사용법을 확인하세요.
            </p>
            <div class="guide-features">
              <span class="feature-tag">CSS 변수</span>
              <span class="feature-tag">Tailwind</span>
              <span class="feature-tag">브랜드 컬러</span>
            </div>
          </div>
          <div class="guide-arrow">
            <i class="fas fa-chevron-right"></i>
          </div>
        </div>

        <!-- PropertyCard 가이드 -->
        <div class="guide-card" @click="navigateToGuide('property-card-guide')">
          <div class="guide-icon">
            <div class="property-card-preview">
              <div class="preview-image"></div>
              <div class="preview-content">
                <div class="preview-title"></div>
                <div class="preview-price"></div>
              </div>
            </div>
          </div>
          <div class="guide-content">
            <h3 class="guide-title">PropertyCard 가이드</h3>
            <p class="guide-description">
              기존 PropertyCard 컴포넌트의 사용법과 이벤트 처리를 확인하세요.
            </p>
            <div class="guide-features">
              <span class="feature-tag">매물 카드</span>
              <span class="feature-tag">즐겨찾기</span>
              <span class="feature-tag">이벤트</span>
            </div>
          </div>
          <div class="guide-arrow">
            <i class="fas fa-chevron-right"></i>
          </div>
        </div>

        <!-- PropertyCardMain 가이드 -->
        <div class="guide-card" @click="navigateToGuide('property-card-main-guide')">
          <div class="guide-icon">
            <div class="property-card-main-preview">
              <div class="preview-image-main"></div>
              <div class="preview-heart"></div>
              <div class="preview-content-main">
                <div class="preview-title-main"></div>
                <div class="preview-price-main"></div>
                <div class="preview-rating"></div>
              </div>
            </div>
          </div>
          <div class="guide-content">
            <h3 class="guide-title">PropertyCardMain 가이드</h3>
            <p class="guide-description">
              새로운 PropertyCardMain 컴포넌트의 사용법과 인터랙션을 확인하세요.
            </p>
            <div class="guide-features">
              <span class="feature-tag">새로운 디자인</span>
              <span class="feature-tag">별점</span>
              <span class="feature-tag">인터랙티브</span>
            </div>
          </div>
          <div class="guide-arrow">
            <i class="fas fa-chevron-right"></i>
          </div>
        </div>

        <!-- Input 가이드 -->
        <div class="guide-card" @click="navigateToGuide('input-guide')">
          <div class="guide-icon">
            <div class="input-preview">
              <div class="preview-input-box">
                <div class="preview-input-line"></div>
                <div class="preview-input-line"></div>
                <div class="preview-input-line"></div>
                <div class="preview-input-cursor"></div>
              </div>
            </div>
          </div>
          <div class="guide-content">
            <h3 class="guide-title">Input 가이드</h3>
            <p class="guide-description">
              깔끔하고 모던한 디자인의 Input 컴포넌트 사용법을 확인하세요.
            </p>
            <div class="guide-features">
              <span class="feature-tag">v-model 지원</span>
              <span class="feature-tag">다양한 타입</span>
              <span class="feature-tag">반응형</span>
            </div>
          </div>
          <div class="guide-arrow">
            <i class="fas fa-chevron-right"></i>
          </div>
        </div>

        <!-- Button 가이드 -->
        <div class="guide-card" @click="navigateToGuide('button-guide')">
          <div class="guide-icon">
            <div class="button-preview">
              <div class="preview-button-hexagon">
                <div class="preview-btn-hex primary-hex"></div>
                <div class="preview-btn-hex secondary-hex"></div>
                <div class="preview-btn-hex outline-hex"></div>
              </div>
            </div>
          </div>
          <div class="guide-content">
            <h3 class="guide-title">Button 가이드</h3>
            <p class="guide-description">
              공용 Button 컴포넌트의 10가지 variant와 다양한 옵션을 확인하세요.
            </p>
            <div class="guide-features">
              <span class="feature-tag">10가지 variant</span>
              <span class="feature-tag">아이콘 지원</span>
              <span class="feature-tag">반응형</span>
            </div>
          </div>
          <div class="guide-arrow">
            <i class="fas fa-chevron-right"></i>
          </div>
        </div>

        <!-- DropBox 가이드 -->
        <div class="guide-card" @click="navigateToGuide('dropbox-guide')">
          <div class="guide-icon">
            <div class="dropbox-preview">
              <div class="preview-dropdown">
                <div class="preview-selector"></div>
                <div class="preview-options">
                  <div class="preview-option"></div>
                  <div class="preview-option"></div>
                  <div class="preview-option"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="guide-content">
            <h3 class="guide-title">DropBox 가이드</h3>
            <p class="guide-description">
              드롭다운 선택 기능을 제공하는 DropBox 컴포넌트의 사용법을 확인하세요.
            </p>
            <div class="guide-features">
              <span class="feature-tag">v-model 지원</span>
              <span class="feature-tag">커스텀 옵션</span>
              <span class="feature-tag">외부 클릭 감지</span>
            </div>
          </div>
          <div class="guide-arrow">
            <i class="fas fa-chevron-right"></i>
          </div>
        </div>

        <!-- Footer 가이드 -->
        <div class="guide-card" @click="navigateToGuide('footer-guide')">
          <div class="guide-icon">
            <div class="footer-preview">
              <div class="preview-footer-content">
                <div class="preview-info-line"></div>
                <div class="preview-info-line"></div>
                <div class="preview-info-line"></div>
                <div class="preview-copyright"></div>
              </div>
            </div>
          </div>
          <div class="guide-content">
            <h3 class="guide-title">Footer 가이드</h3>
            <p class="guide-description">
              회사 정보와 연락처를 포함한 반응형 Footer 컴포넌트를 확인하세요.
            </p>
            <div class="guide-features">
              <span class="feature-tag">반응형</span>
              <span class="feature-tag">회사 정보</span>
              <span class="feature-tag">브랜드 컬러</span>
            </div>
          </div>
          <div class="guide-arrow">
            <i class="fas fa-chevron-right"></i>
          </div>
        </div>

        <!-- PopupModal 가이드 -->
        <div class="guide-card" @click="navigateToGuide('popup-modal-guide')">
          <div class="guide-icon">
            <div class="popup-modal-preview">
              <div class="preview-modal-container">
                <div class="preview-modal-title"></div>
                <div class="preview-modal-message"></div>
                <div class="preview-modal-buttons">
                  <div class="preview-modal-button cancel"></div>
                  <div class="preview-modal-button confirm"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="guide-content">
            <h3 class="guide-title">PopupModal 가이드</h3>
            <p class="guide-description">
              확인/취소 기능을 제공하는 모달 팝업 컴포넌트를 확인하세요.
            </p>
            <div class="guide-features">
              <span class="feature-tag">모달</span>
              <span class="feature-tag">확인/취소</span>
              <span class="feature-tag">커스터마이징</span>
            </div>
          </div>
          <div class="guide-arrow">
            <i class="fas fa-chevron-right"></i>
          </div>
        </div>

        <!-- Tailwind CSS 가이드 -->
        <div class="guide-card" @click="navigateToGuide('tailwind-guide')">
          <div class="guide-icon">
            <div class="tailwind-preview">
              <div class="preview-tailwind-logo">
                <div class="tailwind-icon">
                  <div class="tailwind-wind"></div>
                  <div class="tailwind-wind"></div>
                  <div class="tailwind-wind"></div>
                </div>
                <div class="tailwind-text">CSS</div>
              </div>
            </div>
          </div>
          <div class="guide-content">
            <h3 class="guide-title">Tailwind CSS 가이드</h3>
            <p class="guide-description">
              프로젝트에서 사용되는 Tailwind CSS 유틸리티 클래스와 커스텀 설정을 확인하세요.
            </p>
            <div class="guide-features">
              <span class="feature-tag">유틸리티</span>
              <span class="feature-tag">반응형</span>
              <span class="feature-tag">커스텀</span>
            </div>
          </div>
          <div class="guide-arrow">
            <i class="fas fa-chevron-right"></i>
          </div>
        </div>
      </div>

      <!-- 추가 가이드 섹션 -->
      <section class="additional-section">
        <h2 class="section-title">추가 리소스</h2>
        <div class="resources-grid">
          <div class="resource-card">
            <div class="resource-icon">
              <i class="fas fa-book"></i>
            </div>
            <h4>문서</h4>
            <p>프로젝트 문서 및 API 참조</p>
          </div>
          <div class="resource-card">
            <div class="resource-icon">
              <i class="fas fa-code"></i>
            </div>
            <h4>코드 예시</h4>
            <p>실제 사용 예시 코드</p>
          </div>
          <div class="resource-card">
            <div class="resource-icon">
              <i class="fas fa-palette"></i>
            </div>
            <h4>디자인 시스템</h4>
            <p>디자인 가이드라인</p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const navigateToGuide = (routeName) => {
  router.push({ name: routeName })
}
</script>

<style scoped>
.guide-main {
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

.page-description {
  text-align: center;
  color: #7f8c8d;
  font-size: 18px;
  margin-bottom: 60px;
  font-family: 'Roboto', sans-serif;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  word-break: keep-all;
  line-height: 1.6;
}

/* Guides grid */
.guides-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 32px;
  margin-bottom: 80px;
}

/* Guide card */
.guide-card {
  background: white;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 24px;
  position: relative;
  overflow: hidden;
}

.guide-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--brand-1), var(--brand-3));
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.guide-card:hover {
  transform: translateY(-4px);
  box-shadow: 0px 8px 30px rgba(0, 0, 0, 0.15);
}

.guide-card:hover::before {
  transform: scaleX(1);
}

.guide-icon {
  flex-shrink: 0;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Color palette icon */
.color-palette {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4px;
  width: 60px;
  height: 60px;
}

.color-swatch {
  border-radius: 6px;
  border: 2px solid white;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
}

/* Property card preview icons */
.property-card-preview {
  width: 60px;
  height: 60px;
  background: white;
  border-radius: 8px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  position: relative;
}

.preview-image {
  height: 30px;
  background: linear-gradient(45deg, #e0e0e0, #f0f0f0);
}

.preview-content {
  padding: 6px;
}

.preview-title {
  height: 8px;
  background: #2c3e50;
  border-radius: 2px;
  margin-bottom: 4px;
}

.preview-price {
  height: 6px;
  background: #27ae60;
  border-radius: 2px;
  width: 70%;
}

.property-card-main-preview {
  width: 60px;
  height: 60px;
  background: white;
  border-radius: 8px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  position: relative;
}

.preview-image-main {
  height: 25px;
  background: linear-gradient(45deg, #e0e0e0, #f0f0f0);
}

.preview-heart {
  position: absolute;
  top: 4px;
  right: 4px;
  width: 8px;
  height: 8px;
  background: #e74c3c;
  border-radius: 50%;
}

.preview-content-main {
  padding: 4px;
}

.preview-title-main {
  height: 6px;
  background: #2c3e50;
  border-radius: 2px;
  margin-bottom: 3px;
}

.preview-price-main {
  height: 5px;
  background: #27ae60;
  border-radius: 2px;
  margin-bottom: 3px;
  width: 80%;
}

.preview-rating {
  height: 4px;
  background: #f39c12;
  border-radius: 2px;
  width: 40%;
}

/* Button preview icon */
.button-preview {
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.preview-button-hexagon {
  width: 60px;
  height: 60px;
  background: white;
  border-radius: 12px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.preview-button-hexagon::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, transparent 30%, rgba(6, 182, 212, 0.1) 50%, transparent 70%);
  animation: hexShine 3s ease-in-out infinite;
}

@keyframes hexShine {
  0%,
  100% {
    transform: translateX(-100%);
  }
  50% {
    transform: translateX(100%);
  }
}

.preview-btn-hex {
  position: absolute;
  width: 12px;
  height: 12px;
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.preview-btn-hex.primary-hex {
  background: var(--brand-3);
  top: 10px;
  left: 10px;
  animation: hexFloat 2s ease-in-out infinite;
}

.preview-btn-hex.secondary-hex {
  background: var(--status-1);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: hexFloat 2s ease-in-out infinite 0.5s;
}

.preview-btn-hex.outline-hex {
  background: transparent;
  border-color: var(--brand-3);
  bottom: 10px;
  right: 10px;
  animation: hexFloat 2s ease-in-out infinite 1s;
}

@keyframes hexFloat {
  0%,
  100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-3px) rotate(180deg);
  }
}

/* DropBox preview icon */
.dropbox-preview {
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.preview-dropdown {
  width: 60px;
  height: 60px;
  background: white;
  border-radius: 6px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  position: relative;
}

.preview-selector {
  height: 12px;
  background: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
  position: relative;
}

.preview-selector::after {
  content: '';
  position: absolute;
  right: 4px;
  top: 50%;
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-left: 3px solid transparent;
  border-right: 3px solid transparent;
  border-top: 3px solid #6c757d;
}

.preview-options {
  padding: 2px;
}

.preview-option {
  height: 6px;
  background: #e9ecef;
  border-radius: 2px;
  margin-bottom: 2px;
}

.preview-option:last-child {
  margin-bottom: 0;
}

/* Footer preview icon */
.footer-preview {
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.preview-footer-content {
  width: 60px;
  height: 60px;
  background: white;
  border-radius: 6px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  padding: 6px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.preview-info-line {
  height: 3px;
  background: #e9ecef;
  border-radius: 1px;
  width: 100%;
}

.preview-info-line:nth-child(2) {
  width: 80%;
}

.preview-info-line:nth-child(3) {
  width: 60%;
}

.preview-copyright {
  height: 2px;
  background: #6c757d;
  border-radius: 1px;
  width: 70%;
  margin-top: auto;
}

.guide-content {
  flex: 1;
}

.guide-title {
  color: #2c3e50;
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 8px;
  font-family: 'Roboto', sans-serif;
}

.guide-description {
  color: #7f8c8d;
  font-size: 14px;
  line-height: 1.5;
  margin-bottom: 16px;
  font-family: 'Roboto', sans-serif;
}

.guide-features {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.feature-tag {
  background: #ecf0f1;
  color: #2c3e50;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  font-family: 'Roboto', sans-serif;
}

.guide-arrow {
  color: #bdc3c7;
  font-size: 16px;
  transition: color 0.3s ease;
}

.guide-card:hover .guide-arrow {
  color: var(--brand-3);
}

/* Additional section */
.additional-section {
  margin-top: 80px;
}

.section-title {
  color: #2c3e50;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 32px;
  font-family: 'Roboto', sans-serif;
  text-align: center;
}

.resources-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
}

.resource-card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  text-align: center;
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s ease;
}

.resource-card:hover {
  transform: translateY(-2px);
}

.resource-icon {
  width: 48px;
  height: 48px;
  background: var(--brand-1);
  color: white;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
  font-size: 20px;
}

.resource-card h4 {
  color: #2c3e50;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 8px;
  font-family: 'Roboto', sans-serif;
}

.resource-card p {
  color: #7f8c8d;
  font-size: 14px;
  font-family: 'Roboto', sans-serif;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .guide-main {
    padding: 20px 16px;
  }

  .page-title {
    font-size: 28px;
  }

  .page-description {
    font-size: 16px;
    margin-bottom: 40px;
  }

  .guides-grid {
    grid-template-columns: 1fr;
    gap: 24px;
    margin-bottom: 60px;
  }

  .guide-card {
    padding: 24px;
    gap: 20px;
  }

  .guide-icon {
    width: 60px;
    height: 60px;
  }

  .color-palette {
    width: 50px;
    height: 50px;
  }

  .property-card-preview,
  .property-card-main-preview {
    width: 50px;
    height: 50px;
  }

  .resources-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
}

/* Input preview icon */
.input-preview {
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.preview-input-box {
  width: 60px;
  height: 60px;
  background: white;
  border-radius: 8px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  padding: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
}

.preview-input-line {
  height: 3px;
  background: #e5e7eb;
  border-radius: 2px;
  width: 100%;
}

.preview-input-line:nth-child(2) {
  width: 80%;
}

.preview-input-line:nth-child(3) {
  width: 60%;
}

.preview-input-cursor {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  width: 2px;
  height: 12px;
  background: var(--brand-3);
  border-radius: 1px;
  animation: cursorBlink 1.5s infinite;
}

@keyframes cursorBlink {
  0%,
  50% {
    opacity: 1;
  }
  51%,
  100% {
    opacity: 0;
  }
}

/* PopupModal preview icon */
.popup-modal-preview {
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.preview-modal-container {
  width: 60px;
  height: 60px;
  background: white;
  border-radius: 8px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  padding: 6px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.preview-modal-title {
  height: 4px;
  background: #2c3e50;
  border-radius: 2px;
  width: 80%;
  margin-bottom: 2px;
}

.preview-modal-message {
  height: 3px;
  background: #7f8c8d;
  border-radius: 2px;
  width: 60%;
  margin-bottom: 4px;
}

.preview-modal-buttons {
  display: flex;
  gap: 2px;
  justify-content: space-between;
}

.preview-modal-button {
  height: 6px;
  border-radius: 2px;
  flex: 1;
}

.preview-modal-button.cancel {
  background: #e53950;
}

.preview-modal-button.confirm {
  background: #f5f5f5;
  border: 1px solid #e0e0e0;
}

/* Tailwind CSS preview icon */
.tailwind-preview {
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.preview-tailwind-logo {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #06b6d4, #0891b2);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(6, 182, 212, 0.3);
}

.tailwind-icon {
  position: relative;
  width: 24px;
  height: 16px;
  margin-bottom: 4px;
}

.tailwind-wind {
  position: absolute;
  width: 8px;
  height: 8px;
  background: white;
  border-radius: 50%;
  opacity: 0.9;
  animation: windFloat 3s ease-in-out infinite;
}

.tailwind-wind:nth-child(1) {
  top: 0;
  left: 0;
  animation-delay: 0s;
}

.tailwind-wind:nth-child(2) {
  top: 4px;
  left: 8px;
  animation-delay: 0.5s;
}

.tailwind-wind:nth-child(3) {
  top: 8px;
  left: 16px;
  animation-delay: 1s;
}

@keyframes windFloat {
  0%,
  100% {
    transform: translateY(0) scale(1);
    opacity: 0.9;
  }
  50% {
    transform: translateY(-2px) scale(1.1);
    opacity: 1;
  }
}

.tailwind-text {
  color: white;
  font-size: 8px;
  font-weight: bold;
  letter-spacing: 0.5px;
}
</style>
