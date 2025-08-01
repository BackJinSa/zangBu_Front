<template>
  <div class="min-h-screen bg-bg-1">
    <div class="p-6 bg-bg-2">
      <h1 class="text-2xl font-bold mb-6 text-brand-1">공용 컬러 시스템 가이드</h1>
      
      <!-- Brand Colors -->
      <section class="mb-8">
        <h2 class="text-xl font-semibold mb-4 text-brand-2">Brand Colors</h2>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          <div class="color-card">
            <div class="color-swatch" style="background-color: var(--brand-1)"></div>
            <div class="color-info">
              <p class="font-medium">Brand/1</p>
              <p class="text-sm text-text-1">#1C4025</p>
              <p class="text-xs text-text-1">bg-brand-1</p>
            </div>
          </div>
          <div class="color-card">
            <div class="color-swatch" style="background-color: var(--brand-2)"></div>
            <div class="color-info">
              <p class="font-medium">Brand/2</p>
              <p class="text-sm text-text-1">#285934</p>
              <p class="text-xs text-text-1">bg-brand-2</p>
            </div>
          </div>
          <div class="color-card">
            <div class="color-swatch" style="background-color: var(--brand-3)"></div>
            <div class="color-info">
              <p class="font-medium">Brand/3</p>
              <p class="text-sm text-text-1">#68A63C</p>
              <p class="text-xs text-text-1">bg-brand-3</p>
            </div>
          </div>
          <div class="color-card">
            <div class="color-swatch" style="background-color: var(--brand-4)"></div>
            <div class="color-info">
              <p class="font-medium">Brand/4</p>
              <p class="text-sm text-text-1">#68A63C</p>
              <p class="text-xs text-text-1">bg-brand-4</p>
            </div>
          </div>
          <div class="color-card">
            <div class="color-swatch" style="background-color: var(--brand-5); border: 1px solid #d1d5db"></div>
            <div class="color-info">
              <p class="font-medium">Brand/5</p>
              <p class="text-sm text-text-1">#F2F2F2</p>
              <p class="text-xs text-text-1">bg-brand-5</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Status Colors -->
      <section class="mb-8">
        <h2 class="text-xl font-semibold mb-4 text-brand-2">Status Colors</h2>
        <div class="grid grid-cols-2 gap-4">
          <div class="color-card">
            <div class="color-swatch" style="background-color: var(--status-1)"></div>
            <div class="color-info">
              <p class="font-medium">Status/1</p>
              <p class="text-sm text-text-1">#0D8CE7</p>
              <p class="text-xs text-text-1">bg-status-1</p>
            </div>
          </div>
          <div class="color-card">
            <div class="color-swatch" style="background-color: var(--status-2)"></div>
            <div class="color-info">
              <p class="font-medium">Status/2</p>
              <p class="text-sm text-text-1">#DC3545</p>
              <p class="text-xs text-text-1">bg-status-2</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Text Colors -->
      <section class="mb-8">
        <h2 class="text-xl font-semibold mb-4 text-brand-2">Text Colors</h2>
        <div class="grid grid-cols-3 gap-4">
          <div class="color-card">
            <div class="color-swatch" style="background-color: var(--text-1)"></div>
            <div class="color-info">
              <p class="font-medium">Text/1</p>
              <p class="text-sm text-text-1">#6B7280</p>
              <p class="text-xs text-text-1">text-text-1</p>
            </div>
          </div>
          <div class="color-card">
            <div class="color-swatch" style="background-color: var(--text-2)"></div>
            <div class="color-info">
              <p class="font-medium">Text/2</p>
              <p class="text-sm text-text-1">#555555</p>
              <p class="text-xs text-text-1">text-text-2</p>
            </div>
          </div>
          <div class="color-card">
            <div class="color-swatch" style="background-color: var(--text-3); border: 1px solid #d1d5db"></div>
            <div class="color-info">
              <p class="font-medium">Text/3</p>
              <p class="text-sm text-text-1">#FFFFFF</p>
              <p class="text-xs text-text-1">text-text-3</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Background Colors -->
      <section class="mb-8">
        <h2 class="text-xl font-semibold mb-4 text-brand-2">Background Colors</h2>
        <div class="grid grid-cols-2 gap-4">
          <div class="color-card">
            <div class="color-swatch" style="background-color: var(--bg-1); border: 1px solid #d1d5db"></div>
            <div class="color-info">
              <p class="font-medium">BG/1</p>
              <p class="text-sm text-text-1">#F2F2F2</p>
              <p class="text-xs text-text-1">bg-bg-1</p>
            </div>
          </div>
          <div class="color-card">
            <div class="color-swatch" style="background-color: var(--bg-2); border: 1px solid #d1d5db"></div>
            <div class="color-info">
              <p class="font-medium">BG/2</p>
              <p class="text-sm text-text-1">#FFFFFF</p>
              <p class="text-xs text-text-1">bg-bg-2</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Usage Examples -->
      <section class="mb-8">
        <h2 class="text-xl font-semibold mb-4 text-brand-2">사용 예시</h2>
        <div class="space-y-4">
          <div class="p-4 rounded" style="background-color: var(--brand-1); color: var(--text-3)">
            <p class="font-medium">Primary Button Style</p>
            <p class="text-sm">bg-brand-1 text-text-3</p>
          </div>
          <div class="p-4 rounded" style="background-color: var(--brand-3); color: var(--text-3)">
            <p class="font-medium">Secondary Button Style</p>
            <p class="text-sm">bg-brand-3 text-text-3</p>
          </div>
          <div class="p-4 rounded" style="background-color: var(--status-1); color: var(--text-3)">
            <p class="font-medium">Info Status</p>
            <p class="text-sm">bg-status-1 text-text-3</p>
          </div>
          <div class="p-4 rounded" style="background-color: var(--status-2); color: var(--text-3)">
            <p class="font-medium">Error Status</p>
            <p class="text-sm">bg-status-2 text-text-3</p>
          </div>
          <div class="p-4 rounded" style="background-color: var(--bg-1); color: var(--text-2)">
            <p class="font-medium">Background Content</p>
            <p class="text-sm">bg-bg-1 text-text-2</p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ColorGuideView'
}
</script>

<style scoped>
.color-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  background-color: var(--bg-2);
  border-radius: 0.5rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  border: 1px solid #e5e7eb;
}

.color-swatch {
  width: 4rem;
  height: 4rem;
  border-radius: 0.5rem;
  margin-bottom: 0.75rem;
}

.color-info {
  text-align: center;
}

.color-info p {
  margin-bottom: 0.25rem;
}
</style> 