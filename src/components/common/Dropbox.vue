<template>
  <!-- 드롭박스 컨테이너 -->
  <div class="dropbox-container">
    <!-- 라벨 섹션 -->
    <div class="flex items-center mb-2">
      <!-- 보라색 다이아몬드 아이콘 -->
      <div class="w-4 h-4 bg-purple-500 transform rotate-45 mr-2"></div>
      <!-- 라벨 텍스트 -->
      <span class="text-sm font-medium text-gray-700">드롭박스</span>
    </div>

    <!-- 드롭다운 선택기 (클릭 가능한 영역) -->
    <div class="dropbox-selector" @click="toggleDropdown" :class="{ 'border-brand-3': isOpen }">
      <!-- 선택된 옵션 텍스트 또는 플레이스홀더 -->
      <span class="selected-text">{{ selectedOption || placeholder }}</span>
      <!-- 화살표 아이콘 (드롭다운 상태에 따라 회전) -->
      <svg
        class="chevron-icon"
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
    <div v-if="isOpen" class="dropdown-options">
      <div
        v-for="option in options"
        :key="option.value"
        class="dropdown-option"
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
  if (!event.target.closest('.dropbox-container')) {
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

<style scoped>
/* 드롭박스 컨테이너 */
.dropbox-container {
  position: relative;
  width: 128px;
}

/* 드롭다운 선택기 스타일 */
.dropbox-selector {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 40px;
  padding: 0 12px;
  background-color: var(--bg-2);
  border: 1px solid var(--text-1);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

/* 호버 효과 */
.dropbox-selector:hover {
  border-color: var(--brand-3);
}

/* 열린 상태일 때 테두리 색상 */
.dropbox-selector.border-brand-3 {
  border-color: var(--brand-3);
}

/* 선택된 텍스트 스타일 */
.selected-text {
  color: var(--text-2);
  font-size: 14px;
  font-weight: 500;
}

/* 화살표 아이콘 스타일 */
.chevron-icon {
  width: 16px;
  height: 16px;
  color: var(--text-1);
  transition: transform 0.2s ease;
}

/* 열린 상태일 때 화살표 회전 */
.chevron-icon.rotate-180 {
  transform: rotate(180deg);
}

/* 드롭다운 옵션 목록 */
.dropdown-options {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: var(--bg-2);
  border: 1px solid var(--text-1);
  border-top: none;
  border-radius: 0 0 8px 8px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  z-index: 10;
  max-height: 200px;
  overflow-y: auto;
}

/* 개별 드롭다운 옵션 */
.dropdown-option {
  padding: 12px 16px;
  color: var(--text-2);
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

/* 옵션 호버 효과 */
.dropdown-option:hover {
  background-color: var(--bg-1);
}

/* 마지막 옵션의 하단 모서리 둥글게 */
.dropdown-option:last-child {
  border-radius: 0 0 8px 8px;
}
</style>
