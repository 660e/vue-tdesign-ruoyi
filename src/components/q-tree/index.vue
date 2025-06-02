<script setup lang="ts">
import type { InputProps, TreeProps } from 'tdesign-vue-next';

defineOptions({ inheritAttrs: false });

const treeFilter = ref<TreeProps['filter']>();
const onChange: InputProps['onChange'] = (value) => {
  treeFilter.value = value ? (node) => (node.data.label as string).indexOf(value as string) >= 0 : undefined;
};
</script>

<template>
  <div class="w-full p-4">
    <t-input @change="onChange" class="w-full mb-1" clearable>
      <template #prefix-icon><t-icon name="search" /></template>
    </t-input>
    <t-tree v-bind="$attrs" :filter="treeFilter" line />
  </div>
</template>
