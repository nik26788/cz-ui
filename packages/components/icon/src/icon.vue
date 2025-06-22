<template>
  <i :class="bem.b()" :style="style">
    <slot></slot>
  </i>
</template>

<script setup lang="ts">
import { createNameSpace } from '@czui/utils/create';
import { computed } from 'vue';
import { iconProps } from './icon';

defineOptions({
  name: 'cz-icon',
});

const bem = createNameSpace('icon');
const props = defineProps(iconProps);

const style = computed(() => {
  console.log(props);
  if (!props.size && !props.color) return {};
  return {
    ...(props.size ? { 'font-size': props.size } : {}),
    ...(props.color ? { color: props.color } : {}),
  };
});
</script>

