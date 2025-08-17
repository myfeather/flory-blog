<template>
  <strong class="prose-strong">
    <slot />
  </strong>
</template>

<script setup>
// No props needed for basic strong text
</script>

<style scoped>
.prose-strong {
  font-weight: 600;
  color: var(--color-text);
}
</style>
