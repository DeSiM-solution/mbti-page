<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { initializeLiffSession } from "@/services/liffShare";

const bootstrapErrorMessage = ref("");

const errorMessage = computed(
  () =>
    bootstrapErrorMessage.value ||
    "LINE情報を取得できませんでした。再読み込みするか、LINEアプリから開き直してください。",
);

async function startBootstrap() {
  try {
    const result = await initializeLiffSession(window.location.href);
    if (!result) {
      return;
    }
  } catch (error) {
    bootstrapErrorMessage.value =
      error instanceof Error && error.message.trim()
        ? error.message
        : "LINE情報を取得できませんでした。再読み込みするか、LINEアプリから開き直してください。";
  }
}

function closePage() {
  window.close();
}

function reloadPage() {
  window.location.reload();
}

onMounted(() => {
  void startBootstrap();
});
</script>

<template>
  <section class="boot-page">
    <div v-if="bootstrapErrorMessage" class="boot-error">
      <p class="boot-error-copy">{{ errorMessage }}</p>
      <div class="boot-error-actions">
        <button class="boot-action-button" type="button" @click="closePage">閉じる</button>
        <button class="boot-action-button" type="button" @click="reloadPage">再読み込み</button>
      </div>
    </div>
    <div v-else class="boot-loading">
      <div class="boot-spinner" aria-hidden="true">
        <span v-for="item in 12" :key="item" class="boot-spinner-line"></span>
      </div>
      <p class="boot-copy">確認中…しばらくお待ちください。</p>
    </div>
  </section>
</template>

<style scoped lang="scss">
.boot-page {
  min-height: calc(100vh - 32px);
  display: grid;
  place-items: center;
  padding: 24px 16px;
  background: #ffffff;
}

.boot-loading {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 8px 12px;
  line-height: 1;
}

.boot-error {
  width: min(100%, 320px);
  display: grid;
  gap: 18px;
  text-align: center;
  justify-items: center;
}

.boot-copy,
.boot-error-copy {
  margin: 0;
}

.boot-copy {
  color: #3b3b3b;
  font-size: 12px;
  line-height: 1;
  white-space: nowrap;
}

.boot-error-copy {
  color: #4b4b4b;
  font-size: 12px;
  line-height: 1.6;
}

.boot-error-actions {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.boot-action-button {
  width: 100%;
  min-height: 32px;
  padding: 4px 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #e0e6e9;
  border-radius: 999px;
  background: #ffffff;
  color: #4b4b4b;
  font-size: 12px;
  font-weight: 600;
  line-height: 1.4;
  white-space: nowrap;
}

.boot-spinner {
  position: relative;
  width: 16px;
  height: 16px;
  flex: 0 0 16px;
  transform: translateY(-1px);
}

.boot-spinner-line {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 2px;
  height: 6px;
  margin: -3px 0 0 -1px;
  border-radius: 999px;
  background: #d9d9d9;
  animation: spinner-fade 1s linear infinite;
  transform-origin: center 6px;
}

.boot-spinner-line:nth-child(1) {
  transform: rotate(0deg) translateY(-5px);
  animation-delay: -0.9167s;
}

.boot-spinner-line:nth-child(2) {
  transform: rotate(30deg) translateY(-5px);
  animation-delay: -0.8333s;
}

.boot-spinner-line:nth-child(3) {
  transform: rotate(60deg) translateY(-5px);
  animation-delay: -0.75s;
}

.boot-spinner-line:nth-child(4) {
  transform: rotate(90deg) translateY(-5px);
  animation-delay: -0.6667s;
}

.boot-spinner-line:nth-child(5) {
  transform: rotate(120deg) translateY(-5px);
  animation-delay: -0.5833s;
}

.boot-spinner-line:nth-child(6) {
  transform: rotate(150deg) translateY(-5px);
  animation-delay: -0.5s;
}

.boot-spinner-line:nth-child(7) {
  transform: rotate(180deg) translateY(-5px);
  animation-delay: -0.4167s;
}

.boot-spinner-line:nth-child(8) {
  transform: rotate(210deg) translateY(-5px);
  animation-delay: -0.3333s;
}

.boot-spinner-line:nth-child(9) {
  transform: rotate(240deg) translateY(-5px);
  animation-delay: -0.25s;
}

.boot-spinner-line:nth-child(10) {
  transform: rotate(270deg) translateY(-5px);
  animation-delay: -0.1667s;
}

.boot-spinner-line:nth-child(11) {
  transform: rotate(300deg) translateY(-5px);
  animation-delay: -0.0833s;
}

.boot-spinner-line:nth-child(12) {
  transform: rotate(330deg) translateY(-5px);
  animation-delay: 0s;
}

@keyframes spinner-fade {
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0.2;
  }
}
</style>
