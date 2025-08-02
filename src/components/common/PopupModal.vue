<template>
  <div
    v-if="isVisible"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    @click="handleOverlayClick"
  >
    <div class="bg-white rounded-xl p-8 max-w-md w-11/12 shadow-2xl sm:p-6 sm:w-19/20" @click.stop>
      <div class="flex flex-col items-center text-center">
        <div class="mb-8">
          <h3 class="text-gray-700 text-xl font-semibold mb-2 font-sans">{{ title }}</h3>
          <p class="text-gray-700 text-base font-normal font-sans">{{ message }}</p>
        </div>
        <div class="flex gap-3 w-full sm:gap-2">
          <button
            class="flex-1 py-3 px-5 border-none rounded-lg text-sm font-medium cursor-pointer transition-all duration-200 font-sans bg-red-500 text-white hover:bg-red-600 hover:-translate-y-0.5 sm:py-2.5 sm:px-4 sm:text-xs"
            @click="handleCancel"
          >
            {{ cancelText }}
          </button>
          <button
            class="flex-1 py-3 px-5 border-none rounded-lg text-sm font-medium cursor-pointer transition-all duration-200 font-sans bg-gray-200 text-gray-700 hover:bg-gray-300 hover:-translate-y-0.5 sm:py-2.5 sm:px-4 sm:text-xs"
            @click="handleConfirm"
          >
            {{ confirmText }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  isVisible: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '최종 확인',
  },
  message: {
    type: String,
    default: '멘트',
  },
  cancelText: {
    type: String,
    default: '취소하기',
  },
  confirmText: {
    type: String,
    default: '돌아가기',
  },
  closeOnOverlay: {
    type: Boolean,
    default: true,
  },
})

const emit = defineEmits(['cancel', 'confirm', 'close'])

const handleCancel = () => {
  emit('cancel')
  emit('close')
}

const handleConfirm = () => {
  emit('confirm')
  emit('close')
}

const handleOverlayClick = () => {
  if (props.closeOnOverlay) {
    emit('close')
  }
}
</script>
