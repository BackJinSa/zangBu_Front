// src/firebase.js

// Firebase SDK에서 앱 초기화와 메시징 모듈을 불러온다
import { initializeApp } from 'firebase/app'
import { getMessaging } from 'firebase/messaging'

// Firebase 콘솔에서 발급받은 설정 객체
const firebaseConfig = {
  apiKey: 'AIzaSyAx8A7u6OhgWNSUjFxTLYQqUI17frcQY9M',
  authDomain: 'fcm-test-51db7.firebaseapp.com',
  projectId: 'fcm-test-51db7',
  storageBucket: 'fcm-test-51db7.firebasestorage.app',
  messagingSenderId: '765798992395',
  appId: '1:765798992395:web:0ea90bb7d48b6d6aab550e',
  measurementId: 'G-175XSF6FBH',
}

// Firebase 앱 초기화
const firebaseApp = initializeApp(firebaseConfig)

// Firebase 메시징 객체 생성
const messaging = getMessaging(firebaseApp)

// 외부에서 사용할 수 있도록 export
export { firebaseApp, messaging }
