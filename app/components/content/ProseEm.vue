<template>
  <em class="prose-em">
    <slot />
  </em>
</template>

<script setup>
// No props needed for basic emphasized text
</script>

<style scoped>
.prose-em {
  font-style: italic;
  color: var(--color-text);
}
</style>
