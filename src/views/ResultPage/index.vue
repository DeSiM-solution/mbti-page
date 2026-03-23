<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import resultData from "../ResultPage/result-data.json";
import AccentFrame from "@/components/common/AccentFrame.vue";
import DoodleHeading from "@/components/common/DoodleHeading.vue";
import ResultFrame from "@/assets/result-page/result-frame.png";
import FrameStar from "@/assets/result-page/frame-star.svg";
import FrameStarBottom from "@/assets/result-page/frame-star-b.svg";
import TriangleDown from "@/components/assets/TriangleDown.vue";
import Laurel from "@/components/assets/Laurel.vue";
import PlanFrame from "@/assets/result-page/plan-frame.png";
import ShareLoop from "@/assets/result-page/loop.svg";
import ButtonTwo from "@/components/assets/ButtonTwo.vue";
import { shareCurrentPage } from "@/services/liffShare";

type ResultProfile = {
  code: string;
  title: string;
  desc: string;
  features: string;
  communicationStyle: string[];
  planName: string;
};

const route = useRoute();
const isLoading = ref(true);
const loadError = ref("");
const fallbackProfile: ResultProfile = {
  code: "ESTJ",
  title: "計画型トラベラー",
  desc: "旅は段取りが9割。",
  features: "",
  communicationStyle: [],
  planName: "",
};
const profile = ref<ResultProfile>(resultData[0] ?? fallbackProfile);

const resultType = computed(() => {
  const rawType = String(route.params.type ?? "ESTJ").toUpperCase();
  return rawType;
});

const images = import.meta.glob<string>("@/assets/result-page/main/*.png", {
  eager: true,
  query: "?url",
  import: "default",
});

const esimImages = import.meta.glob<string>("@/assets/result-page/esim/*.png", {
  eager: true,
  query: "?url",
  import: "default",
});

const iconImages = import.meta.glob<string>("@/assets/result-page/icon/*.png", {
  eager: true,
  query: "?url",
  import: "default",
});

const ResultImage = computed(() => {
  const rawCode = profile.value?.code?.toLowerCase?.() ?? "estj";
  const path = `/src/assets/result-page/main/${rawCode}.png`;
  return images[path]
});

const EsimImage = computed(() => {
  const rawCode = profile.value?.code?.toLowerCase?.() ?? "estj";
  const path = `/src/assets/result-page/esim/${rawCode}-esim.png`;
  return (
    esimImages[path]
  );
});

const IconImage = computed(() => {
  const rawCode = profile.value?.code?.toLowerCase?.() ?? "estj";
  const path = `/src/assets/result-page/icon/${rawCode}.psd.png`;
  return (
    iconImages[path]
  );
});

const displayPlanName = computed(() => {
  const rawPlanName = profile.value.planName?.trim() ?? "";
  const everyDayPlan = rawPlanName.match(/^毎日\s*(.+)$/);
  if (everyDayPlan) {
    return `${everyDayPlan[1]}/毎日`;
  }
  return rawPlanName;
});

function handleShareClick() {
  void shareCurrentPage();
}

function loadProfile() {
  isLoading.value = true;
  loadError.value = "";
  try {
    const found = resultData.find(
      (p) => p.code.toUpperCase() === resultType.value.toUpperCase()
    );
    profile.value = found ??
      resultData[0] ?? {
        ...fallbackProfile,
      };
  } catch {
    loadError.value = "結果データの読み込みに失敗しました。";
  } finally {
    isLoading.value = false;
  }
}

watch(resultType, () => {
  void loadProfile();
});

onMounted(() => {
  void loadProfile();
});
</script>

