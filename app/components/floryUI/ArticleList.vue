<template>
    <div class="article-list">

        <div v-if="pending">Loading articles...</div>
        <div v-else-if="error">Failed to load articles</div>
        <template v-else>
            <FoliageCard
                v-for="article in articles"
                :key="article.path"
                :title="article.title"
                :subtitle="`Updated: ${article.updateTime}`"
                :desc="article.description"
                :to="article.path"
            />
        </template>
    </div>
</template>

<script setup lang="ts">
import FoliageCard from '@/components/foliageUIKit/Card.vue'

const props = defineProps<{
    page: number
    articles?: any[]
    pending?: boolean
    error?: any
    totalPages?: number
    sortOrder?: 'ASC' | 'DESC'
}>()

const perPage = 10

// 使用外部传入的articles或自行获取
const internalArticles = ref<any[]>([])
const internalPending = ref(false)
const internalError = ref<any>(null)

async function fetchArticles() {
    if (!props.articles) {
        const { data, pending, error } = await useAsyncData(
            `articles-page-${props.page}-${props.sortOrder || 'DESC'}`,
            () => {
                return queryCollection('articles')
                    .select('title', 'description', 'updateTime', 'path')
                    .order('updateTime', props.sortOrder || 'DESC')
                    .skip((props.page - 1) * perPage)
                    .limit(perPage)
                    .all()
            },
            {
                watch: [() => props.page, () => props.sortOrder],
                immediate: true
            }
        )
        internalArticles.value = data.value || []
        internalPending.value = pending.value
        internalError.value = error.value
    }
}

fetchArticles()

const articles = computed(() => props.articles || internalArticles.value)
const pending = computed(() => props.pending || internalPending.value)
const error = computed(() => props.error || internalError.value)

// 仅在没有外部传入articles时获取总文章数
const { data: totalCount } = props.articles ? 
    { data: ref(0) } : 
    await useAsyncData('articles-count', () => {
        return queryCollection('articles').count()
    })

const emit = defineEmits<{
    (e: 'update:totalPages', value: number): void
}>()

// 计算总页数
const totalPages = computed(() => 
    Math.ceil((totalCount.value || 0) / perPage)
)

watch(totalPages, (value) => {
    emit('update:totalPages', value)
}, { immediate: true })
</script>

<style scoped>
.article-list {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    margin-top: 2rem;
}


</style>
