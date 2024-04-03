<script setup lang="ts">
import { RouterView } from 'vue-router'
import HeaderBar from './components/HeaderBar.vue'
import NavigationBar from './components/NavigationBar.vue'
</script>

<template>
  <header>
    <HeaderBar></HeaderBar>
  </header>
  <main>
    <RouterView />
  </main>
  <footer>
    <NavigationBar />
  </footer>
</template>

<style lang="scss">
body {
  background-image: url('/img/pexels-cátia-matos-1072179.jpg');
  background-attachment: fixed;
  background-size: auto;
}
main {
  margin-top: 3.5rem;
  margin-bottom: 3.5rem;
}
</style>
