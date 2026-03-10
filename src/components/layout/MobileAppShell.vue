<template>
  <div class="shell">
    <div class="device">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.shell {
  background:
    radial-gradient(circle at 15% 10%, rgba(193, 241, 140, 0.55), transparent 45%),
    radial-gradient(circle at 80% 10%, rgba(255, 232, 135, 0.5), transparent 40%),
    #f0f3f5;
}

.device {
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  background: var(--color-surface);
  box-shadow: 0 12px 28px rgba(17, 35, 53, 0.14);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
</style>
