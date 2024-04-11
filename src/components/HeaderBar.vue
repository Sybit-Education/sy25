<template>
  <nav class="header-bar text-center">
    <RouterLink to="/">
      <img class="logo m-1" src="/img/sykom24.png" alt="logo" />
    </RouterLink>
  </nav>
</template>
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
