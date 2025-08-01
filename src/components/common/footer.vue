<template>
  <footer class="footer">
    <div class="footer-content">
      <!-- 회사 정보 섹션 -->
      <div class="company-info">
        <div class="info-item">
          <span class="label">상호:</span>
          <span class="value">(주)장부</span>
        </div>
        <div class="info-item">
          <span class="label">대표:</span>
          <span class="value">백현빈</span>
        </div>
        <div class="info-item">
          <span class="label">사업자등록번호:</span>
          <span class="value">178-98-665222</span>
        </div>
        <div class="info-item">
          <span class="label">주소:</span>
          <span class="value">서울 광진구 능동로 195-16 5층, 6층 (우: 05006)</span>
        </div>
        <div class="info-item">
          <span class="label">통신판매업 신고번호:</span>
          <span class="value">제2029-서울광진-78875호</span>
        </div>
      </div>

      <!-- 연락처 정보 섹션 -->
      <div class="contact-info">
        <div class="info-item">
          <span class="label">이메일:</span>
          <span class="value email">cs@zangbu.com</span>
        </div>
        <div class="info-item">
          <span class="label">서비스제휴문의:</span>
          <span class="value email">partnership@zangbu.com</span>
        </div>
        <div class="info-item">
          <span class="label">분양광고 문의:</span>
          <span class="value email">ad@zangbu.com</span>
        </div>
        <div class="info-item">
          <span class="label">팩스:</span>
          <span class="value">02-999-1234</span>
        </div>
      </div>

      <!-- 저작권 정보 -->
      <div class="copyright">
        <span>Copyright © ZANGBU. All Rights Reserved.</span>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
}
</script>

<style scoped>
.footer {
  background-color: var(--bg-2);
  border-top: 1px solid var(--bg-1);
  padding: 2rem 0;
  width: 100%;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

/* 회사 정보와 연락처 정보 공통 스타일 */
.company-info,
.contact-info {
  margin-bottom: 1.5rem;
}

.info-item {
  display: flex;
  margin-bottom: 0.5rem;
  line-height: 1.5;
}

.label {
  color: var(--text-2);
  font-weight: 500;
  min-width: 120px;
  margin-right: 0.5rem;
}

.value {
  color: var(--text-1);
  flex: 1;
}

.email {
  color: var(--brand-3);
}

/* 저작권 정보 */
.copyright {
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid var(--bg-1);
  text-align: center;
  color: var(--text-1);
  font-size: 0.875rem;
}

/* 반응형 스타일 */
@media (max-width: 1023px) {
  .footer {
    padding: 1.5rem 0;
  }

  .footer-content {
    padding: 0 0.75rem;
  }

  .info-item {
    flex-direction: column;
    margin-bottom: 0.75rem;
  }

  .label {
    min-width: auto;
    margin-right: 0;
    margin-bottom: 0.25rem;
  }
}

@media (max-width: 640px) {
  .footer {
    padding: 1rem 0;
  }

  .footer-content {
    padding: 0 0.5rem;
  }

  .company-info,
  .contact-info {
    margin-bottom: 1rem;
  }

  .info-item {
    margin-bottom: 0.5rem;
  }
}
</style>
