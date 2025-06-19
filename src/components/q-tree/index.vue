<script setup lang="ts">
import type { InputProps, TreeKeysType, TreeProps } from 'tdesign-vue-next';

defineOptions({ inheritAttrs: false });
defineProps<{ filter?: boolean }>();

const attrs = useAttrs() as { keys?: TreeKeysType };
const treeFilter = ref<TreeProps['filter']>();

const onChange: InputProps['onChange'] = (value) => {
  treeFilter.value = value ? (node) => String(node.data[attrs.keys?.label || 'label']).indexOf(value as string) >= 0 : undefined;
};
</script>

<template>
  <div class="h-full flex flex-col">
    <div class="p-4 pb-2">
      <t-input v-if="filter" @change="onChange" clearable>
        <template #prefix-icon><t-icon name="search" /></template>
      </t-input>
    </div>
    <div class="flex-1 overflow-y-auto px-4">
      <t-tree v-bind="$attrs" :filter="treeFilter" line />
    </div>
  </div>
</template>
