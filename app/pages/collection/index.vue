<template>
    <div class="collection-header">
        <h1>集合</h1>
    </div>
    <div class="collections-list">
            <FoliageCard
                v-for="col in floryBlogCollections"
                :key="col.id"
                :title="col.name"
                :subtitle="col.desc"
                :to="`/collection/${col.id}`"
            />
    </div>
</template>

<script setup lang="ts">
import FoliageCard from '@/components/foliageUIKit/Card.vue'
import floryBlogCollections from '@@/configs/flory.collections.config'
</script>

<style scoped>
.collection-header {
    margin: var(--section-margin);
}

.collections-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
}
</style>
