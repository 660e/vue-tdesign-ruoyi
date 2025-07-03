<script setup lang="ts">
import type { TableRowData } from 'tdesign-vue-next';
import { useDict } from '@/hooks';

const visible = ref(false);
const activeRowData = ref();

const show = (row: TableRowData) => {
  activeRowData.value = row;
  visible.value = true;
};

defineExpose({ show });
</script>

<template>
  <t-dialog v-model:visible="visible" :cancel-btn="{ content: '关闭' }" :confirm-btn="null" header="详情" placement="center" width="500">
    <pre>{{ activeRowData }}</pre>
  </t-dialog>
</template>
