<template>
  <div class="property-card-waiting">
    <!-- Header with waiting status -->
    <div class="card-header">
      <div class="waiting-badge">
        <i class="fas fa-clock waiting-icon"></i>
        <span class="waiting-text">{{ property.dealStatus || '대기중' }}</span>
      </div>
    </div>

    <!-- Property image with waiting overlay -->
    <div class="image-container">
      <img
        :src="property.imageUrl || '/default-property.jpg'"
        :alt="property.title || 'Property Image'"
        class="property-image"
      />
      <div class="waiting-overlay">
        <i class="fas fa-clock overlay-icon"></i>
        <span class="overlay-text">승인 대기중</span>
      </div>
    </div>

    <!-- Property details -->
    <div class="details-container">
      <h3 class="property-title">{{ property.buildingName || '스카이빌' }}</h3>

      <div class="price-info">
        <span class="price-text">{{ property.price || '₩750,000,000' }}</span>
      </div>

      <div class="location-info">
        <i class="fas fa-map-marker-alt location-icon"></i>
        <span class="location-text">{{ property.address || '서울시 광진구' }}</span>
      </div>

      <div class="property-type-info">
        <span class="property-type">{{ property.houseType || '아파트' }}</span>
        <span class="sale-type">{{ property.saleType || '매매' }}</span>
      </div>

      <div class="waiting-info">
        <i class="fas fa-info-circle info-icon"></i>
        <span class="waiting-info-text">{{ property.dealStatus || '대기중' }} 진행 중입니다</span>
      </div>

      <div class="submitted-date">
        {{ property.createdAt || '1일 전 등록' }}
      </div>

      <!-- Progress indicator -->
      <div class="progress-container">
        <div class="progress-bar">
          <div class="progress-fill"></div>
        </div>
        <span class="progress-text">승인 진행중...</span>
      </div>

      <!-- Action buttons for waiting state -->
      <div class="action-buttons">
        <button @click="handleEdit" class="primary-button">거래 이어가기</button>
        <button @click="handleCancel" class="secondary-button">취소하기</button>
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
      buildingId: null,
      buildingName: '',
      address: '',
      imageUrl: '',
      price: '',
      dealStatus: '대기중',
      createdAt: '',
      saleType: '',
      houseType: '',
    }),
  },
})

const emit = defineEmits(['edit', 'cancel'])

// Handle edit
const handleEdit = () => {
  emit('edit', props.property)
}

// Handle cancel
const handleCancel = () => {
  emit('cancel', props.property)
}
</script>

<style scoped>
.property-card-waiting {
  width: 320px;
  background: white;
  border-radius: 12px;
  box-shadow: 0px 4px 6px 0px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  opacity: 0.8;
  transition: opacity 0.2s ease;
}

.property-card-waiting:hover {
  opacity: 1;
}

