<script setup lang="ts">
import type { TableRowData } from 'tdesign-vue-next';
import { getTable } from '@/apis/tool';
import { useLoadingStore } from '@/stores';

const loadingStore = useLoadingStore();
const visible = ref(false);
const codeData = ref();

const show = async (row: TableRowData) => {
  loadingStore.show();
  try {
    codeData.value = (await getTable(row.tableId)).data;
    visible.value = true;
  } catch {
  } finally {
    loadingStore.hide();
  }
};

const onClosed = () => {
  codeData.value = undefined;
};

defineExpose({ show });
</script>

<template>
  <t-dialog v-model:visible="visible" :confirm-btn="null" @closed="onClosed" cancel-btn="关闭" header="预览" placement="center" width="900">
    <pre>{{ codeData }}</pre>
  </t-dialog>
</template>
