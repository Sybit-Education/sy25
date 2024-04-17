<template>
  <div class="about m-3">
    <h1>Sykom 2024</h1>
    <p>Agenda App der Sybit SyKom 2024.</p>
    <p>Alle aktuellen Informationen zur SyKom finden sich hier.</p>

    <h3>Kontakt</h3>
    <p>Bei Fragen zur Orga wende dich bitte an:</p>
    <ul>
      <li>
        Felix Wollny: 
        <a href="tel:004915231369591">
          <font-awesome-icon :icon="['fas', 'mobile-screen-button']" /> +49 1523 1369591
        </a>
      </li>
      <li>
        Gereon Bechinger: 
        <a href="tel:004915227741903">
          <font-awesome-icon :icon="['fas', 'mobile-screen-button']" /> +49 1522 7741903 
        </a>
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { useNavigationStore } from '@/stores/navigation.store'

export default defineComponent({
  name: 'AboutView',
  mounted() {
    useNavigationStore().setBackButtonVisible(true, '/')
  }
})
</script>

<style lang="scss" scoped>
li {
  list-style-type: none;
  margin-bottom: 1.25rem;
}
</style>
