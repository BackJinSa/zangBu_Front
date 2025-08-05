<template>
  <div class="w-full max-w-screen-xl mx-auto">
    <div class="flex flex-col min-h-screen bg-[var(--bg-1)] py-6 px-4 md:px-6 xl:px-8">
      <div class="flex items-center gap-3 text-lg mb-5">
        <button @click="router.back()" class="text-[var(--text-1)] hover:text-[var(--brand-1)]">
          <i class="fas fa-arrow-left"></i>
        </button>
        <h3 class="font-semibold">채팅방 목록</h3>
      </div>

      <main class="flex-1 flex flex-col">
        <!-- 필터 탭 -->
        <div class="flex justify-center my-6 gap-10 md:gap-[260px]">
          <div
            v-for="tab in tabs"
            :key="tab.type"
            :class="[
              'flex flex-col-reverse items-center cursor-pointer text-[var(--text-1)] transition',
              tab.type === selectedTab ? 'text-black font-bold' : '',
            ]"
            @click="selectTab(tab.type)"
          >
            <div class="text-xl font-bold">
              {{ tab.count }}
              <span
                v-if="tab.unread > 0"
                class="inline-flex items-center justify-center ml-1 w-4 h-4 text-[11px] font-semibold bg-[var(--status-1)] text-white rounded-full"
              >
                {{ tab.unread }}
              </span>
            </div>
            <div class="mt-1 text-sm">{{ tab.label }}</div>
          </div>
        </div>

        <!-- 채팅방 리스트 -->
        <div class="flex flex-col gap-4">
          <div
            v-for="room in paginatedRooms"
            :key="room.chatRoomId"
            class="flex items-start bg-[var(--bg-2)] p-4 rounded-lg relative cursor-pointer"
            @click="goToChatRoom(room.chatRoomId)"
          >
            <div
              class="w-10 h-10 rounded-full text-white font-bold text-base flex items-center justify-center mr-3 flex-shrink-0"
              :style="{
                backgroundColor: room.type === 'BUY' ? 'var(--brand-3)' : 'var(--brand-2)',
              }"
            >
              {{ room.sellerNickname.charAt(0) }}
            </div>

            <div class="flex-1">
              <div class="flex items-center justify-between text-sm text-[var(--text-2)] mb-1">
                <div>
                  <div class="flex items-center gap-2">
                    <span class="font-semibold">{{ room.sellerNickname }}</span>
                    <div class="flex gap-1">
                      <span class="text-xs px-2 py-1 rounded bg-[var(--brand-3)] text-white">{{
                        room.sellerType
                      }}</span>
                      <span class="text-xs px-2 py-1 rounded bg-[var(--status-1)] text-white">{{
                        room.status
                      }}</span>
                    </div>
                  </div>
                  <div class="text-xs text-[var(--text-1)] mt-0.5">
                    <i class="fa-solid fa-house fa-lg"></i>
                    {{ room.buildingName }} | <i class="fa-solid fa-sack-dollar"></i> 전세
                    {{ room.price }}억
                  </div>
                </div>
                <span class="text-xs text-[var(--text-1)]">{{ room.lastMessageTime }}</span>
              </div>
              <div class="text-sm text-[var(--text-1)]">{{ room.lastMessage }}</div>
            </div>

            <div
              v-if="room.unreadCount > 0"
              class="absolute right-3 bottom-3 text-xs px-2 py-0.5 rounded-full bg-[var(--brand-3)] text-white"
            >
              {{ room.unreadCount }}
            </div>
          </div>
        </div>

        <VueAwesomePaginate
          :total-pages="totalPages"
          :max-pages-shown="5"
          :current-page="currentPage"
          @page-click="changePage"
          class="flex justify-center mt-6 gap-2"
        />
      </main>
    </div>
    <Footer class="mt-12" />
  </div>
</template>

<script setup>
import Footer from '@/components/common/Footer.vue'
import 'vue-awesome-paginate/dist/style.css'
import { ref, onMounted, watch, computed } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import VueAwesomePaginate from 'vue-awesome-paginate'

const router = useRouter()
const filterType = ref('ALL')

