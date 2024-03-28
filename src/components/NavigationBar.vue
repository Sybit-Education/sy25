<template>
  <div class="navigation-bar">
    <TabMenu :model="items" />
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
          to: '/'
        },
        {
          label: 'Sessions',
          icon: 'pi pi-calendar',
          to: '/sessions'
        },
        {
          label: 'Speakers',
          icon: 'pi pi-users',
          to: '/speakers'
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
