<script setup lang="ts">
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { toast } from "vue-sonner";
import ButtonOne from "../../components/assets/ButtonOne.vue";
import CircleSvg from "../../components/assets/CircleSvg.vue";
import GlassesSvg from "../../components/assets/GlassesSvg.vue";
import LightSvg from "../../components/assets/LightSvg.vue";
import TriangleSvg from "../../components/assets/TriangleSvg.vue";
import LandingStep from "./components/LandingStep.vue";
import ArrowDownSvg from "../../components/assets/ArrowDown.vue";
import Cloud from "../../components/assets/Cloud.vue";
import DoodleHeading from "../../components/common/DoodleHeading.vue";
import Plan from "../../components/assets/Plan.vue";
import Hat from "../../components/assets/Hat.vue";
import Luggage from "../../components/assets/Luggage.vue";
import AccentFrame from "../../components/common/AccentFrame.vue";
import ESTJImage from "../../assets/mbti-types/ESTJ.png";
import INFPImage from "../../assets/mbti-types/INFP.png";
import ENTPImage from "../../assets/mbti-types/ENTP.png";
import ISFJImage from "../../assets/mbti-types/ISFJ.png";
import ESFPImage from "../../assets/mbti-types/ESFP.png";
import INTJImage from "../../assets/mbti-types/INTJ.png";
import SimlessConnectSvg from "../../components/assets/SimlessConnectSvg.vue";
import ShareIcon from "../../components/assets/Share.vue";
import WinIcon from "../../components/assets/Win.vue";
import ButtonTwo from "../../components/assets/ButtonTwo.vue";
import Passport from "../../components/assets/Passport.vue";
import Camera from "../../components/assets/Camera.vue";
import LandingFaqSection from "./components/LandingFaqSection.vue";
import { confirmLineShareReward } from "../../services/lineShareRewardApi";
import { useLiffSessionStore } from "@/stores/liffSession";

const router = useRouter();
const liffSessionStore = useLiffSessionStore();
const slashMarks = Array.from({ length: 26 }, (_, index) => index);
const SHARE_RECEIVED_MESSAGE = "シェア特典の受け取りが完了しました。";
const SHARE_REWARD_ERROR_MESSAGE = "シェア特典の受け取りに失敗しました。";
const mbtiTypeCards = [
  { code: "ESTJ", label: "計画型", image: ESTJImage },
  { code: "INFP", label: "自由型", image: INFPImage },
  { code: "ENTP", label: "弾丸冒険型", image: ENTPImage },
  { code: "ISFJ", label: "安心重視型", image: ISFJImage },
  { code: "ESFP", label: "SNS爆発型", image: ESFPImage },
  { code: "INTJ", label: "戦略型タイプ", image: INTJImage },
];

function handleShareClick() {
  void router.push({ name: "quiz" });
}

async function confirmShareRewardIfNeeded() {
  const sharerUserId = liffSessionStore.refereeUserId;
  const inviteeUserId = liffSessionStore.userId;

  if (!sharerUserId || !inviteeUserId) {
    return;
  }

  // if (sharerUserId === inviteeUserId) {
  //   toast.error(SELF_SHARE_REWARD_MESSAGE);
  //   return;
  // }

  try {
    await confirmLineShareReward({
      sharerUserId,
      inviteeUserId,
    });
    const displayName = liffSessionStore.userName.trim();
    toast.success(displayName ? `${displayName}、${SHARE_RECEIVED_MESSAGE}` : SHARE_RECEIVED_MESSAGE);
  } catch (error) {
    const errorMessage =
      error instanceof Error && error.message.trim() ? error.message : SHARE_REWARD_ERROR_MESSAGE;
    toast.error(errorMessage);
    console.error("[landing] confirmLineShareReward failed", error);
  }
}

onMounted(() => {
  void confirmShareRewardIfNeeded();
});
</script>

