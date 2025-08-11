<template>
  <div class="article-view">
    <div class="article-header">
      <h1>{{ page?.title }}</h1>
      <p>{{ page?.description }}</p>
    </div>
    <div class="article-container">
      <ContentRenderer v-if="page" :value="page" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useHead } from '#imports'
const route = useRoute()

const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection('articles').path(route.path).first()
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
}

.article-header {
  margin: var(--section-margin);
}
</style>