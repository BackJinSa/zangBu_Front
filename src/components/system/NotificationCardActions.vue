<!-- /components/system/NotificationCardActions.vue -->
<template>
  <div class="flex flex-col items-end space-y-2 ml-4">
    <!-- 읽음 처리 버튼 (✔ 아이콘) -->
    <button
      v-if="!isRead"
      @click="$emit('read')"
      class="text-green-600 hover:text-green-800 transition text-xl"
      title="읽음 처리"
    >
      ✔
    </button>

    <!-- 삭제 버튼 (❌ 아이콘) -->
    <button
      @click="$emit('delete')"
      class="text-gray-400 hover:text-red-500 transition text-xl"
      title="삭제"
    >
      ❌
    </button>
  </div>
</template>

<script setup>
defineProps({
  isRead: {
    type: Boolean,
    required: true,
  },
})
</script>
