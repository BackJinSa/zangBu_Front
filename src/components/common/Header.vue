<template>
  <header class="w-full bg-white shadow-sm relative z-[60]">
    <!-- Desktop Header -->
    <div
      class="hidden lg:flex w-full max-w-7xl mx-auto h-24 bg-white items-center px-4 lg:px-6 xl:px-8"
    >
      <!-- Logo Section -->
      <div class="flex-shrink-0 w-56 h-14 flex items-center">
        <img
          class="w-[229px] h-[86px] object-contain cursor-pointer"
          src="@/assets/logo.png"
          alt="Logo"
          @click="handleLogoClick"
        />
      </div>

      <!-- Main Content Section -->
      <div class="flex-1 flex items-center ml-4">
        <!-- Navigation Buttons - Centered -->
        <div class="flex-1 flex justify-center items-center gap-4">
          <button
            @click="handleNavigation('map')"
            class="px-4 py-2 text-green-900 hover:text-brand-1 hover:underline hover:underline-offset-8 hover:decoration-brand-1 hover:decoration-2 transition-all duration-200 font-medium"
          >
            지도
          </button>
          <button
            @click="handleNavigation('chat')"
            class="px-4 py-2 text-green-900 hover:text-brand-1 hover:underline hover:underline-offset-8 hover:decoration-brand-1 hover:decoration-2 transition-all duration-200 font-medium"
          >
            채팅
          </button>
          <button
            @click="handleNavigation('trade')"
            class="px-4 py-2 text-green-900 hover:text-brand-1 hover:underline hover:underline-offset-8 hover:decoration-brand-1 hover:decoration-2 transition-all duration-200 font-medium"
          >
            거래
          </button>
          <button
            @click="handleNavigation('property-register')"
            class="px-4 py-2 text-green-900 hover:text-brand-1 hover:underline hover:underline-offset-8 hover:decoration-brand-1 hover:decoration-2 transition-all duration-200 font-medium"
          >
            매물 등록
          </button>
          <button
            v-if="isLoggedIn"
            @click="handleNavigation('mypage')"
            class="px-4 py-2 text-green-900 hover:text-brand-1 hover:underline hover:underline-offset-8 hover:decoration-brand-1 hover:decoration-2 transition-all duration-200 font-medium"
          >
            마이페이지
          </button>
          <button
            v-if="isLoggedIn"
            @click="handleLogout"
            class="px-4 py-2 text-green-900 hover:text-brand-1 hover:underline hover:underline-offset-8 hover:decoration-brand-1 hover:decoration-2 transition-all duration-200 font-medium"
          >
            로그아웃
          </button>
          <button
            v-else
            @click="handleNavigation('login')"
            class="px-4 py-2 text-green-900 hover:text-brand-1 hover:underline hover:underline-offset-8 hover:decoration-brand-1 hover:decoration-2 transition-all duration-200 font-medium"
          >
            로그인
          </button>
        </div>

        <!-- User Profile Section -->
        <div class="flex items-center gap-3 md:gap-4 ml-4">
          <button
            @click="isLoggedIn ? handleNavigation('mypage') : handleNavigation('login')"
            class="flex items-center gap-2 md:gap-3 hover:opacity-80 transition-opacity cursor-pointer"
          >
            <div
              :class="[
                'w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center',
                isLoggedIn ? 'bg-brand-3' : 'bg-gray-200',
              ]"
            >
              <svg
                class="w-5 h-5 md:w-6 md:h-6"
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
            <span
              v-if="isLoggedIn"
              class="text-green-900 text-sm md:text-lg font-medium font-roboto whitespace-nowrap"
            >
              {{ userName }}
            </span>
            <span
              v-else
              class="text-green-900 text-sm md:text-lg font-medium font-roboto whitespace-nowrap"
            >
              로그인
            </span>
          </button>
          <!-- Notification Bell Icon -->
          <button
            class="relative text-green-900 hover:text-brand-1 transition-colors"
            @click="handleNavigation('notification')"
          >
            <!-- 종 아이콘 -->
            <svg
              class="w-6 h-6 sm:w-7 sm:h-7"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 17h5l-1.405-1.405C18.21 14.79 18 13.918 18 13V9c0-3.314-2.686-6-6-6S6 5.686 6 9v4c0 .918-.21 1.79-.595 2.595L4 17h5m6 0a3 3 0 01-6 0m6 0H9"
              />
            </svg>

            <!-- 빨간 원 숫자 뱃지 -->
            <span
              v-if="unreadAllCount > 0"
              class="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 text-[11px] font-bold bg-red-500 text-white rounded-full flex items-center justify-center shadow-md ring-2 ring-white"
            >
              {{ unreadAllCountDisplay }}
            </span>
          </button>

          <!-- Hamburger Menu Button for Desktop -->
          <button
            @click="toggleSidebar"
            class="hidden lg:hidden w-10 h-10 flex items-center justify-center text-green-900 hover:text-brand-1 transition-colors"
          >
            <svg
              class="w-6 h-6 transition-all duration-300 ease-in-out"
              :class="isSidebarOpen ? 'rotate-90' : 'rotate-0'"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <!-- 햄버거 아이콘 (사이드바가 닫혀있을 때) -->
              <path
                v-if="!isSidebarOpen"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
              <!-- X 아이콘 (사이드바가 열려있을 때) -->
              <path
                v-else
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Header -->
    <div class="lg:hidden w-full bg-white px-4 py-4">
      <!-- Top Row: Logo and Right Icons -->
      <div class="flex items-center justify-between">
        <!-- Logo -->
        <div class="flex-shrink-0">
          <img
            class="w-24 h-9 sm:w-28 sm:h-10 md:w-32 md:h-12 object-contain cursor-pointer"
            src="@/assets/logo.png"
            alt="Logo"
            @click="handleLogoClick"
          />
        </div>

        <!-- Right Icons: User, Notification, Hamburger -->
        <div class="flex items-center gap-2 sm:gap-3 h-10">
          <button
            @click="isLoggedIn ? handleNavigation('mypage') : handleNavigation('login')"
            class="flex items-center gap-1 h-full hover:opacity-80 transition-opacity"
          >
            <div
              :class="[
                'w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center flex-shrink-0',
                isLoggedIn ? 'bg-brand-3' : 'bg-gray-200',
              ]"
            >
              <svg
                class="w-4 h-4 sm:w-4 sm:h-4"
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
            <span
              v-if="isLoggedIn"
              class="text-green-900 text-xs font-medium font-roboto whitespace-nowrap flex-shrink-0"
            >
              {{ userName }}
            </span>
            <span
              v-else
              class="text-green-900 text-xs font-medium font-roboto whitespace-nowrap flex-shrink-0"
            >
              로그인
            </span>
          </button>
          <!-- Notification Bell Icon -->
          <button
            @click="handleNavigation('notification')"
            class="relative text-green-900 hover:text-brand-1 transition-colors h-full flex items-center justify-center"
          >
            <svg
              class="w-5 h-5 sm:w-6 sm:h-6"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 17h5l-1.405-1.405C18.21 14.79 18 13.918 18 13V9c0-3.314-2.686-6-6-6S6 5.686 6 9v4c0 .918-.21 1.79-.595 2.595L4 17h5m6 0a3 3 0 01-6 0m6 0H9"
              />
            </svg>

            <!-- 빨간 원 숫자 뱃지 -->
            <span
              v-if="unreadAllCount > 0"
              class="absolute -top-1.5 -right-1.5 min-w-[16px] h-[16px] px-[3px] text-[10px] font-bold bg-red-500 text-white rounded-full flex items-center justify-center shadow-md ring-2 ring-white"
            >
              {{ unreadAllCountDisplay }}
            </span>
          </button>

          <!-- Hamburger Menu Button -->
          <button
            @click="toggleSidebar"
            class="w-10 h-10 flex items-center justify-center text-green-900 hover:text-brand-1 transition-colors"
          >
            <svg
              class="w-5 h-5 sm:w-6 sm:h-6 transition-all duration-300 ease-in-out"
              :class="isSidebarOpen ? 'rotate-90' : 'rotate-0'"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <!-- 햄버거 아이콘 (사이드바가 닫혀있을 때) -->
              <path
                v-if="!isSidebarOpen"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
              <!-- X 아이콘 (사이드바가 열려있을 때) -->
              <path
                v-else
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Sidebar Component -->
    <Sidebar
      :is-open="isSidebarOpen"
      type="A"
      :custom-menu-items="sidebarMenuItems"
      @close="closeSidebar"
      @menu-click="handleSidebarMenuClick"
    />
  </header>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Sidebar from './Sidebar.vue'
