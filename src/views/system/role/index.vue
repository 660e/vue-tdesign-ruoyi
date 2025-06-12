<script setup lang="tsx">
import type { TableRowData } from 'tdesign-vue-next';
import { listRole, deleteRole } from '@/apis/system';
import { useHandleDelete } from '@/hooks';
import { Page } from '@/layouts/standard';
import { useLoadingStore } from '@/stores';
import CreateDialog from './dialogs/Create.vue';
import Description from './Description.vue';

const loadingStore = useLoadingStore();
const createDialogRef = ref();
const currentRowData = ref();
const listData = ref();

const onHandle = async (value: string, row?: TableRowData) => {
  switch (value) {
    case 'refresh':
      loadingStore.show();
      try {
        const { rows } = await listRole({
          pageNum: 1,
          pageSize: 9999,
        });
        listData.value = rows;
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
      const success = await useHandleDelete(() => deleteRole(row?.roleId), row?.roleName);
      if (!success) return;
      await onHandle('refresh');
      break;
    }
  }
};

onMounted(async () => {
  await onHandle('refresh');
  currentRowData.value = listData.value.find((e: TableRowData) => e.roleId === 1);
});
</script>

<template>
  <Page class="flex">
    <div class="w-80 flex flex-col border-r border-neutral-200">
      <div class="p-4 flex gap-2 border-b border-neutral-200">
        <t-button @click="onHandle('create')">
          <template #icon><t-icon name="add" /></template><span>新增</span>
        </t-button>
        <div class="flex-1"></div>
        <t-radio-group default-value="1" variant="default-filled">
          <t-radio-button value="1">
            <div class="flex items-center gap-1"><span>序号</span><t-icon name="arrow-down" /></div>
          </t-radio-button>
          <t-radio-button value="2">
            <div class="flex items-center gap-1"><span>状态</span><t-icon name="arrow-down" /></div>
          </t-radio-button>
        </t-radio-group>
      </div>
      <div class="flex-1 overflow-y-auto">
        <t-list size="small" split>
          <t-list-item
            v-for="row in listData"
            :style="{ backgroundColor: row.roleId === currentRowData?.roleId ? 'var(--td-brand-color-light)' : '' }"
            @click="currentRowData = row"
            class="cursor-pointer duration-200 hover:bg-neutral-100"
            :key="row.roleId"
          >
            <div class="flex-1 flex items-center gap-2">
              <span class="w-8 overflow-x-hidden font-mono text-right">{{ row.roleSort.toString().padStart(3, 0) }}</span>
              <span>{{ row.roleName }}（{{ row.roleKey }}）</span>
              <span class="flex-1"></span>
              <q-table-tag-col :themes="['success', 'danger']" :value="row.status" dict="sys_normal_disable" />
              <t-icon name="chevron-right" />
            </div>
          </t-list-item>
        </t-list>
      </div>
    </div>

    <Description v-if="currentRowData" :row="currentRowData" @handle="onHandle" />
    <CreateDialog @confirm="onHandle('refresh')" ref="createDialogRef" />
  </Page>
</template>
