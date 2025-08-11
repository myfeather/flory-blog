import floryBlogCollections from './configs/flory.collections.config'
import floryBlogFriendlyLinks from './configs/flory.friendlylinks.config'

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
    url: '', //! TODO 填写博客地址
    githubRepo: '',
    robotsNotIndex: ['/preview', '/previews/*'],
    collections: floryBlogCollections, // !勿动
    friendlyLinks: floryBlogFriendlyLinks, //! 勿动
}

export default floryBlogConfig