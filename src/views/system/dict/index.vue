<script setup lang="ts">
import type { TableRowData } from 'tdesign-vue-next';
import type { AppSystemDictKey } from '@/types';
import { listDictType, deleteDictType } from '@/apis/system';
import { useDict, useHandleDelete } from '@/hooks';
import { Page } from '@/layouts/standard';
import { useLoadingStore } from '@/stores';
// import CreateDialog from './dialogs/Create.vue';

const loadingStore = useLoadingStore();
// const createDialogRef = ref();
const listData = ref();

const onHandle = async (value: string) => {
  switch (value) {
    case 'refresh':
      loadingStore.show();
      try {
        const { rows } = await listDictType({ pageNum: 1, pageSize: 9999 });
        listData.value = rows;
      } catch {
      } finally {
        loadingStore.hide();
      }
      break;

    case 'create':
      // Logic to open create dialog
      break;

    case 'edit':
      // Logic to edit the selected item
      break;

    case 'delete':
      // Logic to delete the selected item
      break;
  }
};

onMounted(async () => await onHandle('refresh'));
</script>

<template>
  <Page class="flex">
    <div class="w-80 flex flex-col border-r border-neutral-200">
      <div class="p-4 border-b border-neutral-200">
        <t-button>新增</t-button>
      </div>
      <div class="flex-1 overflow-y-auto pb-16">
        <pre>{{ listData }}</pre>
      </div>
    </div>
    <div class="flex-1 flex flex-col">
      <div class="p-4 border-b border-neutral-200">
        <t-button>新增</t-button>
      </div>
      <div class="flex-1 overflow-y-auto pb-16">
        <div class="h-[1000px]"></div>
      </div>
    </div>
  </Page>
</template>
