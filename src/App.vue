<script setup lang="ts">
import { RouterView } from 'vue-router'
import HeaderBar from './components/HeaderBar.vue'
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
    <PwaPrompt />
  </footer>
</template>

<style lang="scss">
body {
  background-image: url('/img/pexels-cátia-matos-1072179-darker.jpg');
  background-attachment: fixed;
  background-size: auto;
}
.container {
  margin-top: 3.5rem;
  margin-bottom: 0.5rem;
  padding-top: env(safe-area-inset-top);
  padding-bottom: env(safe-area-inset-bottom);
  padding-left: env(safe-area-inset-left);
  padding-right: env(safe-area-inset-right);
}
</style>
