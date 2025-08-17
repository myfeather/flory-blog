import floryBlogCollections from './configs/flory.collections.config'
import floryBlogLinks from './configs/flory.links.config'
import floryBlogAuthors from './configs/flory.authors.config'

//? 博客配置
const floryBlogConfig = {
    title: 'Flory 博客',
    subtitle:'',
    description: '我们都是流浪者 在同一颗星星下 做着不同的梦',
    author: {
        name: 'AFeather',
        avatar: '',
        email: '',
        url: '',
    },
    copyright: {
        abbr: 'CC BY-NC-SA 4.0',
        name: '署名-非商业性使用-相同方式共享 4.0 国际',
        url: 'https://createivecommons.org/licenses/by-nc-sa/4.0/deed.zh-hans',
    },
    favicon: '',
    language: 'zh-CN',
    timezone: 'Asia/Shanghai',
    url: 'https://aflory.com', //! TODO 填写博客地址
    highlight: {
        languages: ['json', 'js', 'ts', 'html', 'css', 'vue', 'shell', 'mdc', 'md', 'yaml', 'sql', 'swift'],
        theme: {
            // Default theme (same as single string)
            default: 'github-light',
            // Theme used if `html.dark`
            dark: 'github-dark',
            // Theme used if `html.sepia`
            sepia: 'monokai'
          },
    },
    collections: floryBlogCollections, //!勿动
    links: floryBlogLinks, //! 勿动
    authors: floryBlogAuthors, //! 勿动
}

export default floryBlogConfig