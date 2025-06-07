<script setup lang="ts">
import type { TableRowData } from 'tdesign-vue-next';
import type { QTableProps } from '@/types';

const emit = defineEmits<{ remove: [value: number | string] }>();
const visible = ref(false);
const rowKey = ref();
const tableColumns = ref();
const tableData = ref();

const show = (key: string, columns: QTableProps['columns'], data: TableRowData[]) => {
  rowKey.value = key;
  tableColumns.value = structuredClone(columns);
  tableColumns.value.unshift({ colKey: key, title: 'ID', width: 100 });
  tableColumns.value.push({ colKey: 'operation', title: '操作', align: 'right', width: 100 });
  tableData.value = data;

  visible.value = true;
};

const remove = (id: number | string) => {
  tableData.value = tableData.value.filter((e: TableRowData) => e[rowKey.value] !== id);
  emit('remove', id);
};

defineExpose({ show });
</script>

<template>
  <t-dialog v-model:visible="visible" :footer="false" header="已选数据" placement="center" width="1000px">
    <div class="border-t border-neutral-200">
      <t-table :columns="tableColumns" :data="tableData" :row-key="rowKey" height="60vh" size="small">
        <template #operation="{ row }">
          <t-icon @click="remove(row[rowKey])" class="clickable-danger" name="delete" />
        </template>
      </t-table>
    </div>
  </t-dialog>
</template>
