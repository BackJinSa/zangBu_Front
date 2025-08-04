<script setup>
import { ref, computed, watch } from 'vue'
import Input from '@/components/common/Input.vue'

// Props 정의
const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({
      registrantType: 'owner',
      propertyType: 'sale',
      price: '',
      buildingType: 'house',
      roadAddress: '',
      detailAddress: '',
      area: '',
      moveInType: 'immediate',
      moveInDate: '',
    }),
  },
})

// Emits 정의
const emit = defineEmits(['update:modelValue'])

// 폼 데이터
const formData = ref({
  registrantType: props.modelValue.registrantType || 'owner',
  propertyType: props.modelValue.propertyType || 'sale',
  price: props.modelValue.price || '',
  buildingType: props.modelValue.buildingType || 'house',
  roadAddress: props.modelValue.roadAddress || '',
  detailAddress: props.modelValue.detailAddress || '',
  area: props.modelValue.area || '',
  moveInType: props.modelValue.moveInType || 'immediate',
  moveInDate: props.modelValue.moveInDate || '',
})

// props 변경 감지
watch(
  () => props.modelValue,
  (newValue) => {
    formData.value = {
      registrantType: newValue.registrantType || 'owner',
      propertyType: newValue.propertyType || 'sale',
      price: newValue.price || '',
      buildingType: newValue.buildingType || 'house',
      roadAddress: newValue.roadAddress || '',
      detailAddress: newValue.detailAddress || '',
      area: newValue.area || '',
      moveInType: newValue.moveInType || 'immediate',
      moveInDate: newValue.moveInDate || '',
    }
  },
  { deep: true }
)

// 가격 유효성 검사
const priceError = computed(() => {
  if (!formData.value.price) return ''
  const price = parseInt(formData.value.price)
  if (price > 4000000000) {
    return '매매가는 40억 원을 초과할 수 없습니다'
  }
  return ''
})

// 데이터 변경 시 부모에게 전달
const updateFormData = (field, value) => {
  formData.value[field] = value
  emit('update:modelValue', { ...formData.value })
}
</script>

