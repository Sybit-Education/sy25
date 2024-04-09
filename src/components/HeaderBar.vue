<template>
  <nav class="header-bar text-center">
    <img class="logo" src="/img/sykom24.png" alt="logo" />
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
  border-bottom: #909090 1px solid;

  .logo {
    height: 2rem;
    width: auto;
    margin: 0.5rem;
  }
}
</style>
