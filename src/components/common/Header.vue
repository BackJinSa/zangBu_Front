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
            <div class="flex-1 pr-5 flex justify-end items-center gap-2.5 overflow-hidden">
              <div class="w-52 h-5 justify-center text-text-1 text-base font-normal font-['Inter']">
                지역, 매물명, 지하철역으로 검색
              </div>
            </div>
          </div>
        </div>

        <!-- Navigation and User Section -->
        <div class="h-12 flex justify-end items-center gap-2.5">
          <!-- Navigation Links -->
          <div class="w-72 h-9 flex justify-end items-center gap-14">
            <div class="flex-1 h-5 px-px flex justify-end items-center gap-5">
              <div class="w-8 justify-center text-green-900 text-lg font-medium font-['Roboto']">
                지도
              </div>
              <div class="w-8 justify-center text-green-900 text-lg font-medium font-['Roboto']">
                채팅
              </div>
              <div class="w-8 justify-center text-green-900 text-lg font-medium font-['Roboto']">
                알림
              </div>
              <div class="w-8 justify-center text-green-900 text-lg font-medium font-['Roboto']">
                거래
              </div>
              <div
                class="w-20 h-5 justify-center text-green-900 text-lg font-medium font-['Roboto']"
              >
                마이페이지
              </div>
            </div>
          </div>

          <!-- User Profile Section -->
          <div class="w-48 h-9 py-px flex justify-end items-center gap-2.5">
            <div class="w-24 h-9 flex justify-end items-center gap-2.5">
              <div
                class="w-9 h-9 p-2.5 bg-brand-3 rounded-2xl flex justify-center items-center gap-2.5"
              >
                <div class="w-6 h-6 relative">
                  <div
                    class="w-4 h-5 left-[3.19px] top-[2.67px] absolute bg-black border-black"
                  ></div>
                </div>
              </div>
              <div class="w-12 justify-center text-green-900 text-lg font-medium font-['Roboto']">
                김철수
              </div>
            </div>
            <div class="w-20 h-9 flex justify-end items-center gap-2.5">
              <div
                data-fill="False"
                data-height="38"
                data-state="Primary"
                data-weight="83"
                data-아이콘="False"
                data-활성화="True"
                class="w-20 h-9 min-w-20 p-2.5 rounded-lg outline outline-1 outline-offset-[-1px] outline-brand-2 flex justify-center items-center gap-2.5"
              >
                <div
                  class="text-center justify-center text-brand-1 text-base font-semibold font-['Inter']"
                >
                  로그아웃
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile Header (1024px 미만) -->
    <div class="app:flex desktop:hidden w-full h-16 px-4 flex justify-between items-center">
      <!-- Mobile Logo -->
      <div class="flex items-center">
        <img class="w-32 h-12 object-contain" src="https://placehold.co/229x86" alt="Logo" />
      </div>

      <!-- Mobile Navigation -->
      <div class="flex items-center gap-4">
        <!-- Search Icon -->
        <button @click="toggleMobileSearch" class="w-8 h-8 flex items-center justify-center">
          <div class="w-5 h-5 relative">
            <div class="w-4 h-4 bg-neutral-600"></div>
          </div>
        </button>

        <!-- Menu Button -->
        <button
          @click="toggleMobileMenu"
          class="w-8 h-8 flex flex-col justify-center items-center gap-1"
        >
          <div class="w-6 h-1 bg-brand-1 rounded"></div>
          <div class="w-6 h-1 bg-brand-1 rounded"></div>
          <div class="w-6 h-1 bg-brand-1 rounded"></div>
        </button>
      </div>
    </div>

    <!-- Mobile Search Overlay -->
    <div
      v-if="showMobileSearch"
      class="app:block desktop:hidden w-full bg-white border-b border-gray-200 p-4"
    >
      <div class="relative">
        <div class="flex items-center gap-2 bg-zinc-100 rounded-lg px-3 py-2">
          <div class="w-5 h-5 relative">
            <div class="w-4 h-4 bg-neutral-600"></div>
          </div>
          <input
            type="text"
            placeholder="지역, 매물명, 지하철역으로 검색"
            class="flex-1 bg-transparent text-text-1 text-base font-normal font-['Inter'] placeholder-text-1 outline-none"
            v-model="searchQuery"
          />
          <button @click="toggleMobileSearch" class="text-gray-500">
            <span class="text-xl">&times;</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Menu Overlay -->
    <div
      v-if="showMobileMenu"
      class="app:block desktop:hidden fixed inset-0 bg-black bg-opacity-50 z-50"
    >
      <div class="absolute right-0 top-0 h-full w-64 bg-white shadow-lg">
        <div class="p-4">
          <!-- Close Button -->
          <div class="flex justify-end mb-4">
            <button @click="toggleMobileMenu" class="text-gray-500 text-2xl">&times;</button>
          </div>

          <!-- User Profile -->
          <div class="flex items-center gap-3 mb-6 p-3 bg-gray-50 rounded-lg">
            <div class="w-10 h-10 bg-brand-3 rounded-full flex items-center justify-center">
              <div class="w-6 h-6 relative">
                <div class="w-4 h-5 bg-black"></div>
              </div>
            </div>
            <div class="text-brand-1 font-medium">김철수</div>
          </div>

          <!-- Navigation Links -->
          <nav class="space-y-2">
            <div
              @click="toggleMobileMenu"
              class="block p-3 text-brand-1 font-medium hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
            >
              지도
            </div>
            <div
              @click="toggleMobileMenu"
              class="block p-3 text-brand-1 font-medium hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
            >
              채팅
            </div>
            <div
              @click="toggleMobileMenu"
              class="block p-3 text-brand-1 font-medium hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
            >
              알림
            </div>
            <div
              @click="toggleMobileMenu"
              class="block p-3 text-brand-1 font-medium hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
            >
              거래
            </div>
            <div
              @click="toggleMobileMenu"
              class="block p-3 text-brand-1 font-medium hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
            >
              마이페이지
            </div>
          </nav>

          <!-- Logout Button -->
          <div class="mt-6 pt-4 border-t border-gray-200">
            <button
              @click="handleLogout"
              class="w-full p-3 text-brand-1 font-semibold border border-brand-2 rounded-lg hover:bg-brand-2 hover:text-white transition-colors"
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
</style>
