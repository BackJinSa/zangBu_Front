<!-- /src/components/system/NotificationFilter.vue -->
<template>
  <div class="filter-tabs">
    <button
      v-for="filter in filters"
      :key="filter.key"
      :class="['tab-button', { active: filter.key === activeFilter }]"
      @click="$emit('filter-change', filter.key)"
    >
      {{ filter.label }}
      <span class="count">{{ filter.count }}</span>
    </button>
  </div>
</template>

<script setup>
defineProps({
  filters: Array,
  activeFilter: String,
})
</script>

<style scoped>
.filter-tabs {
  display: flex;
  background-color: white;
  padding: 12px 20px;
  border-bottom: 1px solid #e9ecef;
  gap: 8px;
}

.tab-button {
  border: none;
  background: #f1f3f5;
  color: #495057;
  font-size: 14px;
  padding: 6px 12px;
  border-radius: 16px;
  cursor: pointer;
}

.tab-button.active {
  background: #343a40;
  color: white;
}

.count {
  font-weight: bold;
  margin-left: 6px;
}
</style>