import { useNotificationStore } from '@/stores/notification/notification'
import { useAuthStore } from '@/stores/auth/auth'

import { onMounted } from 'vue'
import { listenForegroundMessage, requestFcmToken } from '@/utils/fcm'

// 스토어 인스턴스 가져오기
const notificationStore = useNotificationStore()
const authStore = useAuthStore()

// // 종 옆에 표시할 전체 알림 개수 (filterCounts.ALL)
// const totalAllCount = computed(() => Number(notificationStore.counts?.ALL ?? 0))
// const totalAllCountDisplay = computed(() =>
//   totalAllCount.value > 99 ? '99+' : String(totalAllCount.value)
// )

// 헤더 "총 X개" 등에 사용할 전체 알림 개수 (totalCounts.ALL)
const totalAllCount = computed(() => Number(notificationStore.totalCounts?.ALL ?? 0))
const totalAllCountDisplay = computed(() =>
  totalAllCount.value > 99 ? '99+' : String(totalAllCount.value)
)

// 종 배지(빨간 원)에는 "읽지 않은" 개수만 표시 (unreadCounts.ALL)
const unreadAllCount = computed(() => Number(notificationStore.unreadCounts?.ALL ?? 0))
const unreadAllCountDisplay = computed(() =>
  unreadAllCount.value > 99 ? '99+' : String(unreadAllCount.value)
)

