<script setup lang="tsx">
import type { TableRowData } from 'tdesign-vue-next';
import { listMenu, deleteMenu } from '@/apis/system';
import { useHandleDelete } from '@/hooks';
import { Page } from '@/layouts/standard';
import { useLoadingStore } from '@/stores';
import CreateDialog from './dialogs/Create.vue';

const loadingStore = useLoadingStore();
const createDialogRef = ref();
const listData = ref();
const currentRowData = ref();

const onHandle = async (value: string, row?: TableRowData) => {
  switch (value) {
    case 'refresh':
      loadingStore.show();
      try {
        const { rows } = await listMenu();
        listData.value = rows;
        // currentRowData.value = rows?.find((e: TableRowData) => e.menuId === (currentRowData.value?.menuId || 1));
      } catch {
      } finally {
        loadingStore.hide();
      }
      break;

    case 'create':
      createDialogRef.value.show();
      break;

    case 'edit':
      createDialogRef.value.show(row);
      break;

    case 'delete': {
      const success = await useHandleDelete(() => deleteMenu(row?.menuId), row?.menuName);
      if (!success) return;
      await onHandle('refresh');
      break;
    }
  }
};

onMounted(async () => await onHandle('refresh'));
</script>

<template>
  <Page class="flex">
    <pre>{{ currentRowData }}</pre>

    <CreateDialog @confirm="onHandle('refresh')" ref="createDialogRef" />
  </Page>
</template>
