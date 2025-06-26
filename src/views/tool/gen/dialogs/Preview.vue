<script setup lang="ts">
import type { TableRowData } from 'tdesign-vue-next';
import type { AppUnknownRecord } from '@/types';
import { getTable } from '@/apis/tool';
import { useLoadingStore } from '@/stores';

const loadingStore = useLoadingStore();
const visible = ref(false);
const codeData = ref<AppUnknownRecord>();

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

const onClose = () => {
  codeData.value = undefined;
};

defineExpose({ show });
</script>

<template>
  <t-drawer v-model:visible="visible" @close="onClose" size="100%">
    <t-tabs class="h-full flex flex-col">
      <t-tab-panel>
        <div class="h-[1000px]"></div>
      </t-tab-panel>
      <!-- <t-tab-panel v-for="(value, key) in codeData" :label="key" :value="key" class="h-full overflow-auto" :key="key">
        <pre>{{ value }}</pre>
      </t-tab-panel> -->
    </t-tabs>
  </t-drawer>
</template>

<style scoped>
.t-tabs :deep(.t-tabs__content) {
  flex: 1;
  height: 0;
  overflow: auto;
}
</style>
