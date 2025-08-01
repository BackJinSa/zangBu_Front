<template>
  <!--
    공용 Button 컴포넌트
    - 10가지 variant 지원 (button1 ~ button10)
    - 3가지 size 지원 (sm, md, lg)
    - 아이콘 지원 (왼쪽/오른쪽)
    - 전체 너비 옵션
    - 비활성화 상태 지원
  -->
  <button
    :class="[
      'inline-flex items-center justify-center font-medium transition-colors duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed',
      // Variant styles - 버튼 스타일 (색상, 배경 등)
      variantClasses[variant],
      // Size classes - 버튼 크기 (패딩, 폰트 크기 등)
      sizeClasses[size],
      // Full width - 전체 너비 옵션
      { 'w-full': fullWidth },
    ]"
    :style="buttonStyles"
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    <!-- 왼쪽 아이콘 (iconRight가 false일 때) -->
    <i v-if="icon && !iconRight" :class="[icon, 'mr-2', iconSizeClasses[size]]"></i>

    <!-- 버튼 텍스트 (slot으로 외부에서 주입) -->
    <span v-if="$slots.default">
      <slot />
    </span>

    <!-- 오른쪽 아이콘 (iconRight가 true일 때) -->
    <i v-if="icon && iconRight" :class="[icon, 'ml-2', iconSizeClasses[size]]"></i>
  </button>
</template>

<script setup>
import { computed } from 'vue'

// Props 정의
const props = defineProps({
  // 버튼 스타일 변형 (10가지 옵션)
  variant: {
    type: String,
    default: 'primary',
    validator: (value) =>
      [
        'button1',
        'button2',
        'button3',
        'button4',
        'button5',
        'button6',
        'button7',
        'button8',
        'button9',
        'button10',
      ].includes(value),
  },
  // 버튼 크기 (sm, md, lg)
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value),
  },
  // 아이콘 컴포넌트 (문자열 또는 컴포넌트 객체)
  icon: {
    type: [String, Object],
    default: null,
  },
  // 아이콘을 오른쪽에 배치할지 여부
  iconRight: {
    type: Boolean,
    default: false,
  },
  // 전체 너비 사용 여부
  fullWidth: {
    type: Boolean,
    default: false,
  },
  // 버튼 비활성화 여부
  disabled: {
    type: Boolean,
    default: false,
  },
})

// 이벤트 정의
defineEmits(['click'])

