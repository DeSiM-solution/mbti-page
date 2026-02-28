<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import PrimaryButton from '../components/common/PrimaryButton.vue'
import SectionTitle from '../components/common/SectionTitle.vue'
import PageSection from '../components/layout/PageSection.vue'
import { pickResultType } from '../mocks/results'
import { getQuizQuestions } from '../services/contentService'
import type { QuizQuestion } from '../types/quiz'

const router = useRouter()
const currentIndex = ref(0)
const answers = ref<Record<string, string>>({})
const questions = ref<QuizQuestion[]>([])
const isLoading = ref(true)
const loadError = ref('')

const fallbackQuestion: QuizQuestion = {
  id: 'fallback',
  title: '質問を読み込み中です...',
  options: [],
}

const currentQuestion = computed(() => questions.value[currentIndex.value] ?? fallbackQuestion)
const progressText = computed(() => `Q${Math.min(currentIndex.value + 1, questions.value.length || 1)} / ${questions.value.length || 1}`)
const selectedOption = computed(() => answers.value[currentQuestion.value.id] ?? '')

async function loadQuestions() {
  isLoading.value = true
  loadError.value = ''
  try {
    questions.value = await getQuizQuestions()
    if (!questions.value.length) {
      throw new Error('empty')
    }
    currentIndex.value = 0
    answers.value = {}
  } catch {
    loadError.value = '質問データの読み込みに失敗しました。'
  } finally {
    isLoading.value = false
  }
}

function selectOption(optionId: string) {
  if (!currentQuestion.value.id || currentQuestion.value.id === 'fallback') return
  answers.value = {
    ...answers.value,
    [currentQuestion.value.id]: optionId,
  }
}

function movePrev() {
  if (currentIndex.value === 0) {
    router.push({ name: 'landing' })
    return
  }
  currentIndex.value -= 1
}

function moveNext() {
  if (!selectedOption.value) return
  if (currentIndex.value < questions.value.length - 1) {
    currentIndex.value += 1
    return
  }
  const resultType = pickResultType(Object.values(answers.value))
  router.push({ name: 'result', params: { type: resultType } })
}

onMounted(() => {
  void loadQuestions()
})
</script>

<template>
  <div class="page">
    <PageSection class="head" muted>
      <SectionTitle title="あなたの旅スタイルをチェック" subtitle="QUESTION" />
      <p class="progress">{{ progressText }}</p>
    </PageSection>

    <PageSection v-if="isLoading">
      <p class="state-message">質問を読み込んでいます...</p>
    </PageSection>

    <PageSection v-else-if="loadError">
      <p class="state-message error">{{ loadError }}</p>
      <PrimaryButton label="再試行" @click="loadQuestions" />
    </PageSection>

    <PageSection v-else>
      <h3 class="question">{{ currentQuestion.title }}</h3>
      <div class="options">
        <button
          v-for="option in currentQuestion.options"
          :key="option.id"
          class="option"
          :class="{ active: selectedOption === option.id }"
          type="button"
          @click="selectOption(option.id)"
        >
          {{ option.label }}
        </button>
      </div>
    </PageSection>

    <PageSection v-if="!isLoading && !loadError" class="actions">
      <PrimaryButton variant="ghost" label="前へ" @click="movePrev" />
      <PrimaryButton :disabled="!selectedOption" label="次へ" @click="moveNext" />
    </PageSection>
  </div>
</template>

<style scoped>
.page {
  display: grid;
  gap: 12px;
  padding-bottom: 24px;
}

.head {
  margin-bottom: -8px;
}

.progress {
  margin: 6px 0 0;
  font-size: 13px;
  color: var(--color-accent-strong);
  font-weight: 700;
}

.question {
  margin: 0 0 14px;
  font-size: 20px;
  line-height: 1.4;
}

.options {
  display: grid;
  gap: 10px;
}

.option {
  width: 100%;
  border: 1px solid var(--color-border-soft);
  border-radius: 12px;
  background: #fff;
  color: var(--color-text-primary);
  text-align: left;
  padding: 13px 14px;
  cursor: pointer;
  font-size: 14px;
  line-height: 1.45;
}

.option.active {
  border-color: #0f8a4c;
  background: #ecfff2;
  box-shadow: 0 0 0 2px rgba(15, 138, 76, 0.16) inset;
}

.actions {
  display: grid;
  gap: 10px;
}

.state-message {
  margin: 0;
  font-size: 14px;
  color: var(--color-text-secondary);
}

.state-message.error {
  color: #a73d3d;
  margin-bottom: 12px;
}
</style>
