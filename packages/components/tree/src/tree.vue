<template>
    <div :class="bem.b()">
        <cz-tree-node
            v-for="node in flattenTree"
            :key="node.key"
            :node="node"
            :expanded="isExpanded(node)"
            :loadingKeys="loadingKeysRef"
            :selectedKeys="selectedKeysRef"
            @select="handleSelected"
            @toggle="toggleExpanded"
        >
        </cz-tree-node>
    </div>
</template>

<script setup lang="ts">
import { createNameSpace } from '@czui/utils/create'
import { computed, ref, watch } from 'vue'
import { TreeNode, TreeOption, treeProps, Key, treeEmits } from './tree'
import CzTreeNode from './treeNode.vue'
defineOptions({
    name: 'cz-tree'
})
const bem = createNameSpace('tree')

const props = defineProps(treeProps)
// console.log(props)

const tree = ref<TreeNode[]>([])

function createOptions(key: string, label: string, children: string) {
    return {
        getKey(node: TreeOption) {
            return node[key] as string
        },
        getLabel(node: TreeOption) {
            return node[label] as string
        },
        getChildren(node: TreeOption) {
            return node[children] as TreeOption[]
        }
    }
}

const treeOptions = createOptions(props.keyField, props.labelField, props.childrenField)

function createTree(data: TreeOption[], parent: TreeNode | null = null) {
    function traversal(data: TreeOption[], parent: TreeNode | null = null) {
        return data.map(node => {
            const children = treeOptions.getChildren(node) || []
            const treeNode: TreeNode = {
                key: treeOptions.getKey(node),
                label: treeOptions.getLabel(node),
                children: [],
                rawNode: node,
                level: parent ? parent.level + 1 : 0,
                isLeaf: node.isLeaf ?? children.length == 0
            }

            if (children.length > 0) {
                treeNode.children = traversal(children, treeNode)
            }

            return treeNode
        })
    }
    const result: TreeNode[] = traversal(data, parent)

    return result
}

watch(
    props.data,
    (data: TreeOption[]) => {
        tree.value = createTree(data)
        // console.log(tree.value)
    },
    { immediate: true }
)

const expendedKeysSet = ref(new Set(props.defaultExpandedKeys))
const flattenTree = computed(() => {
    let expendedKeys = expendedKeysSet.value
    let flattenNodes: TreeNode[] = []
    const nodes = tree.value || []
    const stack: TreeNode[] = []

    for (let i = nodes.length - 1; i >= 0; --i) {
        stack.push(nodes[i])
    }

    while (stack.length) {
        const node = stack.pop()
        if (!node) {
            continue
        }
        flattenNodes.push(node)
        if (expendedKeys.has(node.key)) {
            const children = node.children
            if (children) {
                for (let i = node.children.length - 1; i >= 0; --i) {
                    stack.push(node.children[i])
                }
            }
        }
    }
    return flattenNodes
})

// console.log(flattenTree.value)

function isExpanded(node: TreeNode) {
    return expendedKeysSet.value.has(node.key)
}

function collapse(node: TreeNode) {
    expendedKeysSet.value.delete(node.key)
}

function expanded(node: TreeNode) {
    expendedKeysSet.value.add(node.key)
    triggerLoading(node)
}

const loadingKeysRef = ref(new Set<Key>())

function triggerLoading(node: TreeNode) {
    if (!node.children.length && !node.isLeaf) {
        const loadingKeys = loadingKeysRef.value
        if (!loadingKeys.has(node.key)) {
            loadingKeys.add(node.key)
            const onLoad = props.onLoad
            if (onLoad) {
                onLoad(node.rawNode).then(children => {
                    node.rawNode.children = children
                    node.children = createTree(children, node)
                    loadingKeys.delete(node.key)
                })
            }
        }
    }
}

function toggleExpanded(node: TreeNode) {
    if (expendedKeysSet.value.has(node.key)) {
        collapse(node)
    } else {
        expanded(node)
    }
}

// Selected Node
const emits = defineEmits(treeEmits)
const selectedKeysRef = ref<Key[]>([])

watch(
    () => props.selectedKeys,
    value => {
        if (value) {
            selectedKeysRef.value = value
            /* console.log(value) */
        }
    },
    {
        immediate: true
    }
)

function handleSelected(node: TreeNode) {
    let keys = Array.from(selectedKeysRef.value)

    if (!props.selectable) {
        return
    }

    if (props.multiple) {
        const index = keys.findIndex(item => item === node.key)

        if (index > -1) {
            keys.splice(index, 1)
        } else {
            keys.push(node.key)
        }
    } else {
        if (keys.includes(node.key)) {
            keys = []
        } else {
            keys = [node.key]
        }
    }
    emits('update:selectedKeys', keys)
}
</script>
