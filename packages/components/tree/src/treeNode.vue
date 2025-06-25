<template>
    <div :class="bem.b()">
        <div
            :class="bem.e('content')"
            :style="{ paddingLeft: `${node.level * 16}px` }"
            @click="handleToggle(node)"
        >
            <span
                :class="[
                    bem.e('expand-icon'),
                    bem.is('leaf', node.isLeaf),
                    { expanded: expanded && !node.isLeaf }
                ]"
            >
                <cz-icon size="20">
                    <Switcher />
                </cz-icon>
            </span>
            <span>{{ node.label }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { createNameSpace } from '@czui/utils/create'
import { treeNodeProps, treeNodeEmits, TreeNode } from './tree'
import CzIcon from '@czui/components/icon'
import Switcher from './icon/Switcher'

const props = defineProps(treeNodeProps)

const emits = defineEmits(treeNodeEmits)

const bem = createNameSpace('tree-node')

function handleToggle(node: TreeNode) {
    emits('toggle', node)
}
</script>