// const chatRooms = ref([]);
// 임의의 데이터
const chatRooms = ref([
  {
    chatRoomId: 'test-1',
    sellerNickname: '김민준',
    sellerType: '집주인',
    status: '거래 진행 중',
    buildingName: '강남 모던 아파트',
    price: 5,
    lastMessage: '방문 시간 조율 가능합니다. 언제쯤 괜찮으세요?',
    lastMessageTime: '15:30',
    unreadCount: 2,
    type: 'BUY',
  },
  {
    chatRoomId: 'test-2',
    sellerNickname: '이서연',
    sellerType: '세입자',
    status: '완료',
    buildingName: '분당 가족 주택',
    price: 3.2,
    lastMessage: '관심 있으시면 언제든 연락 주세요!',
    lastMessageTime: '11:15',
    unreadCount: 0,
    type: 'SELL',
  },
  {
    chatRoomId: 'test-3',
    sellerNickname: '박지후',
    sellerType: '집주인',
    status: '거래 대기 중',
    buildingName: '서초 트리플하우스',
    price: 4.5,
    lastMessage: '계약 조건 확인했습니다.',
    lastMessageTime: '10:10',
    unreadCount: 1,
    type: 'BUY',
  },
  {
    chatRoomId: 'test-4',
    sellerNickname: '정은채',
    sellerType: '세입자',
    status: '진행 중',
    buildingName: '송파 타워뷰',
    price: 3.7,
    lastMessage: '방문 일정 잡으려면?',
    lastMessageTime: '09:15',
    unreadCount: 0,
    type: 'SELL',
  },
  {
    chatRoomId: 'test-5',
    sellerNickname: '최정훈',
    sellerType: '집주인',
    status: '완료',
    buildingName: '마포 해링턴',
    price: 4.2,
    lastMessage: '수고하셨습니다!',
    lastMessageTime: '08:45',
    unreadCount: 0,
    type: 'SELL',
  },
  {
    chatRoomId: 'test-6',
    sellerNickname: '홍길동',
    sellerType: '세입자',
    status: '거래 대기 중',
    buildingName: '은평 타운빌',
    price: 2.3,
    lastMessage: '언제 보실 수 있으세요?',
    lastMessageTime: '08:00',
    unreadCount: 0,
    type: 'BUY',
  },
  {
    chatRoomId: 'test-7',
    sellerNickname: '김소현',
    sellerType: '집주인',
    status: '완료',
    buildingName: '용산 스테이트',
    price: 5.5,
    lastMessage: '확인 감사합니다!',
    lastMessageTime: '07:55',
    unreadCount: 0,
    type: 'BUY',
  },
  {
    chatRoomId: 'test-8',
    sellerNickname: '이지훈',
    sellerType: '세입자',
    status: '거래 진행 중',
    buildingName: '신촌 오피스텔',
    price: 2.9,
    lastMessage: '지금도 거래 가능한가요?',
    lastMessageTime: '07:30',
    unreadCount: 1,
    type: 'SELL',
  },
  {
    chatRoomId: 'test-9',
    sellerNickname: '박채린',
    sellerType: '집주인',
    status: '거래 대기 중',
    buildingName: '강서 힐스테이트',
    price: 4.1,
    lastMessage: '꼼꼼히 봐주셔서 감사해요.',
    lastMessageTime: '07:00',
    unreadCount: 2,
    type: 'BUY',
  },
  {
    chatRoomId: 'test-10',
    sellerNickname: '한지민',
    sellerType: '세입자',
    status: '완료',
    buildingName: '노원 센트럴',
    price: 2.8,
    lastMessage: '계약 완료됐습니다.',
    lastMessageTime: '06:50',
    unreadCount: 0,
    type: 'SELL',
  },
  {
    chatRoomId: 'test-11',
    sellerNickname: '고수진',
    sellerType: '집주인',
    status: '진행 중',
    buildingName: '광진 블루힐',
    price: 3.5,
    lastMessage: '서류 전달드릴게요.',
    lastMessageTime: '06:40',
    unreadCount: 1,
    type: 'BUY',
  },
  {
    chatRoomId: 'test-12',
    sellerNickname: '윤도현',
    sellerType: '세입자',
    status: '거래 대기 중',
    buildingName: '중랑 에버타운',
    price: 3.0,
    lastMessage: '지금 통화 괜찮을까요?',
    lastMessageTime: '06:20',
    unreadCount: 0,
    type: 'SELL',
  },
  {
    chatRoomId: 'test-13',
    sellerNickname: '장서연',
    sellerType: '집주인',
    status: '진행 중',
    buildingName: '성동 구름마을',
    price: 3.7,
    lastMessage: '네 그렇게 진행하겠습니다.',
    lastMessageTime: '06:00',
    unreadCount: 0,
    type: 'BUY',
  },
  {
    chatRoomId: 'test-14',
    sellerNickname: '최민호',
    sellerType: '세입자',
    status: '완료',
    buildingName: '강북 산타운',
    price: 2.4,
    lastMessage: '계약서 전송 완료했습니다.',
    lastMessageTime: '05:45',
    unreadCount: 0,
    type: 'SELL',
  },
  {
    chatRoomId: 'test-15',
    sellerNickname: '김연아',
    sellerType: '집주인',
    status: '거래 진행 중',
    buildingName: '잠실 롯데캐슬',
    price: 6.1,
    lastMessage: '오늘 오후 시간 되세요?',
    lastMessageTime: '05:30',
    unreadCount: 1,
    type: 'BUY',
  },
  {
    chatRoomId: 'test-16',
    sellerNickname: '정우성',
    sellerType: '세입자',
    status: '진행 중',
    buildingName: '송파 푸르지오',
    price: 4.8,
    lastMessage: '방금 확인했어요!',
    lastMessageTime: '05:15',
    unreadCount: 0,
    type: 'SELL',
  },
  {
    chatRoomId: 'test-17',
    sellerNickname: '배수지',
    sellerType: '집주인',
    status: '완료',
    buildingName: '동작 파크뷰',
    price: 3.3,
    lastMessage: '거래 완료되었습니다.',
    lastMessageTime: '05:00',
    unreadCount: 0,
    type: 'BUY',
  },
  {
    chatRoomId: 'test-18',
    sellerNickname: '이준기',
    sellerType: '세입자',
    status: '거래 진행 중',
    buildingName: '도봉 드림하우스',
    price: 2.6,
    lastMessage: '언제쯤 다시 연락드리면 될까요?',
    lastMessageTime: '04:40',
    unreadCount: 1,
    type: 'SELL',
  },
  {
    chatRoomId: 'test-19',
    sellerNickname: '문지애',
    sellerType: '집주인',
    status: '거래 대기 중',
    buildingName: '관악 스카이뷰',
    price: 3.8,
    lastMessage: '좋은 조건이라 생각합니다.',
    lastMessageTime: '04:20',
    unreadCount: 0,
    type: 'BUY',
  },
  {
    chatRoomId: 'test-20',
    sellerNickname: '송강',
    sellerType: '세입자',
    status: '진행 중',
    buildingName: '동대문 리버뷰',
    price: 4.0,
    lastMessage: '연락 주셔서 감사합니다!',
    lastMessageTime: '04:00',
    unreadCount: 0,
    type: 'SELL',
  },
])

