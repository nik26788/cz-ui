<template>
    <div :class="bem.b()">
        <div :class="bem.e('content')" :style="{ paddingLeft: `${node.level * 16}px` }" @click="handleToggle(node)">
            <span :class="[bem.e('expand-icon'), bem.is('leaf', node.isLeaf), { expanded: expanded && !node.isLeaf }]">
                <cz-icon size="20">
                    <Loading v-if="isLoading" />
                    <Switcher v-else />
                </cz-icon>
            </span>
            <span>{{ node?.label }}</span>
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
</script>
