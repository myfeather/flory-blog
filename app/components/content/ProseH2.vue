<template>
  <h2 class="prose-h2">
    <slot />
  </h2>
</template>

<script setup>
// No props needed for basic heading
</script>

<style scoped>
.prose-h2 {
  color: var(--color-heading);
  font-size: 2rem;
  font-weight: 600;
  line-height: 1.3;
  margin: 1.8rem 0 1.2rem;
}
</style>
