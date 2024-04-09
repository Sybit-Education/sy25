<script setup lang="ts">
import { RouterView } from 'vue-router'
import HeaderBar from './components/HeaderBar.vue'
import NavigationBar from './components/NavigationBar.vue'
import PwaPrompt from './components/PwaPrompt.vue'
</script>

<template>
  <header>
    <HeaderBar></HeaderBar>
  </header>
  <main class="container md:mx-auto">
    <RouterView />
  </main>
  <footer>
    <NavigationBar />
    <PwaPrompt />
  </footer>
</template>

<style lang="scss">
body {
  background-image: url('/img/pexels-cátia-matos-1072179-darker.jpg');
  background-attachment: fixed;
  background-size: auto;
}
main {
  margin-top: 3.5rem;
  margin-bottom: 3.5rem;
}
</style>
