<template>
  <div class="page-container">
    <div class="chat-list-wrapper">
      <!-- 헤더 -->
      <div class="chat-list-header">
        <button @click="router.back()" class="back-button">
          <i class="fas fa-arrow-left"></i>
        </button>
        <h3>채팅방 목록</h3>
      </div>

      <main class="chat-content">
        <!-- 필터 탭 -->
        <div class="chat-tab-container">
          <div
            v-for="tab in tabs"
            :key="tab.type"
            :class="['chat-tab', { active: tab.type === selectedTab }]"
            @click="selectTab(tab.type)"
          >
            <div class="count">
              {{ tab.count }}
              <span v-if="tab.unread > 0" class="tab-unread">{{ tab.unread }}</span>
            </div>
            <div class="label">{{ tab.label }}</div>
          </div>
        </div>

        <!-- 채팅방 리스트 -->
        <div class="chat-room-list">
          <div
            v-for="room in paginatedRooms"
            :key="room.chatRoomId"
            class="chat-room-item"
            @click="goToChatRoom(room.chatRoomId)"
          >
            <div
              class="chat-avatar"
              :style="{
                backgroundColor: room.type === 'BUY' ? 'var(--brand-3)' : 'var(--brand-2)',
              }"
            >
              {{ room.sellerNickname.charAt(0) }}
            </div>
            <div class="chat-room-content">
              <div class="chat-room-header">
                <div class="nickname-and-badges">
                  <div>
                    <div class="nickname-and-badges">
                      <span class="nickname">{{ room.sellerNickname }}</span>
                      <div class="badges">
                        <span class="badge role">{{ room.sellerType }}</span>
                        <span class="badge status">{{ room.status }}</span>
                      </div>
                    </div>
                    <div class="building-info">
                      🏠 {{ room.buildingName }} | 💰 전세 {{ room.price }}억
                    </div>
                  </div>
                </div>
                <span class="time">{{ room.lastMessageTime }}</span>
              </div>
              <div class="message">{{ room.lastMessage }}</div>
            </div>
            <div v-if="room.unreadCount > 0" class="unread-badge">{{ room.unreadCount }}</div>
          </div>
        </div>

        <VueAwesomePaginate
          :total-pages="totalPages"
          :max-pages-shown="5"
          :current-page="currentPage"
          @page-click="changePage"
        />
      </main>
    </div>
    <Footer class="mt-12" />
  </div>
</template>

<script setup>
import Footer from '@/components/common/footer.vue'
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

<style>
/* 전체 레이아웃 */
.chat-list-wrapper {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px 20px;
  background-color: #f8f9fa;
  min-height: 100vh;

  display: flex;
  flex-direction: column;
}

.chat-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

/* 헤더 (뒤로가기 + 타이틀) */
.chat-list-header {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 18px;
  margin-bottom: 20px;
}

.back-button {
  background: none;
  border: none;
  font-size: 18px;
  color: var(--text-1);
  cursor: pointer;
  transition: all 0.2s ease;
}

.back-button:hover {
  color: var(--brand-1);
  transform: scale(1.1);
}

.chat-tab-container {
  display: flex;
  justify-content: center;
  margin: 24px 0;
  gap: 40px; /* 모바일 기본 간격 */
}

@media (min-width: 768px) {
  .chat-tab-container {
    gap: 260px; /* 데스크탑 기준 간격 - 채팅방 카드 폭 기준 */
  }
}

.chat-tab {
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  cursor: pointer;
  color: var(--text-1);
  transition: color 0.2s ease;
  position: relative;
}

.chat-tab.active {
  color: black;
  font-weight: bold;
}

.chat-tab .count {
  font-size: 20px;
  font-weight: bold;
  line-height: 1.2;
}

.chat-tab .label {
  margin-top: 6px;
  font-size: 14px;
}

.tab-unread {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-left: 6px;
  width: 16px;
  height: 16px;
  font-size: 11px;
  font-weight: 600;
  background-color: var(--status-1); /* 파란색 */
  color: white;
  border-radius: 50%;
  line-height: 1;
}
/* 채팅방 리스트 */
.chat-room-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.chat-room-item {
  display: flex;
  align-items: flex-start;
  background-color: var(--bg-2);
  padding: 16px 16px 24px 16px;
  border-radius: 8px;
  position: relative;
  cursor: pointer;
}

/* 아바타 */
.chat-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  font-weight: bold;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  flex-shrink: 0;
}

/* 채팅방 내부 구조 */
.chat-room-content {
  flex: 1;
}

.chat-room-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 6px;
  font-size: 14px;
  color: var(--text-2);
}

.nickname-and-badges {
  display: flex;
  align-items: center;
  gap: 8px;
}
.building-info {
  font-size: 13px;
  color: var(--text-1);
  margin-top: 2px;
}
.nickname {
  font-weight: 600;
}

.badges {
  display: flex;
  gap: 4px;
}

.badge {
  font-size: 12px;
  padding: 2px 6px;
  border-radius: 4px;
  color: var(--text-3);
}

.badge.role {
  background-color: var(--brand-3);
}

.badge.status {
  background-color: var(--status-1);
}

.time {
  font-size: 12px;
  color: var(--text-1);
}

.message {
  color: var(--text-1);
  font-size: 14px;
}

.unread-badge {
  position: absolute;
  right: 12px;
  bottom: 12px;
  background-color: var(--brand-3);
  color: white;
  font-size: 12px;
  padding: 2px 6px;
  border-radius: 9999px;
}

/* 페이지네이션 스타일 */
:deep(.vue-awesome-paginate) {
  display: flex;
  justify-content: center;
  margin-top: 24px;
  gap: 8px;
}

:deep(.paginate-buttons) {
  padding: 6px 10px;
  border-radius: 4px;
  cursor: pointer;
  background-color: white;
  border: 1px solid var(--brand-3);
  color: var(--brand-3);
  font-weight: bold;
}

:deep(.paginate-buttons:hover) {
  background-color: var(--brand-3);
  color: white;
}

:deep(.active-page) {
  background-color: var(--brand-3);
  color: white;
}
.page-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}
</style>
