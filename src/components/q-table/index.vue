<script setup lang="ts">
import type { QTableProps } from '../types';
import { useToggleHeight } from '@/hooks';
import Operation from './Operation.vue';
import TopFilter from './TopFilter.vue';

defineOptions({ inheritAttrs: false });
defineProps<{
  hideHeader?: boolean;
  fileImport?: () => void;
  fileExport?: () => void;
  pagination?: QTableProps['pagination'];
}>();

const attrs = useAttrs();
const columns = attrs.columns as QTableProps['columns'];

const topFilterRef = ref();
const topFilterVisible = ref(true);
useToggleHeight(topFilterRef, topFilterVisible);
</script>

<template>
  <div class="h-full flex flex-col">
    <div ref="topFilterRef">
      <TopFilter v-show="topFilterVisible" :columns="columns" />
    </div>

    <div v-if="!hideHeader" class="px-4 pt-4 flex gap-2">
      <slot name="header"></slot>
      <div class="flex-1"></div>
      <Operation @data-search="topFilterVisible = !topFilterVisible" />
    </div>

    <div class="flex-1 overflow-auto mt-4 border-t border-neutral-200">
      <t-table cell-empty-content="-" class="h-full" height="100%" row-key="id" v-bind:="$attrs" hover />
    </div>

    <div v-if="fileImport || fileExport || pagination" class="p-4 flex gap-2">
      <t-button v-if="fileImport" @click="fileImport()" theme="default">
        <template #icon><t-icon name="file-import" /></template><span>导入</span>
      </t-button>
      <t-button v-if="fileExport" @click="fileExport()" theme="default">
        <template #icon><t-icon name="file-export" /></template><span>导出</span>
      </t-button>
      <t-pagination :total="pagination?.total" class="flex-1" show-jumper />
    </div>
  </div>
</template>
