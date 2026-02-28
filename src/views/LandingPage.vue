<script setup lang="ts">
import { useRouter } from 'vue-router'
import buttonImage from '../assets/button-1.svg'
import glassesImage from '../assets/glasses.svg'
import lightImage from '../assets/light.svg'
import triangleImage from '../assets/triangle.svg'
import circleImage from '../assets/circle.svg'
import AccentFrame from '../components/common/AccentFrame.vue'

const router = useRouter()
const slashMarks = Array.from({ length: 18 }, (_, index) => index)
</script>

<template>
  <div class="page">
    <section class="hero">
      <button class="hero-cta" type="button" aria-label="旅タイプ診断" @click="router.push({ name: 'quiz' })">
        <img :src="buttonImage" alt="" width="325" height="55" />
      </button>
    </section>

    <section class="share-section">
      <div class="share-frame">
        <svg class="share-border" viewBox="0 0 328 102" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <defs>
            <filter id="shareFrameShadow" x="-12" y="-6" width="352" height="130" filterUnits="userSpaceOnUse">
              <feDropShadow dx="0" dy="4" stdDeviation="2" flood-color="#000000" flood-opacity="0.25" />
            </filter>
          </defs>
          <path
            d="M14 10H153L164 -1L175 10H314A12 12 0 0 1 326 22V88A12 12 0 0 1 314 100H14A12 12 0 0 1 2 88V22A12 12 0 0 1 14 10Z"
            fill="#f5b89f"
            filter="url(#shareFrameShadow)"
          />
          <path
            d="M16 14H156L164 6L172 14H312A9 9 0 0 1 321 23V86A9 9 0 0 1 312 95H16A9 9 0 0 1 7 86V23A9 9 0 0 1 16 14Z"
            fill="#ffffff"
          />
          <path
            d="M16 14H156L164 6L172 14H312A9 9 0 0 1 321 23V86A9 9 0 0 1 312 95H16A9 9 0 0 1 7 86V23A9 9 0 0 1 16 14Z"
            fill="none"
            stroke="#111"
            stroke-width="1"
            stroke-linejoin="miter"
            stroke-miterlimit="10"
          />
        </svg>
        <p class="share-copy">
          診断結果を3人にシェアして、<br />
          eSIMゲットしよう🎁<br />
          シェアされた人も特別クーポンがもらえる！
        </p>
      </div>
    </section>

    <section class="divider-row" aria-hidden="true">
      <img class="glasses" :src="glassesImage" alt="" width="82" height="48" />
      <div class="slash-track">
        <svg class="slash-icon" width="7" height="8" viewBox="0 0 7 8" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M5.53223 0.501953C5.53362 0.502997 5.53829 0.50636 5.54395 0.514648C5.55653 0.533234 5.58496 0.589982 5.58496 0.708984C5.5849 0.734536 5.57703 0.776753 5.53223 0.854492C5.47978 0.94534 5.41887 1.01879 5.32031 1.1543C4.95365 1.62994 4.54378 2.15931 4.19336 2.62988L4.18945 2.63672L4.18457 2.64258C3.36743 3.81414 2.5089 4.87967 1.57715 5.9502L1.57129 5.95801L1.56543 5.96484C1.47823 6.07309 1.37116 6.23111 1.27344 6.37207C1.16824 6.52382 1.05742 6.68117 0.941406 6.82422C0.82375 6.96926 0.714835 7.08199 0.619141 7.15527C0.571825 7.19147 0.537293 7.20852 0.516602 7.21777C0.512002 7.2108 0.507174 7.20726 0.505859 7.20312C0.501873 7.19046 0.496891 7.16182 0.50293 7.10938C0.516604 6.9912 0.573313 6.84411 0.65918 6.65723L0.670898 6.63086L0.680664 6.60352C0.858489 6.05742 1.20037 5.58932 1.62988 5.10156C2.03339 4.64335 2.56206 4.11961 2.96777 3.56641L2.96875 3.56738C3.72841 2.59782 4.48158 1.64515 5.27344 0.724609L5.29688 0.698242L5.31543 0.667969C5.3743 0.576126 5.43363 0.533162 5.47168 0.514648C5.50974 0.496188 5.52952 0.5008 5.53027 0.500977L5.53223 0.501953Z"
            fill="#429AD0"
            stroke="black"
          />
        </svg>
        <template v-for="mark in slashMarks" :key="mark">
          <svg
            v-if="mark % 2 === 0"
            class="slash-icon"
            width="7"
            height="9"
            viewBox="0 0 7 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.377741 8.3823C-0.332259 8.0123 0.10774 7.0323 0.48774 6.6223C1.27774 5.5323 2.18774 4.5223 3.02774 3.4723C3.86774 2.4323 4.74774 1.4223 5.57774 0.372299C5.68774 0.192299 5.83774 0.0322992 6.06774 0.0022992C6.50774 -0.0377008 6.78774 0.452299 6.69774 0.842299C6.63774 1.1523 6.42774 1.4023 6.23774 1.6523C4.80774 3.4423 3.37774 5.2223 1.97774 7.0323C1.69774 7.4023 1.42774 7.7823 1.08774 8.1023C0.97774 8.2823 0.77774 8.4123 0.56774 8.4123C0.50774 8.4123 0.437741 8.4023 0.377741 8.3723V8.3823Z"
              fill="#F5AF7E"
            />
          </svg>
          <svg
            v-else
            class="slash-icon"
            width="8"
            height="9"
            viewBox="0 0 8 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.92578 0.522461C6.94605 0.553328 6.96115 0.595157 6.96484 0.636719C6.96728 0.664167 6.96322 0.68238 6.95996 0.693359C6.56509 1.25098 6.12001 1.78857 5.6543 2.33496C5.18364 2.88715 4.68791 3.45428 4.22949 4.04004C3.14849 5.35623 2.19125 6.65546 1.09082 7.88477C1.01974 7.95569 0.955744 8.02894 0.904297 8.08887C0.841533 8.16198 0.795178 8.21652 0.74707 8.26562C0.671461 8.34275 0.624169 8.36581 0.592773 8.37598C0.587543 8.37357 0.578023 8.36884 0.56543 8.35645C0.538887 8.33023 0.518486 8.29086 0.509766 8.25195L0.506836 8.2334C0.483655 8.09826 0.522214 7.95583 0.662109 7.75781C0.732317 7.65847 0.819052 7.55762 0.919922 7.44727C1.01251 7.34598 1.13393 7.21895 1.23242 7.10449L1.23145 7.10352C1.68466 6.60852 2.12419 6.03755 2.52637 5.56055L2.53418 5.5498C3.78401 3.98256 5.11461 2.4816 6.46387 0.982422L6.46484 0.983398C6.59478 0.83976 6.63972 0.77658 6.74414 0.666992C6.8104 0.59746 6.86848 0.550362 6.9209 0.515625C6.92239 0.517694 6.92418 0.520027 6.92578 0.522461Z"
              fill="#429AD0"
              stroke="black"
            />
          </svg>
        </template>
      </div>
    </section>

    <section class="intro-section">
      <img class="intro-deco intro-light" :src="lightImage" alt="" width="51" height="70" aria-hidden="true" />
      <img class="intro-deco intro-triangle" :src="triangleImage" alt="" width="52" height="49" aria-hidden="true" />
      <img class="intro-deco intro-circle" :src="circleImage" alt="" width="38" height="45" aria-hidden="true" />
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
      <AccentFrame>
        <div class="step-frame-head">
          <span class="step-frame-pill">STEP1</span>
          <h3>診断をスタート</h3>
        </div>
        <div class="step-frame-divider"></div>
        <p class="step-frame-copy">
          全6問の簡単な質問に答えていきます。<br />
          自分の本当の好みを知るために、あまり考えすぎず、ありのままの自分に当てはまるものを選んでください。
        </p>
      </AccentFrame>
    </section>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=BIZ+UDPGothic:wght@700&family=M+PLUS+1:wght@500&display=swap');

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
  font-family: 'BIZ UDPGothic', 'Noto Sans JP', sans-serif;
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
  gap: 6px;
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
  font-family: 'M PLUS 1', 'Noto Sans JP', sans-serif;
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
}

.step-frame-head {
  display: flex;
  align-items: flex-end;
  gap: 14px;
}

.step-frame-pill {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 5.5px 8px;
  border-radius: 5px;
  background: #367514;
  color: #fff;
  font-family: 'M PLUS 1', 'Noto Sans JP', sans-serif;
  font-size: 14px;
  font-weight: 500;
  line-height: 1;
}

.step-frame-head h3 {
  margin: 0;
  color: #000;
  font-size: 22px;
  font-weight: 500;
  font-family: 'M PLUS 1', 'Noto Sans JP', sans-serif;
}

.step-frame-divider {
  margin:9px 5.5px 12px;
  border-bottom: 1px dashed #C69C6D;
  border: 1px solid transparent;
  border-image: repeating-linear-gradient(
    to right,
    #C69C6D 0 4px,       /* 实线长度 */
    transparent 4px 4px /* 间隙长度 */
  ) 1;
  }

.step-frame-copy {
  margin: 0;
  color: #545454;
  font-size: 14px;
  margin: 5.5px 0 0 5.5px;
  line-height: 1.64;
}
</style>
