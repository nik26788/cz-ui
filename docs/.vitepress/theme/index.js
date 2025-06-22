// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import './style.css'

import CzIcon from '@czui/components/icon'
import '@czui/theme-chalk/src/index.scss'

/** @type {import('vitepress').Theme} */
export default {
    extends: DefaultTheme,
    Layout: () => {
        return h(DefaultTheme.Layout, null, {
            // https://vitepress.dev/guide/extending-default-theme#layout-slots
        })
    },
    enhanceApp({ app, router, siteData }) {
        app.use(CzIcon)
    }
}
