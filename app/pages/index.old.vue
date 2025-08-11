<template>
    <div>
        <div class="hero">
            <h1>{{ config.title }}</h1>
            <p>{{ config.description }}</p>
        </div>
        <div class="search-field-container">
            <FoliageSearchField v-model="searchValue" @search="onSearch" />
        </div>
        <h2>文章</h2>
        <FloryArticleList 
            :page="currentPage" 
            @update:totalPages="onUpdateTotalPages"
        />
        <FloryPagination
            v-if="totalPages > 1"
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
import { ref } from 'vue';

const currentPage = ref(1); // 页码从1开始，如需从0开始，需设置Pagination组件的startPage=0
const perPage = 10;
const searchValue = ref('');
const searchResult = ref('');

const totalPages = ref(1); // 初始化为1，确保单页时正确隐藏分页组件

function onUpdateTotalPages(value: number) {
    totalPages.value = value;
}

function onSearch() {
    currentPage.value = 1;
    searchResult.value = searchValue.value;
}
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