/* Header */
.card-header {
  padding: 16px 20px 12px 20px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.waiting-badge {
  background: #ffc107;
  border-radius: 20px;
  padding: 6px 12px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.waiting-icon {
  color: var(--text-3);
  font-size: 12px;
}

.waiting-text {
  color: var(--text-3);
  font-size: 12px;
  font-weight: bold;
  font-family: 'Roboto', sans-serif;
  line-height: 1.2;
}

/* Image with waiting overlay */
.image-container {
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.property-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(30%);
}

.waiting-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
}

.overlay-icon {
  color: var(--text-3);
  font-size: 24px;
}

.overlay-text {
  color: var(--text-3);
  font-size: 14px;
  font-weight: 600;
  font-family: 'Roboto', sans-serif;
}

/* Details */
.details-container {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.property-title {
  color: var(--brand-1);
  font-size: 18px;
  font-weight: bold;
  font-family: 'Roboto', sans-serif;
  line-height: 1.4;
  margin: 0;
  word-wrap: break-word;
  overflow-wrap: break-word;
}

.price-info {
  margin-top: 4px;
}

.price-text {
  color: var(--brand-3);
  font-size: 20px;
  font-weight: bold;
  font-family: 'Roboto', sans-serif;
}

.location-info {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 4px;
}

.location-icon {
  color: var(--text-1);
  font-size: 14px;
}

.location-text {
  color: var(--text-2);
  font-size: 14px;
  font-weight: normal;
  font-family: 'Roboto', sans-serif;
}

.property-type-info {
  display: flex;
  gap: 8px;
  margin-top: 8px;
}

.property-type {
  background: var(--brand-1);
  color: var(--text-3);
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  font-family: 'Roboto', sans-serif;
}

.sale-type {
  background: var(--brand-3);
  color: var(--text-3);
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  font-family: 'Roboto', sans-serif;
}

.waiting-info {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px;
  background: #fff3cd;
  border: 1px solid #ffeaa7;
  border-radius: 8px;
  margin-top: 8px;
}

.info-icon {
  color: #856404;
  font-size: 16px;
}

.waiting-info-text {
  color: #856404;
  font-size: 13px;
  font-weight: 500;
  font-family: 'Roboto', sans-serif;
  line-height: 1.4;
}

.submitted-date {
  color: var(--text-1);
  font-size: 12px;
  font-weight: normal;
  font-family: 'Roboto', sans-serif;
  margin-top: 4px;
}

/* Action buttons */
.action-buttons {
  display: flex;
  gap: 12px;
  margin-top: 16px;
}

.primary-button {
  flex: 1;
  height: 40px;
  background: var(--brand-3);
  border-radius: 8px;
  border: none;
  cursor: pointer;
  color: var(--text-3);
  font-size: 14px;
  font-weight: 600;
  font-family: 'Inter', sans-serif;
  transition: background-color 0.2s ease;
}

.primary-button:hover {
  background: var(--brand-2);
}

.secondary-button {
  flex: 1;
  height: 40px;
  border-radius: 8px;
  border: 2px solid var(--status-2);
  background: var(--bg-2);
  cursor: pointer;
  color: var(--status-2);
  font-size: 14px;
  font-weight: 600;
  font-family: 'Inter', sans-serif;
  transition: all 0.2s ease;
}

.secondary-button:hover {
  background: #fef2f2;
  border-color: var(--status-2);
  color: var(--status-2);
}

/* Progress indicator */
.progress-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 12px;
}

.progress-bar {
  width: 100%;
  height: 4px;
  background: var(--bg-1);
  border-radius: 2px;
  overflow: hidden;
}

.progress-fill {
  width: 60%;
  height: 100%;
  background: linear-gradient(90deg, #ffc107, #ffb300);
  border-radius: 2px;
  animation: progress-pulse 2s ease-in-out infinite;
}

.progress-text {
  color: var(--text-1);
  font-size: 12px;
  font-weight: 500;
  font-family: 'Roboto', sans-serif;
  text-align: center;
}

@keyframes progress-pulse {
  0%,
  100% {
    opacity: 0.7;
  }
  50% {
    opacity: 1;
  }
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .property-card-waiting {
    width: 100%;
    max-width: 320px;
  }

  .details-container {
    padding: 16px;
    gap: 10px;
  }

  .property-title {
    font-size: 16px;
  }

  .price-text {
    font-size: 18px;
  }

  .location-text {
    font-size: 13px;
  }

  .action-buttons {
    gap: 8px;
    margin-top: 12px;
  }

  .primary-button,
  .secondary-button {
    height: 36px;
    font-size: 13px;
  }
}

@media (max-width: 480px) {
  .property-card-waiting {
    max-width: 100%;
    margin: 0 8px;
  }

  .card-header {
    padding: 12px 16px 8px 16px;
  }

  .waiting-badge {
    padding: 4px 8px;
    gap: 4px;
  }

  .waiting-icon {
    font-size: 10px;
  }

  .waiting-text {
    font-size: 10px;
  }

  .image-container {
    height: 160px;
  }

  .overlay-icon {
    font-size: 20px;
  }

  .overlay-text {
    font-size: 12px;
  }

  .details-container {
    padding: 12px;
    gap: 8px;
  }

  .property-title {
    font-size: 15px;
  }

  .price-text {
    font-size: 16px;
  }

  .location-text {
    font-size: 12px;
  }

  .property-type,
  .sale-type {
    font-size: 10px;
    padding: 3px 6px;
  }

  .waiting-info {
    padding: 8px;
    margin-top: 6px;
  }

  .info-icon {
    font-size: 14px;
  }

  .waiting-info-text {
    font-size: 11px;
  }

  .submitted-date {
    font-size: 10px;
  }

  .action-buttons {
    gap: 6px;
    margin-top: 10px;
  }

  .primary-button,
  .secondary-button {
    height: 32px;
    font-size: 12px;
  }

  .progress-text {
    font-size: 10px;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .property-card-waiting {
    width: 100%;
    max-width: 340px;
  }

  .details-container {
    padding: 18px;
    gap: 11px;
  }

  .property-title {
    font-size: 17px;
  }

  .price-text {
    font-size: 19px;
  }
}

@media (min-width: 1025px) {
  .property-card-waiting {
    width: 320px;
  }

  .property-card-waiting:hover {
    transform: translateY(-2px);
    box-shadow: 0px 8px 12px 0px rgba(0, 0, 0, 0.15);
  }
}
</style>
