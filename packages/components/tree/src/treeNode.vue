<template>
    <div :class="[bem.b(), bem.is('leaf', node.isLeaf), bem.is('selected', isSelected)]">
        <div :class="[bem.e('content')]" :style="{ paddingLeft: `${node.level * 16}px` }">
            <span :class="[bem.e('expand-icon'), { expanded: expanded && !node.isLeaf }]" @click="handleToggle(node)">
                <cz-icon size="20">
                    <Loading v-if="isLoading" />
                    <Switcher v-else />
                </cz-icon>
            </span>
            <span :class="[bem.e('label')]" @click="handleSelected(node)">{{ node?.label }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import CzIcon from '@czui/components/icon'
import { createNameSpace } from '@czui/utils/create'
import { computed } from 'vue'
import Switcher from './icon/Switcher'
import Loading from './icon/Loading'
import { TreeNode, treeNodeEmits, treeNodeProps } from './tree'

const props = defineProps(treeNodeProps)

const emits = defineEmits(treeNodeEmits)

const bem = createNameSpace('tree-node')

function handleToggle(node: TreeNode) {
    emits('toggle', node)
}

const isLoading = computed(() => {
    return props.loadingKeys.has(props.node.key)
})

const isSelected = computed(() => {
    return props.selectedKeys.includes(props.node.key)
})

function handleSelected(node: TreeNode) {
    emits('select', node)
}
</script>
