<script setup lang="tsx">
import type { TableRowData } from 'tdesign-vue-next';
import type { QTableProps } from '@/components/types';
import { listUser } from '@/apis/system';
import { useLoading } from '@/hooks';
import { getHandleColWidth } from '@/utils';
import Page from '@/layouts/standard/Page.vue';

const { showFullscreenLoading, hideFullscreenLoading } = useLoading();

const tableData = ref();
const handles: QTableProps['handles'] = [
  { value: 'edit', icon: 'edit', label: '修改' },
  { value: 'delete', icon: 'delete', label: '删除', theme: 'danger' },
  { value: 'resetPassword', icon: 'secured', label: '重置密码' },
  { value: 'assignRole', icon: 'user-add', label: '分配角色' },
];
const columns: QTableProps['columns'] = [
  { title: '用户名称', colKey: 'userName', width: 200, _topFilter: { type: 'input' } },
  { title: '用户昵称', colKey: 'nickName', width: 200 },
  { title: '部门名称', colKey: 'dept.deptName' },
  { title: '手机号码', colKey: 'phonenumber', width: 200, _topFilter: { type: 'input' } },
  {
    title: '状态',
    colKey: 'status',
    cell: (_, { row }) => <q-table-tag-col value={row.status} dictType="sys_normal_disable" themes={['success', 'danger']} />,
    width: 100,
    _topFilter: { type: 'select', dictType: 'sys_normal_disable' },
  },
  { title: '创建时间', colKey: 'createTime', width: 200 },
  {
    title: '操作',
    cell: (_, { row }) => <q-table-handle-col handles={handles} onHandle={(value: string) => onHandle(value, row)} />,
    width: getHandleColWidth(handles),
  },
];

const onHandle = (value: string, row: TableRowData) => {
  console.log(value);
  console.log(row);
};

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
