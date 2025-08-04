import { Client } from '@stomp/stompjs'
import SockJS from 'sockjs-client'
import { useAuthStore } from '@/stores/auth'

let stompClient = null
let isConnected = false
let currentSubscription = null

export function useStomp() {
  const connect = (onConnectedCallback = () => {}) => {
    const authStore = useAuthStore()
    const token = authStore.accessToken

    stompClient = new Client({
      webSocketFactory: () => new SockJS('http://localhost:8080/ws-stomp'),
      reconnectDelay: 5000,

      // JWT를 Authorization 헤더로 포함
      connectHeaders: {
        Authorization: `Bearer ${token}`,
      },

      onConnect: () => {
        isConnected = true
        console.log('STOMP 연결 성공')
        onConnectedCallback()
      },

      onStompError: (frame) => {
        console.error('STOMP 오류:', frame)
      },
    })

    stompClient.activate()
  }

  const subscribe = (destination, callback) => {
    if (!isConnected || !stompClient) return

    if (currentSubscription) {
      currentSubscription.unsubscribe()
      currentSubscription = null
    }

    currentSubscription = stompClient.subscribe(destination, (message) => {
      callback(JSON.parse(message.body))
    })
  }

  const sendStompMessage = (destination, body) => {
    if (!isConnected || !stompClient) return
    stompClient.publish({
      destination,
      body: JSON.stringify(body),
    })
  }

  const disconnect = () => {
    if (stompClient) {
      stompClient.deactivate()
      stompClient = null
      isConnected = false
    }
  }

  return {
    connect,
    subscribe,
    sendStompMessage,
    disconnect,
  }
}
