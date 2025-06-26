<script setup lang="tsx">
import type { TableProps, TableRowData } from 'tdesign-vue-next';
import type { QTableProps, QTableToolbarFilterParams } from '@/types';
import { listGen, deleteGen, syncGen } from '@/apis/tool';
import { useHandleDelete } from '@/hooks';
import { Page } from '@/layouts/standard';
import { useLoadingStore } from '@/stores';
import { getOperationColumnWidth } from '@/utils';
import CreateDialog from './dialogs/Create.vue';

const loadingStore = useLoadingStore();
const createDialogRef = ref();
const tableData = ref();

const operations: QTableProps['operations'] = [
  { value: 'view', icon: 'browse', label: '预览' },
  { value: 'delete', icon: 'delete', label: '删除', theme: 'danger', popconfirm: { content: '确定删除此条数据？' } },
  { value: 'sync', icon: 'arrow-up-down-1', label: '同步', popconfirm: { content: '确定同步此条数据？' } },
  { value: 'code', icon: 'code', label: '生成代码' },
];
const columns: QTableProps['columns'] = [
  { colKey: 'row-select', type: 'multiple', fixed: 'left' },
  { title: '表名称', colKey: 'tableName', minWidth: 200, toolbarFilter: { type: 'input' } },
  { title: '表描述', colKey: 'tableComment', minWidth: 200, toolbarFilter: { type: 'input' } },
  { title: '实体', colKey: 'className', minWidth: 200 },
  { title: '创建时间', colKey: 'createTime', width: 200, toolbarFilter: { type: 'date-range', keys: { start: 'beginTime', end: 'endTime' } } },
  { title: '更新时间', colKey: 'updateTime', width: 200, toolbarFilter: { type: 'date-range', keys: { start: 'beginTime', end: 'endTime' } } },
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
const refreshData: QTableProps['refreshData'] = async (value) => {
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
        const { rows, total } = await listGen({
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

    case 'view':
      console.log(row);
      break;

    case 'create':
      createDialogRef.value.show();
      break;

    case 'delete':
      if (row) {
        loadingStore.show();
        try {
          const { msg } = await deleteGen(row.tableId);
          await onHandle('refresh');
          MessagePlugin.success(msg);
          selectedRowKeys.value = [];
        } catch {
        } finally {
          loadingStore.hide();
        }
      } else {
        useHandleDelete(async () => {
          loadingStore.show();
          try {
            const { msg } = await deleteGen((selectedRowKeys.value || []).join(','));
            await onHandle('refresh');
            MessagePlugin.success(msg);
            selectedRowKeys.value = [];
            return true;
          } catch {
          } finally {
            loadingStore.hide();
          }
        }, selectedRowKeys.value?.length);
      }
      break;

    case 'sync':
      if (!row) return;
      loadingStore.show();
      try {
        const { msg } = await syncGen(row.tableName);
        await onHandle('refresh');
        MessagePlugin.success(msg);
      } catch {
      } finally {
        loadingStore.hide();
      }
      break;

    case 'code':
      if (!row) return;
      console.log(row);
      break;
  }
};

onMounted(async () => await onHandle('refresh'));
</script>

<template>
  <Page>
    <q-table
      v-model:pagination="pagination"
      v-model:selected-row-keys="selectedRowKeys"
      :columns="columns"
      :data="tableData"
      :refresh-data="refreshData"
      @page-change="onPageChange"
      @select-change="onSelectChange"
      row-key="tableId"
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

    <CreateDialog :on-success="async () => await onHandle('refresh')" ref="createDialogRef" />
  </Page>
</template>