<template>
  <div class="page">
    <section class="hero">
      <button class="hero-cta" type="button" aria-label="旅タイプ診断" @click="router.push({ name: 'quiz' })">
        <ButtonOne width="325" height="55" aria-hidden="true" />
      </button>
    </section>

    <section class="share-section">
      <div class="share-frame">
        <svg class="share-border" viewBox="0 0 328 102" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <!-- <defs>
            <filter id="shareFrameShadow" x="-12" y="-6" width="352" height="130" filterUnits="userSpaceOnUse">
              <feDropShadow dx="0" dy="4" stdDeviation="2" flood-color="#000000" flood-opacity="0.25" />
            </filter>
          </defs> -->
          <path
            d="M14 10H153L164 -1L175 10H314A12 12 0 0 1 326 22V88A12 12 0 0 1 314 100H14A12 12 0 0 1 2 88V22A12 12 0 0 1 14 10Z"
            fill="#f5b89f" filter="url(#shareFrameShadow)" />
          <path
            d="M16 14H156L164 6L172 14H312A9 9 0 0 1 321 23V86A9 9 0 0 1 312 95H16A9 9 0 0 1 7 86V23A9 9 0 0 1 16 14Z"
            fill="#ffffff" />
          <!-- <path
            d="M16 14H156L164 6L172 14H312A9 9 0 0 1 321 23V86A9 9 0 0 1 312 95H16A9 9 0 0 1 7 86V23A9 9 0 0 1 16 14Z"
            fill="none"
            stroke="#111"
            stroke-width="1"
            stroke-linejoin="miter"
            stroke-miterlimit="10"
          /> -->
        </svg>
        <p class="share-copy">
          診断結果を3人にシェアして、<br />
          eSIMゲットしよう🎁<br />
          シェアされた人も特別クーポンがもらえる！
        </p>
      </div>
    </section>

    <section class="divider-row" aria-hidden="true">
      <GlassesSvg class="glasses" width="82" height="48" />
      <div class="slash-track">
        <template v-for="mark in slashMarks" :key="mark">
          <svg v-if="mark % 2 !== 0" class="slash-icon" width="7" height="9" viewBox="0 0 7 9" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0.377741 8.3823C-0.332259 8.0123 0.10774 7.0323 0.48774 6.6223C1.27774 5.5323 2.18774 4.5223 3.02774 3.4723C3.86774 2.4323 4.74774 1.4223 5.57774 0.372299C5.68774 0.192299 5.83774 0.0322992 6.06774 0.0022992C6.50774 -0.0377008 6.78774 0.452299 6.69774 0.842299C6.63774 1.1523 6.42774 1.4023 6.23774 1.6523C4.80774 3.4423 3.37774 5.2223 1.97774 7.0323C1.69774 7.4023 1.42774 7.7823 1.08774 8.1023C0.97774 8.2823 0.77774 8.4123 0.56774 8.4123C0.50774 8.4123 0.437741 8.4023 0.377741 8.3723V8.3823Z"
              fill="#F5AF7E" />
          </svg>
          <svg v-else class="slash-icon" width="8" height="9" viewBox="0 0 8 9" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M6.92578 0.522461C6.94605 0.553328 6.96115 0.595157 6.96484 0.636719C6.96728 0.664167 6.96322 0.68238 6.95996 0.693359C6.56509 1.25098 6.12001 1.78857 5.6543 2.33496C5.18364 2.88715 4.68791 3.45428 4.22949 4.04004C3.14849 5.35623 2.19125 6.65546 1.09082 7.88477C1.01974 7.95569 0.955744 8.02894 0.904297 8.08887C0.841533 8.16198 0.795178 8.21652 0.74707 8.26562C0.671461 8.34275 0.624169 8.36581 0.592773 8.37598C0.587543 8.37357 0.578023 8.36884 0.56543 8.35645C0.538887 8.33023 0.518486 8.29086 0.509766 8.25195L0.506836 8.2334C0.483655 8.09826 0.522214 7.95583 0.662109 7.75781C0.732317 7.65847 0.819052 7.55762 0.919922 7.44727C1.01251 7.34598 1.13393 7.21895 1.23242 7.10449L1.23145 7.10352C1.68466 6.60852 2.12419 6.03755 2.52637 5.56055L2.53418 5.5498C3.78401 3.98256 5.11461 2.4816 6.46387 0.982422L6.46484 0.983398C6.59478 0.83976 6.63972 0.77658 6.74414 0.666992C6.8104 0.59746 6.86848 0.550362 6.9209 0.515625C6.92239 0.517694 6.92418 0.520027 6.92578 0.522461Z"
              fill="#429AD0" stroke="#429AD0" />
          </svg>
        </template>
      </div>
    </section>

    <section class="intro-section">
      <LightSvg class="intro-deco intro-light" width="51" height="70" aria-hidden="true" />
      <TriangleSvg class="intro-deco intro-triangle" width="52" height="49" aria-hidden="true" />
      <CircleSvg class="intro-deco intro-circle" width="38" height="45" aria-hidden="true" />
      <p class="intro-copy">
        旅タイプ診断とは、<br />
        <span class="accent">MBTI</span>の16タイプをベースに、<br />
        旅行シーンに特化した<br />
        6つの「旅タイプ」に<br />
        簡易診断です。<br /><br />
        自分らしさを知れば、<br />
        旅はもっと楽しくなる！
      </p>
    </section>

    <section class="step-frame-section">
      <Plan class="intro-deco" style="left: 29px; top: -11px" aria-hidden="true" />
      <Cloud class="intro-deco" style="right: 63px; top: 16px" aria-hidden="true" />
      <Cloud class="intro-deco" style="right: 63px; bottom: 13px" aria-hidden="true" />
      <div class="step-section-inner">
        <DoodleHeading class="step-section-heading" as="h2" font-size="30px" font-weight="700" line-height="44px"
          letter-spacing="5%" width="313px" min-height="100px">
          あなたの<span class="doodle-highlight">MBTI</span><br />
          旅だとどう出る？
        </DoodleHeading>
        <div class="step-section-description">
          たった６つの質問に答えるだけで、<br />
          あなたの旅スタイルが明らかになります。
        </div>
        <button class="hero-cta step-cta" type="button" aria-label="旅タイプ診断" @click="router.push({ name: 'quiz' })">
          <ButtonOne width="325" height="55" aria-hidden="true" />
        </button>
        <LandingStep :title="'診断をスタート'"
          content="全6問の簡単な質問に答えていきます。<br />自分の本当の好みを知るために、あまり考えすぎず、ありのままの自分に当てはまるものを選んでください。" :step="1" />
        <ArrowDownSvg />
        <LandingStep :title="'あなたの旅タイプを知る'" content="計画型、自由型、弾丸冒険型など、全6タイプの中からあなたの個性にマッチした旅のスタイルを解説します。" :step="2" />
        <ArrowDownSvg />

        <LandingStep :title="'最高の旅へ出かけよう'" content="診断結果をヒントに、あなたにあったeSIMプランをご提案します。新しい自分に出会う旅へ出かけましょう。" :step="3" />
      </div>
    </section>

    <section class="types-section">
      <div class="types-title-block">
        <div class="types-deco-row">
          <Hat class="types-hat" aria-hidden="true" />
          <div class="slash-track hat-track" aria-hidden="true">
            <template v-for="mark in slashMarks" :key="mark">
              <svg v-if="mark % 2 !== 0" class="slash-icon" width="7" height="9" viewBox="0 0 7 9" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M0.377741 8.3823C-0.332259 8.0123 0.10774 7.0323 0.48774 6.6223C1.27774 5.5323 2.18774 4.5223 3.02774 3.4723C3.86774 2.4323 4.74774 1.4223 5.57774 0.372299C5.68774 0.192299 5.83774 0.0322992 6.06774 0.0022992C6.50774 -0.0377008 6.78774 0.452299 6.69774 0.842299C6.63774 1.1523 6.42774 1.4023 6.23774 1.6523C4.80774 3.4423 3.37774 5.2223 1.97774 7.0323C1.69774 7.4023 1.42774 7.7823 1.08774 8.1023C0.97774 8.2823 0.77774 8.4123 0.56774 8.4123C0.50774 8.4123 0.437741 8.4023 0.377741 8.3723V8.3823Z"
                  fill="#F5AF7E" />
              </svg>
              <svg v-else class="slash-icon" width="8" height="9" viewBox="0 0 8 9" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M6.92578 0.522461C6.94605 0.553328 6.96115 0.595157 6.96484 0.636719C6.96728 0.664167 6.96322 0.68238 6.95996 0.693359C6.56509 1.25098 6.12001 1.78857 5.6543 2.33496C5.18364 2.88715 4.68791 3.45428 4.22949 4.04004C3.14849 5.35623 2.19125 6.65546 1.09082 7.88477C1.01974 7.95569 0.955744 8.02894 0.904297 8.08887C0.841533 8.16198 0.795178 8.21652 0.74707 8.26562C0.671461 8.34275 0.624169 8.36581 0.592773 8.37598C0.587543 8.37357 0.578023 8.36884 0.56543 8.35645C0.538887 8.33023 0.518486 8.29086 0.509766 8.25195L0.506836 8.2334C0.483655 8.09826 0.522214 7.95583 0.662109 7.75781C0.732317 7.65847 0.819052 7.55762 0.919922 7.44727C1.01251 7.34598 1.13393 7.21895 1.23242 7.10449L1.23145 7.10352C1.68466 6.60852 2.12419 6.03755 2.52637 5.56055L2.53418 5.5498C3.78401 3.98256 5.11461 2.4816 6.46387 0.982422L6.46484 0.983398C6.59478 0.83976 6.63972 0.77658 6.74414 0.666992C6.8104 0.59746 6.86848 0.550362 6.9209 0.515625C6.92239 0.517694 6.92418 0.520027 6.92578 0.522461Z"
                  fill="#429AD0" stroke="#429AD0" />
              </svg>
            </template>
          </div>
        </div>

        <DoodleHeading class="types-heading" as="h2" font-size="30px" font-weight="700" line-height="44px"
          letter-spacing="5%" width="313px" min-height="100px">
          6つの<span class="doodle-highlight">旅タイプ</span>と<br />
          おすすめプラン
        </DoodleHeading>

        <div class="types-deco-row types-deco-row-bottom">
          <div class="slash-track luggage-track" aria-hidden="true">
            <template v-for="mark in slashMarks" :key="mark">
              <svg v-if="mark % 2 !== 0" class="slash-icon" width="7" height="9" viewBox="0 0 7 9" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M0.377741 8.3823C-0.332259 8.0123 0.10774 7.0323 0.48774 6.6223C1.27774 5.5323 2.18774 4.5223 3.02774 3.4723C3.86774 2.4323 4.74774 1.4223 5.57774 0.372299C5.68774 0.192299 5.83774 0.0322992 6.06774 0.0022992C6.50774 -0.0377008 6.78774 0.452299 6.69774 0.842299C6.63774 1.1523 6.42774 1.4023 6.23774 1.6523C4.80774 3.4423 3.37774 5.2223 1.97774 7.0323C1.69774 7.4023 1.42774 7.7823 1.08774 8.1023C0.97774 8.2823 0.77774 8.4123 0.56774 8.4123C0.50774 8.4123 0.437741 8.4023 0.377741 8.3723V8.3823Z"
                  fill="#F5AF7E" />
              </svg>
              <svg v-else class="slash-icon" width="8" height="9" viewBox="0 0 8 9" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M6.92578 0.522461C6.94605 0.553328 6.96115 0.595157 6.96484 0.636719C6.96728 0.664167 6.96322 0.68238 6.95996 0.693359C6.56509 1.25098 6.12001 1.78857 5.6543 2.33496C5.18364 2.88715 4.68791 3.45428 4.22949 4.04004C3.14849 5.35623 2.19125 6.65546 1.09082 7.88477C1.01974 7.95569 0.955744 8.02894 0.904297 8.08887C0.841533 8.16198 0.795178 8.21652 0.74707 8.26562C0.671461 8.34275 0.624169 8.36581 0.592773 8.37598C0.587543 8.37357 0.578023 8.36884 0.56543 8.35645C0.538887 8.33023 0.518486 8.29086 0.509766 8.25195L0.506836 8.2334C0.483655 8.09826 0.522214 7.95583 0.662109 7.75781C0.732317 7.65847 0.819052 7.55762 0.919922 7.44727C1.01251 7.34598 1.13393 7.21895 1.23242 7.10449L1.23145 7.10352C1.68466 6.60852 2.12419 6.03755 2.52637 5.56055L2.53418 5.5498C3.78401 3.98256 5.11461 2.4816 6.46387 0.982422L6.46484 0.983398C6.59478 0.83976 6.63972 0.77658 6.74414 0.666992C6.8104 0.59746 6.86848 0.550362 6.9209 0.515625C6.92239 0.517694 6.92418 0.520027 6.92578 0.522461Z"
                  fill="#429AD0" stroke="#429AD0" />
              </svg>
            </template>
          </div>
          <Luggage class="types-luggage" aria-hidden="true" />
        </div>
      </div>

      <p class="types-description">
        診断結果では、あなたの性格に基づいた旅タイプを詳しく解説します。<br />
        それぞれのタイプには、ぴったりのeSIMプランもご用意。
      </p>

      <div class="types-grid">
        <AccentFrame v-for="card in mbtiTypeCards" :key="card.code" class="types-card">
          <article class="types-card-content">
            <img class="types-card-image" :src="card.image" :alt="`${card.code} ${card.label}`" width="293"
              height="201" />
            <p class="types-card-label">{{ card.code }} / {{ card.label }}</p>
          </article>
        </AccentFrame>
      </div>

      <div class="simless-connect-wrap">
        <span class="simless-deco simless-deco-stripe" aria-hidden="true">
          <svg width="105" height="74" viewBox="0 0 105 74" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 30.37L0.12 30.66L5.23 32.78L3.62 28.87L0 30.37Z" fill="#FFEC9E" />
            <path d="M7 27.48L10.01 34.77L15.12 36.9L10.62 25.99L7 27.48Z" fill="#FFEC9E" />
            <path d="M14 24.5896L19.9 38.8796L25.01 41.0096L17.62 23.0996L14 24.5896Z" fill="#FFEC9E" />
            <path d="M21 21.7L29.79 43L34.9 45.12L24.62 20.21L21 21.7Z" fill="#FFEC9E" />
            <path d="M28.0098 18.8203L39.6798 47.1103L44.7898 49.2403L31.6198 17.3203L28.0098 18.8203Z"
              fill="#FFEC9E" />
            <path d="M35.0098 15.9304L49.5598 51.2304L54.6798 53.3504L38.6298 14.4404L35.0098 15.9304Z"
              fill="#FFEC9E" />
            <path d="M42.01 13.04L59.45 55.34L64.56 57.47L45.63 11.55L42.01 13.04Z" fill="#FFEC9E" />
            <path d="M49.01 10.15L69.34 59.45L74.45 61.58L52.63 8.66L49.01 10.15Z" fill="#FFEC9E" />
            <path d="M56.0098 7.26953L79.2298 63.5695L84.3398 65.6895L59.6298 5.76953L56.0098 7.26953Z"
              fill="#FFEC9E" />
            <path d="M63.0098 4.37965L89.1198 67.6796L94.2298 69.8096L66.6298 2.88965L63.0098 4.37965Z"
              fill="#FFEC9E" />
            <path d="M73.6295 0L70.0195 1.49L99.0095 71.8L104.12 73.92L73.6295 0Z" fill="#FFEC9E" />
          </svg>

        </span>
        <span class="simless-deco simless-deco-ring" aria-hidden="true"></span>
        <span class="simless-deco simless-deco-dot" aria-hidden="true"></span>
        <span class="simless-deco simless-deco-bars" aria-hidden="true">
          <svg width="63" height="73" viewBox="0 0 63 73" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M1.61914 65.5605C1.61914 65.4605 1.62914 65.3605 1.63914 65.2505C1.63914 65.1505 1.65914 65.0505 1.67914 64.9505C1.68914 64.8505 1.70914 64.7505 1.72914 64.6505C1.74914 64.5505 1.76914 64.4505 1.79914 64.3505C1.81914 64.2505 1.84914 64.1505 1.87914 64.0605C1.93914 63.8605 2.00914 63.6705 2.08914 63.4805C2.16914 63.2905 2.24914 63.1105 2.34914 62.9305C2.39914 62.8405 2.44914 62.7505 2.49914 62.6605C2.54914 62.5705 2.60914 62.4905 2.65914 62.4005C2.71914 62.3205 2.77914 62.2305 2.83914 62.1505C2.89914 62.0705 2.95914 61.9905 3.02914 61.9105C3.08914 61.8305 3.15914 61.7505 3.22914 61.6805C3.29914 61.6105 3.36914 61.5305 3.43914 61.4605C3.50914 61.3905 3.58914 61.3205 3.65914 61.2505C3.72914 61.1805 3.80914 61.1105 3.88914 61.0505C3.96914 60.9905 4.04914 60.9205 4.12914 60.8605C4.20914 60.8005 4.29914 60.7405 4.37914 60.6805C4.45914 60.6205 4.54914 60.5705 4.63914 60.5205C4.72914 60.4705 4.81914 60.4205 4.90914 60.3705C5.08914 60.2805 5.27914 60.1905 5.45914 60.1105C5.64914 60.0305 5.83914 59.9605 6.02914 59.9005C6.12914 59.8705 6.22914 59.8405 6.32914 59.8205C6.42914 59.8005 6.52914 59.7705 6.62914 59.7505C6.72914 59.7305 6.82914 59.7105 6.92914 59.7005C7.02914 59.6905 7.12914 59.6705 7.22914 59.6605C7.32914 59.6605 7.43914 59.6405 7.53914 59.6405C7.63914 59.6405 7.74914 59.6405 7.84914 59.6405C7.94914 59.6405 8.05914 59.6405 8.15914 59.6405C8.25914 59.6405 8.36914 59.6505 8.46914 59.6605C8.56914 59.6605 8.66914 59.6805 8.76914 59.7005C8.86914 59.7105 8.96914 59.7305 9.06914 59.7505C9.16914 59.7705 9.26914 59.7905 9.36914 59.8205C9.46914 59.8405 9.56914 59.8705 9.66914 59.9005C9.85914 59.9605 10.0591 60.0305 10.2391 60.1105C10.4291 60.1905 10.6091 60.2805 10.7891 60.3705C10.8791 60.4205 10.9691 60.4705 11.0591 60.5205C11.1491 60.5705 11.2391 60.6305 11.3191 60.6805C11.3991 60.7405 11.4891 60.8005 11.5691 60.8605C11.6491 60.9205 11.7291 60.9905 11.8091 61.0505C11.8891 61.1205 11.9691 61.1805 12.0391 61.2505C12.1191 61.3205 12.1891 61.3905 12.2591 61.4605C12.3291 61.5305 12.3991 61.6105 12.4691 61.6805C12.5391 61.7505 12.5991 61.8305 12.6691 61.9105C12.7391 61.9905 12.7991 62.0705 12.8591 62.1505C12.9191 62.2305 12.9791 62.3205 13.0391 62.4005C13.0991 62.4905 13.1491 62.5705 13.1991 62.6605C13.2491 62.7505 13.2991 62.8405 13.3491 62.9305C13.4491 63.1105 13.5291 63.2905 13.6091 63.4805C13.6891 63.6705 13.7591 63.8605 13.8191 64.0605C13.8491 64.1605 13.8791 64.2605 13.8991 64.3505C13.9291 64.4505 13.9491 64.5505 13.9691 64.6505C13.9891 64.7505 14.0091 64.8505 14.0191 64.9505C14.0391 65.0505 14.0491 65.1505 14.0591 65.2505C14.0691 65.3505 14.0791 65.4505 14.0791 65.5605C14.0791 65.7605 14.0791 65.9705 14.0791 66.1705C14.0791 66.2705 14.0691 66.3705 14.0591 66.4805C14.0591 66.5805 14.0391 66.6805 14.0191 66.7905C14.0091 66.8905 13.9891 66.9905 13.9691 67.0905C13.9491 67.1905 13.9291 67.2905 13.8991 67.3905C13.8791 67.4905 13.8491 67.5905 13.8191 67.6805C13.7591 67.8805 13.6891 68.0705 13.6091 68.2605C13.5291 68.4505 13.4491 68.6305 13.3491 68.8105C13.2991 68.9005 13.2491 68.9905 13.1991 69.0805C13.1491 69.1705 13.0891 69.2505 13.0391 69.3405C12.9791 69.4205 12.9191 69.5105 12.8591 69.5905C12.7991 69.6705 12.7391 69.7505 12.6691 69.8305C12.6091 69.9105 12.5391 69.9905 12.4691 70.0605C12.3991 70.1305 12.3291 70.2105 12.2591 70.2805C12.1891 70.3505 12.1091 70.4205 12.0391 70.4905C11.9691 70.5605 11.8891 70.6305 11.8091 70.6905C11.7291 70.7605 11.6491 70.8205 11.5691 70.8805C11.4891 70.9405 11.3991 71.0005 11.3191 71.0605C11.2391 71.1205 11.1491 71.1705 11.0591 71.2205C10.9691 71.2705 10.8791 71.3205 10.7891 71.3705C10.6091 71.4705 10.4191 71.5505 10.2391 71.6305C10.0491 71.7105 9.85914 71.7805 9.66914 71.8305C9.56914 71.8605 9.46914 71.8905 9.36914 71.9105C9.26914 71.9405 9.16914 71.9605 9.06914 71.9805C8.96914 72.0005 8.86914 72.0205 8.76914 72.0305C8.66914 72.0405 8.56914 72.0605 8.46914 72.0705C8.36914 72.0705 8.25914 72.0905 8.15914 72.0905C8.05914 72.0905 7.94914 72.0905 7.84914 72.0905C7.74914 72.0905 7.64914 72.0905 7.53914 72.0905C7.43914 72.0905 7.32914 72.0805 7.22914 72.0705C7.12914 72.0605 7.02914 72.0505 6.92914 72.0305C6.82914 72.0105 6.72914 72.0005 6.62914 71.9805C6.52914 71.9605 6.42914 71.9405 6.32914 71.9105C6.22914 71.8905 6.12914 71.8605 6.02914 71.8305C5.83914 71.7705 5.63914 71.7005 5.45914 71.6305C5.26914 71.5505 5.08914 71.4605 4.90914 71.3705C4.81914 71.3205 4.72914 71.2705 4.63914 71.2205C4.54914 71.1705 4.45914 71.1105 4.37914 71.0605C4.29914 71.0005 4.20914 70.9405 4.12914 70.8805C4.04914 70.8205 3.96914 70.7605 3.88914 70.6905C3.80914 70.6205 3.72914 70.5605 3.65914 70.4905C3.57914 70.4205 3.50914 70.3505 3.43914 70.2805C3.36914 70.2105 3.29914 70.1305 3.22914 70.0605C3.15914 69.9905 3.09914 69.9105 3.02914 69.8305C2.95914 69.7505 2.89914 69.6705 2.83914 69.5905C2.77914 69.5105 2.71914 69.4205 2.65914 69.3405C2.59914 69.2605 2.54914 69.1705 2.49914 69.0805C2.44914 68.9905 2.39914 68.9005 2.34914 68.8105C2.24914 68.6305 2.16914 68.4505 2.08914 68.2605C2.00914 68.0705 1.93914 67.8805 1.87914 67.6805C1.84914 67.5805 1.81914 67.4805 1.79914 67.3905C1.76914 67.2905 1.74914 67.1905 1.72914 67.0905C1.70914 66.9905 1.68914 66.8905 1.67914 66.7905C1.65914 66.6905 1.64914 66.5905 1.63914 66.4805C1.63914 66.3805 1.61914 66.2805 1.61914 66.1705C1.61914 66.0705 1.61914 65.9705 1.61914 65.8605C1.61914 65.7505 1.61914 65.6605 1.61914 65.5505V65.5605ZM14.1491 53.3305C14.1491 54.9305 14.7591 56.5305 15.9791 57.7505C18.4191 60.1905 22.3791 60.1905 24.8191 57.7505L60.4191 22.1505C62.8591 19.7105 62.8591 15.7505 60.4191 13.3105C57.9791 10.8705 54.0191 10.8705 51.5791 13.3105L15.9791 48.9105C14.7591 50.1305 14.1491 51.7305 14.1491 53.3305Z"
              fill="url(#paint0_linear_143_604)" />
            <path
              d="M0 33.74C0 35.34 0.61 36.94 1.83 38.16C4.27 40.6 8.23 40.6 10.67 38.16L38.16 10.67C40.6 8.23 40.6 4.27 38.16 1.83C35.72 -0.61 31.76 -0.61 29.32 1.83L1.83 29.32C0.61 30.54 0 32.14 0 33.74Z"
              fill="url(#paint1_linear_143_604)" />
            <defs>
              <linearGradient id="paint0_linear_143_604" x1="3.44914" y1="70.2805" x2="60.4191" y2="13.3205"
                gradientUnits="userSpaceOnUse">
                <stop stop-color="#FFD191" />
                <stop offset="1" stop-color="#FFEC9E" />
              </linearGradient>
              <linearGradient id="paint1_linear_143_604" x1="1.83" y1="38.16" x2="38.16" y2="1.83"
                gradientUnits="userSpaceOnUse">
                <stop stop-color="#FFD191" />
                <stop offset="1" stop-color="#FFEC9E" />
              </linearGradient>
            </defs>
          </svg>
        </span>
        <span class="simless-deco simless-deco-pink-ring" aria-hidden="true"></span>
        <span class="simless-deco simless-deco-arc" aria-hidden="true">
          <svg width="35" height="17" viewBox="0 0 35 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M4.0658 1.03296C4.5358 2.88296 5.35582 4.61296 6.46582 6.12296C7.57582 7.63296 8.97583 8.94296 10.5958 9.94296C12.2158 10.943 14.0658 11.643 16.0658 11.953C18.0658 12.263 20.0358 12.153 21.8858 11.683C23.7358 11.213 25.4658 10.393 26.9758 9.28296C28.4958 8.17296 29.7958 6.77296 30.7958 5.15296"
              stroke="#FFDE59" stroke-width="8.39" stroke-linejoin="round" />
          </svg>

        </span>

        <div class="simless-connect-orb">
          <SimlessConnectSvg class="simless-connect-logo" aria-hidden="true" />
          <h3 class="simless-connect-title">シンプルに、つながる。</h3>
          <ul class="simless-connect-list">
            <li class="simless-connect-item">
              <span class="simless-check" aria-hidden="true">
                <svg width="24" height="18" viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 9.5L9 16L22 2" stroke="#ffffff" stroke-width="4" stroke-linecap="round"
                    stroke-linejoin="round" />
                </svg>
              </span>
              <p>買ったらすぐ使える。<br />現地で焦らない</p>
            </li>
            <li class="simless-connect-item">
              <span class="simless-check" aria-hidden="true">
                <svg width="24" height="18" viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 9.5L9 16L22 2" stroke="#ffffff" stroke-width="4" stroke-linecap="round"
                    stroke-linejoin="round" />
                </svg>
              </span>
              <p>使いすぎないから、<br />料金ちょうどいい</p>
            </li>
          </ul>
        </div>
      </div>

      <div class="share-benefit-section">
        <DoodleHeading class="share-benefit-heading" as="h3" font-size="30px" font-weight="700" line-height="44px"
          letter-spacing="5%" width="323px" min-height="100px">
          診断結果を<span class="doodle-highlight">シェア</span>して、<br />
          さらにお得に！
        </DoodleHeading>

        <p class="share-benefit-description">
          診断結果をSNSやメッセージでシェアすると、<br />
          素敵な特典もついてきます。
        </p>

        <article class="benefit-card">
          <span class="benefit-icon share" aria-hidden="true">
            <ShareIcon />
          </span>
          <div class="benefit-content">
            <h4>シェアするだけ</h4>
            <p>
              診断結果を3人にシェアすると、<br />
              あなたにeSIMプレゼント！
            </p>
          </div>
        </article>

        <article class="benefit-card">
          <span class="benefit-icon win" aria-hidden="true">
            <WinIcon />
          </span>
          <div class="benefit-content">
            <h4>お互いにお得</h4>
            <p>シェアされた人も特別クーポンがもらえます。</p>
          </div>
        </article>

        <button class="share-now-btn" type="button" aria-label="今すぐシェアする" @click="handleShareClick">
          <ButtonTwo aria-hidden="true" />
        </button>

        <div class="share-notes">
          <p>［ 注意事項 ］</p>
          <p>・引換券の獲得はおひとり様1回限りです。</p>
          <p>
            診断結果を3人以上にシェアいただいた場合でも、追加の引換券は発行されません。
          </p>
          <p>・本キャンペーンは○月○日〜○月○日までの期間限定です。</p>
          <p>・引換券の有効期限は発行日より1年間です。</p>
          <p>・引換券の譲渡はできません。</p>
          <p>引換券を獲得されたご本人様のみご利用いただけます。</p>
        </div>

        <div class="share-cloud-wrap">
          <Camera class="share-cloud-camera" aria-hidden="true" />
          <Passport class="share-cloud-passport" aria-hidden="true" />

          <div class="share-cloud">
            <p>
              通信の正解は、人それぞれ。<br />
              あなたの旅に、ピッタリなeSIMを。
            </p>
          </div>
        </div>
      </div>
    </section>

    <LandingFaqSection />
  </div>
