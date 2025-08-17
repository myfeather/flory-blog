<template>
  <h1 class="prose-h1">
    <slot />
  </h1>
</template>

<script setup>
// No props needed for basic heading
</script>

<style scoped>
.prose-h1 {
  color: var(--color-heading);
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1.2;
  margin: 2rem 0 1.5rem;
}
</style>
