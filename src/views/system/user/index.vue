<script setup lang="tsx">
import type { TableProps, TableRowData, TreeProps } from 'tdesign-vue-next';
import type { QTableProps, QTableToolbarFilterParams } from '@/types';
import { deptTree, listUser, deleteUser, exportUser, resetPwd } from '@/apis/system';
import { useFullscreenLoading } from '@/stores';
import { getOperationColumnWidth, generatePassword } from '@/utils';
import { Page } from '@/layouts/standard';
import CreateDialog from './dialogs/Create.vue';

const fullscreenLoading = useFullscreenLoading();

const createDialogRef = ref();
const deptId = ref();
const deptIdTree = ref();
const tableData = ref();

const operations: QTableProps['operations'] = [
  { value: 'edit', icon: 'edit', label: '修改' },
  { value: 'delete', icon: 'delete', label: '删除', theme: 'danger', popconfirm: { content: '确定删除此条数据？' } },
  { value: 'resetPwd', icon: 'secured', label: '重置密码', popconfirm: { content: '确定重置此用户密码？' } },
];
const columns: QTableProps['columns'] = [
  { colKey: 'row-select', type: 'multiple', fixed: 'left' },
  { title: '用户名称', colKey: 'userName', minWidth: 200, toolbarFilter: { type: 'input' } },
  { title: '用户昵称', colKey: 'nickName', minWidth: 200 },
  { title: '部门名称', colKey: 'dept.deptName', minWidth: 200 },
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
    fixed: 'right',
  },
];

const onDeptIdActive: TreeProps['onActive'] = async (value) => {
  deptId.value = value[0];
  pagination.pageNum = 1;
  await onHandle('refresh');
};

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
      fullscreenLoading.show();
      try {
        const { rows, total } = await listUser({
          deptId: deptId.value,
          pageNum: pagination.pageNum,
          pageSize: pagination.pageSize,
          ...queryParams.value,
        });
        pagination.total = total || 0;
        tableData.value = rows;
      } catch {
      } finally {
        fullscreenLoading.hide();
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
        fullscreenLoading.show();
        try {
          const { msg } = await deleteUser(row.userId);
          MessagePlugin.success(msg);
        } catch {
        } finally {
          fullscreenLoading.hide();
        }
      } else {
        const DialogInstance = DialogPlugin.confirm({
          header: '批量删除',
          body: `确定删除选中的 ${selectedRowKeys.value?.length} 条数据？`,
          confirmBtn: { content: '删除', theme: 'danger' },
          onConfirm: async () => {
            fullscreenLoading.show();
            try {
              const { msg } = await deleteUser((selectedRowKeys.value || []).join(','));
              MessagePlugin.success(msg);
              await onHandle('refresh');
              DialogInstance.hide();
            } catch {
            } finally {
              fullscreenLoading.hide();
            }
          },
          onClosed: () => DialogInstance.destroy(),
        });
      }
      break;

    case 'resetPwd': {
      fullscreenLoading.show();
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
        fullscreenLoading.hide();
      }
      break;
    }
  }
};

const fileExport: QTableProps['fileExport'] = {
  api: () => {
    return exportUser({
      deptId: deptId.value,
      pageNum: pagination.pageNum,
      pageSize: pagination.pageSize,
      ...queryParams.value,
    });
  },
};

const fileImport = () => {
  console.log('file-import'); // TODO
};

onMounted(async () => {
  fullscreenLoading.show();
  try {
    deptIdTree.value = (await deptTree()).data;
  } catch {
  } finally {
    await onHandle('refresh');
    fullscreenLoading.hide();
  }
});
</script>

<template>
  <Page class="flex">
    <div class="w-52 border-r border-neutral-200">
      <q-tree :data="deptIdTree" :expand-level="1" :keys="{ value: 'id' }" @active="onDeptIdActive" activable filter hover />
    </div>
    <q-table
      v-model:pagination="pagination"
      :columns="columns"
      :data="tableData"
      :file-export="fileExport"
      :file-import="fileImport"
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

    <CreateDialog @confirm="onHandle('refresh')" ref="createDialogRef" />
  </Page>
</template>
