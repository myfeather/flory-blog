<template>
  <h3 class="prose-h3">
    <slot />
  </h3>
</template>

<script setup>
// No props needed for basic heading
</script>

<style scoped>
.prose-h3 {
  color: var(--color-heading);
  font-size: 1.75rem;
  font-weight: 600;
  line-height: 1.3;
  margin: 1.5rem 0 1rem;
}
</style>
