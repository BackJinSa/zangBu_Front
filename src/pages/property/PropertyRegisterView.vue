<script setup>
import PropertyBasicInfoForm from '@/components/property/PropertyBasicInfoForm.vue'
import PropertyDetailForm from '@/components/property/PropertyDetailForm.vue'
import ContactPersonForm from '@/components/property/ContactPersonForm.vue'
import PropertyActionButtons from '@/components/property/PropertyActionButtons.vue'
import AddressSearchMap from '@/components/property/AddressSearchMap.vue'
import MoveInDatePicker from '@/components/property/MoveInDatePicker.vue'

// 매물 등록 관련 로직
</script>

<template>
  <div class="property-register-page">
    <div class="container mx-auto px-4 py-8">
      <div class="max-w-4xl mx-auto">
        <!-- 페이지 제목 -->
        <div class="text-center mb-8">
          <h1 class="text-3xl font-bold text-gray-800 mb-2">
            <i class="fa-solid fa-clipboard-list"></i>
            매물 등록
          </h1>
          <p class="text-gray-600">새로운 매물 정보를 입력해주세요</p>
        </div>

        <!-- 매물 등록 폼 -->
        <form class="space-y-8">
          <!-- 매물 기본 정보 -->
          <PropertyBasicInfoForm />

          <!-- 주소 검색 및 지도 -->
          <AddressSearchMap />

          <!-- 입주 가능 날짜 -->
          <MoveInDatePicker />

          <!-- 매물 상세 설명 및 사진 -->
          <PropertyDetailForm />

          <!-- 담당자 정보 -->
          <ContactPersonForm />

          <!-- 액션 버튼 -->
          <PropertyActionButtons />
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.property-register-page {
  min-height: 100vh;
  background-color: #f8f9fa;
}
</style>
