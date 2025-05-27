<script setup lang="tsx">
import type { PageInfo, TableRowData } from 'tdesign-vue-next';
import type { QTableProps, QTableTopFilterCondition } from '@/components/types';
import { listUser } from '@/apis/system';
import { getHandleColWidth } from '@/utils';
import Page from '@/layouts/standard/Page.vue';

const loading = ref(false);
const tableData = ref();
const handles: QTableProps['handles'] = [
  { value: 'edit', icon: 'edit', label: '修改' },
  { value: 'delete', icon: 'delete', label: '删除', theme: 'danger' },
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
const pagination = reactive<QTableProps['pagination']>({ pageNum: 1, pageSize: 10, total: 0 });
const onPaginationChange = (pageInfo: PageInfo) => {
  pagination.pageNum = pageInfo.current;
  pagination.pageSize = pageInfo.pageSize;
  onHandle('refresh');
};

const condition = ref<QTableTopFilterCondition>({});
const onRefresh = (value: QTableTopFilterCondition) => {
  condition.value = value;
  onHandle('refresh');
};

const onHandle = async (value: string, row?: TableRowData) => {
  console.log(value);
  console.log(row);

  switch (value) {
    case 'refresh': {
      loading.value = true;
      try {
        const { rows, total } = await listUser({
          pageNum: pagination.pageNum,
          pageSize: pagination.pageSize,
          ...condition.value,
        });
        pagination.total = total || 0;
        tableData.value = rows;
      } catch {
      } finally {
        loading.value = false;
      }
      break;
    }
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
      :loading="loading"
      @pagination-change="onPaginationChange"
      @refresh="onRefresh"
    >
      <template #topContent>
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
