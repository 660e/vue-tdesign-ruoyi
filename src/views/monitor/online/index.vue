<script setup lang="tsx">
import type { TableRowData } from 'tdesign-vue-next';
import type { QTableProps, QTableToolbarFilterParams } from '@/types';
import { listOnline, forceLogout } from '@/apis/monitor';
import { Page } from '@/layouts/standard';
import { useLoadingStore } from '@/stores';
import { getOperationColumnWidth } from '@/utils';
import dayjs from 'dayjs';

const loadingStore = useLoadingStore();
const tableData = ref();

const operations: QTableProps['operations'] = [
  { value: 'logout', icon: 'logout', label: '强制下线', theme: 'danger', popconfirm: { content: '确定将此用户强制下线？' } },
];
const columns: QTableProps['columns'] = [
  { title: '会话编号', colKey: 'tokenId', minWidth: 400 },
  { title: '用户名称', colKey: 'userName', width: 200, toolbarFilter: { type: 'input' } },
  { title: '部门名称', colKey: 'deptName', width: 200 },
  { title: 'IP地址', colKey: 'ipaddr', width: 200, toolbarFilter: { type: 'input' } },
  { title: '登录地点', colKey: 'loginLocation', width: 200 },
  { title: '浏览器', colKey: 'browser', width: 200 },
  { title: '操作系统', colKey: 'os', width: 200 },
  { title: '登录时间', colKey: 'loginTime', cell: (_, { row }) => dayjs(row.loginTime).format('YYYY-MM-DD HH:mm:ss'), width: 200 },
  {
    title: '操作',
    colKey: 'operation',
    cell: (_, { row }) => <q-table-operation-col operations={operations} handle={(value: string) => onHandle(value, row)} />,
    width: getOperationColumnWidth(operations),
    fixed: 'right',
  },
];

const queryParams = ref<QTableToolbarFilterParams>({});
const refreshData: QTableProps['refreshData'] = async (value) => {
  queryParams.value = value;
  await onHandle('refresh');
};

const onHandle = async (value: string, row?: TableRowData) => {
  switch (value) {
    case 'refresh':
      loadingStore.show();
      try {
        const { rows } = await listOnline(queryParams.value);
        tableData.value = rows;
      } catch {
      } finally {
        loadingStore.hide();
      }
      break;

    case 'logout':
      loadingStore.show();
      try {
        const { msg } = await forceLogout(row?.tokenId);
        await onHandle('refresh');
        MessagePlugin.success(msg);
      } catch {
      } finally {
        loadingStore.hide();
      }
      break;
  }
};

onMounted(async () => await onHandle('refresh'));
</script>

<template>
  <Page>
    <q-table :columns="columns" :data="tableData" :refresh-data="refreshData" row-key="tokenId" />
  </Page>
</template>
