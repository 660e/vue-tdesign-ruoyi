<script setup lang="ts">
import type { PageInfo, SelectOptions, TableProps, TableRowData } from 'tdesign-vue-next';
import type { QTableProps, QTableTopFilterQueryCondition } from '../types';
import { useToggleHeight } from '@/hooks';
import TopFilter from './TopFilter.vue';

defineOptions({ inheritAttrs: false });
defineProps<{
  fileImport?: (value: 'file-import') => void;
  fileExport?: (value: 'file-export') => void;
}>();

const emit = defineEmits<{
  'page-change': [value: PageInfo];
  'refresh': [value: QTableTopFilterQueryCondition];
  'select-change': [value: TableProps['selectedRowKeys'], ctx: SelectOptions<TableRowData>];
}>();
const pagination = defineModel<QTableProps['pagination']>('pagination');

const topFilterRef = ref();
const topFilterVisible = ref(true);
useToggleHeight(topFilterRef, topFilterVisible);

const attrs = useAttrs();
const columns = computed(() => (attrs.columns as QTableProps['columns']).filter((column) => column.colKey && column._topFilter));

const queryCondition = ref<QTableTopFilterQueryCondition>({});
const onQueryConditionChange = (value: QTableTopFilterQueryCondition) => {
  if (pagination.value) {
    pagination.value.pageNum = 1;
  }
  const rawValue = structuredClone(toRaw(value));
  const filtered = Object.fromEntries(Object.entries(rawValue).filter(([, v]) => v !== '' && v !== undefined));
  queryCondition.value = filtered;
  emit('refresh', queryCondition.value);
};

const columnControllerVisible = ref(false);
const displayColumns = ref<TableProps['displayColumns']>((attrs.columns as QTableProps['columns']).filter((e) => e.colKey).map((e) => e.colKey!));

const selectedRowData = ref<TableRowData[]>([]);
const onSelectChange: TableProps['onSelectChange'] = (value, ctx) => {
  selectedRowData.value = ctx.selectedRowData;
  emit('select-change', value, ctx);
};
const viewSelectedRowData = () => {
  console.log(selectedRowData.value);
};
</script>

<template>
  <div class="h-full flex flex-col">
    <div v-if="columns.length" ref="topFilterRef">
      <TopFilter v-show="topFilterVisible" :columns="columns" @query-condition-change="onQueryConditionChange" />
    </div>

    <div class="p-4 flex gap-2">
      <slot name="topContent"></slot>
      <div class="flex-1"></div>
      <t-tooltip content="刷新" placement="bottom">
        <t-button @click="$emit('refresh', queryCondition)" shape="circle" variant="outline">
          <template #icon><t-icon name="refresh" /></template>
        </t-button>
      </t-tooltip>
      <t-tooltip v-if="fileImport" content="导入" placement="bottom">
        <t-button @click="fileImport('file-import')" shape="circle" variant="outline">
          <template #icon><t-icon name="file-import" /></template>
        </t-button>
      </t-tooltip>
      <t-tooltip v-if="fileExport" content="导出" placement="bottom">
        <t-button @click="fileExport('file-export')" shape="circle" variant="outline">
          <template #icon><t-icon name="file-export" /></template>
        </t-button>
      </t-tooltip>
      <t-tooltip content="列设置" placement="bottom">
        <t-button @click="columnControllerVisible = true" shape="circle" variant="outline">
          <template #icon><t-icon name="view-column" /></template>
        </t-button>
      </t-tooltip>
      <t-tooltip v-if="columns.length" content="高级搜索" placement="bottom">
        <t-button @click="topFilterVisible = !topFilterVisible" shape="circle" variant="outline">
          <template #icon><t-icon name="data-search" /></template>
        </t-button>
      </t-tooltip>
    </div>

    <div class="flex-1 overflow-auto border-t border-neutral-200">
      <t-table
        v-model:column-controller-visible="columnControllerVisible"
        v-model:display-columns="displayColumns"
        @select-change="onSelectChange"
        class="h-full"
        height="100%"
        row-key="id"
        v-bind:="$attrs"
        hover
      >
        <template #cellEmptyContent>
          <span class="text-neutral-400">-</span>
        </template>
      </t-table>
    </div>

    <div v-if="pagination" class="p-4 flex">
      <div
        :style="{ backgroundColor: selectedRowData.length ? 'var(--td-brand-color)' : 'var(--td-bg-color-secondarycontainer)' }"
        class="w-1 mr-2"
      ></div>
      <div v-if="selectedRowData.length" :style="{ color: 'var(--td-text-color-secondary)' }" class="text-sm flex items-center">
        <t-link @click="viewSelectedRowData" theme="primary">已选 {{ selectedRowData.length }} 条数据</t-link>
        <span>，</span>
      </div>
      <t-pagination
        v-if="pagination"
        v-model="pagination.pageNum"
        v-model:page-size="pagination.pageSize"
        :total="pagination.total"
        @change="(pageInfo) => $emit('page-change', pageInfo)"
        class="flex-1"
        show-jumper
      />
    </div>
  </div>
</template>

<style scoped>
.t-table :deep(tr.t-table__empty-row) {
  background-color: transparent;
}
</style>
