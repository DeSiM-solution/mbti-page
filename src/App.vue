<script setup lang="ts">
import { computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import { Toaster } from 'vue-sonner'
import PageFooter from './components/layout/PageFooter.vue'
import PageHeader from './components/layout/PageHeader.vue'
import MobileAppShell from './components/layout/MobileAppShell.vue'
import BootPage from './views/BootPage/index.vue'
import { useLiffSessionStore } from './stores/liffSession'

const bannerImage = new URL('./assets/banner.svg', import.meta.url).href
const route = useRoute()
const liffSessionStore = useLiffSessionStore()
const showBootPage = computed(() => !liffSessionStore.hasIdentity)
const hideTopLayout = computed(() => route.name === 'quiz' || showBootPage.value)
</script>

<template>
  <MobileAppShell :flat="showBootPage">
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
      <BootPage v-if="showBootPage" />
      <RouterView v-else />
    </main>
    <PageFooter v-if="!showBootPage" />
    <Toaster position="top-center" rich-colors/>
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
