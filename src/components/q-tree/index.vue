<script setup lang="ts">
import type { InputProps, TreeKeysType, TreeProps } from 'tdesign-vue-next';

defineOptions({ inheritAttrs: false });
defineProps<{ filter?: boolean }>();

const attrs = useAttrs();
const treeFilter = ref<TreeProps['filter']>();

const onChange: InputProps['onChange'] = (value) => {
  treeFilter.value = value ? (node) => String(node.data[(attrs.keys as TreeKeysType).label || 'label']).indexOf(value as string) >= 0 : undefined;
};
</script>

<template>
  <div class="w-full p-4">
    <t-input v-if="filter" @change="onChange" class="w-full mb-1" clearable>
      <template #prefix-icon><t-icon name="search" /></template>
    </t-input>
    <t-tree v-bind="$attrs" :filter="treeFilter" line />
  </div>
</template>
