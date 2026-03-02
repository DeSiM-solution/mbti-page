<template>
  <div class="quiz-section" :id="sectionId">
    <div class="quiz-header">
      <DoodleHeading
        class="step-section-heading"
        as="h2"
        font-size="28px"
        font-weight="900"
        line-height="100%"
        letter-spacing="5%"
        stroke-width="8px"
        width="101px"
        min-height="35px"
      >
        <span class="doodle-question-num">{{ question.id }}</span>
      </DoodleHeading>

      <div class="header-right-icon">
        <img :src="questionIcon" alt="" />
      </div>

      <AccentFrame class="mb-4">
        <h3>
          <!-- 如果你想标题里出现换行，可以在 title 里放 \n -->
          <template v-for="(line, idx) in titleLines" :key="idx">
            {{ line }}<br v-if="idx !== titleLines.length - 1" />
          </template>
        </h3>
      </AccentFrame>
    </div>

    <ul class="list-questions">
      <li
        v-for="(opt, idx) in question.options"
        :key="`${question.id}-${idx}`"
        :class="['question-item', { 'is-selected': idx === selectedIndex }]"
        role="button"
        tabindex="0"
        @click="onSelect(idx)"
        @keydown.enter.prevent="onSelect(idx)"
        @keydown.space.prevent="onSelect(idx)"
      >
        <div class="item-num">{{ idx + 1 }}</div>
        <div class="item-content">{{ opt }}</div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import AccentFrame from "@/components/common/AccentFrame.vue";
import DoodleHeading from "@/components/common/DoodleHeading.vue";

type Question = {
  id: string; // "Q1"
  title: string; // 支持用 "\n" 控制换行
  options: string[];
};

const props = defineProps<{
  question: Question;
}>();

const emit = defineEmits<{
  (e: "select", payload: { id: string; index: number; text: string }): void;
}>();

const titleLines = computed(() => props.question.title.split("\n"));

const questionIcon = computed(() => {
  const id = props.question.id.toLowerCase(); // "Q1" -> "q1"
  return new URL(`../quiz-data/${id}.svg`, import.meta.url).href;
});

const sectionId = computed(() => `quiz-${props.question.id}`);

const selectedIndex = ref<number | null>(null);

function onSelect(index: number) {
  selectedIndex.value = index;
  emit("select", {
    id: props.question.id,
    index,
    text: props.question.options[index],
  });
}
</script>

<style scoped lang="scss">
.quiz-section {
  padding: 51px 15px 0;
}

.quiz-header {
  position: relative;

  .step-section-heading {
    position: absolute;
    z-index: 2;
    top: -18px;
  }

  .header-right-icon {
    position: absolute;
    right: 0px;
    top: -56px;
    z-index: 2;
  }

  h3 {
    font-family: "M PLUS 1", "Noto Sans JP", sans-serif;
    font-weight: 500;
    margin: 1.5px 0;
    font-size: 22px;
    line-height: 28px;
    letter-spacing: 0%;
    text-align: center;
  }
}

.doodle-question-num {
  color: #ed1e79;
  font-family: "M PLUS 1", "Noto Sans JP", sans-serif;
}

.list-questions {
  display: flex;
  flex-direction: column;
  gap: 12px;
  list-style: none;
  padding-left: 0;

  .question-item {
    width: 100%;
    display: flex;
    padding: 10px 6.5px;
    border-radius: 10px;
    gap: 6px;
    align-items: center;
    background: #fff;
    box-shadow: 3px 3px 0 0 #22b20433;
    border: 2px solid #ffffff;
    font-family: "M PLUS 1", "Noto Sans JP", sans-serif;
    cursor: pointer;

    .item-num {
      color: #8cc63f;
      font-weight: 600;
      font-size: 28.78px;
      line-height: 100%;
    }

    .item-content {
      color: #000;
      font-weight: 500;
      font-size: 14px;
      line-height: 1.4;
      /* 比 100% 更适合长句 */
    }

    &.is-selected {
      border-color: #f7931e;
      box-shadow: 3px 3px 0 0 #fff80080;
    }
  }
}
</style>