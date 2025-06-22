import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: 'CZUI',
    description: 'cz-ui组件库',
    themeConfig: {
        lastUpdated: '最近更新时间',
        docsDir: 'docs',
        footer: {
            message: 'Released under the MIT License.',
            copyright: 'Copyright © 2025-present cz-ui'
        },
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            // { text: 'Home', link: '/' },
            { text: '指南', link: '/guide/installation' },
            { text: '组件', link: '/component/icon' }
        ],

        sidebar: [
            {
                text: '指南',
                items: [
                    { text: '安装', link: '/guide/installation' },
                    { text: '快速开始', link: '/guide/quick-start' }
                ]
            },
            {
                text: '组件',
                items: [{ text: 'Icon', link: '/component/icon' }]
            }
        ],

        socialLinks: [
            { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
        ]
    }
})
