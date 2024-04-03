<template>
  <nav class="header-bar">
    <SykomLogo class="logo"></SykomLogo>
  </nav>
</template>
<style lang="scss">
.header-bar {
  display: block;
  height: 2.5rem;
  width: 100vw;
  margin: 0;
  position: fixed;
  top: 0px;
  left: 0px;
  background: #18181b;
  z-index: 1000;
  
  .logo {
    height: 1.75rem;
    width: auto;
    margin: 0.5rem;
  }
}
</style>
