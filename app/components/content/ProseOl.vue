<template>
  <ol class="prose-ol">
    <slot />
  </ol>
</template>

<script setup>
// No props needed for basic ordered list
</script>

<style scoped>
.prose-ol {
  color: var(--color-text);
  list-style-type: decimal;
  padding-left: 1.5em;
  margin: 1em 0;
}

.prose-ol ::slotted(li) {
  margin: 0.5em 0;
}
</style>
