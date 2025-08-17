import floryBlogConfig from "./flory.config";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '1999-01-01',
  devtools: { enabled: true },
  components: [
    { path: "~/components/foliageUIKit", prefix: "Foliage" },
    { path: "~/components/floryUI", prefix: "Flory" },
    "~/components",
  ],
  css: ["~/assets/main.css"],
  content: {
    build: {
      markdown: {
        highlight: {
          theme: {
            // Default theme (same as single string)
            default: 'github-light',
            // Theme used if `html.dark`
            dark: 'github-dark',
            // Theme used if `html.sepia`
            sepia: 'monokai'
          },
           langs: ['json', 'js', 'ts', 'html', 'css', 'vue', 'shell', 'mdc', 'md', 'yaml', 'sql', 'swift']
        }
      }
    }
  },
  modules: ['@nuxt/content', "@nuxt/icon"],
  app: {
    head: {
      htmlAttrs: {
        lang: floryBlogConfig.language,
      },
      charset: 'utf-16',
      viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
      meta: [
        {
          name: "author",
          content: `${floryBlogConfig.author.name} <${floryBlogConfig.author.email}>`,
        },
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: floryBlogConfig.favicon },
      ],
    },
  },
})