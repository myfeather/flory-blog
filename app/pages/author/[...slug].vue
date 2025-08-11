<script setup lang="ts">
import FloryArticleList from '@/components/floryUI/ArticleList.vue'
import FloryPagination from '@/components/floryUI/Pagination.vue'
import authors from '@/../configs/flory.authors.config'
const route = useRoute()
const currentPage = ref(1)
const perPage = 10

const authorId = computed(() => 
  Number(Array.isArray(route.params.slug) ? route.params.slug[0] : route.params.slug)
)

const authorInfo = computed(() => {
  return authors.find(a => a.id === authorId.value) || {
    name: `作者 ${authorId.value}`,
    desc: ''
  }
})

const authorName = computed(() => authorInfo.value.name)
const authorDesc = computed(() => authorInfo.value.desc)

// 获取文章列表
const { data: articles, pending, error, refresh } = await useAsyncData(
  `author-articles-${authorId.value}-${currentPage.value}`,
  () => {
    return queryCollection('articles')
      .select('title', 'description', 'updateTime', 'path')
      .where('author', 'LIKE', `%${authorId.value}%`)
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
  `author-count-${authorId.value}`,
  () => {
    return queryCollection('articles')
      .where('author', 'LIKE', `%${authorId.value}%`)
      .count()
  }
)

const totalPages = computed(() => Math.ceil((totalCount.value || 0) / perPage))
</script>

<template>
  <div>
    <div class="hero">
      <h1>{{ authorName }}</h1>
      <p v-if="authorDesc">{{ authorDesc }}</p>
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
</style>
