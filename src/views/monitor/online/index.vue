<script setup lang="tsx">
import type { TableRowData } from 'tdesign-vue-next';
import type { QTableProps, QTableTopFilterQueryCondition } from '@/components/types';
import { listOnline } from '@/apis/monitor';
import { useLoading } from '@/hooks';
import { getHandleColWidth } from '@/utils';
import dayjs from 'dayjs';
import Page from '@/layouts/standard/Page.vue';

const { showFullscreenLoading, hideFullscreenLoading } = useLoading();

const tableData = ref();
const handles: QTableProps['handles'] = [{ value: 'logout', icon: 'logout', label: '强制下线' }];
const columns: QTableProps['columns'] = [
  { title: '会话编号', colKey: 'tokenId', width: 400 },
  { title: '用户名称', colKey: 'userName', width: 200, _topFilter: { type: 'input' } },
  { title: '部门名称', colKey: 'deptName', width: 200 },
  { title: 'IP地址', colKey: 'ipaddr', width: 200, _topFilter: { type: 'input' } },
  { title: '登录地点', colKey: 'loginLocation', width: 200 },
  { title: '浏览器', colKey: 'browser', width: 200 },
  { title: '操作系统', colKey: 'os', width: 200 },
  { title: '登录时间', colKey: 'loginTime', cell: (_, { row }) => dayjs(row.loginTime).format('YYYY-MM-DD HH:mm:ss'), width: 200 },
  {
    title: '操作',
    colKey: 'handles',
    cell: (_, { row }) => <q-table-handle-col handles={handles} onHandle={(value: string) => onHandle(value, row)} />,
    width: getHandleColWidth(handles),
    fixed: 'right',
  },
];

const condition = ref<QTableTopFilterQueryCondition>({});
const onRefresh = (value: QTableTopFilterQueryCondition) => {
  condition.value = value;
  onHandle('refresh');
};

const onHandle = async (value: string, row?: TableRowData) => {
  console.log(value);
  console.log(row);

  switch (value) {
    case 'refresh': {
      showFullscreenLoading();
      try {
        const { rows } = await listOnline(condition.value);
        tableData.value = rows;
      } catch {
      } finally {
        hideFullscreenLoading();
      }
      break;
    }
  }
};

onMounted(async () => await onHandle('refresh'));
</script>

<template>
  <Page>
    <q-table :columns="columns" :data="tableData" @refresh="onRefresh" />
  </Page>
</template>
