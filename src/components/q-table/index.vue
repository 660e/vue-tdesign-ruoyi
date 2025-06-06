<script setup lang="ts">
import type { PageInfo, SelectOptions, TableProps, TableRowData } from 'tdesign-vue-next';
import type { QTableProps, QTableToolbarFilterParams } from '@/types';
import { useAnimateToggleHeight } from '@/hooks';
import { useFullscreenLoading } from '@/stores';
import SelectedSet from './SelectedSet.vue';
import ToolbarFilter from './ToolbarFilter.vue';

defineOptions({ inheritAttrs: false });

const emit = defineEmits<{
  'page-change': [value: PageInfo];
  'refresh': [value: QTableToolbarFilterParams];
  'select-change': [selectedRowKeys: TableProps['selectedRowKeys'], options: SelectOptions<TableRowData>];
}>();
const pagination = defineModel<QTableProps['pagination']>('pagination');
const { columns = [], fileExport } = defineProps<{
  columns?: QTableProps['columns'];
  fileExport?: QTableProps['fileExport'];
  fileImport?: QTableProps['fileImport'];
  toolbarFilterOptions?: QTableProps['toolbarFilterOptions'];
}>();

const fullscreenLoading = useFullscreenLoading();

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
  emit('refresh', toolbarFilterParams.value);
};
useAnimateToggleHeight({ el: toolbarFilterRef, toggle: toolbarFilterVisible });

const fileImportRef = ref();
const onFileExport = async () => {
  fullscreenLoading.show();
  try {
    const data = await fileExport?.api();
    console.log(data); // TODO
  } catch {
  } finally {
    fullscreenLoading.hide();
  }
};

const columnControllerVisible = ref(false);
const displayColumns = ref<TableProps['displayColumns']>(columns.filter((e) => e.colKey).map((e) => e.colKey!));

const selectedRowData = ref<TableRowData[]>([]);
const onSelectChange: TableProps['onSelectChange'] = (selectedRowKeys, options) => {
  selectedRowData.value = options.selectedRowData;
  emit('select-change', selectedRowKeys, options);
};
const selectedSetRef = ref();
const viewSelectedRowData = () => {
  selectedSetRef.value.show(selectedRowData.value);
};
</script>

<template>
  <div class="flex-1 h-full overflow-auto flex flex-col">
    <div v-if="toolbarFilterItems.length" ref="toolbarFilterRef">
      <ToolbarFilter
        v-show="toolbarFilterVisible"
        :items="toolbarFilterItems"
        :options="toolbarFilterOptions"
        @change="onToolbarFilterParamsChange"
      />
    </div>

    <div class="p-4 flex gap-2">
      <slot name="topContent"></slot>
      <div class="flex-1"></div>
      <t-tooltip content="刷新" placement="bottom">
        <t-button @click="$emit('refresh', toolbarFilterParams)" shape="circle" variant="outline">
          <template #icon><t-icon name="refresh" /></template>
        </t-button>
      </t-tooltip>
      <t-tooltip v-if="fileImport" content="导入" placement="bottom">
        <t-button @click="fileImportRef.show(fileImport)" shape="circle" variant="outline">
          <template #icon><t-icon name="file-import" /></template>
        </t-button>
      </t-tooltip>
      <t-tooltip v-if="fileExport" content="导出" placement="bottom">
        <t-button @click="onFileExport" shape="circle" variant="outline">
          <template #icon><t-icon name="file-export" /></template>
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

    <div class="flex-1 overflow-auto border-t border-neutral-200">
      <t-table
        v-model:column-controller-visible="columnControllerVisible"
        v-model:display-columns="displayColumns"
        :columns="tableColumns"
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

    <q-file-import @confirm="$emit('refresh', toolbarFilterParams)" ref="fileImportRef" />
    <SelectedSet ref="selectedSetRef" />
  </div>
</template>

<style scoped>
.t-table :deep(tr.t-table__empty-row) {
  background-color: transparent;
}
</style>
