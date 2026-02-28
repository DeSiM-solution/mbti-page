export const resultTypes = ['ESTJ', 'ENTP', 'INFP', 'ISFJ', 'ESFP', 'INTJ'] as const

export type ResultType = (typeof resultTypes)[number]

export interface ResultProfile {
  code: ResultType
  title: string
  catch: string
  features: string
  communicationStyle: string
  planName: string
  planSummary: string
}

export const resultProfiles: Record<ResultType, ResultProfile> = {
  ESTJ: {
    code: 'ESTJ',
    title: '実行管理トラベラー',
    catch: '迷わない旅こそ最強。段取り力で旅を制するタイプ。',
    features:
      'スケジュール管理が得意で、移動・観光・食事の流れを最適化するのが上手。予定通り進むと満足度が一気に上がる。',
    communicationStyle: '安定速度を最優先。必要なときに確実につながる通信を好む。',
    planName: '毎日 5GB プラン',
    planSummary: '地図・決済・検索を安心して使える、バランス重視の定番プラン。',
  },
  ENTP: {
    code: 'ENTP',
    title: 'ひらめき冒険トラベラー',
    catch: '偶然を楽しむ。出会いで旅を更新するタイプ。',
    features:
      '新しい場所や人との接点から行き先を変える柔軟派。情報収集と行動の切り替えが速く、瞬発力が高い。',
    communicationStyle: 'SNS・地図・検索を同時に使うため、瞬間的な通信量に強い回線が合う。',
    planName: 'カスタム eSIM プラン',
    planSummary: '旅程の変化に合わせて容量を調整しやすい、可変型プラン。',
  },
  INFP: {
    code: 'INFP',
    title: '感性ゆる旅トラベラー',
    catch: '心が動く方へ。余白を楽しむタイプ。',
    features:
      '観光地を詰め込むより、空気感や景色を味わう旅を好む。計画はざっくり、現地で気分に合わせて動く。',
    communicationStyle: '必要なときにさっと使える、軽量で扱いやすい通信を好む。',
    planName: '3日間 無制限プラン',
    planSummary: '短期集中で使いたいときに便利な、ストレスフリーな大容量プラン。',
  },
  ISFJ: {
    code: 'ISFJ',
    title: '安心重視トラベラー',
    catch: '準備しておけば、旅はもっと軽やかになる。',
    features:
      '安全性と確実性を重視し、必要情報を事前に整理するタイプ。大きなトラブルを避ける行動選択が得意。',
    communicationStyle: '通信切れの不安が少ない、安定接続を最重視。',
    planName: '5GB/日 プラン',
    planSummary: '毎日安定した通信が必要な人向け。観光も連絡も安心して使える。',
  },
  ESFP: {
    code: 'ESFP',
    title: 'ライブ体験トラベラー',
    catch: '今この瞬間をシェア。体験優先で旅するタイプ。',
    features:
      '写真・動画・SNS投稿などリアルタイム発信が多く、移動中もアクティブ。現地イベントとの相性が良い。',
    communicationStyle: 'アップロードや配信でも快適な、体感速度重視の通信が合う。',
    planName: '3GB/日 プラン',
    planSummary: '投稿と検索の両立に強い、日次利用向けの軽快プラン。',
  },
  INTJ: {
    code: 'INTJ',
    title: '戦略派トラベラー',
    catch: '最短ルートで最大体験。設計力で旅を最適化。',
    features:
      '目的達成に向けた判断が早く、情報比較が得意。価格・移動効率・滞在価値のバランスを取るのが上手。',
    communicationStyle: '必要十分な安定通信を好み、無駄なく使える構成を選ぶ。',
    planName: 'カスタム eSIM プラン',
    planSummary: '利用量に応じて設計できる、効率重視のプラン。',
  },
}

export function isResultType(value: string): value is ResultType {
  return resultTypes.includes(value as ResultType)
}

export function pickResultType(answerIds: string[]): ResultType {
  const seed = answerIds.reduce((sum, id) => sum + id.charCodeAt(id.length - 1), 0)
  return resultTypes[seed % resultTypes.length] ?? 'ESTJ'
}
