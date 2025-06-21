<script setup lang="tsx">
import type { TableProps, TableRowData } from 'tdesign-vue-next';
import type { QTableProps, QTableToolbarFilterParams } from '@/types';
import { listNotice, deleteNotice } from '@/apis/system';
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
  { title: '公告标题', colKey: 'noticeTitle', minWidth: 200, toolbarFilter: { type: 'input' } },
  { title: '创建者', colKey: 'createBy', width: 200, toolbarFilter: { type: 'input' } },
  {
    title: '公告类型',
    colKey: 'noticeType',
    cell: (_, { row }) => <q-table-tag-col value={row.noticeType} dict="sys_notice_type" themes={['warning', 'primary']} />,
    width: 100,
    toolbarFilter: { type: 'select', dict: 'sys_notice_type' },
  },
  {
    title: '状态',
    colKey: 'status',
    cell: (_, { row }) => <q-table-tag-col value={row.status} dict="sys_notice_status" themes={['success', 'danger']} />,
    width: 100,
    toolbarFilter: { type: 'select', dict: 'sys_notice_status' },
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
const onRefresh = async (value: QTableToolbarFilterParams) => {
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
        const { rows, total } = await listNotice({
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
          const { msg } = await deleteNotice(row.noticeId);
          MessagePlugin.success(msg);
          await onHandle('refresh');
        } catch {
        } finally {
          loadingStore.hide();
        }
      } else {
        const success = await useHandleDelete(() => deleteNotice((selectedRowKeys.value || []).join(',')), selectedRowKeys.value?.length);
        if (!success) return;
        await onHandle('refresh');
      }
      break;
  }
};

onMounted(async () => await onHandle('refresh'));
</script>

<template>
  <Page>
    <q-table
      v-model:pagination="pagination"
      :columns="columns"
      :data="tableData"
      @page-change="onPageChange"
      @refresh="onRefresh"
      @select-change="onSelectChange"
      row-key="noticeId"
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
