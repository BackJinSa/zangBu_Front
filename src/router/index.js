import { createRouter, createWebHistory } from 'vue-router'

// 메인 페이지
import MainView from '@/pages/MainView.vue'
import MapView from '@/pages/map/MapView.vue'
import MapTestView from '@/pages/map/MapTestView.vue'

// 인증 관련 페이지
import LoginView from '@/pages/auth/LoginView.vue'
import SignupView from '@/pages/auth/SignupView.vue'
import FindIdView from '@/pages/auth/FindIdView.vue'
import FindPasswordView from '@/pages/auth/FindPasswordView.vue'

// 사용자 관련 페이지
import MyPageView from '@/pages/user/MyPageView.vue'
import ProfileEditView from '@/pages/user/ProfileEditView.vue'
import WithdrawView from '@/pages/user/WithdrawView.vue'

// 매물 관련 페이지
import PropertyDetailView from '@/pages/property/PropertyDetailView.vue'
import PropertyRegisterView from '@/pages/property/PropertyRegisterView.vue'

// 채팅 관련 페이지
import ChatListView from '@/pages/chat/ChatListView.vue'
import ChatSellerView from '@/pages/chat/ChatSellerView.vue'
import ChatBuyerView from '@/pages/chat/ChatBuyerView.vue'

// 거래 관련 페이지
import TradeGuideView from '@/pages/trade/TradeGuideView.vue'
import TradeSellerView from '@/pages/trade/TradeSellerView.vue'
import TradeBuyerView from '@/pages/trade/TradeBuyerView.vue'
import TradeWaitingView from '@/pages/trade/TradeWaitingView.vue'

// 문서 관련 페이지
import DocumentView from '@/pages/document/DocumentView.vue'
import AnalysisReportView from '@/pages/document/AnalysisReportView.vue'

// 리뷰 관련 페이지
import ReviewView from '@/pages/review/ReviewView.vue'
import ReviewWriteView from '@/pages/review/ReviewWriteView.vue'

// 알림 관련 페이지
import NotificationView from '@/pages/notification/NotificationView.vue'

// 결제 관련 페이지
import PaymentView from '@/pages/payment/PaymentView.vue'
import PaymentSuccessView from '@/pages/payment/PaymentSuccessView.vue'
import PaymentFailView from '@/pages/payment/PaymentFailView.vue'