//  탭 정보 자동 계산 함수
const updateTabs = () => {
  const buyRooms = chatRooms.value.filter((r) => r.type === 'BUY')
  const sellRooms = chatRooms.value.filter((r) => r.type === 'SELL')
  const buyUnread = buyRooms.filter((r) => r.unreadCount > 0).length
  const sellUnread = sellRooms.filter((r) => r.unreadCount > 0).length
  const allUnread = chatRooms.value.filter((r) => r.unreadCount > 0).length

  tabs.value = [
    { label: '전체', type: 'ALL', count: chatRooms.value.length, unread: allUnread },
    { label: '구매', type: 'BUY', count: buyRooms.length, unread: buyUnread },
    { label: '판매', type: 'SELL', count: sellRooms.length, unread: sellUnread },
  ]
}

//  탭 상태
const tabs = ref([
  { label: '전체', type: 'ALL', count: 0, unread: 0 },
  { label: '구매', type: 'BUY', count: 0, unread: 0 },
  { label: '판매', type: 'SELL', count: 0, unread: 0 },
])

// 페이지네이션 관련 상태
const currentPage = ref(1)
const pageSize = 5
const totalCount = ref(chatRooms.value.length)
const totalPages = computed(() => Math.ceil(totalCount.value / pageSize))

onMounted(() => {
  console.log('총 페이지 수:', totalPages.value)
})

// 페이지네이션용 필터링된 채팅방 목록 계산
const paginatedRooms = computed(() => {
  const filtered =
    filterType.value === 'ALL'
      ? chatRooms.value
      : chatRooms.value.filter((r) => r.type === filterType.value)

  totalCount.value = filtered.length // 탭 클릭 시 count 갱신용
  return filtered.slice((currentPage.value - 1) * pageSize, currentPage.value * pageSize)
})

// 페이지 변경 시
const changePage = (page) => {
  currentPage.value = page
}

// 탭 선택 시
const selectTab = (type) => {
  filterType.value = type
  currentPage.value = 1
}

// watch & 초기 실행
watch(chatRooms, updateTabs, { immediate: true })

// onMounted(fetchChatRooms) //백엔드 연결 후 주석 해제

const goToChatRoom = (roomId) => {
  router.push(`/chat/room/${roomId}`)
}
</script>
