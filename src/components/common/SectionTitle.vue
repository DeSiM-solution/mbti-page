<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    title: string
    subtitle?: string
  }>(),
  {
    subtitle: '',
  },
)
</script>

<template>
  <div class="section-title">
    <p v-if="subtitle" class="subtitle">{{ subtitle }}</p>
    <h2>{{ title }}</h2>
  </div>
</template>

<style scoped>
.section-title {
  margin-bottom: 14px;
}

.subtitle {
  margin: 0 0 8px;
  color: var(--color-accent-strong);
  font-size: 12px;
  font-weight: 700;
}

h2 {
  margin: 0;
  font-size: 22px;
  line-height: 1.25;
}
</style>
