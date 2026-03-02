<script setup lang="ts">
import SimlessLogoSvg from '../assets/SimlessLogoSvg.vue'
</script>

<template>
  <header class="header">
    <SimlessLogoSvg class="logo" width="86" height="25" aria-label="SIMLESS" />
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