// 가이드 페이지
import GuideMainView from '@/pages/guide/GuideMainView.vue'
import ColorGuideView from '@/pages/guide/ColorGuideView.vue'
import PropertyCardGuideView from '@/pages/guide/PropertyCardGuideView.vue'
import PropertyCardMainView from '@/pages/guide/PropertyCardMainView.vue'
import PropertyCardWaitingView from '@/pages/guide/PropertyCardWaitingView.vue'
import ButtonGuideView from '@/pages/guide/ButtonGuideView.vue'
import InputGuideView from '@/pages/guide/InputGuideView.vue'
import DropboxGuideView from '@/pages/guide/DropboxGuideView.vue'
import FooterGuideView from '@/pages/guide/FooterGuideView.vue'
import PopupModalGuideView from '@/pages/guide/PopupModalGuideView.vue'
import HeaderGuideView from '@/pages/guide/HeaderGuideView.vue'
import TailwindGuideView from '@/pages/guide/TailwindGuideView.vue'
import SidebarGuideView from '@/pages/guide/SidebarGuideView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // 메인 페이지
    {
      path: '/',
      name: 'main',
      component: MainView,
    },

    {
      path: '/map',
      name: 'map',
      component: MapView,
    },
    {
      path: '/map/test',
      name: 'map-test',
      component: MapTestView,
    },

    // 인증 관련 라우트
    {
      path: '/auth/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/auth/signup',
      name: 'signup',
      component: SignupView,
    },
    {
      path: '/auth/find-id',
      name: 'find-id',
      component: FindIdView,
    },
    {
      path: '/auth/find-password',
      name: 'find-password',
      component: FindPasswordView,
    },

    // 사용자 관련 라우트
    {
      path: '/user/mypage',
      name: 'mypage',
      component: MyPageView,
    },
    {
      path: '/user/profile-edit',
      name: 'profile-edit',
      component: ProfileEditView,
    },
    {
      path: '/user/withdraw',
      name: 'withdraw',
      component: WithdrawView,
    },

    // 매물 관련 라우트
    {
      path: '/property/detail/:id',
      name: 'property-detail',
      component: PropertyDetailView,
      props: true,
    },
    {
      path: '/property/register',
      name: 'property-register',
      component: PropertyRegisterView,
    },
    {
      path: '/property/waiting',
      name: 'property-waiting',
      component: PropertyCardWaitingView,
    },

    // 채팅 관련 라우트
    {
      path: '/chat/list',
      name: 'chat-list',
      component: ChatListView,
    },
    {
      path: '/chat/seller/:roomId',
      name: 'chat-seller',
      component: ChatSellerView,
      props: true,
    },
    {
      path: '/chat/buyer/:roomId',
      name: 'chat-buyer',
      component: ChatBuyerView,
      props: true,
    },

    // 거래 관련 라우트
    {
      path: '/trade/guide',
      name: 'trade-guide',
      component: TradeGuideView,
    },
    {
      path: '/trade/seller/:tradeId',
      name: 'trade-seller',
      component: TradeSellerView,
      props: true,
    },
    {
      path: '/trade/buyer/:tradeId',
      name: 'trade-buyer',
      component: TradeBuyerView,
      props: true,
    },
    {
      path: '/trade/waiting/:tradeId',
      name: 'trade-waiting',
      component: TradeWaitingView,
      props: true,
    },

    // 문서 관련 라우트
    {
      path: '/document',
      name: 'document',
      component: DocumentView,
    },
    {
      path: '/document/analysis-report/:propertyId',
      name: 'analysis-report',
      component: AnalysisReportView,
      props: true,
    },

    // 리뷰 관련 라우트
    {
      path: '/review',
      name: 'review',
      component: ReviewView,
    },
    {
      path: '/review/write',
      name: 'review-write',
      component: ReviewWriteView,
    },

    // 알림 관련 라우트
    {
      path: '/notification',
      name: 'notification',
      component: NotificationView,
    },

    // 결제 관련 라우트
    {
      path: '/payment',
      name: 'payment',
      component: PaymentView,
    },
    {
      path: '/payment/success',
      name: 'payment-success',
      component: PaymentSuccessView,
    },
    {
      path: '/payment/fail',
      name: 'payment-fail',
      component: PaymentFailView,
    },

    // 가이드 라우트
    {
      path: '/guide',
      name: 'guide',
      component: GuideMainView,
    },
    {
      path: '/guide/color-guide',
      name: 'color-guide',
      component: ColorGuideView,
    },
    {
      path: '/guide/property-card-guide',
      name: 'property-card-guide',
      component: PropertyCardGuideView,
    },
    {
      path: '/guide/property-card-main-guide',
      name: 'property-card-main-guide',
      component: PropertyCardMainView,
    },
    {
      path: '/guide/property-card-waiting-guide',
      name: 'property-card-waiting-guide',
      component: PropertyCardWaitingView,
    },
    {
      path: '/guide/button-guide',
      name: 'button-guide',
      component: ButtonGuideView,
    },
    {
      path: '/guide/input-guide',
      name: 'input-guide',
      component: InputGuideView,
    },
    {
      path: '/guide/dropbox-guide',
      name: 'dropbox-guide',
      component: DropboxGuideView,
    },
    {
      path: '/guide/footer-guide',
      name: 'footer-guide',
      component: FooterGuideView,
    },
    {
      path: '/guide/popup-modal-guide',
      name: 'popup-modal-guide',
      component: PopupModalGuideView,
    },
    {
      path: '/guide/header-guide',
      name: 'header-guide',
      component: HeaderGuideView,
    },
    {
      path: '/guide/tailwind-guide',
      name: 'tailwind-guide',
      component: TailwindGuideView,
    },
    {
      path: '/guide/sidebar-guide',
      name: 'sidebar-guide',
      component: SidebarGuideView,
    },
  ],
})

export default router
