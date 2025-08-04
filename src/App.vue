<script setup>
import Header from './components/common/Header.vue'
import Footer from './components/common/Footer.vue'
</script>

<template>
  <div id="app">
    <Header />
    <main>
      <RouterView />
    </main>
    <Footer />
  </div>
</template>
