<template>
  <div class="navigation-bar">
    <TabMenu :model="items">
      <template #item="{ item, props }">
        <router-link v-slot="{ href, navigate }" :to="item.route" custom>
          <a :href="href" v-bind="props.action" @click="navigate">
            <span v-bind="props.icon" />
            <span v-bind="props.label">{{ item.label }}</span>
          </a>
        </router-link>
      </template>
    </TabMenu>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      items: [
        {
          label: 'Home',
          icon: 'pi pi-home',
          route: '/'
        },
        {
          label: 'About',
          icon: 'pi pi-users',
          route: '/about'
        }
        // Füge hier weitere Menüpunkte hinzu
      ]
    }
  }
}
</script>

<style>
.navigation-bar {
  position: fixed;
  bottom: 0;
  width: 100%;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1); /* Leichter Schatten für Tiefe */
  z-index: 1000; /* Stellt sicher, dass die Navigationsleiste über anderen Elementen liegt */
}
/* Optional: Stil für den TabMenu-Hintergrund, falls gewünscht */
.tabmenu {
  background-color: #fff;
}
</style>
