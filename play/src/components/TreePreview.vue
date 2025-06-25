<script setup lang="ts">
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

const treeData = ref(createTreeData())
// console.log(JSON.stringify(treeData.value, null, 2))
</script>
<template>
    <h2>Tree</h2>
    <div>
        <cz-tree
            :data="treeData"
            :label-field="'IamLabel'"
            :default-expanded-keys="['41', '4130']"
        ></cz-tree>
    </div>
</template>
