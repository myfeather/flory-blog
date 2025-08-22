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
import { useSearch } from '@/utils/search';
import { ref, watch } from 'vue';

// 分页相关
const currentPage = ref(1);
const perPage = 10;
const totalPages = ref(1);

// 搜索相关
const searchValue = ref('');
const { searchResults, performSearch } = useSearch();

// 处理搜索
watch(() => searchValue.value, async (query) => {
    if (!query) {
        searchResults.value = []
        return
    }
    await performSearch(query);
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
