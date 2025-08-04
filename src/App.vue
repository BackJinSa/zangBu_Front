<script setup>
import Header from './components/common/Header.vue'
import footer from './components/common/Footer.vue'
</script>

<template>
  <div id="app">
    <Header />
    <main>
      <RouterView />
    </main>
    <footer />
  </div>
</template>
