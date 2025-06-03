<script setup lang="ts">
import type { QTableProps } from '@/types';

const visible = ref(false);
const importParams = ref<QTableProps['fileImport']>();

const show = (fileImport: QTableProps['fileImport']) => {
  importParams.value = fileImport;
  visible.value = true;

  console.log(importParams.value);
};

defineExpose({ show });
</script>

<template>
  <t-dialog v-model:visible="visible" header="导入">
    <t-upload draggable />
    <div class="flex justify-between pt-4">
      <t-link theme="primary">下载模板</t-link>
      <t-checkbox>覆盖原数据</t-checkbox>
    </div>
  </t-dialog>
</template>

<style scoped>
.t-upload :deep(.t-upload__dragger) {
  width: auto;
}
</style>
