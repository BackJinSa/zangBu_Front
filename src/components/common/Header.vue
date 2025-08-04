<template>
  <header class="w-full bg-white shadow-sm">
    <!-- Desktop Header (1024px 이상) -->
    <div
      class="hidden desktop:flex w-[1536px] h-24 max-w-[1536px] min-w-[1024px] bg-white inline-flex justify-center items-center mx-auto"
    >
      <!-- Logo Section -->
      <div class="w-56 h-14 pr-4 py-2.5 flex justify-start items-center gap-2.5">
        <img class="w-56 h-20" src="https://placehold.co/229x86" alt="Logo" />
      </div>

      <!-- Main Content Section -->
      <div class="flex-1 h-14 pr-2.5 flex justify-between items-center">
        <!-- Search Bar -->
        <div class="flex-1 h-14 px-3.5 py-2.5 flex justify-start items-center gap-2.5">
          <div
            data-검색창-도메인="매물"
            class="flex-1 h-9 min-w-72 pl-2 pr-[5px] bg-zinc-100 rounded-lg flex justify-start items-center gap-2"
          >
            <div class="w-5 h-5 relative">
              <div class="w-4 h-4 left-[1.65px] top-[1.65px] absolute bg-neutral-600"></div>
            </div>
            <input
              ref="searchInputRef"
              v-model="searchQuery"
              @keyup.enter="handleSearch"
              @input="handleSearchInput"
              type="text"
              placeholder="지역, 매물명, 지하철역으로 검색"
              class="flex-1 bg-transparent text-text-1 text-base font-normal font-['Inter'] placeholder-text-1 outline-none"
            />
            <button
              v-if="searchQuery"
              @click="clearSearch"
              class="w-5 h-5 flex items-center justify-center text-gray-400 hover:text-gray-600"
            >
              <i class="fas fa-times"></i>
            </button>
          </div>
        </div>

        <!-- Navigation and User Section -->
        <div class="h-12 flex justify-end items-center gap-2.5">
          <!-- Navigation Links -->
          <div class="w-72 h-9 flex justify-end items-center gap-14">
            <div class="flex-1 h-5 px-px flex justify-end items-center gap-5">
              <button
                @click="handleNavigation('map')"
                class="w-8 flex items-center justify-center text-green-900 text-lg font-medium font-['Roboto'] hover:text-brand-1 transition-colors whitespace-nowrap"
              >
                지도
              </button>
              <button
                @click="handleNavigation('chat')"
                class="w-8 flex items-center justify-center text-green-900 text-lg font-medium font-['Roboto'] hover:text-brand-1 transition-colors whitespace-nowrap"
              >
                채팅
              </button>
              <button
                @click="handleNavigation('notification')"
                class="w-8 flex items-center justify-center text-green-900 text-lg font-medium font-['Roboto'] hover:text-brand-1 transition-colors whitespace-nowrap"
              >
                알림
              </button>
              <button
                @click="handleNavigation('trade')"
                class="w-8 flex items-center justify-center text-green-900 text-lg font-medium font-['Roboto'] hover:text-brand-1 transition-colors whitespace-nowrap"
              >
                거래
              </button>
              <button
                @click="handleNavigation('mypage')"
                class="w-20 h-5 flex items-center justify-center text-green-900 text-lg font-medium font-['Roboto'] hover:text-brand-1 transition-colors whitespace-nowrap"
              >
                마이페이지
              </button>
            </div>
          </div>

          <!-- User Profile Section -->
          <div class="w-48 h-9 py-px flex justify-end items-center gap-2.5">
            <div class="w-24 h-9 flex justify-end items-center gap-2.5">
              <div
                class="w-9 h-9 p-2.5 bg-brand-3 rounded-2xl flex justify-center items-center gap-2.5"
              >
                <div data-svg-wrapper class="relative">
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
              </div>
              <div
                class="w-12 flex items-center justify-center text-green-900 text-lg font-medium font-['Roboto'] whitespace-nowrap"
              >
                김철수
              </div>
            </div>
            <div class="w-20 h-9 flex justify-end items-center gap-2.5">
              <button
                @click="handleLogout"
                data-fill="False"
                data-height="38"
                data-state="Primary"
                data-weight="83"
                data-아이콘="False"
                data-활성화="True"
                class="w-20 h-9 min-w-20 p-2.5 rounded-lg outline outline-1 outline-offset-[-1px] outline-brand-2 flex justify-center items-center gap-2.5 hover:bg-brand-2 hover:text-white transition-colors"
              >
                <div
                  class="text-center justify-center text-brand-1 text-base font-semibold font-['Inter']"
                >
                  로그아웃
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile Header (1024px 미만) -->
    <div class="lg:hidden w-full h-16 px-2 sm:px-4 flex justify-between items-center bg-white">
      <!-- Mobile Logo -->
      <div class="flex items-center">
        <img class="w-24 h-10 sm:w-32 sm:h-12 object-contain" src="@/assets/logo.png" alt="Logo" />
      </div>

      <!-- Mobile Navigation -->
      <div class="flex items-center gap-2 sm:gap-4">
        <!-- Search Icon -->
        <button
          @click="toggleMobileSearch"
          class="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center"
        >
          <i class="fas fa-search text-neutral-600 text-sm sm:text-base"></i>
        </button>

        <!-- Menu Button -->
        <button
          @click="toggleMobileMenu"
          class="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center"
        >
          <i class="fas fa-bars text-brand-1 text-sm sm:text-base"></i>
        </button>
      </div>
    </div>

    <!-- Mobile Search Overlay -->
    <div
      v-if="showMobileSearch"
      class="lg:hidden w-full bg-white border-b border-gray-200 p-2 sm:p-4"
    >
      <div class="relative">
        <div class="flex items-center gap-2 bg-zinc-100 rounded-lg px-2 sm:px-3 py-2">
          <i class="fas fa-search text-neutral-600 text-sm sm:text-base"></i>
          <input
            type="text"
            placeholder="지역, 매물명, 지하철역으로 검색"
            class="flex-1 bg-transparent text-text-1 text-sm sm:text-base font-normal font-['Inter'] placeholder-text-1 outline-none"
            v-model="searchQuery"
            @keyup.enter="handleSearch"
            @input="handleSearchInput"
          />
          <button
            v-if="searchQuery"
            @click="clearSearch"
            class="text-gray-400 hover:text-gray-600 mr-1 sm:mr-2"
          >
            <i class="fas fa-times text-sm sm:text-base"></i>
          </button>
          <button @click="toggleMobileSearch" class="text-gray-500">
            <i class="fas fa-times text-sm sm:text-base"></i>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Menu Overlay -->
    <div v-if="showMobileMenu" class="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50">
      <div class="absolute right-0 top-0 h-full w-56 sm:w-64 bg-white shadow-lg">
        <div class="p-3 sm:p-4">
          <!-- Close Button -->
          <div class="flex justify-end mb-3 sm:mb-4">
            <button @click="toggleMobileMenu" class="text-gray-500 text-xl sm:text-2xl">
              <i class="fas fa-times"></i>
            </button>
          </div>

          <!-- User Profile -->
          <div
            class="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 p-2 sm:p-3 bg-gray-50 rounded-lg"
          >
            <div
              class="w-8 h-8 sm:w-10 sm:h-10 bg-brand-3 rounded-full flex items-center justify-center"
            >
              <i class="fas fa-user text-black text-sm sm:text-base"></i>
            </div>
            <div class="text-brand-1 font-medium whitespace-nowrap text-sm sm:text-base">
              김철수
            </div>
          </div>

          <!-- Navigation Links -->
          <nav class="space-y-1 sm:space-y-2">
            <button
              @click="handleNavigation('map')"
              class="w-full flex items-center gap-2 sm:gap-3 p-2 sm:p-3 text-brand-1 font-medium hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
            >
              <i class="fas fa-map-marked-alt text-sm sm:text-base"></i>
              <span class="whitespace-nowrap text-sm sm:text-base">지도</span>
            </button>
            <button
              @click="handleNavigation('chat')"
              class="w-full flex items-center gap-2 sm:gap-3 p-2 sm:p-3 text-brand-1 font-medium hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
            >
              <i class="fas fa-comments text-sm sm:text-base"></i>
              <span class="whitespace-nowrap text-sm sm:text-base">채팅</span>
            </button>
            <button
              @click="handleNavigation('notification')"
              class="w-full flex items-center gap-2 sm:gap-3 p-2 sm:p-3 text-brand-1 font-medium hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
            >
              <i class="fas fa-bell text-sm sm:text-base"></i>
              <span class="whitespace-nowrap text-sm sm:text-base">알림</span>
            </button>
            <button
              @click="handleNavigation('trade')"
              class="w-full flex items-center gap-2 sm:gap-3 p-2 sm:p-3 text-brand-1 font-medium hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
            >
              <i class="fas fa-exchange-alt text-sm sm:text-base"></i>
              <span class="whitespace-nowrap text-sm sm:text-base">거래</span>
            </button>
            <button
              @click="handleNavigation('mypage')"
              class="w-full flex items-center gap-2 sm:gap-3 p-2 sm:p-3 text-brand-1 font-medium hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
            >
              <i class="fas fa-user-circle text-sm sm:text-base"></i>
              <span class="whitespace-nowrap text-sm sm:text-base">마이페이지</span>
            </button>
          </nav>

          <!-- Logout Button -->
          <div class="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-gray-200">
            <button
              @click="handleLogout"
              class="w-full p-2 sm:p-3 text-brand-1 font-semibold border border-brand-2 rounded-lg hover:bg-brand-2 hover:text-white transition-colors whitespace-nowrap text-sm sm:text-base"
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
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Reactive data
const showMobileSearch = ref(false)
const showMobileMenu = ref(false)
const searchQuery = ref('')
const searchInputRef = ref(null)

