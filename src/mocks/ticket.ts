export interface TicketInfo {
  title: string
  plan: string
  couponCode: string
  description: string
  notes: string[]
}

export const defaultTicketInfo: TicketInfo = {
  title: 'eSIM 無料引換券',
  plan: '3日間 無制限',
  couponCode: 'MBTI-SIMLESS',
  description: '対象国から1つ選択可能 / 有効期限: 発行から1年間',
  notes: [
    '引換券の獲得はおひとり様1回までです。',
    '診断結果を3人以上にシェアしても追加発行はされません。',
    '本キャンペーンは期間限定で実施されます。',
  ],
}
