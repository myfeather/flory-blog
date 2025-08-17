<template>
  <p class="prose-p">
    <slot />
  </p>
</template>

<script setup>
// No props needed for basic paragraph
</script>

<style scoped>
.prose-p {
  color: var(--color-text);
  line-height: 1.6;
  margin: 1em 0;
}
</style>
