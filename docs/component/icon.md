# Icon 图标

cz-ui 推荐使用 xicons 作为图表库

```bash
$ npm install @vicons/ionicons5
```

## 使用图标

-   如果你想像用例一样直接使用，你需要全局注册组件，才能够直接在项目里使用。

<script setup lang="ts">
import { ArrowDownSharp } from '@vicons/ionicons5'
</script>

<cz-icon :color="'purple'" size="20">
  <ArrowDownSharp />
</cz-icon>
<cz-icon :color="'tomato'" size="20">
  <ArrowDownSharp />
</cz-icon>
<cz-icon :color="'green'" size="20">
  <ArrowDownSharp />
</cz-icon>
<cz-icon :color="'orange'" size="20">
  <ArrowDownSharp />
</cz-icon>

```vue
<script setup lang="ts">
import { ArrowDownSharp } from '@vicons/ionicons5'
</script>
<template>
    <cz-icon>
        <ArrowDownSharp />
    </cz-icon>
</template>
```

## API

### Icon Props

| 名称  | 类型            | 默认值    | 说明     |
| ----- | --------------- | --------- | -------- |
| color | string          | undefined | 图标颜色 |
| size  | number / string | undefined | 图标大小 |
