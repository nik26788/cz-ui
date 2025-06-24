<template>
    <div :class="bem.b()">
        <div
            :class="bem.e('content')"
            :style="{ paddingLeft: `${node.level * 16}px` }"
        >
            <span
                :class="[
                    bem.e('expand-icon'),
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
import { treeNodeProps } from './tree'
import CzIcon from '@czui/components/icon'
import Switcher from './icon/Switcher'

const props = defineProps(treeNodeProps)

const bem = createNameSpace('tree-node')
</script>