// Methods
const toggleMobileSearch = () => {
  showMobileSearch.value = !showMobileSearch.value
  if (showMobileSearch.value) {
    showMobileMenu.value = false
  }
}

const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value
  if (showMobileMenu.value) {
    showMobileSearch.value = false
  }
}

const handleLogout = () => {
  // 로그아웃 로직 구현
  console.log('로그아웃 처리')
  showMobileMenu.value = false
  // router.push('/login')
}

const handleNavigation = (route) => {
  console.log(`네비게이션: ${route}`)
  showMobileMenu.value = false

  // 라우터 네비게이션 로직
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
    // 검색 로직 구현
    // 예: router.push(`/search?q=${encodeURIComponent(searchQuery.value)}`)
    // 또는 검색 API 호출
  }
}

const handleSearchInput = () => {
  // 실시간 검색 제안이나 필터링 로직
  console.log('검색 입력:', searchQuery.value)
}

const clearSearch = () => {
  searchQuery.value = ''
  console.log('검색어 초기화')
}

const focusSearch = () => {
  // 검색창에 포커스 주기
  if (searchInputRef.value) {
    searchInputRef.value.focus()
  }
}

// Close mobile menu when clicking outside
const closeMobileMenu = (event) => {
  if (showMobileMenu.value && !event.target.closest('.mobile-menu')) {
    showMobileMenu.value = false
  }
}

