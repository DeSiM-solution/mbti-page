<script setup lang="ts">
import { RouterView } from 'vue-router'
import PageFooter from './components/layout/PageFooter.vue'
import PageHeader from './components/layout/PageHeader.vue'
import MobileAppShell from './components/layout/MobileAppShell.vue'
import bannerImage from './assets/banner.svg'
</script>

<template>
  <MobileAppShell>
    <PageHeader />
    <img class="page-banner" :src="bannerImage" alt="旅タイプ診断バナー" width="375" height="350" />
    <main class="view-host">
      <RouterView />
    </main>
    <PageFooter />
  </MobileAppShell>
</template>

<style scoped>
.view-host {
  flex: 1;
}

.page-banner {
  display: block;
  width: 100%;
  height: auto;
}
</style>