<template>
  <div class="result-page">
    <div class="result-title">
      <DoodleHeading
        font-size="22px"
        font-weight="700"
        line-height="44px"
        letter-spacing="5%"
        stroke-width="4px"
        width="313px"
        min-height="100px"
      >
        あなたの<span class="doodle-highlight">旅タイプ</span>はこちら！
      </DoodleHeading>
    </div>
    <div class="result-main">
      <AccentFrame>
        <div class="result-main-content">
          <p class="sub-title">ー 診断結果 ー</p>
          <div class="result-frame">
            <img
              class="result-frame-image"
              :src="ResultFrame"
              alt="result-frame"
            />
            <div class="result-frame-content">
              <img class="frame-star" :src="FrameStar" alt="frame-star" />
              <img
                class="frame-star-bottom"
                :src="FrameStarBottom"
                alt="frame-star-bottom"
              />
              {{ profile.title }}<br />{{ profile.code }}
            </div>
          </div>
          <div class="result-image">
            <img :src="ResultImage" alt="result-image" />
          </div>
          <div class="result-description">
            <span>「{{ profile.desc || "旅は段取りが9割" }}」</span>
          </div>
          <div class="result-features">
            <DoodleHeading
              font-size="27px"
              font-weight="500"
              line-height="44px"
              letter-spacing="5%"
              stroke-width="6px"
              width="125px"
              min-height="35px"
            >
              <span class="doodle-highlight">特 徴</span>
            </DoodleHeading>
            <div class="feature-content" v-html="profile.features"></div>
          </div>
          <div class="result-communication-style">
            <DoodleHeading
              font-size="27px"
              font-weight="500"
              line-height="44px"
              letter-spacing="5%"
              stroke-width="6px"
              width="213px"
              min-height="37px"
            >
              <span class="doodle-highlight">通信スタイル</span>
            </DoodleHeading>
            <div class="communication-content">
              <div
                class="comm-item"
                v-for="(item, idx) in profile.communicationStyle"
                :key="idx"
              >
                {{ item }}
              </div>
            </div>
          </div>
        </div>
      </AccentFrame>
    </div>
    <div class="recommend-section">
      <TriangleDown class="recommend-arrow" />
      <div class="recommend-title-strip">
        <img :src="IconImage" alt="旅タイプアイコン" class="header-icon" />
        <span class="mbti-code">{{ profile.code }}</span>
        <span class="recommend-title">おすすめeSIM</span>
      </div>
      <div class="esim-showcase">
        <span class="laurel laurel-left" aria-hidden="true">
          <Laurel />
        </span>
        <span class="laurel laurel-right" aria-hidden="true">
          <Laurel />
        </span>
        <div class="esim-image-wrapper">
          <img :src="EsimImage" alt="おすすめeSIM" class="esim-image" />
        </div>
      </div>
      <div class="plan-name">
        <img :src="PlanFrame" alt="plan-frame" class="plan-frame" />
        <div class="plan-arrow" aria-hidden="true">
          <svg
            width="17"
            height="17"
            viewBox="0 0 17 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.4 16.8C13.0392 16.8 16.8 13.0392 16.8 8.4C16.8 3.76081 13.0392 0 8.4 0C3.76081 0 0 3.76081 0 8.4C0 13.0392 3.76081 16.8 8.4 16.8Z"
              fill="white"
            />
            <path
              d="M12.4702 8.40031L6.24023 4.07031V12.7403L12.4702 8.40031Z"
              fill="#ED1E79"
            />
          </svg>
        </div>
        <div class="plan-content">
          <div class="plan-content-inner">
            <span class="plan-main">
              {{ displayPlanName }}
            </span>
            <span class="plan-sub">プラン</span>
          </div>
        </div>
      </div>
      <div class="share-section">
        <div class="share-loop" aria-hidden="true">
          <img :src="ShareLoop" alt="share-loop" />
        </div>
        <DoodleHeading
          font-size="22px"
          font-weight="700"
          line-height="35px"
          letter-spacing="5%"
          stroke-width="3px"
          width="313px"
          min-height="100px"
        >
          診断結果を<br />３人にLINEでシェアして <br /><span
            class="doodle-highlight"
            >無料eSIMをゲット</span
          >
        </DoodleHeading>
        <!-- <p class="share-text">
          診断結果を<br />
          3人にLINEでシェアして<br />
          <span>無料eSIMをゲット</span>
        </p> -->
        <button class="share-button" type="button" @click="handleShareClick">
          <ButtonTwo />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.result-page {
  background: linear-gradient(180deg, #ffffb3 0%, #e2ffb3 100%);

  .result-title {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 30px 0;
  }

  .result-main {
    padding: 0 15px;
  }

  .result-main-content {
    display: flex;
    padding: 4.5px 5.5px;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .sub-title {
      margin: 0;
      font-weight: 400;
      font-size: 18px;
      line-height: 44px;
      letter-spacing: 5%;
      margin-bottom: 16px;
    }

    .result-frame {
      width: 100%;
      height: auto;
      position: relative;

      .result-frame-image {
        width: 100%;
      }

      .result-frame-content {
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: "M PLUS 1", "Noto Sans JP", sans-serif;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        font-weight: 600;
        font-size: 29px;
        line-height: 39px;
        letter-spacing: 5%;
        text-align: center;
        color: #fff;

        .frame-star {
          position: absolute;
          top: -8px;
          right: -4px;
        }

        .frame-star-bottom {
          position: absolute;
          bottom: -4px;
          left: -4px;
        }
      }
    }

    .result-image {
      padding: 36.6px 0 21.5px;
      max-width: 200px;
    }

    .result-description {
      border-top: 2px solid #b3d762;
      border-bottom: 2px solid #b3d762;
      background: #fffde6;
      width: 100%;
      padding: 22px 0;
      display: flex;
      justify-content: center;
      align-items: center;
      -webkit-mask-image: linear-gradient(
        to right,
        transparent 0%,
        black 15%,
        black 85%,
        transparent 100%
      );
      mask-image: linear-gradient(
        to right,
        transparent 0%,
        black 15%,
        black 85%,
        transparent 100%
      );
      -webkit-mask-repeat: no-repeat;
      mask-repeat: no-repeat;

      span {
        text-align: center;
        font-family: "M PLUS 1", "Noto Sans JP", sans-serif;
        font-weight: 500;
        font-size: 18px;
        line-height: 100%;
        letter-spacing: 0%;
        color: #000;
      }
    }

    .result-features {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin-top: 9px;

      .doodle-highlight {
        font-family: "M PLUS 1", "Noto Sans JP", sans-serif;
      }

      .feature-content {
        margin-top: 9px;
        font-family: "M PLUS 1", "Noto Sans JP", sans-serif;
        font-weight: 400;
        font-size: 16px;
        line-height: 27px;
        letter-spacing: 5%;
        text-align: center;
      }
    }

    .result-communication-style {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin-top: 32px;
      width: 100%;

      .doodle-highlight {
        font-family: "M PLUS 1", "Noto Sans JP", sans-serif;
      }

      .communication-content {
        margin-top: 22px;
        margin-bottom: 16px;
        font-family: "M PLUS 1", "Noto Sans JP", sans-serif;
        font-weight: 400;
        font-size: 16px;
        line-height: 27px;
        letter-spacing: 5%;
        color: #000;
        display: flex;
        width: 100%;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;

        .comm-item {
          position: relative;
          padding-left: 20px;
          margin-left: 16px;

          &::before {
            background: #b3d762;
            content: "";
            position: absolute;
            top: 7px;
            left: 0;
            width: 15px;
            height: 15px;
            border-radius: 999px;
          }
        }
      }
    }
  }

  .recommend-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 24px;
    padding: 0 15px;

    .recommend-arrow {
      width: 72px;
      height: auto;
      margin-bottom: 10px;
    }

    .recommend-title-strip {
      width: calc(100% + 60px);
      margin: 0 -15px;
      background: #fcee21;
      padding: 20px 44px 26px;
      position: relative;
      transform: rotate(-7deg);
    }

    .mbti-code {
      display: block;
      font-family: "M PLUS 1", "Noto Sans JP", sans-serif;
      font-size: 46px;
      letter-spacing: 0.05em;
      font-weight: 900;
      color: #ed1e79;
      paint-order: stroke fill;
      -webkit-text-stroke: 4px #ffffff;
      text-shadow: 1px 0 #ffffff, -1px 0 #ffffff, 0 1px #ffffff, 0 -1px #ffffff,
        1px 1px #ffffff, -1px 1px #ffffff, 1px -1px #ffffff, -1px -1px #ffffff,
        4px 5px #ffce00;
    }

    .recommend-title {
      display: block;
      font-family: "M PLUS 1", "Noto Sans JP", sans-serif;
      font-size: 46px;
      font-weight: 900;
      letter-spacing: 0.02em;
      color: #111;
      paint-order: stroke fill;
      -webkit-text-stroke: 4px #ffffff;
      text-shadow: 1px 0 #ffffff, -1px 0 #ffffff, 0 1px #ffffff, 0 -1px #ffffff,
        1px 1px #ffffff, -1px 1px #ffffff, 1px -1px #ffffff, -1px -1px #ffffff,
        4px 5px #ffce00;
    }

    .header-icon {
      position: absolute;
      right: 18px;
      top: -48px;
      width: 116px;
      height: auto;
      transform: rotate(7deg);
      z-index: 2;
    }

    .esim-showcase {
      width: 236px;
      margin-top: 18px;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .laurel {
      position: absolute;
      width: 95px;
      bottom: -22px;
    }

    .laurel-left {
      left: -40px;
      transform: scaleX(-1);
    }

    .laurel-right {
      right: -40px;
    }

    .esim-image-wrapper {
      position: relative;
      width: 203px;
      overflow: hidden;
      z-index: 2;

      .esim-image {
        width: 100%;
        display: block;
      }
    }

    .plan-name {
      margin-top: 32px;
      padding-left: 12px;
      padding-right: 12px;
      width: 100%;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      position: relative;
      .plan-frame {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .plan-content {
        position: absolute;
        z-index: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 15px;

        .plan-main {
          font-family: "M PLUS 1", "Noto Sans JP", sans-serif;
          font-size: 28px;
          letter-spacing: 0.05em;
          font-weight: 500;
          line-height: 30px;
        }

        .plan-sub {
          font-size: 14px;
          font-weight: 700;
          line-height: 30px;
          margin-top: 4px;
        }
      }

      .plan-arrow {
        position: absolute;
        right: 38px;
      }
    }

    .share-section {
      margin-top: 50px;
      width: calc(100% + 30px);
      padding: 100px 24px 30px;
      background: #fff;
      border-radius: 9999px 9999px 0 0;
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      .share-loop {
        position: absolute;
        left: 22px;
        top: 0px;
      }
    }

    .share-button {
      width: 325px;
      margin-top: 37px;
      height: 55px;
      max-width: 100%;
      border: 0;
      padding: 0;
      background: transparent;
      line-height: 0;
      cursor: pointer;
      & img {
        display: block;
        width: 325px;
        height: 55px;
        max-width: 100%;
      }

      &:active {
        transform: translateY(1px);
      }
    }

    .share-button span {
      font-size: 18px;
      line-height: 1;
    }
  }
}

.badge {
  margin: 0 0 8px;
  display: inline-flex;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 700;
  background: #fff2ac;
  color: #5a4d00;
}

h2 {
  margin: 0;
  font-size: 24px;
  line-height: 1.3;
}

.catch {
  margin: 10px 0 0;
  color: var(--color-text-secondary);
  font-size: 14px;
  line-height: 1.7;
}

.body {
  margin: 0;
  color: var(--color-text-secondary);
  line-height: 1.75;
  font-size: 14px;
}

.plan-card {
  border-radius: 14px;
  border: 1px solid var(--color-border-soft);
  padding: 14px;
  margin-bottom: 12px;
}

.plan-card h3 {
  margin: 0 0 6px;
}

.plan-card p {
  margin: 0;
  color: var(--color-text-secondary);
  line-height: 1.6;
}

.actions {
  display: grid;
  gap: 10px;
}

.state-message {
  margin: 0;
  color: var(--color-text-secondary);
}

.state-message.error {
  color: #a73d3d;
  margin-bottom: 10px;
}
</style>
