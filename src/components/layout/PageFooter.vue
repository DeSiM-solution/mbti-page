<script setup lang="ts">
import SimlessFooterLogoSvg from '../assets/SimlessFooterLogoSvg.vue'
</script>

<template>
  <footer class="footer">
    <SimlessFooterLogoSvg class="logo" width="114" height="33" aria-label="SIMLESS" />
    <p class="copyright">© 2026 SIMLESS</p>
  </footer>
</template>

<style scoped>
.footer {
  padding: 20px 0;
  background: #088547;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
}

.logo {
  width: 114px;
  height: 33px;
  object-fit: contain;
  display: block;
}

.copyright {
  margin: 0;
  font-size: 12px;
  line-height: 1;
  color: #fff;
}
</style>
