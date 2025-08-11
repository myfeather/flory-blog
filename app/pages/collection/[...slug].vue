<script setup lang="ts">
import FloryArticleList from '@/components/floryUI/ArticleList.vue'
import FloryPagination from '@/components/floryUI/Pagination.vue'
const route = useRoute()
const currentPage = ref(1)
const perPage = 10

const collectionPath = computed(() => 
  Array.isArray(route.params.slug) ? route.params.slug.join('/') : route.params.slug
)

import collections from '@/../configs/flory.collections.config'

const collectionInfo = computed(() => {
  const path = collectionPath.value
  const id = path?.split('/').pop() || path
  return collections.find(c => c.id === id) || { 
    name: id, 
    desc: '' 
  }
})

const collectionName = computed(() => collectionInfo.value.name)
const collectionDesc = computed(() => collectionInfo.value.desc)

// 获取文章列表
const { data: articles, pending, error, refresh } = await useAsyncData(
  `collection-articles-${collectionPath.value}-${currentPage.value}`,
  () => {
    return queryCollection('articles')
      .where('collection', '=', collectionPath.value)
      .select('title', 'description', 'updateTime', 'path')
      .order('updateTime', 'DESC')
      .skip((currentPage.value - 1) * perPage)
      .limit(perPage)
      .all()
  },
  {
    watch: [() => currentPage.value],
    immediate: true
  }
)

// 获取总文章数
const { data: totalCount } = await useAsyncData(
  `collection-count-${collectionPath.value}`,
  () => {
    return queryCollection('articles')
      .where('collection', '=', collectionPath.value)
      .count()
  }
)

const totalPages = computed(() => Math.ceil((totalCount.value || 0) / perPage))
</script>

<template>
  <div>
    <div class="hero">
      <h1>{{ collectionName }}</h1>
      <p class="subtitle">合集</p>
      <p v-if="collectionDesc" class="collection-desc">{{ collectionDesc }}</p>
    </div>
    <FloryArticleList
      :page="currentPage"
      :articles="articles"
      :pending="pending"
      :error="error"
      :total-pages="totalPages"
    />
    <FloryPagination
      v-if="totalPages > 1"
      :current-page="currentPage"
      :total-pages="totalPages"
      @page-change="(page) => currentPage = page"
    />
  </div>
</template>

<style scoped>
.hero {
    margin: var(--section-margin);
}

.subtitle {
  font-size: 1.2rem;
  color: var(--color-text-secondary);
  margin-top: 0.5rem;
}

.collection-desc {
  font-size: 1rem;
  color: var(--color-text-secondary);
  margin-top: 0.5rem;
}
</style>
