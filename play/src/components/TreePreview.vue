<script setup lang="ts">
import { Key, TreeOption } from '@czui/components/tree'
import { ref } from 'vue'

function createTreeData(level = 4, parentKey = ''): any {
    if (!level) return []
    const arr = new Array(6 - level).fill(0)
    return arr.map((_, index: number) => {
        const key = parentKey + level + index
        return {
            IamLabel: createLabel(level),
            key,
            children: createTreeData(level - 1, key)
        }
    })
}

function createLabel(level: number) {
    if (level === 4) return 'Level 4'
    if (level === 3) return 'Level 3'
    if (level === 2) return 'Level 2'
    if (level === 1) return 'Level 1'
    return ''
}

// Lazy Load
/* function createTreeData() { */
/*     return [ */
/*         { */
/*             label: nextLabel(), */
/*             key: 1, */
/*             isLeaf: false */
/*         }, */
/*         { */
/*             label: nextLabel(), */
/*             key: 2, */
/*             isLeaf: false */
/*         } */
/*     ] */
/* } */

function nextLabel(currentLabel?: string | number | undefined) {
    if (!currentLabel) return 'Out of Tao, One is born'
    if (currentLabel === 'Out of Tao, One is born') return 'Out of One, Two'
    if (currentLabel === 'Out of One, Two') return 'Out of Two, Three'
    if (currentLabel === 'Out of Two, Three') return 'Out of Three, the created universe'
    if (currentLabel === 'Out of Three, the created universe') return 'Out of Tao, One is born'
    return ''
}

const treeData = ref(createTreeData())
// console.log(JSON.stringify(treeData.value, null, 2))

function handleLoad(node: TreeOption) {
    return new Promise<TreeOption[]>((resolve, reject) => {
        setTimeout(function () {
            resolve([
                {
                    label: nextLabel(node.label),
                    key: node.key + nextLabel(node.label),
                    isLeaf: false
                }
            ])
        }, 1000)
    })
}

const value = ref<Key[]>([])
</script>
<template>
    <h2>Tree</h2>
    <P>Selected Keys: {{ value }}</P>
    <div>
        <cz-tree
            :data="treeData"
            :label-field="'IamLabel'"
            :default-expanded-keys="['41', '4130']"
            v-model:selected-keys="value"
            selectable
            multiple
        ></cz-tree>
        <!--         <cz-tree :data="treeData" :on-load="handleLoad"></cz-tree> -->
    </div>
</template>
