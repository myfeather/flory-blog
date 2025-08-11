import floryBlogConfig from "./flory.config";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-08-09',
  devtools: { enabled: true },
  components: [
    { path: "~/components/foliageUIKit", prefix: "Foliage" },
    { path: "~/components/floryUI", prefix: "Flory" },
    "~/components",
  ],
  css: ["~/assets/main.css"],
  modules: ['@nuxt/content', "@nuxt/icon"],
  app: {
    head: {
      htmlAttrs: {
        lang: floryBlogConfig.language,
      },
      script: [
      ],
      meta: [
        { charset: "utf-8" },
        {
          name: "author",
          content: `${floryBlogConfig.author.name} <${floryBlogConfig.author.email}>`,
        },
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: floryBlogConfig.favicon },
      ],
    },
    // TODO 在这个bug被修复以后添加动画，详见 https://nuxt.com.cn/docs/getting-started/transitions#%E5%B7%B2%E7%9F%A5%E9%97%AE%E9%A2%98
    // pageTransition: { name: 'page', mode: 'out-in' },
    // layoutTransition: { name: 'layout', mode: 'out-in' }
  },
})