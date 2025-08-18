<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    default: '전용 면적',
  },
  placeholder: {
    type: String,
    default: '예) 94.5',
  },
  unit: {
    type: String,
    default: '㎡',
  },

  required: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:modelValue'])

// 면적 포맷팅 함수 (소수점 첫째자리까지만 허용)
const formatArea = (value) => {
  if (!value) return ''
  let numericValue = value.toString().replace(/[^\d.]/g, '')

  // 맨 앞에 점이 오는 경우 제거
  if (numericValue.startsWith('.')) {
    numericValue = numericValue.substring(1)
  }

  const dotIndex = numericValue.indexOf('.')
  if (dotIndex !== -1) {
    const beforeDot = numericValue.substring(0, dotIndex)
    const afterDot = numericValue.substring(dotIndex + 1).replace(/\./g, '')
    const limitedAfterDot = afterDot.substring(0, 1) // 소수점 첫째자리까지만
    return beforeDot + '.' + limitedAfterDot
  }

  return numericValue
}

// 면적 입력 처리
const handleInput = (event) => {
  const value = event.target.value
  const formattedValue = formatArea(value)

  emit('update:modelValue', formattedValue)
  event.target.value = formattedValue
}

// 키 입력 검증 (숫자와 점만 허용)
const handleKeypress = (event) => {
  const char = event.key
  const currentValue = event.target.value

  // 숫자와 점이 아닌 경우 차단
  if (!/[\d.]/.test(char)) {
    event.preventDefault()
    return
  }

  // 이미 소수점이 있는데 또 소수점을 입력하려는 경우 차단
  if (char === '.' && currentValue.includes('.')) {
    event.preventDefault()
    return
  }

  // 소수점 이후 이미 한 자리가 있는데 더 입력하려는 경우 차단
  if (currentValue.includes('.')) {
    const afterDot = currentValue.split('.')[1]
    if (afterDot && afterDot.length >= 1 && /\d/.test(char)) {
      event.preventDefault()
      return
    }
  }
}
</script>

<template>
  <div>
    <label class="block text-sm font-medium text-text-2 mb-3">
      {{ label }}
    </label>
    <div class="flex items-center space-x-2">
      <input
        :value="modelValue"
        @input="handleInput"
        @keypress="handleKeypress"
        type="text"
        :placeholder="placeholder"
        class="w-full px-4 py-3 text-base leading-6 text-text-2 bg-bg-2 border border-bg-1 rounded-lg outline-none box-border placeholder:text-text-1 placeholder:text-base focus:border-brand-3 focus:ring-1 focus:ring-brand-3 transition-colors"
      />
      <span class="text-base font-medium text-text-2">{{ unit }}</span>
    </div>
  </div>
</template>
