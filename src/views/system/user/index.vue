<script setup lang="tsx">
import type { PageInfo, TableRowData } from 'tdesign-vue-next';
import type { QTableProps, QTableTopFilterQueryCondition } from '@/components/types';
import { listUser, deleteUser } from '@/apis/system';
import { useLoading } from '@/hooks';
import { getOperationColumnWidth } from '@/utils';
import Page from '@/layouts/standard/Page.vue';
import CreateDialog from './dialogs/create.vue';

const { showFullscreenLoading, hideFullscreenLoading } = useLoading();

const createDialogRef = ref();
const tableData = ref();

const operations: QTableProps['operations'] = [
  { value: 'edit', icon: 'edit', label: '修改' },
  { value: 'delete', icon: 'delete', label: '删除', theme: 'danger', popconfirm: { content: '确定删除此条数据？' } },
  { value: 'resetPassword', icon: 'secured', label: '重置密码' },
  { value: 'assignRoles', icon: 'user-add', label: '分配角色' },
];
const columns: QTableProps['columns'] = [
  { title: '用户名称', colKey: 'userName', width: 200, _topFilter: { type: 'input' } },
  { title: '用户昵称', colKey: 'nickName', width: 200 },
  { title: '部门名称', colKey: 'dept.deptName' },
  { title: '手机号码', colKey: 'phonenumber', width: 200, _topFilter: { type: 'input' } },
  {
    title: '状态',
    colKey: 'status',
    cell: (_, { row }) => <q-table-tag-col value={row.status} dict="sys_normal_disable" themes={['success', 'danger']} />,
    width: 100,
    _topFilter: { type: 'select', dict: 'sys_normal_disable' },
  },
  { title: '创建时间', colKey: 'createTime', width: 200 },
  {
    title: '操作',
    colKey: 'operation',
    cell: (_, { row }) => <q-table-operation-col operations={operations} onHandle={(value: string) => onHandle(value, row)} />,
    width: getOperationColumnWidth(operations),
  },
];
const pagination = reactive<QTableProps['pagination']>({ pageNum: 1, pageSize: 10, total: 0 });
const onPaginationChange = (pageInfo: PageInfo) => {
  pagination.pageNum = pageInfo.current;
  pagination.pageSize = pageInfo.pageSize;
  onHandle('refresh');
};

const queryCondition = ref<QTableTopFilterQueryCondition>({});
const onRefresh = (value: QTableTopFilterQueryCondition) => {
  queryCondition.value = value;
  onHandle('refresh');
};

const onHandle = async (value: string, row?: TableRowData) => {
  switch (value) {
    case 'refresh':
      showFullscreenLoading();
      try {
        const { rows, total } = await listUser({
          pageNum: pagination.pageNum,
          pageSize: pagination.pageSize,
          ...queryCondition.value,
        });
        pagination.total = total || 0;
        tableData.value = rows;
      } catch {
      } finally {
        hideFullscreenLoading();
      }
      break;

    case 'create':
      createDialogRef.value.show();
      break;

    case 'edit':
      createDialogRef.value.show(row);
      break;

    case 'delete':
      showFullscreenLoading();
      try {
        const { msg } = await deleteUser(row?.userId);
        MessagePlugin.success(msg);
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
    <q-table
      v-model:pagination="pagination"
      :columns="columns"
      :data="tableData"
      :file-export="onHandle"
      :file-import="onHandle"
      @pagination-change="onPaginationChange"
      @refresh="onRefresh"
    >
      <template #topContent>
        <t-button @click="onHandle('create')">
          <template #icon><t-icon name="add" /></template><span>新增</span>
        </t-button>
        <t-button theme="danger">
          <template #icon><t-icon name="delete" /></template><span>删除</span>
        </t-button>
      </template>
    </q-table>

    <CreateDialog ref="createDialogRef" />
  </Page>
</template>