// Add event listener for clicking outside
onMounted(() => {
  document.addEventListener('click', closeMobileMenu)
})

onUnmounted(() => {
  document.removeEventListener('click', closeMobileMenu)
})
</script>

<style scoped>
/* Custom styles for better mobile experience */
@media (max-width: 1023px) {
  .mobile-menu {
    animation: slideIn 0.3s ease-out;
  }
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}

/* Ensure proper font loading */
.font-roboto {
  font-family: 'Roboto', sans-serif;
}

.font-inter {
  font-family: 'Inter', sans-serif;
}

/* 반응형 개선 */
@media (max-width: 640px) {
  .w-56 {
    width: 8rem; /* 128px */
  }

  .h-20 {
    height: 5rem; /* 80px */
  }

  .min-w-72 {
    min-width: 16rem; /* 256px */
  }
}

/* 데스크톱에서 중앙 정렬 개선 */
@media (min-width: 1024px) {
  .max-w-\[1536px\] {
    max-width: 1536px;
  }

  .min-w-\[1024px\] {
    min-width: 1024px;
  }
}

/* 호버 효과 개선 */
button:hover {
  transform: translateY(-1px);
  transition: all 0.2s ease;
}

/* 검색창 포커스 효과 */
input:focus {
  outline: 2px solid #68a63c;
  outline-offset: 2px;
}

/* 모바일 메뉴 애니메이션 개선 */
.lg\:hidden.fixed {
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
