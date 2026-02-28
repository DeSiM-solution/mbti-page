<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    muted?: boolean
  }>(),
  {
    muted: false,
  },
)
</script>

<template>
  <section :class="['section', { muted: props.muted }]">
    <slot />
  </section>
</template>

<style scoped>
.section {
  padding: 20px 16px;
}

.section.muted {
  background: var(--color-surface-muted);
}
</style>
