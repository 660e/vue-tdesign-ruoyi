<script setup lang="ts">
import type { QTableProps } from '@/types';

const visible = ref(false);

const show = (fileImport: QTableProps['fileImport']) => {
  console.log(fileImport);

  fileImport.api(123);

  visible.value = true;
};

defineExpose({ show });
</script>

<template>
  <t-dialog v-model:visible="visible" header="导入">
    <div>导入</div>
  </t-dialog>
</template>
