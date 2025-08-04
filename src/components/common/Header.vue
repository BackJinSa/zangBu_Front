<template>
  <header class="w-full bg-white shadow-sm">
    <!-- Desktop Header (가로 고정) -->
    <div class="flex w-full max-w-7xl mx-auto h-24 bg-white items-center px-4 lg:px-6 xl:px-8">
      <!-- Logo Section -->
      <div class="flex-shrink-0 w-56 h-14 flex items-center">
        <img class="w-[229px] h-[86px] object-contain" src="@/assets/logo.png" alt="Logo" />
      </div>

      <!-- Main Content Section -->
      <div class="flex-1 flex justify-between items-center ml-8">
        <!-- Search Bar -->
        <div class="flex-1 max-w-2xl mx-8">
          <div class="relative">
            <div class="flex items-center bg-zinc-100 rounded-lg px-3 py-2">
              <i class="fas fa-search text-neutral-600 text-base mr-2"></i>
              <input
                ref="searchInputRef"
                v-model="searchQuery"
                @keyup.enter="handleSearch"
                @input="handleSearchInput"
                type="text"
                placeholder="지역, 매물명, 지하철역으로 검색"
                class="flex-1 bg-transparent text-text-1 text-base font-normal font-inter placeholder-text-1 outline-none ml-2"
              />
              <button
                v-if="searchQuery"
                @click="clearSearch"
                class="w-5 h-5 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
              >
                <i class="fas fa-times"></i>
              </button>
            </div>
          </div>
        </div>

        <!-- Navigation and User Section -->
        <div class="flex items-center gap-6">
          <!-- Navigation Links -->
          <nav class="flex items-center gap-8">
            <button
              @click="handleNavigation('map')"
              class="text-green-900 text-lg font-medium font-roboto hover:text-brand-1 transition-colors whitespace-nowrap"
            >
              지도
            </button>
            <button
              @click="handleNavigation('chat')"
              class="text-green-900 text-lg font-medium font-roboto hover:text-brand-1 transition-colors whitespace-nowrap"
            >
              채팅
            </button>
            <button
              @click="handleNavigation('notification')"
              class="text-green-900 text-lg font-medium font-roboto hover:text-brand-1 transition-colors whitespace-nowrap"
            >
              알림
            </button>
            <button
              @click="handleNavigation('trade')"
              class="text-green-900 text-lg font-medium font-roboto hover:text-brand-1 transition-colors whitespace-nowrap"
            >
              거래
            </button>
            <button
              @click="handleNavigation('mypage')"
              class="text-green-900 text-lg font-medium font-roboto hover:text-brand-1 transition-colors whitespace-nowrap"
            >
              마이페이지
            </button>
          </nav>

          <!-- User Profile Section -->
          <div class="flex items-center gap-3">
            <div class="flex items-center gap-3">
              <div class="w-9 h-9 bg-brand-3 rounded-full flex items-center justify-center">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20.1212 17.8969C19.679 16.8496 19.0374 15.8984 18.2321 15.0961C17.4292 14.2915 16.4781 13.65 15.4313 13.207C15.4219 13.2023 15.4126 13.2 15.4032 13.1953C16.8633 12.1406 17.8126 10.4227 17.8126 8.48438C17.8126 5.27344 15.211 2.67188 12.0001 2.67188C8.78912 2.67188 6.18756 5.27344 6.18756 8.48438C6.18756 10.4227 7.13678 12.1406 8.59693 13.1977C8.58756 13.2023 8.57818 13.2047 8.56881 13.2094C7.51881 13.6523 6.57662 14.2875 5.76803 15.0984C4.96344 15.9013 4.32194 16.8524 3.87896 17.8992C3.44378 18.924 3.20908 20.0228 3.18756 21.1359C3.18693 21.161 3.19132 21.1858 3.20046 21.2091C3.20961 21.2324 3.22332 21.2537 3.24079 21.2716C3.25826 21.2895 3.27915 21.3037 3.30221 21.3134C3.32527 21.3231 3.35004 21.3281 3.37506 21.3281H4.78131C4.88443 21.3281 4.96646 21.2461 4.96881 21.1453C5.01568 19.3359 5.74225 17.6414 7.02662 16.357C8.35553 15.0281 10.1204 14.2969 12.0001 14.2969C13.8797 14.2969 15.6446 15.0281 16.9735 16.357C18.2579 17.6414 18.9844 19.3359 19.0313 21.1453C19.0337 21.2484 19.1157 21.3281 19.2188 21.3281H20.6251C20.6501 21.3281 20.6749 21.3231 20.6979 21.3134C20.721 21.3037 20.7419 21.2895 20.7593 21.2716C20.7768 21.2537 20.7905 21.2324 20.7997 21.2091C20.8088 21.1858 20.8132 21.161 20.8126 21.1359C20.7891 20.0156 20.5571 18.9258 20.1212 17.8969ZM12.0001 12.5156C10.9243 12.5156 9.91178 12.0961 9.15006 11.3344C8.38834 10.5727 7.96881 9.56016 7.96881 8.48438C7.96881 7.40859 8.38834 6.39609 9.15006 5.63437C9.91178 4.87266 10.9243 4.45312 12.0001 4.45312C13.0758 4.45312 14.0883 4.87266 14.8501 5.63437C15.6118 6.39609 16.0313 7.40859 16.0313 8.48438C16.0313 9.56016 15.6118 10.5727 14.8501 11.3344C14.0883 12.0961 13.0758 12.5156 12.0001 12.5156Z"
                    fill="black"
                  />
                </svg>
              </div>
              <span class="text-green-900 text-lg font-medium font-roboto whitespace-nowrap">
                김철수
              </span>
            </div>
            <button
              @click="handleLogout"
              class="px-4 py-2 text-brand-1 text-base font-semibold font-inter border border-brand-2 rounded-lg hover:bg-brand-2 hover:text-white transition-colors"
            >
              로그아웃
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Reactive data
const searchQuery = ref('')
const searchInputRef = ref(null)

// Methods
const handleLogout = () => {
  console.log('로그아웃 처리')
}

const handleNavigation = (route) => {
  console.log(`네비게이션: ${route}`)

  switch (route) {
    case 'map':
      router.push('/map')
      break
    case 'chat':
      router.push('/chat')
      break
    case 'notification':
      router.push('/notification')
      break
    case 'trade':
      router.push('/trade')
      break
    case 'mypage':
      router.push('/mypage')
      break
    default:
      console.log('알 수 없는 라우트:', route)
  }
}

// Search methods
const handleSearch = () => {
  if (searchQuery.value.trim()) {
    console.log('검색 실행:', searchQuery.value)
  }
}

const handleSearchInput = () => {
  console.log('검색 입력:', searchQuery.value)
}

const clearSearch = () => {
  searchQuery.value = ''
  console.log('검색어 초기화')
}
</script>

<style scoped>
/* Font family utilities */
.font-roboto {
  font-family: 'Roboto', sans-serif;
}

.font-inter {
  font-family: 'Inter', sans-serif;
}

/* Search input focus effect */
input:focus {
  outline: 2px solid #68a63c;
  outline-offset: 2px;
}
</style>
