<template>
  <ul class="prose-ul">
    <slot />
  </ul>
</template>

<script setup>
// No props needed for basic unordered list
</script>

<style scoped>
.prose-ul {
  color: var(--color-text);
  list-style-type: disc;
  padding-left: 1.5em;
  margin: 1em 0;
}

.prose-ul ::slotted(li) {
  margin: 0.5em 0;
}
</style>
