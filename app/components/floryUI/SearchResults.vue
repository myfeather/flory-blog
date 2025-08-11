<template>
    <div class="search-results">
        <template v-if="groupedResults.articles.length > 0">
            <h2>文章</h2>
            <FoliageCard
                v-for="item in groupedResults.articles"
                :key="item.path"
                :title="item.title"
                :subtitle="`Updated: ${item.updateTime}`"
                :desc="item.description"
                :to="item.path"
            />
        </template>

        <template v-if="groupedResults.authors.length > 0">
            <h2>作者</h2>
            <AuthorCard
                v-for="item in groupedResults.authors"
                :key="item.path"
                :author="{ id: parseInt(item.path.split('/').pop() || '0'), name: item.title, desc: item.description }"
            />
        </template>

        <template v-if="groupedResults.collections.length > 0">
            <h2>合集</h2>
            <FoliageCard
                v-for="item in groupedResults.collections"
                :key="item.path"
                :title="item.title"
                :desc="item.description"
                :to="item.path"
            />
        </template>
        <div v-if="results.length === 0" class="no-results">
            No results found for "{{ searchQuery }}"
        </div>
    </div>
</template>

<script setup lang="ts">
import FoliageCard from '@/components/foliageUIKit/Card.vue'
import AuthorCard from '@/components/floryUI/AuthorCard.vue'

const props = defineProps<{
    results: Array<{
        title: string
        description: string
        updateTime?: string
        path: string
        type: 'article' | 'collection' | 'author'
    }>
    searchQuery: string
}>()

const groupedResults = computed(() => ({
    articles: props.results.filter(item => item.type === 'article'),
    authors: props.results.filter(item => item.type === 'author'),
    collections: props.results.filter(item => item.type === 'collection')
}))
</script>

<style scoped>
.search-results {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    margin-top: 1rem;
}
.no-results {
    color: var(--color-text-muted);
    text-align: center;
    margin: 2rem 0;
}
</style>
