<template>
    <div class="author-header">
        <h1>作者</h1>
    </div>
    <div class="authors-list">
        <AuthorCard
            v-for="author in floryBlogAuthors"
            :key="author.id"
            :author="author"
        />
    </div>
</template>

<script setup lang="ts">
import floryBlogAuthors from '@@/configs/flory.authors.config'
import AuthorCard from '@/components/floryUI/AuthorCard.vue'
</script>

<style scoped>
.author-header {
    margin: var(--section-margin);
}

.authors-list {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    margin-top: 2rem;
}
</style>