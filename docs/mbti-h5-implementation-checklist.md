# MBTI H5 実装チェックリスト

## 進捗
- [x] Step 0: 範囲確認（LP / Quiz / Result / Ticket の4ページ方針を確定）
- [x] Step 1: 工程基盤整理（ディレクトリ整理、ルート構造導入）
- [x] Step 2: モバイル外殻と全体スタイル（375基準、safe-area、global token）
- [x] Step 3: P0 共通コンポーネント（Header / Footer / PrimaryButton / SectionTitle）
- [x] Step 4: 4ページ骨格作成（Landing / Quiz / Result / Ticket + NotFound）
- [x] Step 5: クイズ主要フロー（6問、選択状態、遷移）
- [x] Step 6: 結果ページ動的表示（`/result/:type`）
- [x] Step 7: 引換券ページの雛形（クーポン表示と注意事項）
- [x] Step 8: FAQ 折りたたみ・長ページ演出の作り込み
- [x] Step 9: API 連携・エラー状態整備
- [ ] Step 10: デバイス回帰テスト・アクセシビリティ点検
- [x] Step 11: リリース前ドキュメント整備

## 補足
- `vue-router` を正式導入し、全画面を `RouterView + useRouter/useRoute` 構成へ置換済み。
- 画面文言は依頼どおり日本語で統一。
- LP に FAQ Accordion と長ページセクション（POINT / REWARD）を追加済み。
- `services/contentService.ts` を追加し、API 接続時は取得・失敗時は mock fallback の構成に変更済み。
- 引き継ぎ資料 `docs/mbti-h5-handover.md` を追加済み。
