<template>
  <table class="prose-table">
    <slot />
  </table>
</template>

<script setup>
// No props needed for basic table
</script>

<style scoped>
.prose-table {
  width: 100%;
  border-collapse: collapse;
  margin: 1em 0;
}

.prose-table th {
  background: var(--color-table-header-bg);
  padding: 0.75em;
  text-align: left;
}

.prose-table td {
  padding: 0.5em 0.75em;
  border-bottom: 1px solid var(--color-table-border);
}

.prose-table tr:last-child td {
  border-bottom: none;
}
</style>
