<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <div class="flex h-screen bg-gray-100">
    <!-- 왼쪽 이미지 영역 -->
    <div class="w-1/2 h-full">
      <img
        src="https://image.ajunews.com/content/image/2022/04/04/20220404181310254680.jpg"
        alt="회원가입 이미지"
        class="w-full h-full object-cover"
      />
    </div>

    <!-- 오른쪽 회원가입 영역 -->
    <div class="signup-container">
      <div class="signup-content">
        <!-- 로고 -->
        <div class="logo-container">
          <img src="../../assets/logo.png" alt="ZangBu 로고" class="logo-image" />
        </div>

        <h2 class="text-3xl font-bold mb-4">회원가입</h2>

        <div class="input-container">
          <!-- 이메일 입력 -->
          <div class="input-group">
            <label class="input-label">이메일</label>
            <input type="email" placeholder="이메일을 입력하세요" class="input-field" />
          </div>

          <!-- 닉네임 입력 -->
          <div class="input-group">
            <label class="input-label">닉네임</label>
            <input type="nickname" placeholder="닉네임을 입력하세요" class="input-field" />
          </div>

          <!-- 비밀번호 입력 -->
          <div class="input-group">
            <label class="input-label">비밀번호</label>
            <div class="relative">
              <input
                type="password"
                placeholder="비밀번호를 입력하세요 (최소 8자)"
                class="input-field"
              />
              <span class="absolute inset-y-0 right-3 flex items-center text-gray-400">
                <i class="lucide-eye w-5 h-5"></i>
              </span>
            </div>
          </div>

          <!-- 비밀번호 재입력 -->
          <div class="input-group">
            <label class="input-label">비밀번호</label>
            <div class="relative">
              <input type="password" placeholder="비밀번호를 다시 입력하세요" class="input-field" />
              <span class="absolute inset-y-0 right-3 flex items-center text-gray-400">
                <i class="lucide-eye w-5 h-5"></i>
              </span>
            </div>
          </div>

          <!-- 마케팅 알림 수신 동의 -->
          <div class="input-group">
            <label class="input-label"
              >서비스/마케팅 알림 수신 동의 <span class="text-red-500">*</span></label
            >
            <div class="flex gap-4">
              <label class="flex items-center gap-1">
                <input type="radio" name="marketing" value="agree" class="accent-green-500" />
                <span class="text-green-600 font-medium">동의</span>
              </label>
              <label class="flex items-center gap-1">
                <input type="radio" name="marketing" value="disagree" class="accent-red-500" />
                <span class="text-red-500 font-medium">거부</span>
              </label>
            </div>
          </div>

          <!-- 약관 동의 -->
          <div class="input-group">
            <label class="input-label block mb-2">약관 동의</label>
            <div class="border rounded-lg divide-y divide-gray-200">
              <label class="flex items-center p-3 gap-2">
                <input type="checkbox" class="accent-green-500" />
                <span>모두 동의</span>
              </label>
              <label class="flex items-center justify-between p-3 text-sm">
                <div class="flex items-center gap-2">
                  <input type="checkbox" class="accent-green-500" />
                  <span class="text-gray-700"
                    >개인정보 처리방침 동의 <span class="text-red-500">*</span></span
                  >
                </div>
                <a href="#" class="text-green-600 font-medium">보기</a>
              </label>
              <label class="flex items-center justify-between p-3 text-sm">
                <div class="flex items-center gap-2">
                  <input type="checkbox" class="accent-green-500" />
                  <span class="text-gray-700">매물 관리 규정 동의</span>
                </div>
                <a href="#" class="text-green-600 font-medium">보기</a>
              </label>
              <label class="flex items-center justify-between p-3 text-sm">
                <div class="flex items-center gap-2">
                  <input type="checkbox" class="accent-green-500" />
                  <span class="text-gray-700"
                    >이용약관 동의 <span class="text-red-500">*</span></span
                  >
                </div>
                <a href="#" class="text-green-600 font-medium">보기</a>
              </label>
            </div>
          </div>
        </div>

        <!-- 회원가입 버튼 -->
        <div class="button-container">
          <button class="login-button">회원가입</button>
        </div>

        <!-- 로그인 링크 -->
        <div class="login-container">
          <router-link to="/auth/login" class="link">로그인으로 돌아가기</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.signup-container {
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background-color: var(--bg-2);
  padding: 2rem;
  overflow-y: auto;
}

.signup-content {
  width: 100%;
  max-width: 64rem;
  padding: 2rem;
}

.logo-container {
  display: flex;
  justify-content: flex-start;
  margin-left: -5%;
  margin-bottom: 1.5rem;
}

.logo-image {
  max-width: 35%;
}

.input-container {
  margin-bottom: 2rem;
}

.input-group {
  margin-bottom: 0.75rem;
}

.input-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-1);
  margin-bottom: 0.25rem;
}

.input-field {
  width: 100%;
  padding: 0.5rem 1rem;
  border: 1px solid var(--brand-3);
  border-radius: 0.375rem;
  outline: none;
  transition: border-color 0.3s;
}

.input-field:focus {
  border-color: var(--brand-3);
  box-shadow: 0 0 0 2px rgba(104, 166, 60, 0.2);
}

.button-container {
  margin-bottom: 0.75rem;
}

.login-button {
  width: 100%;
  background-color: var(--brand-4);
  color: var(--text-3);
  padding: 0.5rem 0;
  border: none;
  border-radius: 0.375rem;
  transition: background-color 0.3s;
}

.login-button:hover {
  background-color: var(--brand-3);
}

.login-container {
  text-align: center;
  font-size: 0.875rem;
  color: var(--brand-3);
  margin-top: 0.5rem;
}

.link {
  text-decoration: none;
  color: var(--brand-3);
}

.link:hover {
  text-decoration: underline;
}
</style>
