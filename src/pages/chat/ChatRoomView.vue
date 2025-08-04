<template>
  <div class="w-full max-w-screen-xl mx-auto px-8 md:px-12 xl:px-16">
    <Header />
    <div class="flex flex-col h-screen bg-gray-50">
      <!-- 헤더 -->
      <header class="bg-[var(--brand-3)] text-white flex items-center justify-between px-4 py-3">
        <!-- 좌측 영역 -->
        <div class="flex items-start gap-3">
          <button @click="router.back()" class="text-white mt-1">
            <i class="fas fa-arrow-left"></i>
          </button>

          <div class="flex flex-col gap-1">
            <div class="flex items-center gap-2">
              <span class="font-semibold text-base">{{ otherNickname }}</span>
            </div>
            <div class="flex items-center gap-2 text-xs text-white/90">
              <i class="fas fa-home"></i>
              <span>{{ buildingName }}</span>
              <span
                class="text-xs bg-[var(--brand-2)] text-[var(--brand-5)] px-2 py-0.5 rounded-lg"
              >
                {{ sellerType }}
              </span>
            </div>
          </div>
        </div>

        <!-- 우측 영역 (판매자, 구매자에 따라 다르게) -->
        <div>
          <!--<div v-if="isSeller"> -->
          <div class="flex flex-col items-center text-sm">
            <span class="mb-1">거래 활성화</span>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" v-model="isActive" class="sr-only peer" />
              <div
                class="w-10 h-5 bg-[var(--brand-5)] peer-checked:bg-[var(--brand-2)] rounded-full transition-colors duration-300"
              ></div>
              <div
                class="absolute left-0 top-0 w-5 h-5 bg-white border rounded-full transition-transform duration-300 transform peer-checked:translate-x-5"
              ></div>
            </label>
          </div>
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
          <!-- 말풍선 -->
          <div
            :class="[
              msg.isMine
                ? 'self-end bg-[var(--brand-4)] text-gray-800'
                : 'self-start bg-[var(--brand-5)] border text-gray-800',
              'rounded-lg px-3 py-2 max-w-xs text-sm',
            ]"
          >
            <p>{{ msg.text }}</p>
          </div>

          <!-- 시간 -->
          <p
            :class="[
              msg.isMine
                ? 'self-end text-right text-xs text-gray-500 pr-1'
                : 'self-start text-xs text-gray-400 pl-1',
              'mt-1',
            ]"
          >
            {{ msg.time }}
          </p>
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
<<<<<<< HEAD
import Footer from '@/components/common/footer.vue'
import Header from '@/components/common/Header.vue'
=======
import Footer from '@/components/common/Footer.vue'
>>>>>>> aab147d479f3ae84fdda899e1956825413890a3f
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const isSeller = localStorage.getItem('userRole') === 'SELLER' // 'BUYER' or 'SELLER'
const isActive = ref(true) // 거래 활성화 toggle
const status = ref('중') // 거래 상태 (구매자용)

const otherNickname = '구매자김씨' //대화 상대방 닉네임
const buildingName = '강남 신축 빌라'
const sellerType = '집주인' // or '세입자'

const messages = ref([
  { text: '안녕하세요 매물에 관심 가져주셔서 감사합니다.', time: '오후 1:00', isMine: false },
  { text: '안녕하세요! 언제 방문 가능한지 궁금합니다.', time: '오전 11:05', isMine: true },
  { text: '이번 주말 언제든 가능합니다. 토요일 오후 어때요?', time: '오후 1:10', isMine: false },
  { text: '토요일 오후 2시 괜찮을까요?', time: '오전 11:15', isMine: true },
  { text: '네, 좋습니다! 그럼 토요일 오후 2시에 뵙겠습니다.', time: '오후 1:20', isMine: false },
])
const hasMore = ref(true)
const lastMessageId = ref(null) // 가장 오래된 메시지 ID 저장
const pageSize = 10 //한 번에 불러올 메시지 개수

const roomId = '123' // 예시 채팅방 ID

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
