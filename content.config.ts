// NuxtContent配置collections文档 | https://content.nuxt.com/docs/collections/define
import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    articles: defineCollection({
      type: 'page',
      source: {
        include: '**/*.md',
        exclude: ['**/draft/**', '**/draft'],
      },
      // 自定义字段
      schema: z.object({
        createTime: z.string().time().optional(),
        updateTime: z.string().time().optional(),
        collection: z.string(),
        author: z.array(z.number()),
        theme: z.object({}).optional(),
      })
    })
  }
})
