<script setup lang="ts">
import type { QTableProps } from '../types';
import Operation from './Operation.vue';
import Pagination from './Pagination.vue';
import TopFilter from './TopFilter.vue';

defineOptions({ inheritAttrs: false });

const attrs = useAttrs();
const columns = attrs.columns as QTableProps['columns'];

const topFilterVisible = ref(true);
</script>

<template>
  <div class="h-full flex flex-col">
    <TopFilter v-show="topFilterVisible" :columns="columns" />

    <div class="p-4 flex gap-2">
      <slot name="header"></slot>
      <div class="flex-1"></div>
      <Operation @data-search="topFilterVisible = !topFilterVisible" />
    </div>

    <div class="flex-1 overflow-auto border-t border-neutral-200">
      <t-table cell-empty-content="-" class="h-full" height="100%" row-key="id" v-bind:="$attrs" hover />
    </div>

    <div class="p-4 flex gap-2">
      <t-button theme="default">
        <template #icon><t-icon name="upload" /></template><span>导入</span>
      </t-button>
      <t-button theme="default">
        <template #icon><t-icon name="download" /></template><span>导出</span>
      </t-button>
      <Pagination />
    </div>
  </div>
</template>
