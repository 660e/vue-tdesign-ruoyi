<script setup lang="ts">
import type { TableRowData } from 'tdesign-vue-next';
import type { QTableProps } from '@/types';

const visible = ref(false);
const th = ref();
const td = ref();

const show = (columns: QTableProps['columns'], data: TableRowData[]) => {
  th.value = columns;
  td.value = data;
  visible.value = true;
};

defineExpose({ show });
</script>

<template>
  <t-dialog v-model:visible="visible" header="已选数据" width="1000px">
    <div class="max-h-[50vh]">
      <pre>{{ th }}</pre>
      <pre>{{ td }}</pre>
    </div>
  </t-dialog>
</template>
