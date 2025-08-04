<template>
  <div class="property-card">
    <!-- Property image with overlay badge -->
    <div class="image-container">
      <img
        :src="property.image_url || '/default-property.jpg'"
        :alt="property.building_name || 'Property Image'"
        class="property-image"
      />
      <!-- Overlay badge for deal status -->
      <div v-if="property.deal_status" class="overlay-badge">
        <span class="overlay-badge-text">{{ getDealStatusText(property.deal_status) }}</span>
      </div>
    </div>

    <!-- Property details -->
    <div class="details-container">
      <!-- Property type badge -->
      <div class="property-type-badge">
        <span class="property-type-text">{{ property.property_type || '아파트' }}</span>
      </div>

      <!-- Property title -->
      <h3 class="property-title">{{ property.building_name || '스카이빌' }}</h3>

      <!-- Property address -->
      <p class="property-address">{{ property.info_oneline || '주소 정보' }}</p>

      <!-- Price info -->
      <div class="price-info">
        <span class="price-text">{{ formatPrice(property.price) || '₩300,000,000' }}</span>
        <span class="deposit-text" v-if="property.deposit"
          >보증금: {{ formatPrice(property.deposit) }}</span
        >
      </div>

      <!-- Action button -->
      <div class="action-button-container">
        <button @click="handleDetail" class="primary-button">거래 이어가기</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  property: {
    type: Object,
    required: true,
    default: () => ({
      bookmark_id: '',
      building_id: '',
      complex_id: '',
      seller_nickname: '',
      sale_type: '',
      price: '',
      deposit: '',
      bookmark_count: '',
      created_at: '',
      building_name: '',
      seller_type: '',
      property_type: '',
      info_oneline: '',
      image_url: '',
      facility: '',
      deal_status: '',
      deal_id: '',
      user_role: '',
    }),
  },
})

const emit = defineEmits(['contact', 'detail', 'delete'])

// Handle detail view
const handleDetail = () => {
  emit('detail', props.property)
}

// Get deal status text
const getDealStatusText = (status) => {
  switch (status) {
    case 'waiting':
    case 'buying':
      return '구매 중'
    case 'selling':
      return '판매 중'
    case 'in_progress':
      return '진행 중'
    case 'completed':
      return '완료'
    case 'cancelled':
      return '취소됨'
    default:
      return '구매 중'
  }
}

// Format price
const formatPrice = (price) => {
  if (!price) return ''
  const numPrice = parseInt(price)
  if (numPrice >= 100000000) {
    return `매매 ${(numPrice / 100000000).toFixed(0)}억 ${((numPrice % 100000000) / 10000).toFixed(
      0
    )}`
  } else if (numPrice >= 10000) {
    return `매매 ${(numPrice / 10000).toFixed(0)}만`
  } else {
    return `매매 ${numPrice.toLocaleString()}`
  }
}
</script>

<style scoped>
.property-card {
  width: 320px;
  background: white;
  border-radius: 12px;
  box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

/* Image Container */
.image-container {
  width: 100%;
  height: 200px;
  overflow: hidden;
  position: relative;
}

.property-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Overlay Badge */
.overlay-badge {
  position: absolute;
  top: 12px;
  left: 12px;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(4px);
  border-radius: 5px;
  padding: 6px 12px;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.1);
}

.overlay-badge-text {
  color: var(--brand-1);
  font-size: 13px;
  font-weight: 600;
  font-family: 'Roboto', sans-serif;
  line-height: 1.6;
}

/* Details Container */
.details-container {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* Property Type Badge */
.property-type-badge {
  display: inline-block;
  background: var(--brand-1);
  color: var(--text-3);
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  font-family: 'Roboto', sans-serif;
  align-self: flex-start;
}

.property-type-text {
  color: var(--text-3);
  font-size: 14px;
  font-weight: 600;
  font-family: 'Roboto', sans-serif;
}

/* Property Title */
.property-title {
  color: var(--brand-1);
  font-size: 22px;
  font-weight: 700;
  font-family: 'Roboto', sans-serif;
  line-height: 1.6;
  margin: 0;
  word-wrap: break-word;
  overflow-wrap: break-word;
}

/* Property Address */
.property-address {
  color: var(--text-2);
  font-size: 16px;
  font-weight: 400;
  font-family: 'Roboto', sans-serif;
  line-height: 1.6;
  margin: 0;
  word-wrap: break-word;
  overflow-wrap: break-word;
}

/* Price Info */
.price-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.price-text {
  color: var(--brand-1);
  font-size: 24px;
  font-weight: 700;
  font-family: 'Roboto', sans-serif;
  line-height: 1.6;
}

.deposit-text {
  color: var(--text-1);
  font-size: 12px;
  font-weight: 400;
  font-family: 'Roboto', sans-serif;
}

/* Action Button Container */
.action-button-container {
  margin-top: 8px;
}

.primary-button {
  width: 100%;
  height: 40px;
  background: var(--brand-3);
  border-radius: 8px;
  border: none;
  cursor: pointer;
  color: var(--text-3);
  font-size: 14px;
  font-weight: 600;
  font-family: 'Inter', sans-serif;
  line-height: 1.21;
  transition: background-color 0.2s ease;
}

.primary-button:hover {
  background: var(--brand-2);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .property-card {
    width: 100%;
    max-width: 320px;
  }
}
</style>
