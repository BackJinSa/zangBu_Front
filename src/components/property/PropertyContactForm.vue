<script setup>
import { ref, watch } from 'vue'
import Input from '@/components/common/Input.vue'

// Props 정의
const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({
      contactName: '',
      contactPhone: '',
    }),
  },
})

// Emits 정의
const emit = defineEmits(['update:modelValue'])

// 폼 데이터
const formData = ref({
  contactName: props.modelValue.contactName || '',
  contactPhone: props.modelValue.contactPhone || '',
})

// props 변경 감지
watch(
  () => props.modelValue,
  (newValue) => {
    formData.value = {
      contactName: newValue.contactName || '',
      contactPhone: newValue.contactPhone || '',
    }
  },
  { deep: true }
)

// 데이터 변경 시 부모에게 전달
const updateFormData = (field, value) => {
  formData.value[field] = value
  emit('update:modelValue', { ...formData.value })
}
</script>

<template>
  <div class="bg-bg-2 rounded-lg border border-bg-1 p-6">
    <h3 class="text-lg font-semibold text-text-2 mb-4">
      <i class="fa-solid fa-bookmark mr-2 text-brand-3"></i>
      담당자 정보
    </h3>
    <p class="text-text-1 mb-6">매물 문의를 위한 담당자 정보를 입력합니다.</p>

    <div class="space-y-6">
      <!-- 담당자 이름 -->
      <div>
        <label class="block text-sm font-medium text-text-2 mb-2">담당자 이름</label>
        <Input
          :model-value="formData.contactName"
          @update:model-value="updateFormData('contactName', $event)"
          placeholder="예) 홍길동"
        />
      </div>

      <!-- 연락처 -->
      <div>
        <label class="block text-sm font-medium text-text-2 mb-2">연락처</label>
        <Input
          :model-value="formData.contactPhone"
          @update:model-value="updateFormData('contactPhone', $event)"
          type="tel"
          placeholder="예) 010-1234-5678"
        />
      </div>
    </div>
  </div>
</template>
