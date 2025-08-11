<template>
  <div class="article-view">
    <div class="article-header">
      <h1>{{ page?.title }}</h1>
      <p>{{ page?.description }}</p>
    </div>
    <div class="article-container">
      <ContentRenderer v-if="page" :value="page" />
    </div>
    <div 
      class="right-image-pattern" 
      v-if="page?.theme?.rightImage"
      :style="{
        width: `${squareSize}px`,
        height: `${squareSize}px`
      }"
    >
      <img :src="page.theme.rightImage" alt="Right pattern image" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useHead } from '#imports'
const route = useRoute()

const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection('articles').path(route.path).first()
})

const windowSize = ref({
  width: import.meta.client ? window.innerWidth : 0,
  height: import.meta.client ? window.innerHeight : 0
})

if (import.meta.client) {
  const updateWindowSize = () => {
    windowSize.value = {
      width: window.innerWidth,
      height: window.innerHeight
    }
  }
  window.addEventListener('resize', updateWindowSize)
  onBeforeUnmount(() => {
    window.removeEventListener('resize', updateWindowSize)
  })
}

const squareSize = computed(() => {
  return Math.min(windowSize.value.width, windowSize.value.height)
})

// 动态设置主题变量
watch(() => page.value?.theme, (theme: any) => {
  if (!theme) return
  
  useHead({
    style: [{
      innerHTML: `
        :root {
          --color-heading: ${theme.colorHeading};
          --color-text: ${theme.colorText};
          --color-background: ${theme.colorBackground};
          --color-navbar-bg: ${theme.colorNavbarBg};
          --color-navbar-link: ${theme.colorNavbarLink};
          --color-navbar-link-hover: ${theme.colorNavbarLinkHover};
        }
      `,
      tagPriority: 'high'
    }]
  })
}, { immediate: true })
</script>

<style lang="css" scoped>
.article-view {
  height: 100%;
  color: var(--color-text);
  background-color: transparent;
  position: relative;
}

.article-header {
  margin: var(--section-margin);
}

.right-image-pattern {
  position: absolute;
  right: 0;
  bottom: 0;
  z-index: 0;
  overflow: hidden;
  transform: translateX(10vw) translateY(20vh);
}

.right-image-pattern img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
}
</style>