</template>

<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css2?family=BIZ+UDPGothic:wght@700&family=M+PLUS+1:wght@500&display=swap");

.page {
  padding: 0 0 40px;
  background: #fff;
}

.hero {
  display: flex;
  justify-content: center;
  padding: 0 16px;
}

.hero-cta {
  width: 325px;
  height: 55px;
  max-width: 100%;
  border: 0;
  padding: 0;
  margin: 34px auto 0;
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

.step-cta {
  margin-top: 0;
  margin-bottom: 20px;
}

.share-section {
  padding: 0 16px;
}

.share-frame {
  position: relative;
  width: 328px;
  height: 102px;
  max-width: 100%;
  overflow: visible;
  margin: 18px auto 0;
}

.share-border {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: visible;
  pointer-events: none;
}

.share-copy {
  position: absolute;
  left: 50%;
  top: 22px;
  transform: translateX(-50%);
  width: 300px;
  height: 68px;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #4f4f4f;
  font-family: "BIZ UDPGothic", "Noto Sans JP", sans-serif;
  font-size: 14px;
  font-weight: 700;
  line-height: 23px;
}

.divider-row {
  margin-top: 26px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  gap: 16px;
}

.glasses {
  width: 82px;
  height: 48px;
  flex: 0 0 auto;
}

.slash-track {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 4px;
  overflow: hidden;
}

.slash-icon {
  flex: 0 0 auto;
}

.intro-section {
  position: relative;
  margin-top: 24px;
  padding: 0 20px;
}

.intro-copy {
  position: relative;
  z-index: 1;
  margin: 0 auto;
  text-align: center;
  color: #000;
  font-family: "M PLUS 1", "Noto Sans JP", sans-serif;
  font-size: 22px;
  font-weight: 500;
  line-height: 36px;
}

.accent {
  color: #e82a7e;
}

.intro-deco {
  position: absolute;
  pointer-events: none;
  user-select: none;
  z-index: 0;
}

.intro-light {
  left: 32px;
  top: 166px;
  width: 51px;
  height: 70px;
}

.intro-triangle {
  right: 38px;
  top: 130px;
  width: 52px;
  height: 49px;
}

.intro-circle {
  right: 16px;
  top: 233px;
  width: 38px;
  height: 45px;
}

.step-frame-section {
  margin-top: 34px;
  padding: 0 16px;
  background-color: #e1f7f7;
  border-top-left-radius: 50% 180px;
  border-top-right-radius: 50% 180px;
  padding-top: 108px;
  padding-bottom: 68px;
  position: relative;

  .step-section-inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    position: relative;
  }
}

