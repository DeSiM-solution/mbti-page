<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { getQuizQuestions } from '../../services/contentService'
import type { QuizQuestion } from '../../types/quiz'
import QuizItem from './components/quiz-section.vue'

const router = useRouter()

const currentIndex = ref(0)
const answers = ref<Record<string, string>>({})
const selectedIndexes = ref<Record<string, number>>({})
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

type MbtiAxis = 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P'

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

function handleSelect(payload: { id: string; index: number; text: string }) {
  // 记录当前题的答案
  answers.value[payload.id] = payload.text
  selectedIndexes.value[payload.id] = payload.index
  console.log('[quiz] select', payload)

  const list = quizList.value
  if (!list.length) return

  // 如果是最后一题，输出整份答题结果
  const lastQuestion = list[list.length - 1]
  if (!lastQuestion) return
  const lastQuestionId = lastQuestion.id
  if (payload.id === lastQuestionId) {
    // 统计 MBTI 4 个维度分数
    const scores: Record<MbtiAxis, number> = {
      E: 0,
      I: 0,
      S: 0,
      N: 0,
      T: 0,
      F: 0,
      J: 0,
      P: 0,
    }

    for (const q of list) {
      const idx = selectedIndexes.value[q.id]
      if (idx === undefined) continue

      // 选项 index: 0,1,2,3,4  对应 1～5
      switch (q.id) {
        case 'Q1':
        case 'Q6': {
          if (idx === 0 || idx === 1) scores.E += 1
          if (idx === 3 || idx === 4) scores.I += 1
          break
        }
        case 'Q2': {
          if (idx === 0 || idx === 1) scores.S += 1
          if (idx === 3 || idx === 4) scores.N += 1
          break
        }
        case 'Q3': {
          if (idx === 0 || idx === 1) scores.T += 1
          if (idx === 3 || idx === 4) scores.F += 1
          break
        }
        case 'Q4':
        case 'Q5': {
          if (idx === 0 || idx === 1) scores.J += 1
          if (idx === 3 || idx === 4) scores.P += 1
          break
        }
        default:
          break
      }
    }

    const ei = scores.E >= scores.I ? 'E' : 'I'
    const sn = scores.S >= scores.N ? 'S' : 'N'
    const tf = scores.T >= scores.F ? 'T' : 'F'
    const jp = scores.J >= scores.P ? 'J' : 'P'

    const mbtiType = `${ei}${sn}${tf}${jp}`

    console.log('[quiz] final scores', scores, 'type:', mbtiType)

    // 跳转到 /result/:type，例如 /result/ISFJ
    router.push({ name: 'result', params: { type: mbtiType } })
    return
  }

  // 选中当前题后，自动滚动到下一题（Q1 -> Q2 -> ...）
  const currentIdx = list.findIndex((q) => q.id === payload.id)
  const next = currentIdx >= 0 ? list[currentIdx + 1] : null
  if (next) {
    const el = document.getElementById(`quiz-${next.id}`)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }
}

onMounted(() => {
  void loadQuestions()
})
</script>

<template>
  <div class="quiz-page">
    <QuizItem
      v-for="q in quizList"
      :key="q.id"
      :question="q"
      @select="handleSelect"
    />
  </div>
</template>

<style scoped lang="scss">
.quiz-page {
  display: grid;
  gap: 12px;
  padding-bottom: 24px;
  background: linear-gradient(to bottom, #FFFFB3 50%, #E2FFB3 100%)
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
