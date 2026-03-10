<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { getQuizQuestions } from '../../services/contentService'
import type { QuizQuestion } from '../../types/quiz'
import QuizItem from './components/quiz-section.vue'
import PrimaryButton from '@/components/common/PrimaryButton.vue'
import { calculateMbtiResult } from '@/utils/quizResult'

const router = useRouter()

const currentIndex = ref(0)
const answers = ref<Record<string, string>>({})
const selectedAnswerNums = ref<Record<string, number>>({})
const questions = ref<QuizQuestion[]>([])
const isLoading = ref(true)
const loadError = ref('')
const quizList = ref([
  {
    "id": "Q1",
    "title": "旅行中、\nテンションが上がるのは？",
    "options": [
      "現地の人・旅仲間とワイワイ交流する",
      "どちらかと言えば交流がある方が楽しい",
      "どちらとも言えない",
      "どちらかと言えば自分のペースで過ごしたい",
      "自分のペースで静かに過ごす"
    ]
  },
  {
    "id": "Q2",
    "title": "旅行先で重視するのは？",
    "options": [
      "有名スポット・定番グルメ・王道ルート",
      "どちらかと言えば定番派",
      "どちらとも言えない",
      "どちらかと言えば未知の体験",
      "まだ知られていない場所・偶然の発見"
    ]
  },
  {
    "id": "Q3",
    "title": "旅の判断基準は？",
    "options": [
      "コスパ・効率・移動の合理性",
      "わりと合理性重視",
      "どちらとも言えない",
      "気分や感情を大事にしたい",
      "思い出・「楽しそうか」を最優先"
    ]
  },
  {
    "id": "Q4",
    "title": "スケジュールの組み方は？",
    "options": [
      "出発前にしっかり計画を立てたい",
      "ある程度は決めておきたい",
      "どちらとも言えない",
      "現地で調整できればOK",
      "ノリと気分で決めたい"
    ]
  },
  {
    "id": "Q5",
    "title": "旅先で予定がズレたら？",
    "options": [
      "すぐ代替案を考えて立て直す",
      "できるだけ予定通りに戻す",
      "どちらとも言えない",
      "状況を見て流れに任せる",
      "まあいっか、と完全に委ねる"
    ]
  },
  {
    "id": "Q6",
    "title": "旅行中のSNS投稿は？",
    "options": [
      "リアルタイムでストーリー・投稿しまくる",
      "けっこうリアルタイム派",
      "どちらとも言えない",
      "あとでまとめて投稿",
      "ほぼ投稿しない"
    ]
  }
])


const totalQuestions = computed(() => quizList.value.length)
const currentQuestion = computed(() => quizList.value[currentIndex.value])
const isLastQuestion = computed(() => currentIndex.value === totalQuestions.value - 1)
const progressPercent = computed(() => {
  if (!totalQuestions.value) return 0
  return Math.round(((currentIndex.value + 1) / totalQuestions.value) * 100)
})
const currentSelectedIndex = computed(() => {
  const q = currentQuestion.value
  if (!q) return null
  const answerNum = selectedAnswerNums.value[q.id]
  if (answerNum === undefined) return null
  return answerNum - 1
})
const canGoPrev = computed(() => currentIndex.value > 0)
const canGoNext = computed(() => {
  const q = currentQuestion.value
  if (!q) return false
  return selectedAnswerNums.value[q.id] !== undefined
})
const nextLabel = computed(() => (isLastQuestion.value ? '送信' : '次へ'))

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
    selectedAnswerNums.value = {}
  } catch {
    loadError.value = '質問データの読み込みに失敗しました。'
  } finally {
    isLoading.value = false
  }
}

function handleSelect(payload: { id: string; index: number; text: string, answerNum: number }) {
  // 记录当前题的答案
  answers.value[payload.id] = payload.text
  selectedAnswerNums.value[payload.id] = payload.answerNum
  console.log('[quiz] select', payload)
}

function submitQuiz() {
  const list = quizList.value
  if (!list.length) return

  // 如果有未答题，跳回第一道未答题
  const firstUnanswered = list.findIndex((q) => selectedAnswerNums.value[q.id] === undefined)
  if (firstUnanswered !== -1) {
    currentIndex.value = firstUnanswered
    return
  }

  const { scores, baseType, mappedType } = calculateMbtiResult(
    list.map((q) => q.id),
    selectedAnswerNums.value,
  )

  console.log('[quiz] final scores', scores, 'type:', baseType, 'mapped:', mappedType)

  // 跳转到 /result/:type，例如 /result/ISFJ
  router.push({ name: 'result', params: { type: mappedType } })
}

function goPrev() {
  if (!canGoPrev.value) return
  currentIndex.value -= 1
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function goNext() {
  if (!canGoNext.value) return
  if (isLastQuestion.value) {
    submitQuiz()
    return
  }
  currentIndex.value += 1
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  void loadQuestions()
})
</script>

<template>
  <div class="quiz-page">
    <div class="quiz-progress">
    <div class="progress-meta">
      <span class="progress-text">{{ currentIndex + 1 }} / {{ totalQuestions }}</span>
    </div>
      <div class="progress-track" role="progressbar" :aria-valuenow="progressPercent" aria-valuemin="0" aria-valuemax="100">
        <div class="progress-fill" :style="{ width: `${progressPercent}%` }"></div>
      </div>
    </div>

    <QuizItem
      v-if="currentQuestion"
      :question="currentQuestion"
      :selected-index="currentSelectedIndex"
      @select="handleSelect"
    />

    <div class="quiz-actions">
      <PrimaryButton variant="ghost" :block="false" :disabled="!canGoPrev" @click="goPrev">前へ</PrimaryButton>
      <PrimaryButton :block="false" :disabled="!canGoNext" @click="goNext">{{ nextLabel }}</PrimaryButton>
    </div>
  </div>
</template>

<style scoped lang="scss">
.quiz-page {
  display: grid;
  gap: 16px;
  padding-bottom: 24px;
  background: linear-gradient(to bottom, #FFFFB3 50%, #E2FFB3 100%)
}

.quiz-progress {
  position: sticky;
  top: 0;
  z-index: 3;
  padding: 12px 16px 8px;
  background: linear-gradient(to bottom, rgba(255, 255, 179, 0.98), rgba(255, 255, 179, 0.7));
  backdrop-filter: blur(4px);
}

.progress-meta {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  font-weight: 700;
  color: #2d7a37;
  margin-bottom: 6px;
}

.progress-track {
  width: 100%;
  height: 10px;
  border-radius: 999px;
  background: #ffffff;
  box-shadow: inset 0 0 0 2px rgba(15, 138, 76, 0.2);
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(120deg, #0b9f55, #39b84f);
  transition: width 0.2s ease;
}

.quiz-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  padding: 0 16px 24px;
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
