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

defineExpose({ show });
</script>

<template>
  <t-drawer v-model:visible="visible" cancel-btn="关闭" confirm-btn="复制" size="1200">
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
