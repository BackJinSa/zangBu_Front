<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Header from './components/common/Header.vue'
import Footer from './components/common/Footer.vue'

const route = useRoute()

// /map 경로와 그 하위 경로에서는 footer를 숨김
const showFooter = computed(() => {
  return !route.path.startsWith('/map')
})
</script>

<template>
  <div id="app">
    <Header />
    <main>
      <RouterView />
    </main>
    <Footer v-if="showFooter" />
  </div>
</template>
