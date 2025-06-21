<script setup lang="tsx">
import type { TableProps, TableRowData } from 'tdesign-vue-next';
import type { QTableProps, QTableToolbarFilterParams } from '@/types';
import { listConfig, deleteConfig, exportConfig } from '@/apis/system';
import { useHandleDelete } from '@/hooks';
import { Page } from '@/layouts/standard';
import { useLoadingStore } from '@/stores';
import { getOperationColumnWidth } from '@/utils';
import CreateDialog from './dialogs/Create.vue';

const loadingStore = useLoadingStore();
const createDialogRef = ref();
const tableData = ref();

const operations: QTableProps['operations'] = [
  { value: 'edit', icon: 'edit', label: '修改' },
  { value: 'delete', icon: 'delete', label: '删除', theme: 'danger', popconfirm: { content: '确定删除此条数据？' } },
];
const columns: QTableProps['columns'] = [
  { colKey: 'row-select', type: 'multiple', fixed: 'left' },
  { title: '参数名称', colKey: 'configName', minWidth: 200, toolbarFilter: { type: 'input' } },
  { title: '参数键名', colKey: 'configKey', minWidth: 200, toolbarFilter: { type: 'input' } },
  { title: '参数键值', colKey: 'configValue', minWidth: 200 },
  {
    title: '系统内置',
    colKey: 'configType',
    cell: (_, { row }) => <q-table-tag-col value={row.configType} dict="sys_yes_no" themes={['primary', 'warning']} />,
    width: 100,
    toolbarFilter: { type: 'select', dict: 'sys_yes_no' },
  },
  { title: '创建时间', colKey: 'createTime', width: 200 },
  {
    title: '操作',
    colKey: 'operation',
    cell: (_, { row }) => <q-table-operation-col operations={operations} handle={(value: string) => onHandle(value, row)} />,
    width: getOperationColumnWidth(operations),
    fixed: 'right',
  },
];

const pagination = reactive<QTableProps['pagination']>({ pageNum: 1, pageSize: 10, total: 0 });
const onPageChange: TableProps['onPageChange'] = async (pageInfo) => {
  pagination.pageNum = pageInfo.current;
  pagination.pageSize = pageInfo.pageSize;
  await onHandle('refresh');
};

const queryParams = ref<QTableToolbarFilterParams>({});
const refreshTable: QTableProps['refreshTable'] = async (value) => {
  queryParams.value = value;
  await onHandle('refresh');
};

const selectedRowKeys = ref<TableProps['selectedRowKeys']>([]);
const onSelectChange: TableProps['onSelectChange'] = (value) => {
  selectedRowKeys.value = value;
};

const onHandle = async (value: string, row?: TableRowData) => {
  switch (value) {
    case 'refresh':
      loadingStore.show();
      try {
        const { rows, total } = await listConfig({
          pageNum: pagination.pageNum,
          pageSize: pagination.pageSize,
          ...queryParams.value,
        });
        pagination.total = total || 0;
        tableData.value = rows;
      } catch {
      } finally {
        loadingStore.hide();
      }
      break;

    case 'create':
      createDialogRef.value.show();
      break;

    case 'edit':
      createDialogRef.value.show(row);
      break;

    case 'delete':
      if (row) {
        loadingStore.show();
        try {
          const { msg } = await deleteConfig(row.configId);
          MessagePlugin.success(msg);
          await onHandle('refresh');
        } catch {
        } finally {
          loadingStore.hide();
        }
      } else {
        const success = await useHandleDelete(() => deleteConfig((selectedRowKeys.value || []).join(',')), selectedRowKeys.value?.length);
        if (!success) return;
        await onHandle('refresh');
      }
      break;
  }
};

const fileExport: QTableProps['fileExport'] = {
  api: () => {
    return exportConfig({
      pageNum: pagination.pageNum,
      pageSize: pagination.pageSize,
      ...queryParams.value,
    });
  },
};

onMounted(async () => await onHandle('refresh'));
</script>

<template>
  <Page>
    <q-table
      v-model:pagination="pagination"
      :columns="columns"
      :data="tableData"
      :file-export="fileExport"
      :refresh-table="refreshTable"
      @page-change="onPageChange"
      @select-change="onSelectChange"
      row-key="configId"
    >
      <template #topContent>
        <t-button @click="onHandle('create')">
          <template #icon><t-icon name="add" /></template><span>新增</span>
        </t-button>
        <t-button :disabled="selectedRowKeys?.length === 0" @click="onHandle('delete')" theme="danger">
          <template #icon><t-icon name="delete" /></template><span>删除</span>
        </t-button>
      </template>
    </q-table>

    <CreateDialog :confirm="() => onHandle('refresh')" ref="createDialogRef" />
  </Page>
</template>
