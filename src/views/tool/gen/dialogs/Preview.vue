<script setup lang="ts">
import type { TableRowData } from 'tdesign-vue-next';
import { getTable } from '@/apis/tool';
import { useLoadingStore } from '@/stores';

const loadingStore = useLoadingStore();
const visible = ref(false);

const show = async (row: TableRowData) => {
  try {
    loadingStore.show();
    const { data } = await getTable(row.tableId);
    console.log(data);
    visible.value = true;
  } catch {
  } finally {
    loadingStore.hide();
  }
};

const onClosed = () => {};

const onConfirm = () => {};

defineExpose({ show });
</script>

<template>
  <t-dialog v-model:visible="visible" @closed="onClosed" @confirm="onConfirm" header="预览" placement="center" width="900" />
</template>
