<template>
  <component :is="linkComponent" v-bind="linkProps" class="author-card-wrapper">
    <div class="author-card">
      <div class="author-avatar">
        <span>{{ author.name.charAt(0) }}</span>
      </div>
      <div class="author-info">
        <h3 class="author-name">{{ author.name }}</h3>
        <p class="author-desc">{{ author.desc }}</p>
      </div>
    </div>
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  author: {
    id: number
    name: string
    desc: string
  }
}>()

// 检测Nuxt环境
const isNuxt = computed(() => {
  if (process.env.NODE_ENV === 'server') return true
  return typeof window !== 'undefined' && (
    '__NUXT__' in window ||
    document.querySelector('#__nuxt') !== null
  )
})

const linkComponent = computed(() => 
  isNuxt.value ? resolveComponent('NuxtLink') : resolveComponent('RouterLink')
)

const linkProps = computed(() => ({
  to: `/author/${props.author.id}`,
  noPrefetch: true
}))
</script>

<style scoped>
.author-card-wrapper {
  text-decoration: none;
  color: inherit;
  display: block;
}

.author-card {
  display: flex;
  gap: 1rem;
  align-items: center;
  background: var(--color-card-bg);
  border: 1px solid var(--color-border);
  border-radius: 16px;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  user-select: none;
}

.author-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.author-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--color-primary);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  font-weight: bold;
}

.author-info {
  flex: 1;
}

.author-name {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 0.25rem;
}

.author-desc {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  line-height: 1.5;
  margin: 0;
}
</style>
