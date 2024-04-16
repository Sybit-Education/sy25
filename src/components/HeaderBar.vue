<template>
  <nav class="header-bar px-3 flex flex-cols">
    <RouterLink to="/" class="flex-1">
      <img class="logo m-1" src="/img/sykom24.png" alt="logo" />
    </RouterLink>
    <div class="text-right flex-0">
      <RouterLink to="/about" class="flex-1">
        <Button class="my-1 mx-3" outlined >
          <font-awesome-icon :icon="['fas', 'info']" />
        </Button>
      </RouterLink>      
      <Button @click="reload" class="my-1 mx-3" outlined >
        <font-awesome-icon :icon="['fas', 'sync-alt']" />
      </Button>
    </div>
  </nav>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { RouterLink } from 'vue-router'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

export default defineComponent({
  name: 'HeaderBar',
  components: { RouterLink, FontAwesomeIcon },
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
    height: 2rem;
    width: auto;
  }
}
</style>
