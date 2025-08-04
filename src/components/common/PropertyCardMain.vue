<template>
  <div class="property-card-main">
    <!-- Property image with heart button overlay -->
    <div class="image-container">
      <img
        :src="property.imageUrl || '/default-property.jpg'"
        :alt="property.buildingName || 'Property Image'"
        class="property-image"
      />
      <button
        @click="toggleBookmark"
        class="heart-button"
        :class="{ bookmarked: property.isBookmarked }"
      >
        <i class="fas fa-heart heart-icon"></i>
      </button>
    </div>

    <!-- Property information -->
    <div class="info-container">
      <h3 class="property-title">{{ property.buildingName || '래미안 강남' }}</h3>

      <div class="price-info">
        <span class="price-text">{{ formatPrice(property.price) || '₩700,000,000' }}</span>
      </div>

      <div class="rating-info" v-if="property.rank">
        <i class="fas fa-star star-icon"></i>
        <span class="rating-text">{{ property.rank }}</span>
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
      buildingId: '',
      price: '',
      buildingName: '',
      imageUrl: '',
      isBookmarked: false,
      rank: 0,
    }),
  },
})

const emit = defineEmits(['bookmark'])

// Toggle bookmark
const toggleBookmark = () => {
  emit('bookmark', {
    propertyId: props.property.buildingId,
    isBookmarked: !props.property.isBookmarked,
  })
}

// Format price
const formatPrice = (price) => {
  if (!price) return ''
  const numPrice = parseInt(price)
  if (numPrice >= 100000000) {
    return `₩${(numPrice / 100000000).toFixed(0)}억`
  } else if (numPrice >= 10000) {
    return `₩${(numPrice / 10000).toFixed(0)}만`
  } else {
    return `₩${numPrice.toLocaleString()}`
  }
}
</script>

<style scoped>
.property-card-main {
  width: 320px;
  background: white;
  border-radius: 12px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.property-card-main:hover {
  transform: translateY(-2px);
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.2);
}

/* Image container with heart button overlay */
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
  transition: transform 0.3s ease;
}

.property-card-main:hover .property-image {
  transform: scale(1.05);
}

/* Heart button */
.heart-button {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 32px;
  height: 32px;
  background: white;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s ease;
  z-index: 10;
}

.heart-button:hover {
  transform: scale(1.1);
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.2);
}

.heart-icon {
  font-size: 14px;
  color: #666;
  transition: color 0.2s ease;
}

.heart-button.bookmarked .heart-icon {
  color: #e74c3c;
}

/* Information container */
.info-container {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.property-title {
  color: #2c3e50;
  font-size: 18px;
  font-weight: 600;
  font-family: 'Roboto', sans-serif;
  line-height: 1.3;
  margin: 0;
  word-wrap: break-word;
  overflow-wrap: break-word;
}

.price-info {
  margin-top: 4px;
}

.price-text {
  color: #27ae60;
  font-size: 20px;
  font-weight: bold;
  font-family: 'Roboto', sans-serif;
}

.rating-info {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 4px;
}

.star-icon {
  color: #f39c12;
  font-size: 14px;
}

.rating-text {
  color: #7f8c8d;
  font-size: 14px;
  font-weight: 500;
  font-family: 'Roboto', sans-serif;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .property-card-main {
    width: 100%;
    max-width: 320px;
  }

  .info-container {
    padding: 12px;
  }

  .property-title {
    font-size: 16px;
  }

  .price-text {
    font-size: 18px;
  }
}
</style>