// 인라인 스타일 계산 (CSS 변수 사용)
const buttonStyles = computed(() => {
  // 기본 스타일
  const baseStyles = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '500',
    borderRadius: '8px',
    transition: 'background-color 0.15s ease',
    cursor: 'pointer',
    border: 'none',
    outline: 'none',
  }

  // 버튼별 고정 크기 설정
  let buttonSizeStyles = {}
  switch (props.variant) {
    case 'button1':
    case 'button2':
    case 'button3':
    case 'button4':
      buttonSizeStyles = { width: '200px', height: '50px' }
      break
    case 'button5':
    case 'button6':
      buttonSizeStyles = { width: '83px', height: '38px' }
      break
    case 'button7':
      buttonSizeStyles = { width: '60px', height: '38px' }
      break
    case 'button8':
      buttonSizeStyles = { width: '105px', height: '34px' }
      break
    case 'button9':
    case 'button10':
      buttonSizeStyles = { width: '183px', height: '40px' }
      break
    default:
      buttonSizeStyles = {}
  }

  // 버튼 스타일별 색상 및 스타일 정의
  switch (props.variant) {
    case 'button1':
      return {
        ...baseStyles,
        ...buttonSizeStyles,
        backgroundColor: 'var(--brand-3)',
        color: 'var(--text-3)',
      } // 진한 녹색 배경, 흰색 텍스트
    case 'button2':
      return {
        ...baseStyles,
        ...buttonSizeStyles,
        backgroundColor: 'var(--brand-4)',
        color: 'var(--text-3)',
      } // 연한 녹색 배경, 흰색 텍스트
    case 'button3':
      return {
        ...baseStyles,
        ...buttonSizeStyles,
        backgroundColor: 'var(--status-1)',
        color: 'var(--text-3)',
      } // 파란색 배경, 흰색 텍스트
    case 'button4':
      return {
        ...baseStyles,
        ...buttonSizeStyles,
        backgroundColor: 'var(--status-1)',
        color: 'var(--text-3)',
      } // 파란색 배경 (아이콘용), 흰색 텍스트
    case 'button5':
      return {
        ...baseStyles,
        ...buttonSizeStyles,
        backgroundColor: 'transparent',
        color: 'var(--brand-1)',
        border: '1px solid var(--brand-1)',
      } // 투명 배경, 녹색 테두리, 녹색 텍스트
    case 'button6':
      return {
        ...baseStyles,
        ...buttonSizeStyles,
        backgroundColor: 'var(--brand-3)',
        color: 'var(--text-3)',
      } // 진한 녹색 배경, 흰색 텍스트
    case 'button7':
      return {
        ...baseStyles,
        ...buttonSizeStyles,
        backgroundColor: 'transparent',
        color: 'var(--brand-3)',
        border: '1px solid var(--brand-3)',
      } // 투명 배경, 진한 녹색 테두리, 진한 녹색 텍스트
    case 'button8':
      return {
        ...baseStyles,
        ...buttonSizeStyles,
        backgroundColor: 'var(--brand-3)',
        color: 'var(--text-3)',
      } // 진한 녹색 배경 (전체 너비용), 흰색 텍스트
    case 'button9':
      return {
        ...baseStyles,
        ...buttonSizeStyles,
        backgroundColor: 'var(--status-2)',
        color: 'var(--text-3)',
      } // 빨간색 배경, 흰색 텍스트
    case 'button10':
      return {
        ...baseStyles,
        ...buttonSizeStyles,
        backgroundColor: 'var(--bg-2)',
        color: 'var(--text-2)',
        border: '1px solid var(--text-1)',
      } // 흰색 배경, 회색 테두리, 회색 텍스트
    default:
      return {
        ...baseStyles,
        ...buttonSizeStyles,
        backgroundColor: 'var(--status-1)',
        color: 'var(--text-3)',
      }
  }
})

// Tailwind CSS 클래스 기반 스타일 (hover 효과 포함)
const variantClasses = {
  button1: 'bg-green-600 hover:bg-green-700 text-white', // 진한 녹색
  button2: 'bg-green-400 hover:bg-green-500 text-white', // 연한 녹색
  button3: 'bg-blue-600 hover:bg-blue-700 text-white', // 파란색
  button4: 'bg-blue-600 hover:bg-blue-700 text-white', // 파란색 (아이콘용)
  button5:
    'bg-transparent border text-green-600 border-green-600 hover:bg-green-600 hover:text-white', // 테두리만
  button6: 'bg-green-600 hover:bg-green-700 text-white', // 진한 녹색
  button7:
    'bg-transparent border text-green-600 border-green-600 hover:bg-green-600 hover:text-white', // 테두리만
  button8: 'bg-green-600 hover:bg-green-700 text-white', // 전체 너비 녹색
  button9: 'bg-red-600 hover:bg-red-700 text-white', // 빨간색
  button10: 'bg-white hover:bg-gray-50 text-gray-900 border border-gray-300', // 흰색
}

// 크기별 패딩 및 폰트 크기 클래스
const sizeClasses = {
  sm: 'px-8 py-4 text-sm', // 작은 크기
  md: 'px-12 py-6 text-base', // 중간 크기 (기본값)
  lg: 'px-16 py-8 text-lg', // 큰 크기
}

// 아이콘 크기 클래스
const iconSizeClasses = {
  sm: 'w-4 h-4', // 작은 아이콘
  md: 'w-5 h-5', // 중간 아이콘 (기본값)
  lg: 'w-6 h-6', // 큰 아이콘
}
</script>

<style scoped>
/* 추가 커스텀 스타일이 필요한 경우 여기에 작성 */
</style>
