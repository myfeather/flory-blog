<template>
  <blockquote class="prose-blockquote">
    <slot />
  </blockquote>
</template>

<script setup>
// No props needed for basic blockquote
</script>

<style scoped>
.prose-blockquote {
  color: var(--color-quote-text);
  border-left: 4px solid var(--color-quote-border);
  padding: 0.5em 1em;
  margin: 1em 0;
  background: var(--color-background-alt);
  border-radius: 1em;
}
</style>
