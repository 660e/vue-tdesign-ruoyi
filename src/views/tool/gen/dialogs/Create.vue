<script setup lang="ts">
import type { TableProps } from 'tdesign-vue-next';
import type { QTableProps, QTableToolbarFilterParams } from '@/types';
import { listTable, importTable } from '@/apis/tool';
import { useLoadingStore } from '@/stores';

const { confirm } = defineProps<{ confirm: () => Promise<void> }>();
const loadingStore = useLoadingStore();

const visible = ref(false);
const tableData = ref();

const columns: QTableProps['columns'] = [
  { colKey: 'row-select', type: 'multiple', fixed: 'left' },
  { title: '表名称', colKey: 'tableName', toolbarFilter: { type: 'input' } },
  { title: '表描述', colKey: 'tableComment', toolbarFilter: { type: 'input' } },
  { title: '创建时间', colKey: 'createTime', width: 200 },
  { title: '更新时间', colKey: 'updateTime', width: 200 },
];

const pagination = reactive<QTableProps['pagination']>({ pageNum: 1, pageSize: 10, total: 0 });
const onPageChange: TableProps['onPageChange'] = async (pageInfo) => {
  pagination.pageNum = pageInfo.current;
  pagination.pageSize = pageInfo.pageSize;
  await refresh();
};

const queryParams = ref<QTableToolbarFilterParams>({});
const refresh = async () => {
  loadingStore.show();
  try {
    const { rows, total } = await listTable({
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
};

const selectedRowKeys = ref<TableProps['selectedRowKeys']>([]);
const onSelectChange: TableProps['onSelectChange'] = (value) => {
  selectedRowKeys.value = value;
};

const show = async () => {
  await refresh();
  visible.value = true;
};

const onConfirm = async () => {
  if (!selectedRowKeys.value?.length) return;
  loadingStore.show();
  try {
  } catch {
    const { msg } = await importTable(selectedRowKeys.value.join(','));
    await confirm();
    MessagePlugin.success(msg);
    selectedRowKeys.value = [];
    visible.value = false;
  } finally {
    loadingStore.hide();
  }
};

defineExpose({ show });
</script>

<template>
  <t-dialog v-model:visible="visible" :on-confirm="onConfirm" header="新增" placement="center" width="900">
    <div>
      <q-table
        v-model:pagination="pagination"
        v-model:selected-row-keys="selectedRowKeys"
        :columns="columns"
        :data="tableData"
        @page-change="onPageChange"
        @select-change="onSelectChange"
        row-key="tableName"
      />
    </div>
  </t-dialog>
</template>
