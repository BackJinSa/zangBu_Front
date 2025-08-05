<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function goToHome() {
  router.push('/')
}
</script>

<template>
  <div class="flex h-screen bg-gray-100">
    <!-- 왼쪽 이미지 영역 -->
    <div class="w-1/2 h-full">
      <img
        src="https://image.ajunews.com/content/image/2022/04/04/20220404181310254680.jpg"
        alt="로그인 이미지"
        class="w-full h-full object-cover"
      />
    </div>

    <!-- 오른쪽 로그인 영역 -->
    <div class="login-container">
      <div class="login-content">
        <!-- 로고 -->
        <div class="logo-container">
          <img src="../../assets/logo.png" alt="ZangBu 로고" class="logo-image" />
        </div>

        <div class="input-container">
          <!-- 이메일 입력 -->
          <div class="input-group">
            <label class="input-label">이메일</label>
            <input type="email" placeholder="이메일을 입력하세요" class="input-field" />
          </div>
          <!-- 비밀번호 입력 -->
          <div class="input-group">
            <label class="input-label">비밀번호</label>
            <div class="relative">
              <input type="password" placeholder="비밀번호를 입력하세요" class="input-field" />
              <span class="absolute inset-y-0 right-3 flex items-center text-gray-400">
                <!-- 눈 아이콘 자리 -->
                <i class="lucide-eye w-5 h-5"></i>
              </span>
            </div>
          </div>
        </div>

        <!-- 로그인 버튼 -->
        <div class="button-container">
          <button class="login-button" @click="goToHome">로그인</button>
        </div>

        <!-- 링크 영역 -->
        <div class="link-container">
          <router-link to="/auth/find-id" class="link">아이디 찾기</router-link>
          <span class="separator">|</span>
          <router-link to="/auth/find-password" class="link">비밀번호 찾기</router-link>
        </div>

        <!-- 회원가입 링크 -->
        <div class="signup-container">
          아직 회원이 아니신가요?
          <router-link to="/auth/signup" class="link">회원가입하기</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--bg-2); /* 공용 컬러 사용 */
  padding: 2rem;
}

.login-content {
  width: 100%;
  max-width: 64rem; /* Tailwind의 max-w-sm */
  padding: 2rem; /* Tailwind의 px-8 */
}

.logo-container {
  display: flex;
  justify-content: flex-start; /* 로고를 왼쪽으로 정렬 */
  margin-left: -5%;
  margin-bottom: 2rem; /* Tailwind의 mb-8 */
}

.logo-image {
  max-width: 35%; /* Tailwind의 w-1/2 */
}

.input-container {
  margin-bottom: 6rem; /* 이메일/비밀번호 입력란과 로그인 버튼 사이 간격 */
}

.input-group {
  margin-bottom: 1rem; /* Tailwind의 mb-4 */
}

.input-label {
  display: block;
  font-size: 0.875rem; /* Tailwind의 text-sm */
  font-weight: 500; /* Tailwind의 font-medium */
  color: var(--text-1); /* 공용 텍스트 컬러 사용 */
  margin-bottom: 0.25rem; /* Tailwind의 mb-1 */
}

.input-field {
  width: 100%;
  padding: 0.5rem 1rem; /* Tailwind의 px-4 py-2 */
  border: 1px solid var(--brand-3);
  border-radius: 0.375rem; /* Tailwind의 rounded-md */
  outline: none;
  transition: border-color 0.3s; /* 포커스 시 부드러운 전환 효과 */
}

.input-field:focus {
  border-color: var(--brand-3);
  box-shadow: 0 0 0 2px rgba(104, 166, 60, 0.2);
}
.button-container {
  margin-bottom: 1rem; /* Tailwind의 mb-4 */
}

.login-button {
  width: 100%;
  background-color: var(--brand-4); /* 공용 브랜드 컬러 사용 */
  color: var(--text-3); /* 공용 텍스트 컬러 사용 */
  padding: 0.5rem 0;
  border: none; /* 버튼의 테두리 제거 */
  border-radius: 0.375rem; /* Tailwind의 rounded-md */
  transition: background-color 0.3s;
}

.login-button:hover {
  background-color: var(--brand-3); /* 공용 브랜드 컬러 사용 */
}

.link-container {
  display: flex;
  justify-content: center; /* 가운데 정렬 */
  align-items: center; /* 수직 정렬 */
  font-size: 0.875rem; /* Tailwind의 text-sm */
  color: var(--brand-3); /* 공용 텍스트 컬러 사용 */
  margin-bottom: 0.5rem; /* Tailwind의 mb-2 */
}

.link {
  text-decoration: none;
  color: var(--brand-3);
  margin: 0 0.5rem; /* 링크 간 간격 추가 */
}

.link:hover {
  text-decoration: underline;
}

.separator {
  color: var(--brand-3); /* 공용 텍스트 컬러 사용 */
  margin: 0 0.5rem; /* 구분자 양쪽 간격 추가 */
}

.signup-container {
  text-align: center;
  font-size: 0.875rem; /* Tailwind의 text-sm */
  color: var(--brand-3); /* 공용 텍스트 컬러 사용 */
}

.signup-link {
  color: var(--brand-3); /* 공용 브랜드 컬러 사용 */
  text-decoration: none;
}

.signup-link:hover {
  text-decoration: underline;
}
</style>
