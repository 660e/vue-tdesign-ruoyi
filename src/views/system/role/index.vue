<script setup lang="tsx">
import type { TableRowData } from 'tdesign-vue-next';
import { listRole, deleteRole } from '@/apis/system';
import { useDict, useHandleDelete } from '@/hooks';
import { Page } from '@/layouts/standard';
import { useLoadingStore } from '@/stores';
import CreateDialog from './dialogs/Create.vue';
import Description from './Description.vue';

const loadingStore = useLoadingStore();
const createDialogRef = ref();
const tableData = ref();
const activeRowData = ref();
const sortBy = ref('roleSort');

const onHandle = async (value: string, row?: TableRowData) => {
  switch (value) {
    case 'refresh':
      loadingStore.show();
      try {
        const { rows } = await listRole({ pageNum: 1, pageSize: 9999 });
        tableData.value = rows;
        activeRowData.value = rows?.find((e: TableRowData) => e.roleId === (activeRowData.value?.roleId || 1));
        onHandle('sort');
      } catch {
      } finally {
        loadingStore.hide();
      }
      break;

    case 'sort':
      (tableData.value as TableRowData[]).sort((a, b) => Number(a[sortBy.value]) - Number(b[sortBy.value]));
      break;

    case 'create':
      createDialogRef.value.show();
      break;

    case 'edit':
      createDialogRef.value.show(row);
      break;

    case 'delete': {
      const success = await useHandleDelete(() => deleteRole(row?.roleId), row?.roleName);
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
        <t-radio-group v-model="sortBy" :on-change="() => onHandle('sort')" variant="default-filled">
          <t-radio-button value="roleSort">
            <div class="flex items-center gap-1"><span>序号</span><t-icon name="arrow-down" /></div>
          </t-radio-button>
          <t-radio-button value="status">
            <div class="flex items-center gap-1"><span>状态</span><t-icon name="arrow-down" /></div>
          </t-radio-button>
        </t-radio-group>
        <div class="flex-1"></div>
        <t-button @click="onHandle('create')">
          <template #icon><t-icon name="add" /></template><span>新增</span>
        </t-button>
      </div>
      <div class="flex-1 overflow-y-auto pb-16">
        <t-list split>
          <t-list-item
            v-for="row in tableData"
            :style="{ backgroundColor: row.roleId === activeRowData?.roleId ? 'var(--td-brand-color-1)' : '' }"
            @click="activeRowData = row"
            class="cursor-pointer duration-200 hover:bg-neutral-100"
            :key="row.roleId"
          >
            <div class="flex-1 flex items-center gap-2">
              <span class="font-mono text-right">{{ row.roleSort.toString().padStart(3, 0) }}</span>
              <span>{{ row.roleName }}</span>
              <span class="flex-1"></span>
              <t-tag size="small" variant="light-outline">{{ row.roleKey }}</t-tag>
              <t-tag v-if="row.status === '1'" size="small" theme="danger" variant="light-outline">{{ useDict('sys_normal_disable', '1') }}</t-tag>
              <b
                :style="{ backgroundColor: 'var(--td-brand-color-7)', height: row.roleId === activeRowData?.roleId ? '100%' : '0' }"
                class="absolute top-0 right-0 w-1 duration-200"
              ></b>
            </div>
          </t-list-item>
        </t-list>
      </div>
    </div>

    <Description v-if="activeRowData" :active-row-data="activeRowData" :handle="onHandle" />
    <CreateDialog :confirm="() => onHandle('refresh')" ref="createDialogRef" />
  </Page>
</template>
