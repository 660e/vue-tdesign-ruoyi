<script setup lang="ts">
import type { TableRowData } from 'tdesign-vue-next';

const visible = ref(false);

const show = (row?: TableRowData) => {
  visible.value = true;

  console.log(row);
};

defineExpose({ show });
</script>

<template>
  <t-dialog v-model:visible="visible" header="对话框标题">
    <div>Lorem ipsum dolor sit amet.</div>
  </t-dialog>
</template>
