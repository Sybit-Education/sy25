<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavigationBar from './components/NavigationBar.vue'
</script>

<template>
  <header></header>

  <main>
    <RouterView />
  </main>
  <footer>
    <NavigationBar />
  </footer>
</template>

<style scoped></style>
