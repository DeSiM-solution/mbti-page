# MBTI H5 引き継ぎメモ

## 1. 実行方法
1. 依存関係インストール  
   `npm install`
2. 開発起動  
   `npm run dev`
3. 本番ビルド  
   `npm run build`

## 2. 現在のルート構成
1. `/`  
   LP（診断導入ページ）
2. `/quiz`  
   6問診断ページ
3. `/result/:type`  
   診断結果ページ（`ESTJ | ENTP | INFP | ISFJ | ESFP | INTJ`）
4. `/ticket`  
   引換券ページ
5. その他  
   NotFound ページ

## 3. データ取得方針
1. `src/services/contentService.ts` を経由してデータ取得。
2. `VITE_API_BASE_URL` が未設定の場合は `src/mocks/*` を使用。
3. API 接続時に失敗した場合は mock にフォールバックする設計。

## 4. 主要ファイル
1. ルーティング  
   `src/router/index.ts`
2. ページ  
   `src/views/LandingPage.vue`  
   `src/views/QuizPage.vue`  
   `src/views/ResultPage.vue`  
   `src/views/TicketPage.vue`
3. 共通 UI  
   `src/components/layout/*`  
   `src/components/common/*`
4. スタイル  
   `src/styles/base.css`  
   `src/styles/tokens.css`

## 5. 既知事項
1. `vue-router` は導入済み。`main.ts` で `app.use(router)` を適用済み。
2. ページ遷移はすべて `useRouter()` / `useRoute()` に統一済み。

## 6. 次にやること（優先順）
1. Step 10: 実機ベースの回帰確認（iOS Safari / Android Chrome）
2. API 実エンドポイント接続（モック除去）
3. Figma 最終差分に合わせた文言・余白・装飾調整
