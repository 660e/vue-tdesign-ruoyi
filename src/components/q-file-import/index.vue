<script setup lang="ts">
import type { QTableProps } from '@/types';
import { useFullscreenLoading } from '@/stores';

const fullscreenLoading = useFullscreenLoading();
const importParams = ref<QTableProps['fileImport']>();
const visible = ref(false);

const show = (fileImport: QTableProps['fileImport']) => {
  importParams.value = fileImport;
  visible.value = true;

  console.log(importParams.value);
};

const downloadTemplate = async () => {
  fullscreenLoading.show();
  try {
    const data = await importParams.value?.template?.();
    console.log(data); // TODO
  } catch {
  } finally {
    fullscreenLoading.hide();
  }
};

defineExpose({ show });
</script>

<template>
  <t-dialog v-model:visible="visible" header="导入">
    <t-upload draggable />
    <div v-if="importParams?.template" class="flex justify-between pt-4">
      <t-link @click="downloadTemplate" theme="primary">下载模板</t-link>
      <t-checkbox>覆盖原数据</t-checkbox>
    </div>
  </t-dialog>
</template>

<style scoped>
.t-upload :deep(.t-upload__dragger) {
  width: auto;
}
</style>
