<script setup lang="ts">
import type { PageInfo } from 'tdesign-vue-next';
import type { QTableProps, QTableTopFilterCondition } from '../types';
import { useToggleHeight } from '@/hooks';
import TopFilter from './TopFilter.vue';

defineOptions({ inheritAttrs: false });
defineProps<{
  fileImport?: (value: 'file-import') => void;
  fileExport?: (value: 'file-export') => void;
}>();

const emit = defineEmits<{
  'pagination-change': [value: PageInfo];
  'refresh': [value: QTableTopFilterCondition];
}>();
const pagination = defineModel<QTableProps['pagination']>('pagination');

const topFilterRef = ref();
const topFilterVisible = ref(true);
useToggleHeight(topFilterRef, topFilterVisible);

const attrs = useAttrs();
const columns = attrs.columns as QTableProps['columns'];

const condition = ref<QTableTopFilterCondition>({});
const onConditionChange = (value: QTableTopFilterCondition) => {
  condition.value = value;
  emit('refresh', value);
};
</script>

<template>
  <div class="h-full flex flex-col">
    <div ref="topFilterRef">
      <TopFilter v-show="topFilterVisible" :columns="columns" @condition-change="onConditionChange" />
    </div>

    <div class="px-4 pt-4 flex gap-2">
      <slot name="header"></slot>
      <div class="flex-1"></div>
      <t-tooltip content="刷新" placement="bottom">
        <t-button @click="$emit('refresh', condition)" shape="circle" variant="outline">
          <template #icon><t-icon name="refresh" /></template>
        </t-button>
      </t-tooltip>
      <t-tooltip content="列设置" placement="bottom">
        <t-button shape="circle" variant="outline">
          <template #icon><t-icon name="view-column" /></template>
        </t-button>
      </t-tooltip>
      <t-tooltip content="高级搜索" placement="bottom">
        <t-button @click="topFilterVisible = !topFilterVisible" shape="circle" variant="outline">
          <template #icon><t-icon name="data-search" /></template>
        </t-button>
      </t-tooltip>
    </div>

    <div class="flex-1 overflow-auto mt-4 border-t border-neutral-200">
      <t-table cell-empty-content="-" class="h-full" height="100%" row-key="id" v-bind:="$attrs" hover />
    </div>

    <div v-if="fileImport || fileExport || pagination" class="p-4 flex gap-2">
      <t-button v-if="fileImport" @click="fileImport('file-import')" theme="default">
        <template #icon><t-icon name="file-import" /></template><span>导入</span>
      </t-button>
      <t-button v-if="fileExport" @click="fileExport('file-export')" theme="default">
        <template #icon><t-icon name="file-export" /></template><span>导出</span>
      </t-button>
      <t-pagination
        v-if="pagination"
        v-model="pagination.pageNum"
        v-model:page-size="pagination.pageSize"
        :total="pagination.total"
        @change="(pageInfo) => $emit('pagination-change', pageInfo)"
        class="flex-1"
        show-jumper
      />
    </div>
  </div>
</template>
