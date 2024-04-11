import router from '../router/index';
<template>
  <router-link to="#active">
    <Button rounded @click="scrollFix('#active')" class="jump-to-current-button"
      ><font-awesome-icon :icon="['far', 'clock']"
    /></Button>
  </router-link>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
export default defineComponent({
  name: 'app',
  components: { FontAwesomeIcon },
  methods: {
    scrollFix: function (hashbang: string) {
      console.log(hashbang)
      const el = document.getElementById(hashbang)
      if (el) {
        console.log("scroll")
        window.scrollTo(0, el.offsetTop)
      }
      location.hash = hashbang
    } 
  }
})
</script>
<style lang="scss" scoped>
.jump-to-current-button {
  position: fixed;
  bottom: 60px;
  right: 20px;
  background-color: var(--surface-100);
  border: 1px solid var(--primary-color);
  border-radius: 5px;
  padding: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: var(--primary-color);
  transition:
    background-color 0.3s,
    color 0.3s;
  &:hover {
    background-color: var(--primary-color);
    color: var(--surface-100);
  }
  svg {
    font-size: 2rem;
  }
}
</style>