.step-section-description {
  font-family: BIZ UDPGothic;
  font-weight: 700;
  font-size: 14px;
  line-height: 25px;
  letter-spacing: 5%;
  text-align: center;
  color: #4d4d4d;
  margin: 5px 0;
}

.types-section {
  padding: 63px 18px 50px;
  background: linear-gradient(180deg, #fffbe6 50%, #FFFFB3 65%, #E2FFB3 100%);
}

.types-title-block {
  padding: 0 8px;
}

.types-deco-row {
  display: flex;
  align-items: center;
  gap: 10px;
  position: relative;
}

.types-deco-row-bottom {
  margin-top: 8px;
}

.types-hat {
  width: 73px;
  height: auto;
  position: absolute;
  flex: 0 0 auto;
  top: -14px;
}

.hat-track {
  margin-left: 83px;
}

.luggage-track {
  margin-right: 73px;
}

.types-luggage {
  width: 62px;
  height: auto;
  flex: 0 0 auto;
  position: absolute;
  right: 0;
  top: -66px;
}

.types-heading {
  margin: 22px auto;
}

.types-description {
  margin: 32px auto 18px;
  color: #4d4d4d;
  text-align: center;
  font-family: "BIZ UDPGothic", "Noto Sans JP", sans-serif;
  font-size: 14px;
  letter-spacing: 5%;
  font-weight: 700;
  line-height: 25px;
}

.types-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.types-card {
  width: 100%;
}

.types-card-content {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.types-card-image {
  display: block;
  width: 100%;
  height: auto;
}

.types-card-label {
  margin: 0;
  color: #000;
  text-align: center;
  font-family: "M PLUS 1", "Noto Sans JP", sans-serif;
  font-size: 12px;
  font-weight: 400;
  line-height: 1;
}

.types-card :deep(.accent-frame-content) {
  padding: 13.5px 9px 11.5px;
}

.simless-connect-wrap {
  margin-top: 16px;
  padding: 20px 0 8px;
  position: relative;
}

.simless-connect-orb {
  width: calc(100% + 46px);
  height: 485px;
  transform: translateX(-23px);
  margin: 0 auto;
  border-radius: 50%;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 84.2px 26px 26px;
  position: relative;
  z-index: 1;
}

.simless-connect-logo {
  width: 143px;
  height: auto;
  margin-bottom: 43px;
  flex: 0 0 auto;
}

.simless-connect-title {
  margin: 0 0 43px;
  color: #111;
  text-align: center;
  font-size: 30px;
  font-weight: 700;
  line-height: 1;
}

.simless-connect-list {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  justify-content: center;
}

.simless-connect-item {
  display: flex;
  align-items: center;
  gap: 12px;

  &:last-child {
    margin-left: -13px;
  }
}

.simless-connect-item p {
  margin: 0;
  color: #000;
  font-size: 18px;
  font-weight: 500;
  line-height: 25px;
}

.simless-check {
  width: 35px;
  height: 35px;
  border-radius: 999px;
  background: #088547;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
}

.simless-check svg {
  width: 18.28px;
  height: 11.3px;
}

.simless-deco {
  position: absolute;
  pointer-events: none;
}

.simless-deco-stripe {
  width: 104px;
  height: 73px;
  left: 20px;
  top: 16px;
  z-index: 0;
}

.simless-deco-ring {
  width: 41.72px;
  height: 41.73px;
  right: 48px;
  top: 22px;
  border: 3px solid #b4d76288;
  border-radius: 50%;
  z-index: 0;
}

.simless-deco-dot {
  width: 20.44px;
  height: 20.44px;
  right: 22px;
  top: 44px;
  border-radius: 50%;
  background: #ffd39288;
  z-index: 0;
}

.simless-deco-bars {
  left: 22px;
  bottom: 0px;
  z-index: 0;
}

.simless-deco-pink-ring {
  width: 32px;
  height: 32px;
  right: 14px;
  bottom: 42px;
  border: 6px solid #ffadc8c7;
  border-radius: 50%;
  z-index: 0;
}

.simless-deco-arc {
  right: 36px;
  bottom: 16px;
  z-index: 0;
}

.share-benefit-section {
  margin-top: 40px;
  padding: 0 4px;
}

.share-benefit-heading {
  margin: 0 auto;
}

.share-benefit-description {
  margin: 15px auto 16px;
  color: #4d4d4d;
  text-align: center;
  font-family: "BIZ UDPGothic", "Noto Sans JP", sans-serif;
  font-size: 14px;
  font-weight: 700;
  line-height: 25px;
}

.benefit-card {
  border-radius: 10px;
  background: #fff;
  padding: 15px 9px;
  display: flex;
  align-items: center;
  gap: 13px;
  box-shadow: 3px 3px 0 0 #22b20480;
}

.benefit-card+.benefit-card {
  margin-top: 12px;
}

.benefit-icon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
}

.benefit-icon.share {
  background: #eb2d8f;
}

.benefit-icon.win {
  background: #f18c00;
}

.benefit-content h4 {
  margin: 0;
  color: #000;
  font-size: 22px;
  font-weight: 500;
  line-height: 1;
}

.benefit-content p {
  margin: 5px 0 0;
  color: #4d4d4d;
  font-size: 14px;
  font-weight: 400;
  line-height: 25px;
}

.share-now-btn {
  width: 345px;
  max-width: 100%;
  border: 0;
  padding: 0;
  margin: 25px auto 0;
  background: transparent;
  line-height: 0;
  display: block;
  cursor: pointer;
}

.share-now-btn :deep(svg) {
  width: 100%;
  height: auto;
}

.share-notes {
  margin-top: 15px;
}

.share-notes p {
  margin: 0;
  color: #4d4d4d;
  font-size: 10px;
  letter-spacing: 5%;
  font-weight: 400;
  line-height: 17px;
}

.share-cloud-wrap {
  margin-top: 25px;
  position: relative;
}

.share-cloud {
  width: 100%;
  padding: 18px 18px 12px;
  position: relative;
  height: 142px;
  display: flex;
  align-items: center;
  justify-content: center;
  isolation: isolate;
}

.share-cloud::before {
  content: "";
  position: absolute;
  inset: 0;
  background: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzQzIiBoZWlnaHQ9IjE0MiIgdmlld0JveD0iMCAwIDM0MyAxNDIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0zMDMuMTMyIDM0LjM1NDhDMzAyLjIyIDI2Ljg1NDggMzAwLjQxNiAxOC41MzQ4IDI5NC41NDggMTMuMzM0OEMyODAuMzMzIDEuODM0ODIgMjU0LjQ5MiAyLjU2NDgyIDI0MC43NzMgMTQuNTU0OEMyMzEuMjk3IC02Ljc5NTE5IDE5Ny41MTYgLTMuNDc1MTkgMTg4LjczMyAxNi44MTQ4QzE3NC42MjggMC41MzQ4MTUgMTQ0LjA5OCAtMy44MTUxOCAxMzEuMTkyIDE2LjAzNDhDMTIzLjQ2IDguODI0ODIgMTEyLjg5NCA0LjI2NDgyIDEwMi4yNjggNS43NDQ4MkM5Mi41MzM3IDYuNzk0ODIgODEuOTc3IDEzLjIzNDggNzkuMjcwOSAyMy4xMTQ4Qzc2LjgwMjcgMjAuMTQ0OCA3My4xMzUxIDE3LjQyNDggNzEuMjgxNSAxNi42NzQ4QzU5Ljg5MjIgMTEuNjI0OCA0NC4xNDE1IDExLjM1NDggMzQuNjg1MSAxOS43ODQ4QzI5Ljg5NzQgMjIuMjY0OCAyNi40NDc5IDI2LjQxNDggMjUuOTYyMiAzMy4xMzQ4QzI1LjQxNyAzOS4wNzQ4IDI0Ljg4MTcgNDUuNDc0OCAyNi44ODQgNTEuMTY0OEMxOS4xMzI2IDUxLjgwNDggMTEuOTQ2MSA1OC4wMjQ4IDYuNjEzMjMgNjMuMjY0OEMxLjM4OTQxIDY4LjMwNDggLTEuODYxODQgNzYuMjc0OCAxLjE2MTQzIDgzLjMyNDhDNi40ODQzNyA5NC42ODQ4IDIxLjAzNTcgOTYuNTI0OCAzMi4xNTc0IDk3LjI3NDhDMzIuMTc3MiA5Ny4yNzQ4IDMyLjE4NzEgOTcuMjc0OCAzMi4yMDcgOTcuMjc0OEMzMC4xMjU0IDEwMi4wMzUgMjkuMzIyNSAxMTAuOTI1IDMwLjM1MzQgMTE1Ljk0NUMzMC40NjI0IDExNi4zNTUgMzAuNzU5OCAxMTYuNzI1IDMxLjE0NjQgMTE2Ljg1NUMzMy4zMTcyIDEyNy40NjUgNDMuMjI5NSAxMzQuOTk1IDU4Ljk1MDYgMTM2LjE2NUM3MS4wODMzIDEzNi43MjUgODMuMjM1OCAxMzIuMDA1IDk0LjI2ODMgMTI3LjIwNUM5OS43NTk4IDEzNC4yODUgMTA4LjQ1MyAxMzguODc1IDExNy4yNjUgMTM5Ljg2NUMxMzcuMjQ4IDE0MS42NjUgMTQ2LjM0OCAxMzIuMDY1IDE0OS4zMjIgMTIzLjc2NUMxNTcuMjMyIDEzMi4wNzUgMTY4Ljk3OCAxMzYuMzU1IDE4MC4xNzkgMTM3LjM1NUMxODguMDIgMTM3Ljg2NSAxOTUuNzEyIDEzNS45ODUgMjAzLjA0NyAxMzMuMjg1QzIwMy44NCAxMzMuODQ1IDIwNC42NTIgMTM0LjMwNSAyMDUuMzg2IDEzNC42NTVDMjEwLjYxIDEzNy41NzUgMjE1Ljk1MyAxNDAuODU1IDIyMi4wNjkgMTQxLjE5NUMyMjMuMjk4IDE0MS4zMzUgMjI0LjU2NiAxNDEuNDA1IDIyNS44NzUgMTQxLjQwNUMyMzUuNTEgMTQxLjQwNSAyNDYuNTEyIDEzNy41MjUgMjQ4Ljk5MSAxMjcuNDA1QzI1Ny45NTEgMTI5LjY5NSAyNjYuNjQ0IDEzMy40MzUgMjc1Ljk3MiAxMzMuOTM1QzI4Ny4zMTIgMTM0LjM5NSAzMDAuOTExIDEzMy4wNTUgMzA4LjYxMyAxMjMuNjY1QzMxNC4xMDUgMTE2Ljg5NSAzMTYuNTQzIDEwNy4xNTUgMzE0LjA3NSA5OC42NzQ4QzMyNS43ODIgOTUuNDE0OCAzMzguOTU1IDg4LjUxNDggMzQxLjMzNCA3NS4zNTQ4QzM0NS45MTQgNTIuODM0OCAzMjYuNzEzIDI4LjE4NDggMzAzLjEwMiAzNC4zNTQ4SDMwMy4xMzJaTTEyLjQwMjEgNzQuMTQ0OEMxMi4wOTQ4IDc1LjA1NDggMTEuODU2OSA3NS45OTQ4IDExLjY5ODMgNzYuOTQ0OEMxMS4xNzI5IDc1Ljk2NDggMTEuNzU3OCA3NC45MDQ4IDEyLjQwMjEgNzQuMTQ0OFpNMTkuNjI4MiA2MS4zNjQ4QzE5LjQ1OTcgNjEuMzY0OCAxOS4yOTEyIDYxLjM2NDggMTkuMTIyNiA2MS4zNzQ4QzE5LjM2MDUgNjEuMjE0OCAxOS41ODg1IDYxLjA1NDggMTkuODM2MyA2MC44OTQ4QzE5Ljc2NjkgNjEuMDU0OCAxOS42OTc2IDYxLjIwNDggMTkuNjM4MSA2MS4zNjQ4SDE5LjYyODJaTTM0LjQxNzQgOTguMDg0OEMzNC4zNDggOTcuODE0OCAzNC4yMjkxIDk3LjU0NDggMzQuMDcwNSA5Ny4zMjQ4QzM0LjMxODMgOTcuMzI0OCAzNC41NjYxIDk3LjMxNDggMzQuODIzOCA5Ny4yOTQ4QzM0LjY4NTEgOTcuNTU0OCAzNC41NTYyIDk3LjgyNDggMzQuNDE3NCA5OC4wODQ4WiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+Cg==") no-repeat center / 100% 100%;
  filter: drop-shadow(3px 3px 0 #22b20433);
  z-index: 0;
  pointer-events: none;
}

.share-cloud p {
  position: relative;
  z-index: 1;
  margin: 0;
  color: #111;
  text-align: center;
  font-family: "BIZ UDPGothic", "Noto Sans JP", sans-serif;
  font-size: 16px;
  font-weight: 700;
  line-height: 1.8;
  max-width: 250px;
}

.share-cloud-camera {
  position: absolute;
  left: 2px;
  top: 0;
  width: 68px;
  height: auto;
  transform: rotate(-12deg);
  z-index: 2;
}

.share-cloud-passport {
  position: absolute;
  right: 2px;
  bottom: -20px;
  width: 74px;
  height: auto;
  transform: rotate(3deg);
  z-index: 2;
}
</style>
