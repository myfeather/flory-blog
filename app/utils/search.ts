import Fuse from 'fuse.js';
import { ref } from 'vue';

export function useSearch() {
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

    async function initSearch() {
        // 获取文章数据
        const { data: articlesData } = await useAsyncData('search-articles', () => 
            queryCollection('articles')
                .select('title', 'description', 'updateTime', 'path', 'rawbody')
                .all()
                .then(articles => {
                    console.log('Raw articles data:', articles);
                    return articles.map(article => {
                        console.log(`Article "${article.title}" rawbody:`, article.rawbody);
                        return {
                            ...article,
                            content: article.rawbody || article.description || '',
                            type: 'article' as const
                        };
                    });
                })
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
            keys: [
                { name: 'title', weight: 0.5 },
                { name: 'content', weight: 0.3 },
                { name: 'description', weight: 0.2 },
                { name: 'rawbody', weight: 0.3 }
            ],
            includeScore: true,
            threshold: 0.4,
            ignoreLocation: true,
            minMatchCharLength: 2
        })
    }

    async function performSearch(query: string) {
        if (!fuse.value) {
            await initSearch();
        }

        if (fuse.value) {
            const results = fuse.value.search(query);
            searchResults.value = results.map(r => r.item);
        }
    }

    return {
        searchResults,
        performSearch
    };
}
