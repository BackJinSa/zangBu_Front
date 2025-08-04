<template>
  <div class="page-container">
    <div class="flex flex-col h-screen bg-gray-50">
      <!-- 헤더 -->
      <header class="bg-[var(--brand-3)] text-white flex items-center justify-between px-4 py-3">
        <div class="flex items-center gap-2">
          <button @click="router.back()" class="text-white">
            <i class="fas fa-arrow-left"></i>
          </button>
          <h2 class="font-semibold text-lg">{{ otherNickname }}</h2>
          <span class="bg-white text-[var(--brand-1)] text-xs font-semibold px-2 py-1 rounded"
            >상대방</span
          >
        </div>

        <!-- 역할에 따라 우측 표시 -->
        <div>
          <!--<div v-if="isSeller"> -->
          <label class="flex items-center gap-2 text-sm cursor-pointer">
            거래 활성화
            <div class="relative">
              <input type="checkbox" v-model="isActive" class="sr-only peer" id="toggle-active" />
              <div
                class="w-10 h-5 rounded-full shadow-inner transition-colors duration-300 peer-checked:bg-[var(--brand-2)] bg-[var(--brand-5)]"
              ></div>
              <div
                class="absolute top-0 left-0 w-5 h-5 bg-white rounded-full shadow transition-transform duration-300 peer-checked:translate-x-5"
              ></div>
            </div>
          </label>
        </div>
        <!-- <div v-else>
        <span
          class="text-xs font-medium px-2 py-1 rounded"
          :class="{
            'bg-blue-100 text-blue-600': status === '진행',
            'bg-yellow-100 text-yellow-600': status === '중',
            'bg-gray-100 text-gray-500': status === '완료',
          }"
        >
          거래 {{ status }}
        </span>
      </div> -->
      </header>

      <!-- 채팅 내용 -->
      <main class="flex-1 overflow-y-auto px-4 py-3 space-y-4">
        <div v-for="(msg, index) in messages" :key="index" class="flex flex-col">
          <div
            v-if="msg.isMine"
            class="self-end bg-[var(--brand-4)] text-gray-800 rounded-lg px-3 py-2 max-w-xs text-sm"
          >
            <p>{{ msg.text }}</p>
            <p class="text-right text-xs text-gray-500 mt-1">{{ msg.time }}</p>
          </div>
          <div
            v-else
            class="self-start bg-[var(--brand-5)] border rounded-lg px-3 py-2 max-w-xs text-sm"
          >
            <p>{{ msg.text }}</p>
            <p class="text-right text-xs text-gray-400 mt-1">{{ msg.time }}</p>
          </div>
        </div>
      </main>

      <!-- 입력창 -->
      <footer class="px-4 py-3 bg-white border-t flex items-center gap-2">
        <input
          v-model="newMessage"
          @keyup.enter="sendMessage"
          type="text"
          placeholder="메시지를 입력하세요..."
          class="flex-1 border rounded-full px-4 py-2 text-sm focus:outline-none"
        />
        <button
          @click="sendMessage"
          class="w-10 h-10 flex items-center justify-center bg-[var(--brand-3)] text-white rounded-lg hover:bg-[var(--brand-2)]"
        >
          <i class="fas fa-paper-plane text-base"></i>
        </button>
      </footer>
    </div>
    <Footer class="mt-12" />
  </div>
</template>

<script setup>
import Footer from '@/components/common/footer.vue'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const isSeller = localStorage.getItem('userRole') === 'SELLER' // 'BUYER' or 'SELLER'
const isActive = ref(true) // 거래 활성화 toggle
const status = ref('중') // 거래 상태 (구매자용)

const otherNickname = '구매자김씨' // 상대방 닉네임

const messages = ref([
  { text: '안녕하세요 매물에 관심 가져주셔서 감사합니다.', time: '오후 1:00', isMine: false },
  { text: '안녕하세요! 언제 방문 가능한지 궁금합니다.', time: '오전 11:05', isMine: true },
  { text: '이번 주말 언제든 가능합니다. 토요일 오후 어때요?', time: '오후 1:10', isMine: false },
  { text: '토요일 오후 2시 괜찮을까요?', time: '오전 11:15', isMine: true },
  { text: '네, 좋습니다! 그럼 토요일 오후 2시에 뵙겠습니다.', time: '오후 1:20', isMine: false },
])

const newMessage = ref('')

const sendMessage = () => {
  if (!newMessage.value.trim()) return
  messages.value.push({
    text: newMessage.value,
    time: new Date().toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }),
    isMine: true,
  })
  newMessage.value = ''
}
</script>

<style scoped>
/* 토글 스위치 */
.toggle-label {
  transition: background-color 0.3s ease;
}
.toggle-ball {
  transition: transform 0.3s ease;
}
.page-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}
</style>
