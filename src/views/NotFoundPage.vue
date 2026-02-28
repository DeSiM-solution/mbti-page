<script setup lang="ts">
import { useRouter } from 'vue-router'
import PrimaryButton from '../components/common/PrimaryButton.vue'
import PageSection from '../components/layout/PageSection.vue'

const router = useRouter()
</script>

<template>
  <PageSection class="page">
    <h2>ページが見つかりません</h2>
    <p>URL を確認するか、トップページから再度お試しください。</p>
    <PrimaryButton label="トップへ戻る" @click="router.push({ name: 'landing' })" />
  </PageSection>
</template>

<style scoped>
.page {
  display: grid;
  gap: 12px;
  padding-top: 36px;
}

h2,
p {
  margin: 0;
}

p {
  color: var(--color-text-secondary);
}
</style>
