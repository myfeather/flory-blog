<template>
  <a :href="href" class="prose-a">
    <slot />
  </a>
</template>

<script setup>
defineProps({
  href: {
    type: String,
    required: true
  }
})
</script>

<style scoped>
.prose-a {
  color: var(--color-link);
  text-decoration: none;
  transition: color 0.2s ease;
}

.prose-a:hover {
  color: var(--color-link-hover);
}
</style>
