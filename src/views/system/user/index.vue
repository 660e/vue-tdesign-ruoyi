<script setup lang="tsx">
import type { QTableProps } from '@/components/types';
import { listUser } from '@/apis/system';
import { useLoading, useTableCell } from '@/hooks';

import Page from '@/layouts/standard/Page.vue';

const { showFullscreenLoading, hideFullscreenLoading } = useLoading();
const { tagCell } = useTableCell();

const tableData = ref();
const columns: QTableProps['columns'] = [
  { title: '用户名称', colKey: 'userName', width: 200, _filter: true },
  { title: '用户昵称', colKey: 'nickName', width: 200 },
  { title: '部门', colKey: 'dept.deptName' },
  { title: '手机号码', colKey: 'phonenumber', width: 200 },
  { title: '状态', cell: (_, { row }) => tagCell(row.status, ['success', 'danger'], 'sys_normal_disable'), width: 100 },
  { title: '创建时间', colKey: 'createTime', width: 200 },
  {
    title: '操作',
    cell: () => {
      return (
        <div class="flex gap-2">
          <t-link theme="primary">修改</t-link>
          <t-link theme="danger">删除</t-link>
          <t-link theme="primary">重置密码</t-link>
          <t-link theme="primary">分配角色</t-link>
        </div>
      );
    },
    width: 240,
  },
];

onMounted(async () => {
  showFullscreenLoading();

  try {
    const { rows } = await listUser();

    tableData.value = rows;
  } catch {
  } finally {
    hideFullscreenLoading();
  }
});
</script>

<template>
  <Page>
    <q-table :columns="columns" :data="tableData">
      <template #header>
        <t-button>
          <template #icon><t-icon name="add" /></template><span>新增</span>
        </t-button>
        <t-button theme="danger">
          <template #icon><t-icon name="delete" /></template><span>删除</span>
        </t-button>
      </template>
    </q-table>
  </Page>
</template>
