// src/utils/fcm.js

// Firebase 메시징 기능에서 토큰 발급, 수신, 삭제 메서드 가져오기
import { getToken, onMessage, deleteToken } from 'firebase/messaging'
import { messaging } from '@/firebase'
import api from '@/api/axios'
import { useNotificationStore } from '@/stores/notification/notification'

// Firebase 콘솔 > 클라우드 메시징 > 웹 푸시 인증서에서 확인한 VAPID 공개 키
const VAPID_KEY =
  'BKhcEvdNGiKUI3wit7BYtwsVnqvdzVY3SsBnnzp4k5xvRgC6iHnjLpMDsV00NU1VRYvHCikwhP6WwPl7TA16lHA'

/**
 *   로그인시 브라우저 권한을 요청하고, FCM 토큰을 발급받아 서버에 등록한다.
 * - 권한 거부 시 null 반환
 * - 토큰 중복 등록 여부는 서버에서 판단
 */
export async function requestFcmToken() {
  try {
    const permission = await Notification.requestPermission()
    if (permission !== 'granted') {
      console.warn('알림 권한이 거부되었습니다.')
      return null
    }

    const token = await getToken(messaging, { vapidKey: VAPID_KEY })
    console.log('FCM Token:', token)

    // 발급받은 토큰을 서버에 등록 요청 (POST /api/fcm/register)
    // await api.post('/fcm/register', { token })

    return token
  } catch (e) {
    console.error('FCM 토큰 발급 또는 서버 등록 실패:', e)
    return null
  }
}

/**
 * 포그라운드에서 수신한 FCM 메시지를 처리한다.
 * - 서버에서 전송한 데이터 메시지를 받아 알림을 직접 띄운다.
 * - 클릭 시 지정된 URL로 이동한다.
 */
export function listenForegroundMessage() {
  onMessage(messaging, (payload) => {
    // 알림 스토어 인스턴스 가져오기
    const store = useNotificationStore()

    // 알림 store에 추가
    store.addNotificationFromFCM(payload)

    // 서버에서 전송한 데이터 메시지를 꺼낸다.
    const title = payload.data?.title
    const body = payload.data?.body
    const url = payload.data?.url

    if (!title || !body) {
      console.warn('포그라운드 알림 수신 실패: 제목 또는 내용 누락')
      return
    }

    // 브라우저 알림 띄우기
    const notification = new Notification(title, {
      body,
      data: { url },
    })

    // 알림 클릭 시 URL로 이동
    notification.onclick = () => {
      if (url) window.open(url, '_blank')
    }
  })
}

/**
 * 로그아웃 시 FCM 토큰을 서버 및 브라우저에서 삭제한다.
 * - 서버에 먼저 삭제 요청
 * - 이후 localStorage나 브라우저 캐시에서도 삭제
 */
export async function removeFcmToken() {
  try {
    const token = await getToken(messaging, { vapidKey: VAPID_KEY })
    if (token) {
      await api.post('/fcm/remove', { token })
      await deleteToken(messaging)
      console.log('FCM 토큰 삭제 완료')
    }
  } catch (e) {
    console.error('FCM 토큰 삭제 실패:', e)
  }
}
