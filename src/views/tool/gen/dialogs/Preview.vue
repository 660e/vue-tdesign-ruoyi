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
  <t-dialog v-model:visible="visible" :footer="false" @closed="onClosed" header="预览" mode="full-screen">
    <t-tabs class="h-full flex flex-col">
      <t-tab-panel class="h-full overflow-auto" label="asdf">
        <pre>{{ codeData }}</pre>
      </t-tab-panel>
    </t-tabs>
  </t-dialog>
</template>

<style scoped>
.t-tabs :deep(.t-tabs__content) {
  flex: 1;
}
</style>