// Router 인스턴스 가져오기
const router = useRouter()
const route = useRoute()

// Computed properties
const userName = computed(() => authStore.user?.nickname || '')
const userInitial = computed(() => (userName.value ? userName.value.charAt(0) : ''))

// 메인페이지 관련 로직

onMounted(async () => {
  // 1) 실제 백엔드에서 1페이지 로딩 (필터/카운트 포함)
  await notificationStore.loadNotifications()
  // 2) (선택) FCM 토큰 발급/등록
  try {
    await requestFcmToken()
  } catch (e) {
    console.warn('[FCM] token issue failed:', e)
  }

  // 3) 앱 실행 중 수신되는 FCM 포그라운드 메시지 반영
  listenForegroundMessage?.((payload) => {
    // 스토어가 addNotificationFromFCM 제공 시 낙관적 반영
    if (typeof notificationStore.addNotificationFromFCM === 'function') {
      notificationStore.addNotificationFromFCM(payload)
    } else {
      // 없으면 서버 기준으로 재동기화
      notificationStore.loadNotifications()
    }
  })
})

// 라우트 변경 시 사이드바 닫기
watch(
  () => route.path,
  () => {
    if (isSidebarOpen.value) {
      closeSidebar()
    }
  }
)

// Reactive data
const isSidebarOpen = ref(false)

// 로그인 상태 확인
const isLoggedIn = computed(() => {
  const authenticated = authStore.isAuthenticated
  console.log('🔐 Header - 인증 상태:', authenticated)
  console.log('👤 Header - 사용자:', authStore.user)
  console.log('🎫 Header - 토큰:', authStore.accessToken)
  return authenticated
})

// Sidebar menu items (로그인 상태에 따라 동적 생성)
const sidebarMenuItems = computed(() => {
  const baseItems = [
    { id: 'map', label: '지도', action: 'navigate' },
    { id: 'chat', label: '채팅', action: 'navigate' },
    { id: 'trade', label: '거래', action: 'navigate' },
    { id: 'property-register', label: '매물 등록', action: 'navigate' },
  ]

  // 로그인 상태에 따라 마이페이지 또는 로그인/로그아웃 버튼 추가
  if (isLoggedIn.value) {
    baseItems.push({ id: 'mypage', label: '마이페이지', action: 'navigate' })
    baseItems.push({ id: 'logout', label: '로그아웃', action: 'logout' })
  } else {
    baseItems.push({ id: 'login', label: '로그인', action: 'navigate' })
  }

  return baseItems
})

// Methods
const handleLogout = () => {
  console.log('로그아웃 처리')
  authStore.logout()
  router.push('/auth/login')
}

const handleLogoClick = () => {
  router.push('/')
}

const handleNavigation = (route) => {
  console.log(`네비게이션: ${route}`)

  switch (route) {
    case 'map':
      router.push('/map')
      break
    case 'chat':
      router.push('/chat/list')
      break
    case 'notification':
      router.push('/notification')
      break
    case 'trade':
      router.push('/deal/waitinglist')
      break
    case 'property-register':
      router.push('/property/register')
      break
    case 'mypage':
      router.push('/user/mypage')
      break
    case 'login':
      router.push('/auth/login')
      break
    default:
      console.log('알 수 없는 라우트:', route)
  }
}

// Sidebar methods
const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

const closeSidebar = () => {
  isSidebarOpen.value = false
}

const handleSidebarMenuClick = (item) => {
  console.log('사이드바 메뉴 클릭:', item)

  if (item.action === 'logout') {
    handleLogout()
  } else {
    handleNavigation(item.id)
  }

  closeSidebar()
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
  outline: none;
}
</style>
