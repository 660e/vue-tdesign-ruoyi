<script setup lang="ts">
import { listTable, importTable } from '@/apis/tool';
import { useLoadingStore } from '@/stores';

const { confirm } = defineProps<{ confirm: () => Promise<void> }>();
const loadingStore = useLoadingStore();

const visible = ref(false);

const show = () => {
  console.log(listTable);
  visible.value = true;
};

const onConfirm = async () => {
  console.log(importTable);
  confirm();
  loadingStore.hide();
};

defineExpose({ show });
</script>

<template>
  <t-dialog v-model:visible="visible" :on-confirm="onConfirm" header="新增" placement="center" width="500">
    <div>Lorem ipsum dolor sit amet.</div>
  </t-dialog>
</template>
