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
const tableData = ref();
const activeRowData = ref();

const onHandle = async (value: string) => {
  switch (value) {
    case 'refresh':
      loadingStore.show();
      try {
        const { rows } = await listDictType({ pageNum: 1, pageSize: 9999 });
        tableData.value = rows;
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
      <div class="p-4 flex gap-2 border-b border-neutral-200">
        <t-input class="flex-1" clearable>
          <template #prefix-icon><t-icon name="search" /></template>
        </t-input>
        <t-button @click="onHandle('create')">
          <template #icon><t-icon name="add" /></template><span>新增</span>
        </t-button>
      </div>
      <div class="flex-1 overflow-y-auto pb-16">
        <t-list split>
          <t-list-item
            v-for="row in tableData"
            :style="{ backgroundColor: row.dictType === activeRowData?.dictType ? 'var(--td-brand-color-1)' : '' }"
            @click="activeRowData = row"
            class="cursor-pointer duration-200 hover:bg-neutral-100"
            :key="row.deptId"
          >
            <div class="flex-1 flex items-center gap-2">
              <span>{{ row.dictName }}</span>
              <span class="flex-1"></span>
              <t-tag size="small" variant="light-outline">{{ row.dictType }}</t-tag>
              <t-tag v-if="row.status === '1'" size="small" theme="danger" variant="light-outline">{{ useDict('sys_normal_disable', '1') }}</t-tag>
              <b
                :style="{ backgroundColor: 'var(--td-brand-color-7)', height: row.dictType === activeRowData?.dictType ? '100%' : '0' }"
                class="absolute top-0 right-0 w-1 duration-200"
              ></b>
            </div>
          </t-list-item>
        </t-list>
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
