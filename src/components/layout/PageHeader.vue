<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import SimlessLogoSvg from '../assets/SimlessLogoSvg.vue'
import { extractReferrerLineId, liffUserId, prefetchLiffUserId } from '@/services/liffShare'

const route = useRoute()
const displayLineId = computed(() => liffUserId.value)
const displayRefLineId = computed(() => extractReferrerLineId(route.fullPath))

onMounted(() => {
  void prefetchLiffUserId()
})
</script>

<template>
  <header class="header">
    <SimlessLogoSvg class="logo" width="86" height="25" aria-label="SIMLESS" />
    <div v-if="displayLineId || displayRefLineId" class="line-id-debug">
      <div v-if="displayLineId">
        LINE ID: {{ displayLineId }}
      </div>
      <div v-if="displayRefLineId">
        REF LINE ID: {{ displayRefLineId }}
      </div>
    </div>
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

.line-id-debug {
  width: 100%;
  font-size: 10px;
  line-height: 1.35;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;
  color: #444;
  word-break: break-all;
  text-align: center;
}
</style>
