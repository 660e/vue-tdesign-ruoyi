<script setup lang="tsx">
import type { TableProps, TableRowData } from 'tdesign-vue-next';
import type { QTableProps, QTableToolbarFilterParams } from '@/types';
import { deptTree, listUser, deleteUser, resetPwd } from '@/apis/system';
import { useLoading } from '@/hooks';
import { getOperationColumnWidth, generatePassword } from '@/utils';
import { Page } from '@/layouts/standard';
import CreateDialog from './dialogs/Create.vue';

const { showFullscreenLoading, hideFullscreenLoading } = useLoading();

const createDialogRef = ref();
const tableData = ref();
const toolbarFilterOptions = reactive<QTableProps['toolbarFilterOptions']>({ treeSelect: {} });

const operations: QTableProps['operations'] = [
  { value: 'edit', icon: 'edit', label: '修改' },
  { value: 'delete', icon: 'delete', label: '删除', theme: 'danger', popconfirm: { content: '确定删除此条数据？', theme: 'danger' } },
  { value: 'resetPwd', icon: 'secured', label: '重置密码', popconfirm: { content: '确定重置此用户密码？', theme: 'warning' } },
  { value: 'assignRoles', icon: 'user-add', label: '分配角色' },
];
const columns: QTableProps['columns'] = [
  { colKey: 'row-select', type: 'multiple' },
  { title: '部门名称', colKey: 'deptId', toolbarFilter: { type: 'tree-select', implicit: true, keys: { value: 'id' } } },
  { title: '用户名称', colKey: 'userName', width: 200, toolbarFilter: { type: 'input' } },
  { title: '用户昵称', colKey: 'nickName', width: 200 },
  { title: '部门名称', colKey: 'dept.deptName' },
  { title: '手机号码', colKey: 'phonenumber', width: 200, toolbarFilter: { type: 'input' } },
  {
    title: '状态',
    colKey: 'status',
    cell: (_, { row }) => <q-table-tag-col value={row.status} dict="sys_normal_disable" themes={['success', 'danger']} />,
    width: 100,
    toolbarFilter: { type: 'select', dict: 'sys_normal_disable' },
  },
  { title: '创建时间', colKey: 'createTime', width: 200, toolbarFilter: { type: 'date-range', keys: { start: 'beginTime', end: 'endTime' } } },
  {
    title: '操作',
    colKey: 'operation',
    cell: (_, { row }) => <q-table-operation-col operations={operations} onHandle={(value: string) => onHandle(value, row)} />,
    width: getOperationColumnWidth(operations),
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
      showFullscreenLoading();
      try {
        const { rows, total } = await listUser({
          pageNum: pagination.pageNum,
          pageSize: pagination.pageSize,
          ...queryParams.value,
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
      if (row) {
        showFullscreenLoading();
        try {
          const { msg } = await deleteUser(row.userId);
          MessagePlugin.success(msg);
        } catch {
        } finally {
          hideFullscreenLoading();
        }
      } else {
        const DialogInstance = DialogPlugin.confirm({
          header: '批量删除',
          body: `确定删除选中的 ${selectedRowKeys.value?.length} 条数据？`,
          confirmBtn: { content: '删除', theme: 'danger' },
          onConfirm: async () => {
            showFullscreenLoading();
            try {
              const { msg } = await deleteUser((selectedRowKeys.value || []).join(','));
              MessagePlugin.success(msg);
              await onHandle('refresh');
              DialogInstance.hide();
            } catch {
            } finally {
              hideFullscreenLoading();
            }
          },
          onClosed: () => DialogInstance.destroy(),
        });
      }
      break;

    case 'resetPwd': {
      showFullscreenLoading();
      const password = generatePassword();
      try {
        const { code } = await resetPwd(row?.userId, password);
        if (code) {
          const DialogInstance = DialogPlugin({
            header: '新密码',
            body: password,
            cancelBtn: null,
            confirmBtn: { content: '复制密码', theme: 'success' },
            onConfirm: () => {
              navigator.clipboard
                .writeText(password)
                .then(() => MessagePlugin.success('密码已复制到剪贴板'))
                .catch(() => MessagePlugin.error('复制失败，请手动复制'));
            },
            onClosed: () => DialogInstance.destroy(),
          });
        }
      } catch {
      } finally {
        hideFullscreenLoading();
      }
      break;
    }
  }
};

onMounted(async () => {
  showFullscreenLoading();
  try {
    const { data } = await deptTree();
    if (toolbarFilterOptions.treeSelect) {
      toolbarFilterOptions.treeSelect.deptId = data;
    }
  } catch {
  } finally {
    await onHandle('refresh');
    hideFullscreenLoading();
  }
});
</script>

<template>
  <Page>
    <q-table
      v-model:pagination="pagination"
      :columns="columns"
      :data="tableData"
      :file-export="onHandle"
      :file-import="onHandle"
      :toolbar-filter-options="toolbarFilterOptions"
      @page-change="onPageChange"
      @refresh="onRefresh"
      @select-change="onSelectChange"
      row-key="userId"
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

    <CreateDialog ref="createDialogRef" />
  </Page>
</template>
