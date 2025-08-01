<template>
  <div class="property-card">
    <!-- Header with property type and bookmark -->
    <div class="card-header">
      <div class="property-type-badge" :class="getBadgeClass(property.status)">
        <span class="property-type-text">{{ property.status || '전세' }}</span>
      </div>
      <button
        @click="toggleBookmark"
        class="bookmark-button"
        :class="{ bookmarked: property.isBookmarked }"
      >
        <i class="fas fa-heart bookmark-icon"></i>
      </button>
    </div>

    <!-- Property image -->
    <div class="image-container">
      <img
        :src="property.imageUrl || '/default-property.jpg'"
        :alt="property.title || 'Property Image'"
        class="property-image"
      />
    </div>

    <!-- Property details -->
    <div class="details-container">
      <h3 class="property-title">{{ property.title || '홍대 아늑한 스튜디오' }}</h3>

      <div class="price-info">
        <span class="price-text">{{ property.price || '₩300,000,000' }}</span>
      </div>

      <div class="location-info">
        <i class="fas fa-map-marker-alt location-icon"></i>
        <span class="location-text">{{ property.location || '서울시 마포구' }}</span>
      </div>

      <div class="description-text">
        {{
          property.description ||
          '젊은 전문가에게 완벽한 스튜디오 아파트입니다. 밤 문화와 대학가에 가깝습니다.'
        }}
      </div>

      <div class="saved-date">
        {{ property.savedDate || '1주 전 저장' }}
      </div>

      <!-- Action buttons -->
      <div class="action-buttons">
        <button @click="handleDetail" class="primary-button">상세 보기</button>
        <button @click="handleDelete" class="secondary-button">삭제</button>
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
      id: null,
      title: '',
      location: '',
      imageUrl: '',
      status: '',
      price: '',
      isBookmarked: false,
      description: '',
      savedDate: '',
    }),
  },
})

const emit = defineEmits(['bookmark', 'contact', 'detail', 'delete'])

// Toggle bookmark
const toggleBookmark = () => {
  emit('bookmark', {
    propertyId: props.property.id,
    isBookmarked: !props.property.isBookmarked,
  })
}

// Handle detail view
const handleDetail = () => {
  emit('detail', props.property)
}

// Handle delete
const handleDelete = () => {
  emit('delete', props.property)
}

// Get badge class based on property status
const getBadgeClass = (status) => {
  switch (status) {
    case '매매':
      return 'status-1'
    case '전세':
      return 'status-2'
    case '월세':
      return 'status-3'
    default:
      return 'status-2' // Default to '전세'
  }
}
</script>

<style scoped>
.property-card {
  width: 320px;
  background: white;
  border-radius: 12px;
  box-shadow: 0px 4px 6px 0px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

/* Header */
.card-header {
  padding: 16px 20px 12px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.property-type-badge {
  border-radius: 20px;
  padding: 6px 12px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.property-type-badge.status-1 {
  background: var(--status-2); /* 매매 - 빨간색 */
}

.property-type-badge.status-2 {
  background: var(--status-1); /* 전세 - 파란색 */
}

.property-type-badge.status-3 {
  background: var(--brand-3); /* 월세 - 초록색 */
}

.property-type-text {
  color: var(--text-3);
  font-size: 12px;
  font-weight: bold;
  font-family: 'Roboto', sans-serif;
  line-height: 1.2;
}

.bookmark-button {
  width: 28px;
  height: 28px;
  background: var(--bg-2);
  border-radius: 50%;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.bookmark-button:hover {
  transform: scale(1.1);
}

.bookmark-icon {
  font-size: 14px;
  color: var(--status-2);
  transition: all 0.2s ease;
}

.bookmark-button.bookmarked .bookmark-icon {
  color: var(--status-2);
}

/* Image */
.image-container {
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.property-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
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

.description-text {
  color: var(--text-2);
  font-size: 14px;
  font-weight: normal;
  font-family: 'Roboto', sans-serif;
  line-height: 1.5;
  word-wrap: break-word;
  overflow-wrap: break-word;
  margin-top: 8px;
}

.saved-date {
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
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .property-card {
    width: 100%;
    max-width: 320px;
  }
}
</style>
