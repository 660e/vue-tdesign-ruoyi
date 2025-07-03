<script setup lang="ts">
import type { TableRowData } from 'tdesign-vue-next';
import type { AppUnknownRecord } from '@/types';
import { getTable } from '@/apis/tool';
import { useLoadingStore } from '@/stores';

const loadingStore = useLoadingStore();
const visible = ref(false);
const tab = ref();
const codeData = ref<AppUnknownRecord>();

const show = async (row: TableRowData) => {
  loadingStore.show();
  try {
    const { data } = await getTable(row.tableId);
    tab.value = Object.keys(data!)[0];
    codeData.value = data;
    visible.value = true;
  } catch {
  } finally {
    loadingStore.hide();
  }
};

const onConfirm = () => {
  navigator.clipboard
    .writeText(codeData.value?.[tab.value] as string)
    .then(() => MessagePlugin.success('代码已复制到剪贴板'))
    .catch(() => MessagePlugin.error('复制失败，请手动复制'));
};

defineExpose({ show });
</script>

<template>
  <t-drawer v-model:visible="visible" :confirm-btn="{ content: '复制', theme: 'success' }" @confirm="onConfirm" cancel-btn="关闭" size="1200">
    <t-tabs v-model="tab" class="h-full flex flex-col">
      <t-tab-panel v-for="(value, key) in codeData" :label="key.match(/\/([^\/]+)\.vm$/)![1]" :value="key" class="h-full overflow-auto" :key="key">
        <div class="p-4">
          <pre>{{ value }}</pre>
        </div>
      </t-tab-panel>
    </t-tabs>
  </t-drawer>
</template>

<style scoped>
.t-tabs :deep(.t-tabs__content) {
  flex: 1;
}
</style>
