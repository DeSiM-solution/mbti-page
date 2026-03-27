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
  min-height: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 8px 12px;
  background: #fff;
}

.logo {
  width: 86px;
  height: 25px;
  object-fit: contain;
}
</style>
