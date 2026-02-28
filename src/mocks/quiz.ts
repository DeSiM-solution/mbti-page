import type { QuizQuestion } from '../types/quiz'

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'q1',
    title: '旅行前の準備で一番こだわるのは？',
    options: [
      { id: 'q1_a', label: '旅程を細かく決める' },
      { id: 'q1_b', label: '必要最低限だけ決める' },
      { id: 'q1_c', label: '現地で決める余白を残す' },
    ],
  },
  {
    id: 'q2',
    title: '移動中に優先したいことは？',
    options: [
      { id: 'q2_a', label: '最短時間で到着' },
      { id: 'q2_b', label: '景色や体験を楽しむ' },
      { id: 'q2_c', label: 'コスパの良い手段を選ぶ' },
    ],
  },
  {
    id: 'q3',
    title: '現地での情報収集はどうする？',
    options: [
      { id: 'q3_a', label: 'レビューを徹底的に確認' },
      { id: 'q3_b', label: 'SNSでリアルタイム検索' },
      { id: 'q3_c', label: '直感で気になる場所へ行く' },
    ],
  },
  {
    id: 'q4',
    title: '旅先でのトラブル対応は？',
    options: [
      { id: 'q4_a', label: 'まず計画を再調整する' },
      { id: 'q4_b', label: '周囲と相談して決める' },
      { id: 'q4_c', label: 'その場で柔軟に対応する' },
    ],
  },
  {
    id: 'q5',
    title: 'SNS投稿のスタイルは？',
    options: [
      { id: 'q5_a', label: 'あとでまとめて投稿' },
      { id: 'q5_b', label: 'その場でどんどん投稿' },
      { id: 'q5_c', label: '気が向いたら投稿する' },
    ],
  },
  {
    id: 'q6',
    title: '理想の旅行後の気分は？',
    options: [
      { id: 'q6_a', label: '計画通りで達成感がある' },
      { id: 'q6_b', label: '新しい発見がたくさんあった' },
      { id: 'q6_c', label: '心身ともにリフレッシュできた' },
    ],
  },
]
