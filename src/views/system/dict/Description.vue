<script setup lang="ts">
import type { TableRowData } from 'tdesign-vue-next';
import { listDictData } from '@/apis/system';
import { useLoadingStore } from '@/stores';

const { activeRowData } = defineProps<{ activeRowData: TableRowData }>();
const loadingStore = useLoadingStore();
const tableData = ref();

const refresh = async () => {
  loadingStore.show();
  try {
    const { rows } = await listDictData({ pageNum: 1, pageSize: 9999, dictType: activeRowData.dictType });
    tableData.value = rows;
  } catch {
  } finally {
    loadingStore.hide();
  }
};

watch(
  () => activeRowData.dictType,
  async () => await refresh(),
);

onMounted(async () => await refresh());
</script>

<template>
  <div class="flex-1 overflow-y-auto p-4">
    <pre>{{ tableData }}</pre>
  </div>
</template>
