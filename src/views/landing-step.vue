<template>
  <AccentFrame>
    <div class="step-frame-head">
      <span class="step-frame-pill">STEP{{ props.step }}</span>
      <h3>{{ props.title }}</h3>
    </div>
    <div class="step-frame-divider"></div>
    <p class="step-frame-copy" v-html="props.content"></p>
  </AccentFrame>
</template>
<script setup lang="ts">
import AccentFrame from '../components/common/AccentFrame.vue'

const props = withDefaults(
  defineProps<{
    title: string
    content: string
    step?: number
  }>(),
  {
    step: 1,
  },
)
</script>
<style scoped lang="scss">
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
  margin: 9px 5.5px 12px;
  height: 1.3px;
  background: repeating-linear-gradient(to right, #c69c6d 0 6px, transparent 6px 12px);
}

.step-frame-copy {
  margin: 0;
  color: #545454;
  font-size: 14px;
  margin: 5.5px 0 0 5.5px;
  line-height: 1.64;
}
</style>
