<script setup lang="ts">
import simlessFooterLogo from '../../assets/simless-footer.svg'
</script>

<template>
  <footer class="footer">
    <img class="logo" :src="simlessFooterLogo" alt="SIMLESS" width="114" height="33" />
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