<template>
  <div class="bg-bg-2 rounded-lg border border-bg-1 p-6">
    <h3 class="text-lg font-semibold text-text-2 mb-4">
      <i class="fa-solid fa-clipboard-list mr-2 text-brand-3"></i>
      매물 기본 정보
    </h3>
    <p class="text-text-1 mb-6">매물의 종류와 주소 등 필수 정보를 입력합니다.</p>

    <div class="space-y-6">
      <!-- 등록자 유형 -->
      <div>
        <label class="block text-sm font-medium text-text-2 mb-3">등록자 유형</label>
        <div class="flex space-x-6">
          <label class="flex items-center">
            <input
              type="radio"
              name="registrantType"
              :value="'owner'"
              :checked="formData.registrantType === 'owner'"
              @change="updateFormData('registrantType', 'owner')"
              class="mr-2 w-5 h-5 appearance-none border-2 border-brand-3 rounded-full bg-transparent cursor-pointer checked:bg-brand-3 focus:outline-none focus:ring-2 focus:ring-brand-3 focus:ring-opacity-20"
            />
            <span class="text-sm text-text-2">집주인</span>
          </label>
          <label class="flex items-center">
            <input
              type="radio"
              name="registrantType"
              :value="'tenant'"
              :checked="formData.registrantType === 'tenant'"
              @change="updateFormData('registrantType', 'tenant')"
              class="mr-2 w-5 h-5 appearance-none border-2 border-brand-3 rounded-full bg-transparent cursor-pointer checked:bg-brand-3 focus:outline-none focus:ring-2 focus:ring-brand-3 focus:ring-opacity-20"
            />
            <span class="text-sm text-text-2">세입자</span>
          </label>
        </div>
      </div>

      <!-- 매물 종류 -->
      <div>
        <label class="block text-sm font-medium text-text-2 mb-3">매물 종류</label>
        <div class="flex space-x-6">
          <label class="flex items-center">
            <input
              type="radio"
              name="propertyType"
              :value="'sale'"
              :checked="formData.propertyType === 'sale'"
              @change="updateFormData('propertyType', 'sale')"
              class="mr-2 w-5 h-5 appearance-none border-2 border-brand-3 rounded-full bg-transparent cursor-pointer checked:bg-brand-3 focus:outline-none focus:ring-2 focus:ring-brand-3 focus:ring-opacity-20"
            />
            <span class="text-sm text-text-2">매매</span>
          </label>
          <label class="flex items-center">
            <input
              type="radio"
              name="propertyType"
              :value="'jeonse'"
              :checked="formData.propertyType === 'jeonse'"
              @change="updateFormData('propertyType', 'jeonse')"
              class="mr-2 w-5 h-5 appearance-none border-2 border-brand-3 rounded-full bg-transparent cursor-pointer checked:bg-brand-3 focus:outline-none focus:ring-2 focus:ring-brand-3 focus:ring-opacity-20"
            />
            <span class="text-sm text-text-2">전세</span>
          </label>
          <label class="flex items-center">
            <input
              type="radio"
              name="propertyType"
              :value="'monthly'"
              :checked="formData.propertyType === 'monthly'"
              @change="updateFormData('propertyType', 'monthly')"
              class="mr-2 w-5 h-5 appearance-none border-2 border-brand-3 rounded-full bg-transparent cursor-pointer checked:bg-brand-3 focus:outline-none focus:ring-2 focus:ring-brand-3 focus:ring-opacity-20"
            />
            <span class="text-sm text-text-2">월세</span>
          </label>
        </div>
      </div>

      <!-- 매매가 -->
      <div>
        <label class="block text-sm font-medium text-text-2 mb-2">매매가</label>
        <div class="flex items-center space-x-2">
          <Input
            :model-value="formData.price"
            @update:model-value="updateFormData('price', $event)"
            type="number"
            placeholder="예) 500000000"
            class="flex-1"
          />
          <span class="text-sm text-text-1">원</span>
        </div>
        <p v-if="priceError" class="text-status-2 text-sm mt-1">
          <i class="fa-solid fa-circle-exclamation mr-1"></i>
          {{ priceError }}
        </p>
      </div>

      <!-- 부동산 유형 -->
      <div>
        <label class="block text-sm font-medium text-text-2 mb-3">부동산 유형</label>
        <div class="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <label class="flex items-center">
            <input
              type="radio"
              name="buildingType"
              :value="'apartment'"
              :checked="formData.buildingType === 'apartment'"
              @change="updateFormData('buildingType', 'apartment')"
              class="mr-2 w-5 h-5 appearance-none border-2 border-brand-3 rounded-full bg-transparent cursor-pointer checked:bg-brand-3 focus:outline-none focus:ring-2 focus:ring-brand-3 focus:ring-opacity-20"
            />
            <span class="text-sm text-text-2">아파트</span>
          </label>
          <label class="flex items-center">
            <input
              type="radio"
              name="buildingType"
              :value="'officetel'"
              :checked="formData.buildingType === 'officetel'"
              @change="updateFormData('buildingType', 'officetel')"
              class="mr-2 w-5 h-5 appearance-none border-2 border-brand-3 rounded-full bg-transparent cursor-pointer checked:bg-brand-3 focus:outline-none focus:ring-2 focus:ring-brand-3 focus:ring-opacity-20"
            />
            <span class="text-sm text-text-2">오피스텔</span>
          </label>
          <label class="flex items-center">
            <input
              type="radio"
              name="buildingType"
              :value="'villa'"
              :checked="formData.buildingType === 'villa'"
              @change="updateFormData('buildingType', 'villa')"
              class="mr-2 w-5 h-5 appearance-none border-2 border-brand-3 rounded-full bg-transparent cursor-pointer checked:bg-brand-3 focus:outline-none focus:ring-2 focus:ring-brand-3 focus:ring-opacity-20"
            />
            <span class="text-sm text-text-2">연립</span>
          </label>
          <label class="flex items-center">
            <input
              type="radio"
              name="buildingType"
              :value="'house'"
              :checked="formData.buildingType === 'house'"
              @change="updateFormData('buildingType', 'house')"
              class="mr-2 w-5 h-5 appearance-none border-2 border-brand-3 rounded-full bg-transparent cursor-pointer checked:bg-brand-3 focus:outline-none focus:ring-2 focus:ring-brand-3 focus:ring-opacity-20"
            />
            <span class="text-sm text-text-2">주택</span>
          </label>
        </div>
      </div>

      <!-- 도로명 주소 -->
      <div>
        <label class="block text-sm font-medium text-text-2 mb-2">도로명 주소</label>
        <Input
          :model-value="formData.roadAddress"
          @update:model-value="updateFormData('roadAddress', $event)"
          placeholder="예) 서울시 강남구 테헤란로 123"
        />
      </div>

      <!-- 상세 주소 -->
      <div>
        <label class="block text-sm font-medium text-text-2 mb-2">상세 주소 (동/호수)</label>
        <Input
          :model-value="formData.detailAddress"
          @update:model-value="updateFormData('detailAddress', $event)"
          placeholder="예) 101동 1001호"
        />
      </div>

      <!-- 전용 면적 -->
      <div>
        <label class="block text-sm font-medium text-text-2 mb-2">전용 면적</label>
        <div class="flex items-center space-x-2">
          <Input
            :model-value="formData.area"
            @update:model-value="updateFormData('area', $event)"
            type="number"
            placeholder="예) 94.5"
            class="flex-1"
          />
          <span class="text-sm text-text-1">㎡</span>
        </div>
      </div>

      <!-- 입주 가능 날짜 -->
      <div>
        <label class="block text-sm font-medium text-text-2 mb-3">입주 가능 날짜</label>
        <div class="flex space-x-6">
          <label class="flex items-center">
            <input
              type="radio"
              name="moveInType"
              :value="'immediate'"
              :checked="formData.moveInType === 'immediate'"
              @change="updateFormData('moveInType', 'immediate')"
              class="mr-2 w-5 h-5 appearance-none border-2 border-brand-3 rounded-full bg-transparent cursor-pointer checked:bg-brand-3 focus:outline-none focus:ring-2 focus:ring-brand-3 focus:ring-opacity-20"
            />
            <span class="text-sm text-text-2">즉시 입주</span>
          </label>
          <label class="flex items-center">
            <input
              type="radio"
              name="moveInType"
              :value="'date'"
              :checked="formData.moveInType === 'date'"
              @change="updateFormData('moveInType', 'date')"
              class="mr-2 w-5 h-5 appearance-none border-2 border-brand-3 rounded-full bg-transparent cursor-pointer checked:bg-brand-3 focus:outline-none focus:ring-2 focus:ring-brand-3 focus:ring-opacity-20"
            />
            <span class="text-sm text-text-2">입주 날짜 선택</span>
          </label>
          <label class="flex items-center">
            <input
              type="radio"
              name="moveInType"
              :value="'negotiable'"
              :checked="formData.moveInType === 'negotiable'"
              @change="updateFormData('moveInType', 'negotiable')"
              class="mr-2 w-5 h-5 appearance-none border-2 border-brand-3 rounded-full bg-transparent cursor-pointer checked:bg-brand-3 focus:outline-none focus:ring-2 focus:ring-brand-3 focus:ring-opacity-20"
            />
            <span class="text-sm text-text-2">협의 가능</span>
          </label>
        </div>
        <div v-if="formData.moveInType === 'date'" class="mt-3">
          <Input
            :model-value="formData.moveInDate"
            @update:model-value="updateFormData('moveInDate', $event)"
            type="date"
            class="w-full"
          />
        </div>
      </div>
    </div>
  </div>
</template>
