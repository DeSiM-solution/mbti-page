<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import PrimaryButton from '../components/common/PrimaryButton.vue'
import SectionTitle from '../components/common/SectionTitle.vue'
import PageSection from '../components/layout/PageSection.vue'
import { defaultTicketInfo, type TicketInfo } from '../mocks/ticket'
import { getTicketInfo } from '../services/contentService'

const router = useRouter()
const ticketInfo = ref<TicketInfo>(defaultTicketInfo)
const isLoading = ref(true)
const loadError = ref('')

async function loadTicketInfo() {
  isLoading.value = true
  loadError.value = ''
  try {
    ticketInfo.value = await getTicketInfo()
  } catch {
    loadError.value = '引換券情報の取得に失敗しました。'
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  void loadTicketInfo()
})
</script>

<template>
  <div class="page">
    <PageSection v-if="isLoading" muted>
      <p class="state-message">引換券情報を読み込んでいます...</p>
    </PageSection>

    <PageSection v-else-if="loadError" muted>
      <p class="state-message error">{{ loadError }}</p>
      <PrimaryButton label="再試行" @click="loadTicketInfo" />
    </PageSection>

    <template v-else>
      <PageSection muted>
        <SectionTitle :title="ticketInfo.title" subtitle="TICKET" />
        <div class="ticket">
          <p class="plan">{{ ticketInfo.plan }}</p>
          <p class="code">クーポンコード: {{ ticketInfo.couponCode }}</p>
          <p class="desc">{{ ticketInfo.description }}</p>
        </div>
      </PageSection>

      <PageSection>
        <SectionTitle title="注意事項" subtitle="NOTICE" />
        <ul class="notes">
          <li v-for="note in ticketInfo.notes" :key="note">{{ note }}</li>
        </ul>
        <PrimaryButton variant="ghost" label="トップへ戻る" @click="router.push({ name: 'landing' })" />
      </PageSection>
    </template>
  </div>
</template>

<style scoped>
.page {
  padding-bottom: 24px;
}

.ticket {
  border-radius: 16px;
  padding: 16px;
  color: #fff;
  background: linear-gradient(135deg, #07874d 0%, #13ab5b 100%);
}

.plan {
  margin: 0 0 10px;
  font-size: 24px;
  font-weight: 800;
}

.code {
  margin: 0 0 8px;
  font-size: 14px;
}

.desc {
  margin: 0;
  font-size: 12px;
  opacity: 0.92;
}

.notes {
  margin: 0 0 16px;
  padding-left: 18px;
  display: grid;
  gap: 8px;
  color: var(--color-text-secondary);
  font-size: 13px;
  line-height: 1.6;
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
