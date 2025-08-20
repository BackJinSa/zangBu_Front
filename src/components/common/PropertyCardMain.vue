<template>
  <div class="property-card-main" @click="handleCardClick">
    <!-- Property image with heart button overlay -->
    <div class="image-container">
      <img
        :src="authenticatedImageUrl || property.imageUrl || '/default-property.jpg'"
        :alt="property.buildingName || 'Property Image'"
        class="property-image"
        @error="handleImageError"
      />
      <button
        @click.stop="toggleBookmark"
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
        <span class="price-text">{{ getDisplayPrice(property) || '₩700,000,000' }}</span>
      </div>

      <div class="rating-info" v-if="property.rank">
        <i class="fas fa-star star-icon"></i>
        <span class="rating-text">{{ property.rank }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref, onMounted, watch } from 'vue'
import { getObject, createSignedUrl } from '@/utils/ncp-object-storage-service.js'

const props = defineProps({
  property: {
    type: Object,
    required: true,
    default: () => ({
      buildingId: '',
      price: '',
      deposit: '',
      buildingName: '',
      imageUrl: '',
      isBookmarked: false,
      rank: 0,
    }),
  },
})

const emit = defineEmits(['bookmark', 'click'])

// Toggle bookmark
const toggleBookmark = () => {
  console.log('PropertyCardMain: toggleBookmark clicked')
  console.log('Property data:', props.property)

  const bookmarkData = {
    propertyId: props.property.buildingId,
    isBookmarked: !props.property.isBookmarked,
  }

  console.log('Emitting bookmark event with data:', bookmarkData)
  emit('bookmark', bookmarkData)
}

// NCP 인증 관련 상태
const authenticatedImageUrl = ref(null)

// NCP URL에서 버킷과 오브젝트 이름 추출
const extractNcpInfo = (url) => {
  try {
    const urlObj = new URL(url)
    if (urlObj.hostname === 'kr.object.ncloudstorage.com') {
      const pathParts = urlObj.pathname.split('/').filter((part) => part)
      if (pathParts.length >= 2) {
        return {
          bucketName: pathParts[0],
          objectName: pathParts.slice(1).join('/'),
        }
      }
    }
  } catch (error) {
    console.error('Failed to parse NCP URL:', error)
  }
  return null
}

// 이미지 URL 처리
const processImageUrl = async () => {
  if (!props.property.imageUrl) {
    authenticatedImageUrl.value = null
    return
  }

  // NCP Object Storage URL인지 확인
  if (props.property.imageUrl.includes('ncloudstorage.com')) {
    const ncpInfo = extractNcpInfo(props.property.imageUrl)
    if (ncpInfo) {
      try {
        console.log('Creating signed URL for NCP image:', ncpInfo)
        // 서명된 URL 생성 (CORS 우회)
        const signedUrl = createSignedUrl(ncpInfo.bucketName, ncpInfo.objectName)
        authenticatedImageUrl.value = signedUrl
        console.log('Successfully created signed URL:', signedUrl)
      } catch (error) {
        console.error('Failed to create signed URL:', error)
        authenticatedImageUrl.value = props.property.imageUrl
      }
    } else {
      authenticatedImageUrl.value = props.property.imageUrl
    }
  } else {
    authenticatedImageUrl.value = props.property.imageUrl
  }
}

// 이미지 로드 에러 처리
const handleImageError = () => {
  console.warn('Image failed to load:', authenticatedImageUrl.value || props.property.imageUrl)
  authenticatedImageUrl.value = null
}

// 컴포넌트 마운트 시 이미지 URL 처리
onMounted(() => {
  processImageUrl()
})

// 이미지 URL 변경 시 재처리
watch(
  () => props.property.imageUrl,
  () => {
    processImageUrl()
  }
)

// Handle card click
const handleCardClick = () => {
  emit('click', props.property)
}

// Format price (DB값이 만원 단위로 저장됨)
const formatPrice = (price) => {
  if (!price) return ''
  const numPrice = parseInt(price) // DB값은 이미 만원 단위

  if (numPrice >= 10000) {
    // 10000만원 이상은 억 단위로 표시
    const eok = Math.floor(numPrice / 10000) // 억 단위
    const man = numPrice % 10000 // 나머지 만원 단위

    if (man > 0) {
      return `₩${eok}억 ${man.toLocaleString()}만`
    } else {
      return `₩${eok}억`
    }
  } else {
    // 10000만원 미만은 만원 단위로 표시
    return `₩${numPrice.toLocaleString()}만`
  }
}

// 표시할 가격 결정 (price가 0이면 deposit 사용)
const getDisplayPrice = (property) => {
  const price = parseInt(property.price || 0)
  const deposit = parseInt(property.deposit || 0)

  if (price === 0 && deposit > 0) {
    // 매매가가 0이면 보증금으로 표시
    return formatPrice(deposit)
  } else {
    // 일반적인 경우 매매가 표시
    return formatPrice(price)
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
  cursor: pointer;
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
