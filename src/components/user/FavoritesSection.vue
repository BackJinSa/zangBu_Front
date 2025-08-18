<template>
  <section class="favorites-section">
    <!-- 상단 제목 -->
    <div class="text-left mb-6">
      <div class="flex items-center gap-2">
        <i class="fa-regular fa-heart" style="color: var(--brand-3)"></i>
        <h2 class="text-xl font-semibold">내가 찜한 매물</h2>
      </div>
      <hr class="mt-2" />
    </div>

    <!-- 목록 영역 -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- 로딩 스켈레톤 -->
      <template v-if="fav.loading && !fav.firstLoaded">
        <div v-for="i in 6" :key="i" class="animate-pulse bg-white h-48 rounded-lg shadow" />
      </template>

      <!-- 에러 -->
      <template v-else-if="fav.error">
        <div class="col-span-full text-center text-red-500">{{ fav.error }}</div>
      </template>

      <!-- 빈 상태 -->
      <template v-else-if="fav.items.length === 0">
        <div class="col-span-full text-center text-gray-500">아직 찜한 매물이 없어요.</div>
      </template>

      <!-- 실제 카드 목록 -->
      <PropertyCard
        v-else
        v-for="property in fav.items"
        :key="property.bookmark_id || property.building_id"
        :property="property"
        @detail="onDetail"
        @delete="onDelete"
      />
    </div>

    <!-- 더 보기 -->
    <div v-if="fav.pages > fav.page" class="text-center mt-6">
      <button class="secondary-button" @click="loadMore" :disabled="fav.loading">
        {{ fav.loading ? '불러오는 중...' : '더 보기' }}
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import PropertyCard from '@/components/common/PropertyCard.vue'
import { getFavorites } from '@/api/user/user' // 경로 확인
import { deleteFavorite as deleteFavoriteApi } from '@/api/user/user' // <-- 삭제 API import

// ===== Props & Emits =====
const props = defineProps<{
  pageSize?: number
  unitIsManwon?: boolean // 백엔드 금액 단위: '만원'이면 true(기본), '원'이면 false
}>()

const emit = defineEmits<{
  (e: 'loaded', meta: { total: number; pages: number }): void
  (e: 'detail', payload: any): void
  (e: 'deleted', buildingId: number | string): void
}>()

// ===== 상태 =====
const fav = reactive({
  items: [] as any[],
  page: 1,
  size: props.pageSize ?? 9,
  total: 0,
  pages: 1,
  loading: false,
  error: '',
  firstLoaded: false,
})

// 삭제 진행 중 빌딩 ID 세트(중복 클릭 방지)
const deletingIds = new Set<number | string>()

// ===== 유틸 =====
const UNIT_IS_MANWON = props.unitIsManwon ?? true

function mapSaleTypeKo(s?: string) {
  if (!s) return ''
  if (s === 'TRADING') return '매매'
  if (s === 'CHARTER') return '전세'
  if (s === 'MONTHLY') return '월세'
  return s
}
function toWon(n: number | null | undefined) {
  if (n == null) return undefined
  return UNIT_IS_MANWON ? Number(n) * 10_000 : Number(n)
}

// LocalDateTime 변형 입력 대응(ISO 문자열, 배열 등)
function toDateFromMaybe(value: any): Date | null {
  if (!value) return null
  if (typeof value === 'string') {
    const d = new Date(value)
    return isNaN(d.getTime()) ? null : d
  }
  if (Array.isArray(value) && value.length >= 3) {
    const [y, m, d, hh = 0, mm = 0, ss = 0] = value
    return new Date(y, m - 1, d, hh, mm, ss)
  }
  return null
}

function formatSavedAgo(input: any) {
  const saved = toDateFromMaybe(input)
  if (!saved) return ''
  const now = new Date()
  const diff = (now.getTime() - saved.getTime()) / 1000
  if (diff < 60) return '방금 저장'
  if (diff < 3600) return `${Math.floor(diff / 60)}분 전 저장`
  if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전 저장`
  const days = Math.floor(diff / 86400)
  if (days < 30) return `${days}일 전 저장`
  return `${saved.getFullYear()}-${String(saved.getMonth() + 1).padStart(2, '0')}-${String(
    saved.getDate()
  ).padStart(2, '0')} 저장`
}

// 백 DTO -> 카드용 스네이크케이스 매핑
function mapBookmarkToCard(b: any) {
  const saleTypeKo = mapSaleTypeKo(b.saleType)
  return {
    bookmark_id: b.bookmarkId,
    building_id: b.buildingId,
    complex_id: b.complexId,
    seller_nickname: b.sellerNickname,
    sale_type: saleTypeKo,
    price: toWon(b.price),
    deposit: toWon(b.deposit),
    bookmark_count: b.bookmarkCount,
    created_at: b.createdAt ? formatSavedAgo(b.createdAt) : '',
    building_name: b.buildingName,
    seller_type: b.sellerType,
    property_type: b.propertyType,
    info_oneline: b.infoOneLine,
    image_url: b.imageUrl || '/default-property.jpg',
    facility: b.facility,
    contact_name: b.contactName,
    contact_phone: b.contactPhone,
    size: b.size,
    move_date: b.moveDate,
    raw: b,
  }
}

// ===== API =====
async function fetchFavorites({ reset = false } = {}) {
  if (fav.loading) return
  fav.loading = true
  fav.error = ''
  try {
    const { data } = await getFavorites({ page: fav.page, size: fav.size })
    const mapped = (data?.bookmarkBuildings ?? []).map(mapBookmarkToCard)
    if (reset) fav.items = mapped
    else fav.items.push(...mapped)
    fav.total = data?.total ?? (reset ? mapped.length : fav.total + mapped.length)
    fav.pages = data?.pages ?? 1
    fav.firstLoaded = true
    emit('loaded', { total: fav.total, pages: fav.pages })
  } catch (e) {
    console.error(e)
    fav.error = '찜한 매물 목록을 불러오지 못했습니다.'
  } finally {
    fav.loading = false
  }
}

function loadMore() {
  if (fav.page < fav.pages) {
    fav.page += 1
    fetchFavorites()
  }
}

// ===== 카드 이벤트 =====
function onDetail(prop: any) {
  emit('detail', prop) // 부모에서 라우팅 처리 권장
}

async function onDelete(prop: any) {
  const buildingId = prop?.building_id
  if (!buildingId) return
  if (deletingIds.has(buildingId)) return // 중복 클릭 방지
  deletingIds.add(buildingId)

  // 낙관적 제거
  const prevItems = [...fav.items]
  fav.items = fav.items.filter((p) => p.building_id !== buildingId)
  fav.total = Math.max(0, fav.total - 1)
  emit('loaded', { total: fav.total, pages: fav.pages })

  try {
    await deleteFavoriteApi(buildingId) // <-- DELETE /member/mypage/favorite/delete?buildingId=
    emit('deleted', buildingId)
  } catch (e) {
    console.error(e)
    // 롤백
    fav.items = prevItems
    fav.total = prevItems.length // total을 서버 total로 맞추고 싶으면 재조회
    emit('loaded', { total: fav.total, pages: fav.pages })
    window.alert('삭제에 실패했어요. 잠시 후 다시 시도해주세요.')
  } finally {
    deletingIds.delete(buildingId)
  }
}

// 초기 로드
onMounted(() => {
  fetchFavorites({ reset: true })
})
</script>

<style scoped>
.favorites-section {
  background: var(--bg-1);
  border-radius: 0.75rem;
  padding: 1.5rem;
}
</style>
