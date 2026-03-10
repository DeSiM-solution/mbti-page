<script setup lang="ts">
import { computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import PageFooter from './components/layout/PageFooter.vue'
import PageHeader from './components/layout/PageHeader.vue'
import MobileAppShell from './components/layout/MobileAppShell.vue'

const bannerImage = new URL('./assets/banner.svg', import.meta.url).href
const route = useRoute()
const hideTopLayout = computed(() => route.name === 'quiz')
</script>

<template>
  <MobileAppShell>
    <PageHeader v-if="!hideTopLayout" />
    <img
      v-if="!hideTopLayout"
      class="page-banner"
      :src="bannerImage"
      alt="旅タイプ診断バナー"
      width="375"
      height="350"
    />
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
