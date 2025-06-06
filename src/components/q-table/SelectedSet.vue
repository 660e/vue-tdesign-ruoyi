<script setup lang="ts">
import type { TableRowData } from 'tdesign-vue-next';
import type { QTableProps } from '@/types';

const visible = ref(false);

const show = (columns: QTableProps['columns'], data: TableRowData[]) => {
  console.log(columns);
  console.log(data);

  visible.value = true;
};

defineExpose({ show });
</script>

<template>
  <t-dialog v-model:visible="visible" header="已选数据" width="1000px">
    <div>Lorem ipsum dolor sit amet.</div>
  </t-dialog>
</template>
