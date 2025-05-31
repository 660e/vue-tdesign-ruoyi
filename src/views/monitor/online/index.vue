<script setup lang="tsx">
import type { TableRowData } from 'tdesign-vue-next';
import type { QTableProps, QTableTopFilterQueryCondition } from '@/components/types';
import { listOnline } from '@/apis/monitor';
import { useLoading } from '@/hooks';
import { getOperationColumnWidth } from '@/utils';
import dayjs from 'dayjs';
import Page from '@/layouts/standard/Page.vue';

const { showFullscreenLoading, hideFullscreenLoading } = useLoading();

const tableData = ref();

const operations: QTableProps['operations'] = [{ value: 'logout', icon: 'logout', label: '强制下线' }];
const columns: QTableProps['columns'] = [
  { title: '会话编号', colKey: 'tokenId', width: 400 },
  { title: '用户名称', colKey: 'userName', width: 200, topFilter: { type: 'input' } },
  { title: '部门名称', colKey: 'deptName', width: 200 },
  { title: 'IP地址', colKey: 'ipaddr', width: 200, topFilter: { type: 'input' } },
  { title: '登录地点', colKey: 'loginLocation', width: 200 },
  { title: '浏览器', colKey: 'browser', width: 200 },
  { title: '操作系统', colKey: 'os', width: 200 },
  { title: '登录时间', colKey: 'loginTime', cell: (_, { row }) => dayjs(row.loginTime).format('YYYY-MM-DD HH:mm:ss'), width: 200 },
  {
    title: '操作',
    colKey: 'operation',
    cell: (_, { row }) => <q-table-operation-col operations={operations} onHandle={(value: string) => onHandle(value, row)} />,
    width: getOperationColumnWidth(operations),
    fixed: 'right',
  },
];

const queryCondition = ref<QTableTopFilterQueryCondition>({});
const onRefresh = async (value: QTableTopFilterQueryCondition) => {
  queryCondition.value = value;
  await onHandle('refresh');
};

const onHandle = async (value: string, row?: TableRowData) => {
  console.log(value);
  console.log(row);

  switch (value) {
    case 'refresh':
      showFullscreenLoading();
      try {
        const { rows } = await listOnline(queryCondition.value);
        tableData.value = rows;
      } catch {
      } finally {
        hideFullscreenLoading();
      }
      break;
  }
};

onMounted(async () => await onHandle('refresh'));
</script>

<template>
  <Page>
    <q-table :columns="columns" :data="tableData" @refresh="onRefresh" />
  </Page>
</template>
