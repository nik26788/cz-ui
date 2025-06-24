import { createApp } from 'vue'
import App from './App.vue'

import Icon from '@czui/components/icon'
import Tree from '@czui/components/tree'
import '@czui/theme-chalk/src/index.scss'

const plugins = [Icon, Tree]

const app = createApp(App)
plugins.forEach(plugin => app.use(plugin))

app.mount('#app')
