<template>
  <!-- 드롭박스 컨테이너 -->
  <div class="relative w-32">
    <!-- 라벨 섹션 -->
    <div class="flex items-center mb-2">
      <!-- 라벨 텍스트 -->
      <span class="text-sm font-medium text-gray-700">드롭박스</span>
    </div>

    <!-- 드롭다운 선택기 (클릭 가능한 영역) -->
    <div
      class="flex items-center justify-between w-full h-10 px-3 bg-bg-2 border border-text-1 rounded-lg cursor-pointer transition-all duration-200 hover:border-brand-3 focus:outline-none focus:border-brand-3"
      :class="{ 'border-brand-3': isOpen }"
      @click="toggleDropdown"
    >
      <!-- 선택된 옵션 텍스트 또는 플레이스홀더 -->
      <span class="text-text-2 text-sm font-medium">{{ selectedOption || placeholder }}</span>
      <!-- 화살표 아이콘 (드롭다운 상태에 따라 회전) -->
      <svg
        class="w-4 h-4 text-text-1 transition-transform duration-200"
        :class="{ 'rotate-180': isOpen }"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fill-rule="evenodd"
          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
          clip-rule="evenodd"
        ></path>
      </svg>
    </div>

    <!-- 드롭다운 옵션 목록 (열린 상태일 때만 표시) -->
    <div
      v-if="isOpen"
      class="absolute top-full left-0 right-0 bg-bg-2 border border-text-1 border-t-0 rounded-b-lg shadow-lg z-10 max-h-50 overflow-y-auto"
    >
      <div
        v-for="option in options"
        :key="option.value"
        class="px-4 py-3 text-text-2 text-sm cursor-pointer transition-colors duration-200 hover:bg-bg-1 last:rounded-b-lg"
        @click="selectOption(option)"
      >
        {{ option.label }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

// Props 정의
const props = defineProps({
  // 드롭다운 옵션 배열 (기본값: 시간 범위 옵션들)
  options: {
    type: Array,
    default: () => [
      { value: '3years', label: '최근 3년' },
      { value: '1year', label: '최근 1년' },
      { value: '6months', label: '최근 6개월' },
      { value: '1month', label: '최근 1개월' },
    ],
  },
  // 플레이스홀더 텍스트
  placeholder: {
    type: String,
    default: '선택해주세요',
  },
  // v-model 바인딩을 위한 값
  modelValue: {
    type: [String, Number],
    default: null,
  },
})

// 이벤트 정의
const emit = defineEmits(['update:modelValue', 'change'])

// 반응형 데이터
const isOpen = ref(false) // 드롭다운 열림/닫힘 상태
const selectedValue = ref('3years') // 선택된 값 (기본값: 최근 3년)

// 선택된 옵션의 라벨을 계산하는 computed 속성
const selectedOption = computed(() => {
  const selected = props.options.find((option) => option.value === selectedValue.value)
  return selected ? selected.label : null
})

// 메서드들
/**
 * 드롭다운 열기/닫기 토글
 */
const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

/**
 * 옵션 선택 처리
 * @param {Object} option - 선택된 옵션 객체
 */
const selectOption = (option) => {
  selectedValue.value = option.value
  emit('update:modelValue', option.value) // v-model 업데이트
  emit('change', option) // change 이벤트 발생
  isOpen.value = false // 드롭다운 닫기
}

/**
 * 외부 클릭 시 드롭다운 닫기
 * @param {Event} event - 클릭 이벤트
 */
const closeDropdown = (event) => {
  // 드롭박스 컨테이너 외부 클릭 시에만 닫기
  if (!event.target.closest('.relative')) {
    isOpen.value = false
  }
}

// 라이프사이클 훅
// 컴포넌트 마운트 시 외부 클릭 이벤트 리스너 등록
onMounted(() => {
  document.addEventListener('click', closeDropdown)
})

// 컴포넌트 언마운트 시 이벤트 리스너 제거 (메모리 누수 방지)
onUnmounted(() => {
  document.removeEventListener('click', closeDropdown)
})
</script>
