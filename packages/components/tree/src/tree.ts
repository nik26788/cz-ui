import { ExtractPropTypes, PropType } from 'vue'

export type Key = string | number

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
    },
    onLoad: {
        type: Function as PropType<(node: TreeOption) => Promise<TreeOption[]>>
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
    },
    loadingKeys: {
        type: Object as PropType<Set<Key>>,
        required: true
    }
}

export const treeNodeEmits = {
    toggle: (node: TreeNode) => node
}

export const treeEmits = {
    'update:selectedKeys': (keys: Key[]) => keys
}

export type TreeNodeProps = Required<ExtractPropTypes<typeof treeNodeProps>>
export type TreeProps = Partial<ExtractPropTypes<typeof treeProps>>
