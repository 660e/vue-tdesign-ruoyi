<script setup lang="ts">
import type { PageInfo, SelectOptions, TableProps, TableRowData } from 'tdesign-vue-next';
import type { QTableProps, QTableToolbarFilterParams } from '@/types';
import { useAnimateToggleHeight } from '@/hooks';
import { useLoadingStore } from '@/stores';
import ToolbarFilter from './ToolbarFilter.vue';

defineOptions({ inheritAttrs: false });

const emit = defineEmits<{
  'page-change': [value: PageInfo];
  'select-change': [selectedRowKeys: TableProps['selectedRowKeys'], options: SelectOptions<TableRowData>];
}>();
const pagination = defineModel<QTableProps['pagination']>('pagination');
const selectedRowKeys = defineModel<TableProps['selectedRowKeys']>('selectedRowKeys', { default: () => [] });
const {
  columns = [],
  fileExport,
  refreshData,
} = defineProps<{
  columns?: QTableProps['columns'];
  fileExport?: QTableProps['fileExport'];
  fileImport?: QTableProps['fileImport'];
  refreshData?: QTableProps['refreshData'];
  toolbarFilterOptions?: QTableProps['toolbarFilterOptions'];
}>();
const loadingStore = useLoadingStore();

const tableColumns = computed(() => {
  return columns.filter((column) => {
    if (column.type === 'multiple') {
      column.title = '-';
    }
    return column.colKey && !column.toolbarFilter?.implicit;
  });
});

const toolbarFilterRef = ref();
const toolbarFilterVisible = ref(true);
const toolbarFilterItems = computed(() => columns.filter((e) => e.colKey && e.toolbarFilter));
const toolbarFilterParams = ref<QTableToolbarFilterParams>({});
const onToolbarFilterParamsChange = (value: QTableToolbarFilterParams) => {
  if (pagination.value) {
    pagination.value.pageNum = 1;
  }
  toolbarFilterParams.value = structuredClone(toRaw(value));
  refreshData?.(toolbarFilterParams.value);
};
useAnimateToggleHeight({ el: toolbarFilterRef, toggle: toolbarFilterVisible });

const fileImportRef = ref();
const onFileExport = async () => {
  loadingStore.show();
  try {
    const data = await fileExport?.api();
    console.log(data); // TODO
  } catch {
  } finally {
    loadingStore.hide();
  }
};

const columnControllerVisible = ref(false);
const displayColumns = ref<TableProps['displayColumns']>(columns.filter((e) => e.colKey).map((e) => e.colKey!));

const onSelectChange: TableProps['onSelectChange'] = (value, options) => {
  selectedRowKeys.value = value;
  emit('select-change', value, options);
};
</script>

<template>
  <div class="flex-1 h-full overflow-auto flex flex-col">
    <div v-if="toolbarFilterItems.length" ref="toolbarFilterRef">
      <ToolbarFilter
        v-show="toolbarFilterVisible"
        :items="toolbarFilterItems"
        :on-change="onToolbarFilterParamsChange"
        :options="toolbarFilterOptions"
      />
    </div>

    <div v-if="$slots.topContent" class="px-4 pt-4 flex gap-2">
      <slot name="topContent"></slot>
      <div class="flex-1"></div>
      <t-tooltip v-if="refreshData" content="刷新" placement="bottom">
        <t-button @click="refreshData(toolbarFilterParams)" shape="circle" variant="outline">
          <template #icon><t-icon name="refresh" /></template>
        </t-button>
      </t-tooltip>
      <t-tooltip content="列设置" placement="bottom">
        <t-button @click="columnControllerVisible = true" shape="circle" variant="outline">
          <template #icon><t-icon name="view-column" /></template>
        </t-button>
      </t-tooltip>
      <t-tooltip v-if="toolbarFilterItems.length" content="高级搜索" placement="bottom">
        <t-button @click="toolbarFilterVisible = !toolbarFilterVisible" shape="circle" variant="outline">
          <template #icon><t-icon name="data-search" /></template>
        </t-button>
      </t-tooltip>
    </div>

    <div class="flex-1 mt-4 overflow-auto border-t border-neutral-200">
      <t-table
        v-model:column-controller-visible="columnControllerVisible"
        v-model:display-columns="displayColumns"
        :columns="tableColumns"
        :selected-row-keys="selectedRowKeys"
        @select-change="onSelectChange"
        class="h-full"
        height="100%"
        v-bind:="$attrs"
        hover
      >
        <template #cellEmptyContent>
          <span class="text-neutral-400">-</span>
        </template>
      </t-table>
    </div>

    <div v-if="fileImport || fileExport || pagination" class="p-4 flex">
      <div class="flex gap-2">
        <t-button v-if="fileImport" @click="fileImportRef.show(fileImport)" theme="default">
          <template #icon><t-icon name="file-import" /></template><span>导入</span>
        </t-button>
        <t-button v-if="fileExport" @click="onFileExport" theme="default">
          <template #icon><t-icon name="file-export" /></template><span>导出</span>
        </t-button>
        <div
          :class="{ 'mr-2': selectedRowKeys?.length === 0 }"
          :style="{ backgroundColor: selectedRowKeys?.length ? 'var(--td-brand-color-7)' : '' }"
          class="w-1 bg-neutral-200"
        ></div>
        <div v-if="selectedRowKeys?.length" :style="{ color: 'var(--td-font-gray-2)' }" class="text-sm flex items-center">
          <span>已选 {{ selectedRowKeys.length }} 条数据</span>
          <span v-if="pagination">，</span>
        </div>
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

    <q-file-import :confirm="async () => await refreshData?.(toolbarFilterParams)" ref="fileImportRef" />
  </div>
</template>

<style scoped>
.t-table :deep(tr.t-table__empty-row) {
  background-color: transparent;
}
</style>
