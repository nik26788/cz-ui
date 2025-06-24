import { ExtractPropTypes, PropType } from 'vue'

type Key = string | number

export interface TreeNode extends Required<TreeOption> {
    level: number
    rawNode: TreeOption
    children: TreeNode[]
}

export interface TreeOption {
    label?: Key
    key?: Key
    children?: TreeOption[]
    isLeaf?: boolean
    [key: string]: unknown
}

export const treeProps = {
    data: {
        type: Array as PropType<TreeOption[]>,
        default: () => []
    },
    labelField: {
        type: String,
        default: 'label'
    },
    keyField: {
        type: String,
        default: 'key'
    },
    childrenField: {
        type: String,
        default: 'children'
    },
    defaultExpandedKeys: {
        type: Array as PropType<Key[]>,
        default: () => []
    }
} as const

export const treeNodeProps = {
    node: {
        type: Object as PropType<TreeNode>,
        required: true
    },
    expanded: {
        type: Boolean,
        required: true
    }
}

export type TreeNodeProps = Partial<ExtractPropTypes<typeof treeNodeProps>>
export type TreeProps = Partial<ExtractPropTypes<typeof treeProps>>
