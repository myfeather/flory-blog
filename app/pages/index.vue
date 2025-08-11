<template>
    <div>
        <div class="hero">
            <h1>{{ config.title }}</h1>
            <p>{{ config.description }}</p>
        </div>
        <div class="search-field-container">
            <FoliageSearchField v-model="searchValue" @search="onSearch" />
        </div>
        <template v-if="!searchValue">
            <h2>文章</h2>
            <FloryArticleList 
                :page="currentPage"
                @update:totalPages="onUpdateTotalPages"
            />
        </template>
        <template v-else>
            <SearchResults 
                :results="searchResults"
                :search-query="searchValue"
            />
        </template>
        <FloryPagination
            v-if="totalPages > 1 && !searchValue"
            :current-page="currentPage"
            :total-pages="totalPages"
            @page-change="(page) => currentPage = page"
        />
    </div>
</template>

<script setup lang="ts">
import config from '@@/flory.config';
import FoliageSearchField from '@/components/foliageUIKit/SearchField.vue';
import FloryPagination from '@/components/floryUI/Pagination.vue';
import SearchResults from '@/components/floryUI/SearchResults.vue';
import Fuse from 'fuse.js';
import { ref, watch } from 'vue';

// 分页相关
const currentPage = ref(1);
const perPage = 10;
const totalPages = ref(1);


// 搜索相关
const searchValue = ref('');
const fuse = ref<Fuse<any> | null>(null);
const searchResults = ref<any[]>([]);

// 定义搜索数据类型
type SearchItem = {
    title: string
    description: string
    updateTime?: string
    path: string
    content: string
    type: 'article' | 'collection' | 'author'
}

// 初始化搜索
async function initSearch() {
    // 获取文章数据
    const { data: articlesData } = await useAsyncData('search-articles', () => 
        queryCollection('articles')
            .select('title', 'description', 'updateTime', 'path')
            .all()
            .then(articles => articles.map(article => ({
                ...article,
                content: '',
                type: 'article' as const
            })))
    )

    // 获取合集数据
    const collections = await import('@@/configs/flory.collections.config').then(m => m.default)
    const collectionsData = collections.map(collection => ({
        title: collection.name,
        description: collection.desc,
        path: `/collection/${collection.id}`,
        content: collection.desc,
        type: 'collection' as const
    }))

    // 获取作者数据
    const authors = await import('@@/configs/flory.authors.config').then(m => m.default)
    const authorsData = authors.map(author => ({
        title: author.name,
        description: author.desc,
        path: `/author/${author.id}`,
        content: author.desc,
        type: 'author' as const
    }))

    // 合并所有搜索数据
    const searchData = [
        ...(articlesData.value || []),
        ...collectionsData,
        ...authorsData
    ]
    
    fuse.value = new Fuse(searchData, {
        keys: ['title', 'content', 'description'],
        includeScore: true,
        threshold: 0.4
    })
}

// 处理搜索
watch(() => searchValue.value, async (query) => {
    if (!query) {
        searchResults.value = []
        return
    }

    if (!fuse.value) {
        await initSearch()
    }

    if (fuse.value) {
        const results = fuse.value.search(query)
        searchResults.value = results.map(r => r.item)
    }
}, { immediate: true })

function onUpdateTotalPages(value: number) {
    totalPages.value = value;
}

function onSearch() {
    currentPage.value = 1;
}

// Reset page when search is cleared
watch(searchValue, (newVal) => {
    if (!newVal) {
        currentPage.value = 1
    }
})
</script>

<style scoped>
.hero {
    margin: var(--section-margin);
}
.search-field-container {
    width: 20vw;
    min-width: 20rem;
    max-width: 60rem;
    height: fit-content;
    margin-bottom: 5vh;
}


</style>
