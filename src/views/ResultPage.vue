<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import PrimaryButton from '../components/common/PrimaryButton.vue'
import SectionTitle from '../components/common/SectionTitle.vue'
import PageSection from '../components/layout/PageSection.vue'
import { isResultType, resultProfiles, type ResultType } from '../mocks/results'
import { getResultProfile } from '../services/contentService'

const route = useRoute()
const router = useRouter()
const isLoading = ref(true)
const loadError = ref('')
const profile = ref(resultProfiles.ESTJ)

const resultType = computed<ResultType>(() => {
  const rawType = String(route.params.type ?? 'ESTJ').toUpperCase()
  return isResultType(rawType) ? rawType : 'ESTJ'
})

async function loadProfile() {
  isLoading.value = true
  loadError.value = ''
  try {
    profile.value = await getResultProfile(resultType.value)
  } catch {
    loadError.value = '結果データの読み込みに失敗しました。'
  } finally {
    isLoading.value = false
  }
}

watch(resultType, () => {
  void loadProfile()
})

onMounted(() => {
  void loadProfile()
})
</script>

<template>
  <div class="page">
    <PageSection v-if="isLoading" muted>
      <p class="state-message">結果を読み込んでいます...</p>
    </PageSection>

    <PageSection v-else-if="loadError" muted>
      <p class="state-message error">{{ loadError }}</p>
      <PrimaryButton label="再試行" @click="loadProfile" />
    </PageSection>

    <template v-else>
      <PageSection class="hero" muted>
      <p class="badge">診断結果</p>
      <h2>{{ profile.title }}（{{ profile.code }}）</h2>
      <p class="catch">{{ profile.catch }}</p>
      </PageSection>

      <PageSection>
        <SectionTitle title="タイプの特徴" subtitle="FEATURE" />
        <p class="body">{{ profile.features }}</p>
      </PageSection>

      <PageSection muted>
        <SectionTitle title="通信スタイル" subtitle="STYLE" />
        <p class="body">{{ profile.communicationStyle }}</p>
      </PageSection>

      <PageSection>
        <SectionTitle title="おすすめ eSIM" subtitle="PLAN" />
        <div class="plan-card">
          <h3>{{ profile.planName }}</h3>
          <p>{{ profile.planSummary }}</p>
        </div>
        <div class="actions">
          <PrimaryButton label="引換券を確認する" @click="router.push({ name: 'ticket' })" />
          <PrimaryButton variant="ghost" label="もう一度診断する" @click="router.push({ name: 'quiz' })" />
        </div>
      </PageSection>
    </template>
  </div>
</template>

<style scoped>
.page {
  padding-bottom: 24px;
}

.hero {
  background: linear-gradient(160deg, #e5ffd5 0%, #f7ffd8 100%);
}

.badge {
  margin: 0 0 8px;
  display: inline-flex;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 700;
  background: #fff2ac;
  color: #5a4d00;
}

h2 {
  margin: 0;
  font-size: 24px;
  line-height: 1.3;
}

.catch {
  margin: 10px 0 0;
  color: var(--color-text-secondary);
  font-size: 14px;
  line-height: 1.7;
}

.body {
  margin: 0;
  color: var(--color-text-secondary);
  line-height: 1.75;
  font-size: 14px;
}

.plan-card {
  border-radius: 14px;
  background: #fff;
  border: 1px solid var(--color-border-soft);
  padding: 14px;
  margin-bottom: 12px;
}

.plan-card h3 {
  margin: 0 0 6px;
}

.plan-card p {
  margin: 0;
  color: var(--color-text-secondary);
  line-height: 1.6;
}

.actions {
  display: grid;
  gap: 10px;
}

.state-message {
  margin: 0;
  color: var(--color-text-secondary);
}

.state-message.error {
  color: #a73d3d;
  margin-bottom: 10px;
}
</style>
