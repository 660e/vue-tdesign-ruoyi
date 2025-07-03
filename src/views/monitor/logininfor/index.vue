<script setup lang="tsx">
import type { TableProps, TableRowData } from 'tdesign-vue-next';
import type { QTableProps, QTableToolbarFilterParams } from '@/types';
import { listLogininfor, deleteOperlog, exportOperlog, clearOperlog } from '@/apis/monitor';
import { useHandleDelete } from '@/hooks';
import { Page } from '@/layouts/standard';
import { useLoadingStore } from '@/stores';
import { getOperationColumnWidth } from '@/utils';

const loadingStore = useLoadingStore();
const tableData = ref();

const operations: QTableProps['operations'] = [{ value: 'view', icon: 'browse', label: '详情' }];
const columns: QTableProps['columns'] = [
  { colKey: 'row-select', type: 'multiple', fixed: 'left' },
  { title: '访问编号', colKey: 'infoId', width: 100 },
  { title: '用户名称', colKey: 'userName', width: 200, toolbarFilter: { type: 'input' } },
  { title: '登录地址', colKey: 'ipaddr', width: 200, toolbarFilter: { type: 'input' } },
  { title: '登录地点', colKey: 'loginLocation', width: 200 },
  { title: '浏览器', colKey: 'browser', width: 200 },
  { title: '操作系统', colKey: 'os', width: 200 },
  {
    title: '登录状态',
    colKey: 'status',
    cell: (_, { row }) => <q-table-tag-col value={row.status} dict="sys_common_status" themes={['success', 'danger']} />,
    width: 100,
    toolbarFilter: { type: 'select', dict: 'sys_common_status' },
  },
  { title: '操作信息', colKey: 'msg', minWidth: 200 },
  { title: '登录日期', colKey: 'loginTime', toolbarFilter: { type: 'date-range', keys: { start: 'beginTime', end: 'endTime' } }, width: 200 },
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
        const { rows, total } = await listLogininfor({
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

    case 'delete':
      useHandleDelete(async () => {
        loadingStore.show();
        try {
          const { msg } = await deleteOperlog((selectedRowKeys.value || []).join(','));
          await onHandle('refresh');
          MessagePlugin.success(msg);
          selectedRowKeys.value = [];
          return true;
        } catch {
        } finally {
          loadingStore.hide();
        }
      }, selectedRowKeys.value?.length);
      break;

    case 'clear': {
      const DialogInstance = DialogPlugin.confirm({
        header: '清空日志',
        body: '清空所有操作日志？',
        confirmBtn: { content: '清空', theme: 'danger' },
        onConfirm: async () => {
          loadingStore.show();
          try {
            const { msg } = await clearOperlog();
            await onHandle('refresh');
            MessagePlugin.success(msg);
            DialogInstance.hide();
          } catch {
          } finally {
            loadingStore.hide();
          }
        },
        onClosed: () => DialogInstance.destroy(),
      });
      break;
    }

    case 'view':
      console.log(row);
      break;
  }
};

const fileExport: QTableProps['fileExport'] = {
  api: () => {
    return exportOperlog({
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
      v-model:selected-row-keys="selectedRowKeys"
      :columns="columns"
      :data="tableData"
      :file-export="fileExport"
      :refresh-data="refreshData"
      @page-change="onPageChange"
      @select-change="onSelectChange"
      row-key="infoId"
    >
      <template #topContent>
        <t-button :disabled="selectedRowKeys?.length === 0" @click="onHandle('delete')" theme="danger">
          <template #icon><t-icon name="delete" /></template><span>删除</span>
        </t-button>
        <t-button @click="onHandle('clear')" theme="danger">
          <template #icon><t-icon name="clear" /></template><span>清空</span>
        </t-button>
      </template>
    </q-table>
  </Page>
</template>
