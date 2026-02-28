<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    label?: string
    disabled?: boolean
    loading?: boolean
    block?: boolean
    variant?: 'solid' | 'ghost'
  }>(),
  {
    label: '',
    disabled: false,
    loading: false,
    block: true,
    variant: 'solid',
  },
)

const emit = defineEmits<{
  (e: 'click'): void
}>()

function onClick() {
  if (props.disabled || props.loading) return
  emit('click')
}
</script>

<template>
  <button :class="['btn', variant, { block }]" :disabled="disabled || loading" type="button" @click="onClick">
    <span v-if="loading">読み込み中...</span>
    <span v-else>
      <slot>{{ label }}</slot>
    </span>
  </button>
</template>

<style scoped>
.btn {
  border: 0;
  border-radius: 999px;
  min-height: 48px;
  padding: 10px 18px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.15s ease, opacity 0.15s ease;
}

.btn.block {
  width: 100%;
}

.btn.solid {
  color: #fff;
  background: linear-gradient(120deg, #0b9f55, #39b84f);
}

.btn.ghost {
  color: #0f8a4c;
  background: rgba(15, 138, 76, 0.1);
  border: 1px solid rgba(15, 138, 76, 0.35);
}

.btn:disabled {
  cursor: not-allowed;
  opacity: 0.45;
}

.btn:not(:disabled):active {
  transform: translateY(1px);
}
</style>
