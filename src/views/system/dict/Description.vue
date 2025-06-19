<script setup lang="ts">
import type { TableRowData } from 'tdesign-vue-next';

const { activeRowData } = defineProps<{ activeRowData: TableRowData }>();

const refresh = async () => {
  console.log(activeRowData);
};

watch(
  () => activeRowData.dictType,
  async () => await refresh(),
);

onMounted(async () => await refresh());
</script>

<template>
  <div class="flex-1 overflow-y-auto">
    <pre>{{ activeRowData }}</pre>
  </div>
</template>
