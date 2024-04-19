<template>
  <nav class="header-bar px-2 flex flex-cols">
    <div class="text-left flex-1">
      <RouterLink v-if="showBackButton" to="/" class="flex-1 text-center">
        <Button  class="m-1" rounded style="padding-left:14px"><font-awesome-icon :icon="['fas', 'chevron-left']" /></Button>
      </RouterLink>
      <div v-else class="m-1">&nbsp;</div>
    </div>
    <RouterLink to="/" class="flex-1 text-center">
      <img class="logo m-2" src="/img/sykom24.png" alt="logo" />
    </RouterLink>
    <div class="text-right flex-1">
      <RouterLink to="/about" class="flex-1">
        <Button class="m-1" outlined rounded style="padding-left:17px"><font-awesome-icon :icon="['fas', 'info']" /></Button>
      </RouterLink>      
      <Button @click="reload" class="m-1" outlined rounded style="padding-left:12px"><font-awesome-icon :icon="['fas', 'sync']" /></Button>
    </div>
  </nav>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { RouterLink } from 'vue-router'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { mapState } from 'pinia'
import { useNavigationStore} from '@/stores/navigation.store'

export default defineComponent({
  name: 'HeaderBar',
  components: { RouterLink, FontAwesomeIcon },
  computed: {
    ...mapState(useNavigationStore, {
      showBackButton: (store) => store.backButton
    }),
    ...mapState(useNavigationStore, {
      backUrl: (store) => store.backUrl
    }),    
  }, 
  methods: {
    reload() {
      location.reload()
    }
  }
})
</script>
<style lang="scss">
.header-bar {
  display: block;
  width: 100vw;
  margin: 0;
  position: fixed;
  top: 0px;
  left: 0px;
  padding-top: calc(0.25rem + env(safe-area-inset-top));
  padding-left: calc(env(safe-area-inset-left));
  padding-right: calc(env(safe-area-inset-right));
  background: #18181b;
  z-index: 1000;
  border-bottom: #909090 1px solid;

  .logo {
    height: 2.5rem;
    width: auto;
  }

  button {
    width: 2.5rem;
    height: 2.5rem;
  }
}
</style>
