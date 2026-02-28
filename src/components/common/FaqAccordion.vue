<script setup lang="ts">
import { ref } from 'vue'

interface FaqItem {
  question: string
  answer: string
}

const props = defineProps<{
  items: FaqItem[]
}>()

const openedIndex = ref<number | null>(0)

function toggle(index: number) {
  openedIndex.value = openedIndex.value === index ? null : index
}
</script>

<template>
  <div class="accordion">
    <article v-for="(item, index) in props.items" :key="item.question" class="item">
      <button class="question" type="button" @click="toggle(index)">
        <span>{{ item.question }}</span>
        <span class="icon">{{ openedIndex === index ? '−' : '+' }}</span>
      </button>
      <p v-if="openedIndex === index" class="answer">{{ item.answer }}</p>
    </article>
  </div>
</template>

<style scoped>
.accordion {
  display: grid;
  gap: 10px;
}

.item {
  border-radius: 12px;
  border: 1px solid var(--color-border-soft);
  background: #fff;
  overflow: hidden;
}

.question {
  width: 100%;
  border: 0;
  background: transparent;
  padding: 13px 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: left;
  cursor: pointer;
  font-size: 14px;
  font-weight: 700;
}

.icon {
  flex-shrink: 0;
  margin-left: 12px;
  color: var(--color-accent-strong);
  font-size: 18px;
}

.answer {
  margin: 0;
  padding: 0 14px 14px;
  color: var(--color-text-secondary);
  line-height: 1.65;
  font-size: 13px;
}
</style>
