<script setup lang="ts">
import { ref } from "vue";
import DoodleHeading from "../../../components/common/DoodleHeading.vue";

interface FaqItem {
  question: string;
  answer: string;
}

const faqItems: FaqItem[] = [
  {
    question: "SIMLESS旅タイプ診断は無料ですか？",
    answer:
      "はい、SIMLESS旅タイプ診断は完全無料でご利用いただけます。診断結果もそのままご確認いただけます。",
  },
  {
    question: "診断を受ける際に個人情報の登録は必要ですか？",
    answer:
      "基本的に登録なしで診断できます。特典受け取りやプラン購入時のみ、必要な情報をご入力いただきます。",
  },
  {
    question: "年齢制限はありますか？",
    answer:
      "診断自体に年齢制限はありません。未成年の方が購入手続きを行う場合は、保護者の同意のもとでご利用ください。",
  },
  {
    question: "診断後に必ず購入する必要はありますか？",
    answer:
      "購入は必須ではありません。診断結果の確認のみでも問題なくご利用いただけます。",
  },
  {
    question: "対応している国やデータ容量プランはどこで確認できますか？",
    answer:
      "診断結果ページからおすすめプランの詳細をご確認いただけます。対象国・容量・有効期間を一覧で確認可能です。",
  },
];

const openedIndex = ref<number | null>(0);

function toggle(index: number) {
  openedIndex.value = openedIndex.value === index ? null : index;
}
</script>

<template>
  <section class="faq-section">
    <DoodleHeading
      class="faq-heading"
      as="h2"
      font-size="24px"
      font-weight="700"
      line-height="44px"
      letter-spacing="5%"
      width="313px"
      min-height="100px"
    >
      SIMLESS旅タイプ診断<br />
      <span class="doodle-highlight">FAQ</span>
    </DoodleHeading>

    <div class="faq-list">
      <article
        v-for="(item, index) in faqItems"
        :key="item.question"
        class="faq-item"
      >
        <button class="faq-question-row" type="button" @click="toggle(index)">
          <span class="faq-badge q">Q</span>
          <span class="faq-question">{{ item.question }}</span>
          <span class="faq-icon" aria-hidden="true">
            <svg
              v-if="openedIndex === index"
              width="22"
              height="14"
              viewBox="0 0 22 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21.0439 10.9248L18.9229 13.0459L10.9951 5.12012L3.05957 13.0469L0.94043 10.9238L10.9971 0.879883L21.0439 10.9248Z"
                fill="#088547"
              />
            </svg>
            <svg
              v-else
              width="22"
              height="14"
              viewBox="0 0 22 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22 2.44177L19.6788 0.00112306L11.0032 9.12096L2.31905 -6.2224e-07L0 2.44289L11.0053 14L22 2.44177Z"
                fill="#088547"
              />
            </svg>
          </span>
        </button>

        <div v-if="openedIndex === index" class="faq-answer-row">
          <span class="faq-badge a">A</span>
          <p class="faq-answer">{{ item.answer }}</p>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped lang="scss">
.faq-section {
  padding: 28px 16px 14px;
  background: #fff;
}

.faq-heading {
  margin: 0 auto 10px;
  .doodle-highlight {
    font-size: 30px;
    line-height: 44px;
  }
}

.faq-item {
  border-bottom: 1px solid #d3d3d3;
}

.faq-item:last-child {
  border-bottom: 0;
  .faq-question-row {
    padding-bottom: 0;
  }
}

.faq-question-row {
  width: 100%;
  border: 0;
  background: transparent;
  padding: 20px 0;
  display: flex;
  align-items: center;
  gap: 12px;
  text-align: left;
  cursor: pointer;
}

.faq-badge {
  width: 30px;
  height: 30px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  flex: 0 0 auto;
  font-family: "BIZ UDPGothic", "Noto Sans JP", sans-serif;
  font-size: 18px;
  font-weight: 700;
  line-height: 1;
}

.faq-badge.q {
  background: #088547;
}

.faq-badge.a {
  background: #B3D762;
}

.faq-question {
  flex: 1;
  color: #111;
  font-size: 18px;
  font-weight: 500;
  line-height: 1.4;
}

.faq-icon {
  width: 22px;
  height: 14px;
  padding: 2px;
  flex: 0 0 auto;
  margin-left: 8px;
}

.faq-answer-row {
  padding: 0 0 18px;
  display: flex;
  align-items: flex-start;
  gap: 14px;
}

.faq-answer {
  margin: 0;
  color: #4d4d4d;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.6;
}
</style>
