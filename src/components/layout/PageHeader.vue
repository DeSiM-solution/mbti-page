<script setup lang="ts">
import simlessLogo from '../../assets/simless.svg'
</script>

<template>
  <header class="header">
    <img class="logo" :src="simlessLogo" alt="SIMLESS" width="86" height="25" />
  </header>
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 10;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
}

.logo {
  width: 86px;
  height: 25px;
  object-fit: contain;
}
</style>
