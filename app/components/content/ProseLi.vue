<template>
  <li class="prose-li">
    <slot />
  </li>
</template>

<script setup>
// No props needed for basic list item
</script>

<style scoped>
.prose-li {
  color: var(--color-text);
  margin: 0.5em 0;
}
</style>
