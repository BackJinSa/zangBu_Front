<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import Footer from '@/components/common/Footer.vue'
import Button from '@/components/common/Button.vue'
import Input from '@/components/common/Input.vue'
import PropertyBasicInfoForm from '@/components/property/PropertyBasicInfoForm.vue'
import PropertyDetailForm from '@/components/property/PropertyDetailForm.vue'
import PropertyContactForm from '@/components/property/PropertyContactForm.vue'

const router = useRouter()

// 폼 데이터
const formData = ref({
  // 등록자 유형
  registrantType: 'owner', // 'owner' | 'tenant'

  // 매물 종류
  propertyType: 'sale', // 'sale' | 'jeonse' | 'monthly'

  // 매매가
  price: '',

  // 부동산 유형
  buildingType: 'house', // 'apartment' | 'officetel' | 'villa' | 'house'

  // 주소
  roadAddress: '',
  detailAddress: '',

  // 면적
  area: '',

  // 입주 가능 날짜
  moveInType: 'immediate', // 'immediate' | 'date' | 'negotiable'
  moveInDate: '',

  // 매물 상세
  title: '',
  features: '',
  description: '',
  images: [],

  // 담당자 정보
  contactName: '',
  contactPhone: '',
})

// 가격 유효성 검사
const priceError = computed(() => {
  if (!formData.value.price) return ''
  const price = parseInt(formData.value.price)
  if (price > 4900000000) {
    return '가격은 49억 원을 초과할 수 없습니다'
  }
  return ''
})

// 폼 제출
const handleSubmit = () => {
  if (priceError.value) {
    alert('가격을 확인해주세요.')
    return
  }

  console.log('매물 등록 데이터:', formData.value)
  // TODO: API 호출 로직 추가
  alert('매물이 등록되었습니다.')
}

// 취소
const handleCancel = (event) => {
  event.preventDefault()
  if (confirm('매물 등록을 취소하시겠습니까?')) {
    // 이전 페이지로 이동
    router.back()
  }
}
</script>

<template>
  <div class="min-h-screen bg-bg-1">
    <!-- 메인 콘텐츠 -->
    <div class="container mx-auto px-4 py-8">
      <div class="max-w-4xl mx-auto">
        <!-- 페이지 제목 -->
        <div class="text-center mb-8">
          <h1 class="text-3xl font-bold text-text-2 mb-2">
            <i class="fa-solid fa-home mr-2 text-brand-3"></i>
            매물 등록
          </h1>
          <p class="text-text-1">새로운 매물 정보를 입력해주세요</p>
        </div>

        <!-- 매물 등록 폼 -->
        <form @submit.prevent="handleSubmit" class="space-y-8">
          <!-- 1. 매물 기본 정보 -->
          <PropertyBasicInfoForm
            :model-value="formData"
            @update:model-value="(value) => Object.assign(formData, value)"
          />

          <!-- 2. 매물 상세 설명 및 사진 -->
          <PropertyDetailForm
            :model-value="formData"
            @update:model-value="(value) => Object.assign(formData, value)"
          />

          <!-- 3. 담당자 정보 -->
          <PropertyContactForm
            :model-value="formData"
            @update:model-value="(value) => Object.assign(formData, value)"
          />

          <!-- 액션 버튼 -->
          <div class="flex justify-center space-x-4 pt-6">
            <Button variant="button1" size="lg" type="submit" class="w-32"> 매물 등록하기 </Button>
            <Button variant="button11" size="lg" type="button" @click="handleCancel" class="w-32">
              취소
            </Button>
          </div>
        </form>
      </div>
    </div>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<style scoped>
/* 추가 스타일이 필요한 경우 여기에 작성 */
</style>
