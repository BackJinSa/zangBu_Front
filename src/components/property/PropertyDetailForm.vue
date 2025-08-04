<script setup>
import { ref, watch } from 'vue'
import Input from '@/components/common/Input.vue'

// Props 정의
const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({
      title: '',
      features: '',
      description: '',
      images: [],
    }),
  },
})

// Emits 정의
const emit = defineEmits(['update:modelValue'])

// 폼 데이터
const formData = ref({
  title: props.modelValue.title || '',
  features: props.modelValue.features || '',
  description: props.modelValue.description || '',
  images: props.modelValue.images || [],
})

// props 변경 감지
watch(
  () => props.modelValue,
  (newValue) => {
    formData.value = {
      title: newValue.title || '',
      features: newValue.features || '',
      description: newValue.description || '',
      images: newValue.images || [],
    }
  },
  { deep: true }
)

// 데이터 변경 시 부모에게 전달
const updateFormData = (field, value) => {
  formData.value[field] = value
  emit('update:modelValue', { ...formData.value })
}

// 이미지 업로드 처리
const handleImageUpload = (event) => {
  const files = Array.from(event.target.files)

  // 현재 이미지 개수 + 새로 선택한 이미지 개수 확인
  if (formData.value.images.length + files.length > 5) {
    alert('최대 5장까지만 업로드 가능합니다.')
    event.target.value = '' // input 초기화
    return
  }

  // 파일 크기 검사 (5MB)
  const validFiles = files.filter((file) => {
    if (file.size > 5 * 1024 * 1024) {
      alert(`${file.name}은 5MB를 초과합니다.`)
      return false
    }
    return true
  })

  const newImages = [...formData.value.images, ...validFiles]
  updateFormData('images', newImages)

  // input 초기화 (같은 파일을 다시 선택할 수 있도록)
  event.target.value = ''
}

// 이미지 제거
const removeImage = (index) => {
  const newImages = [...formData.value.images]
  newImages.splice(index, 1)
  updateFormData('images', newImages)
}
</script>

<template>
  <div class="bg-bg-2 rounded-lg border border-bg-1 p-6">
    <h3 class="text-lg font-semibold text-text-2 mb-4">
      <i class="fa-solid fa-file-lines mr-2 text-brand-3"></i>
      매물 상세 설명 및 사진
    </h3>
    <p class="text-text-1 mb-6">매물 특징을 자세히 설명하고 사진을 추가합니다.</p>

    <div class="space-y-6">
      <!-- 제목 -->
      <div>
        <label class="block text-sm font-medium text-text-2 mb-2">제목</label>
        <Input
          :model-value="formData.title"
          @update:model-value="updateFormData('title', $event)"
          placeholder="예) 강남역 초역세권 신축 아파트, 빠른 입주 가능!"
        />
      </div>

      <!-- 매물 특징 -->
      <div>
        <label class="block text-sm font-medium text-text-2 mb-2">매물 특징</label>
        <Input
          :model-value="formData.features"
          @update:model-value="updateFormData('features', $event)"
          placeholder="예) 강남역 초역세권 신축 아파트"
        />
      </div>

      <!-- 자세한 매물 설명 -->
      <div>
        <label class="block text-sm font-medium text-text-2 mb-2">자세한 매물 설명</label>
        <textarea
          :value="formData.description"
          @input="updateFormData('description', $event.target.value)"
          rows="6"
          class="w-full px-3 py-2 border border-bg-1 rounded-lg focus:ring-2 focus:ring-brand-3 focus:border-brand-3 resize-none text-text-2 placeholder:text-text-1"
          placeholder="매물의 장점, 주변 환경, 교통 정보를 상세히 기재해주세요."
        ></textarea>
      </div>

      <!-- 매물 사진 -->
      <div>
        <label class="block text-sm font-medium text-text-2 mb-2">매물 사진</label>
        <div class="border-2 border-dashed border-bg-1 rounded-lg p-8 text-center">
          <i class="fa-solid fa-camera text-3xl text-text-1 mb-4"></i>
          <p class="text-text-2 mb-2">사진을 드래그 앤 드롭하거나 클릭하여 업로드</p>
          <input
            type="file"
            multiple
            accept="image/*"
            @change="handleImageUpload"
            class="hidden"
            id="image-upload"
          />
          <label
            for="image-upload"
            class="inline-block px-4 py-2 bg-brand-3 text-text-3 rounded-lg cursor-pointer hover:bg-brand-2 transition-colors"
          >
            사진 선택
          </label>
          <p class="text-sm text-text-1 mt-2">최대 5장, 각 파일 5MB 이하 (JPG, PNG)</p>
        </div>

        <!-- 업로드된 이미지 미리보기 -->
        <div v-if="formData.images.length > 0" class="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
          <div v-for="(image, index) in formData.images" :key="index" class="relative group">
            <img
              :src="typeof image === 'string' ? image : URL.createObjectURL(image)"
              :alt="`매물 사진 ${index + 1}`"
              class="w-full h-32 object-cover rounded-lg"
            />
            <button
              @click="removeImage(index)"
              class="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <i class="fa-solid fa-times text-xs"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
