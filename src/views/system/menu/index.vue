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
        const { data } = await listMenu();
        listData.value = data;
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
    <div class="w-80 flex flex-col border-r border-neutral-200">
      <div class="p-4 flex gap-2 border-b border-neutral-200">
        <t-button @click="onHandle('create')">
          <template #icon><t-icon name="add" /></template><span>新增</span>
        </t-button>
      </div>
      <div class="flex-1 overflow-y-auto">
        <t-list size="small" split>
          <t-list-item v-for="row in listData" class="cursor-pointer duration-200 hover:bg-neutral-100" :key="row.menuId">
            <div class="flex-1 flex items-center gap-2">
              <span>{{ row.menuName }}</span>
            </div>
          </t-list-item>
        </t-list>
      </div>
    </div>

    <div class="flex-1 overflow-y-auto">
      <pre>{{ listData }}</pre>
      <pre>{{ currentRowData }}</pre>
    </div>

    <CreateDialog @confirm="onHandle('refresh')" ref="createDialogRef" />
  </Page>
</template>
