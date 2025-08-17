<template>
  <img 
    :src="src" 
    :alt="alt" 
    class="prose-img"
    loading="lazy"
  >
</template>

<script setup>
defineProps({
  src: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    default: ''
  }
})
</script>

<style scoped>
.prose-img {
  max-width: 100%;
  height: auto;
  margin: 1em 0;
  border-radius: 4px;
}
</style>
