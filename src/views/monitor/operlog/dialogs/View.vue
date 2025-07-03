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
    <t-descriptions :column="1" :label-style="{ width: '110px' }" size="small" bordered>
      <t-descriptions-item label="日志编号">{{ activeRowData?.operId }}</t-descriptions-item>
      <t-descriptions-item label="系统模块">{{ activeRowData?.title }}</t-descriptions-item>
      <t-descriptions-item label="请求地址">{{ activeRowData?.operUrl }}</t-descriptions-item>
      <t-descriptions-item label="请求方式">{{ activeRowData?.requestMethod }}</t-descriptions-item>
      <t-descriptions-item label="操作方法">{{ activeRowData?.method }}</t-descriptions-item>
      <t-descriptions-item label="请求参数">{{ activeRowData?.operParam }}</t-descriptions-item>
      <t-descriptions-item label="返回参数">{{ activeRowData?.jsonResult }}</t-descriptions-item>
      <t-descriptions-item label="操作状态">{{ useDict('sys_common_status', activeRowData?.status) }}</t-descriptions-item>
      <t-descriptions-item label="操作日期">{{ activeRowData?.operTime }}</t-descriptions-item>
      <t-descriptions-item label="消耗时间">{{ activeRowData?.costTime }}ms</t-descriptions-item>
    </t-descriptions>
  </t-dialog>
</template>
