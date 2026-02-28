<script setup lang="ts">
import { useRouter } from 'vue-router'
import FaqAccordion from '../components/common/FaqAccordion.vue'
import PrimaryButton from '../components/common/PrimaryButton.vue'
import SectionTitle from '../components/common/SectionTitle.vue'
import PageSection from '../components/layout/PageSection.vue'
import buttonImage from '../assets/button-1.svg'

const router = useRouter()

const faqItems = [
  {
    question: '診断は本当に無料ですか？',
    answer: 'はい、完全無料です。何度でも診断可能です。',
  },
  {
    question: '所要時間はどれくらいですか？',
    answer: '6問で約1分程度です。すきま時間に試せます。',
  },
  {
    question: '診断結果はシェアできますか？',
    answer: '可能です。シェア導線と特典仕様は次フェーズで接続予定です。',
  },
]
</script>

<template>
  <div class="page">
    <PageSection class="hero" muted>
      <p class="bubble">診断結果を3人にシェアして、eSIM特典をゲットしよう</p>
      <SectionTitle title="6問でわかる旅タイプ診断" subtitle="MBTIベース" />
      <p class="lead">
        旅のスタイルは人それぞれ。たった6つの質問で、あなたに合う旅行タイプとおすすめ eSIM を提案します。
      </p>
      <button class="hero-cta" type="button" aria-label="旅タイプ診断" @click="router.push({ name: 'quiz' })">
        <img :src="buttonImage" alt="" width="325" height="55" />
      </button>
    </PageSection>

    <PageSection>
      <SectionTitle title="診断の流れ" subtitle="STEP" />
      <ol class="steps">
        <li>質問に回答する（約1分）</li>
        <li>あなたの旅タイプを表示</li>
        <li>タイプ別のおすすめプランを確認</li>
      </ol>
    </PageSection>

    <PageSection>
      <SectionTitle title="この診断でわかること" subtitle="POINT" />
      <div class="point-list">
        <article>
          <h3>旅の行動傾向</h3>
          <p>あなたが旅先で重視する行動パターンを可視化します。</p>
        </article>
        <article>
          <h3>通信スタイル</h3>
          <p>使い方に合う通信量とプランタイプを提案します。</p>
        </article>
        <article>
          <h3>おすすめ eSIM</h3>
          <p>診断タイプに合わせた実用的なプランを表示します。</p>
        </article>
      </div>
    </PageSection>

    <PageSection muted>
      <SectionTitle title="旅タイプ一覧（一部）" subtitle="TYPE" />
      <div class="tags">
        <span>ESTJ 実行管理型</span>
        <span>ENTP ひらめき型</span>
        <span>INFP 感性型</span>
        <span>ISFJ 安心重視型</span>
      </div>
    </PageSection>

    <PageSection class="reward">
      <SectionTitle title="シェア特典" subtitle="REWARD" />
      <div class="reward-box">
        <p class="reward-title">結果を3人にシェアで特典獲得</p>
        <p class="reward-copy">あなたに eSIM 引換券、受け取った人にもクーポンを配布予定。</p>
      </div>
      <PrimaryButton variant="ghost" label="まずは診断する" @click="router.push({ name: 'quiz' })" />
    </PageSection>

    <PageSection>
      <SectionTitle title="よくある質問" subtitle="FAQ" />
      <FaqAccordion :items="faqItems" />
    </PageSection>
  </div>
</template>

<style scoped>
.page {
  padding-bottom: 24px;
}

.hero {
  background: linear-gradient(165deg, #f7ffd2 0%, #f0ffd4 100%);
}

.bubble {
  margin: 0 0 12px;
  padding: 8px 12px;
  border-radius: 10px;
  background: #fff2ac;
  color: #5a4d00;
  font-size: 12px;
  font-weight: 700;
}

.lead {
  margin: 0 0 14px;
  color: var(--color-text-secondary);
  font-size: 14px;
  line-height: 1.7;
}

.hero-cta {
  width: 325px;
  height: 55px;
  max-width: 100%;
  border: 0;
  padding: 0;
  margin: 0 auto;
  background: transparent;
  line-height: 0;
  cursor: pointer;
}

.hero-cta img {
  display: block;
  width: 325px;
  height: 55px;
  max-width: 100%;
}

.hero-cta:active {
  transform: translateY(1px);
}

.steps {
  margin: 0;
  padding-left: 20px;
  display: grid;
  gap: 8px;
  color: var(--color-text-secondary);
}

.point-list {
  display: grid;
  gap: 10px;
}

.point-list article {
  border: 1px solid var(--color-border-soft);
  border-radius: 12px;
  background: #fff;
  padding: 12px;
}

.point-list h3 {
  margin: 0 0 6px;
  font-size: 14px;
}

.point-list p {
  margin: 0;
  font-size: 13px;
  color: var(--color-text-secondary);
  line-height: 1.65;
}

.tags {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
}

.tags span {
  display: block;
  border-radius: 10px;
  padding: 10px;
  text-align: center;
  font-size: 12px;
  background: #fff;
  border: 1px solid var(--color-border-soft);
}

.reward {
  display: grid;
  gap: 12px;
}

.reward-box {
  border-radius: 14px;
  background: linear-gradient(140deg, #f4ffd8 0%, #fff6bf 100%);
  border: 1px solid rgba(90, 77, 0, 0.15);
  padding: 14px;
}

.reward-title {
  margin: 0;
  font-size: 15px;
  font-weight: 700;
  color: #4f4200;
}

.reward-copy {
  margin: 8px 0 0;
  font-size: 13px;
  color: #5f5800;
  line-height: 1.6;
}
</style>
