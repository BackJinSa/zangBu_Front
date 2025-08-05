<script setup>
import { ref } from 'vue'

const showResult = ref(false)
</script>

<template>
  <div class="page-container">
    <div class="form-box">
      <!-- 아이디 찾기 폼 -->
      <!-- 처음에는 찾기 폼 보임 -->
      <div v-if="!showResult">
        <h2 class="title">회원 정보로 아이디 찾기</h2>

        <!-- 이름 입력 -->
        <div class="form-group">
          <label class="label">이름</label>
          <input type="text" class="input" placeholder="이름을 입력하세요" />
        </div>

        <!-- 휴대폰 번호 입력 -->
        <div class="form-group">
          <label class="label">휴대폰 번호</label>
          <input type="tel" class="input" placeholder="예: 010-1234-5678" />
        </div>

        <!-- 아이디 찾기 버튼 -->
        <button class="btn-primary" @click="showResult = true">아이디 찾기</button>
        <!-- 찾기 버튼 누르고 + 인증 되면 보이게 -->

        <!-- 하단 링크 -->
        <div class="text-link">
          <router-link to="/auth/find-password">비밀번호를 잊으셨나요?</router-link>
        </div>
      </div>

      <!-- 아이디 찾기 결과 -->
      <div v-else class="result-box">
        <h2 class="title">아이디를 찾았습니다!</h2>
        <p class="desc">회원님의 아이디는 아래와 같습니다.</p>

        <div class="found-id">id_example</div>

        <router-link to="/auth/login" class="btn-primary inline-block text-center no-underline">
          로그인하기
        </router-link>
        <router-link
          to="/auth/find-password"
          class="btn-outline inline-block text-center no-underline"
        >
          비밀번호 찾기
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 전체 페이지 정렬 */
.page-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 1rem;
  background-color: var(--bg-1);
}

/* 박스 */
.form-box {
  background-color: var(--bg-2);
  width: 100%;
  max-width: 500px;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08);
}

/* 제목 */
.title {
  text-align: center;
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #111827;
}

/* 설명 텍스트 */
.desc {
  text-align: center;
  margin-bottom: 1.5rem;
  color: var(--text-1);
}

/* 입력 필드 그룹 */
.form-group {
  margin-bottom: 1.5rem;
}

.label {
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  color: var(--text-2);
}

.input {
  width: 100%;
  padding: 0.5rem 1rem;
  border: 1px solid var(--brand-5);
  border-radius: 0.375rem;
  font-size: 0.95rem;
  outline: none;
}

.input:focus {
  border-color: var(--brand-3);
  box-shadow: 0 0 0 2px rgba(104, 166, 60, 0.2);
}

/* 버튼 */
.btn-primary {
  width: 100%;
  background-color: var(--brand-3);
  color: var(--text-3);
  padding: 0.5rem 0;
  border: none;
  border-radius: 0.375rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  margin-bottom: 1rem;
  transition: background-color 0.2s ease-in-out;
  text-decoration: none;
}

.btn-primary:hover {
  background-color: var(--brand-1);
}

.btn-outline {
  width: 100%;
  border: 1px solid var(--brand-3);
  background-color: transparent;
  color: var(--brand-3);
  padding: 0.5rem 0;
  border-radius: 0.375rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
}

.btn-outline:hover {
  background-color: var(--brand-5);
}

/* 결과 아이디 표시 */
.found-id {
  background-color: var(--bg-1);
  padding: 1rem;
  border-radius: 0.5rem;
  margin-bottom: 1.5rem;
  font-weight: 600;
  color: var(--brand-1);
  text-align: center;
}

/* 하단 텍스트 링크 */
.text-link {
  text-align: center;
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: var(--brand-3);
}

.text-link a {
  text-decoration: none;
  color: var(--brand-3);
}

.text-link a:hover {
  text-decoration: underline;
}
</style>
