<template>
  <div class="foliage-button" @click="handleClick">
    <component
      :is="linkComponent"
      v-if="to"
      :href="isExternalLink ? to : undefined"
      :to="!isExternalLink ? to : undefined"
      class="link"
      :target="isExternalLink ? '_blank' : undefined"
      :rel="isExternalLink ? 'noopener noreferrer' : undefined"
      @click.stop
    >
      <slot />
    </component>
    <slot v-else />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

const props = defineProps<{
  to?: string
  onClick?: (event: MouseEvent) => void
}>()

const isNuxt = typeof window !== 'undefined' && '__NUXT__' in window
const isExternalLink = computed(() => !!props.to && /^(https?:)?\/\//.test(props.to))
const linkComponent = computed(() => {
  if (isExternalLink.value) return 'a'
  return isNuxt ? 'NuxtLink' : RouterLink
})

const handleClick = (event: MouseEvent) => {
  props.onClick?.(event)
}
</script>

<style scoped>
.foliage-button {
  background-color: var(--color-button-bg);
  color: var(--color-button-text);
}

.foliage-button a, .foliage-button p, .foliage-button ins, .foliage-button span {
  color: var(--color-button-text);
}

.foliage-button:hover {
  background-color: var(--color-button-hover);
}

.foliage-button a:hover{
text-decoration: none;
}
</style>
