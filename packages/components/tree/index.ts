import { withInstall } from '@czui/utils/with-install'
import _Tree from './src/tree.vue'

const Tree = withInstall(_Tree)

export default Tree

export * from './src/tree'
//
declare module 'vue' {
    export interface GlobalComponents {
        CzTree: typeof Tree
    }
}
