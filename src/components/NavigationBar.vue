<template>
  <TabMenu :model="items" class="navigation-bar">
    <template #item="{ item, props }">
      <router-link v-slot="{ href, navigate }" :to="item.route" custom>
        <a :href="href" v-bind="props.action" @click="navigate">
          <font-awesome-icon :icon="props.icon" />
          <span v-bind="props.label">{{ item.label }}</span>
        </a>
      </router-link>
    </template>
  </TabMenu>
</template>

<script lang="ts">
export default {
  data() {
    return {
      items: [
        {
          label: 'Home',
          //icon: 'fa-solid fa-house',
          route: '/'
        },
        {
          label: 'About',
          icon: 'fa-solid fa-house',
          route: '/about'
        }
        // Füge hier weitere Menüpunkte hinzu
      ]
    }
  }
}
</script>

<style lang="scss">
.p-tabmenu-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  box-shadow: 0 -2px 5px rgba(#27272c, 0.8); /* Leichter Schatten für Tiefe */
  margin-bottom: calc(1.5rem + env(safe-area-inset-bottom));
  padding-left: calc(env(safe-area-inset-left));
  padding-right: calc(env(safe-area-inset-right));
  z-index: 1000;
}
</style>
