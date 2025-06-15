<script setup lang="tsx">
import type { TableRowData } from 'tdesign-vue-next';
import { listMenu, deleteMenu } from '@/apis/system';
import { useHandleDelete } from '@/hooks';
import { Page } from '@/layouts/standard';
import { useLoadingStore } from '@/stores';
import { iconConverter } from '@/utils';
import CreateDialog from './dialogs/Create.vue';

const loadingStore = useLoadingStore();
const createDialogRef = ref();
const listData = ref();
const menuCascader = reactive<TableRowData[][]>([]);
const activeMenus = reactive<TableRowData[]>([]);

const onHandle = async (value: string, row?: TableRowData, index = 0) => {
  switch (value) {
    case 'refresh':
      loadingStore.show();
      try {
        const { data } = await listMenu();
        listData.value = data;
      } catch {
      } finally {
        loadingStore.hide();
      }
      break;

    case 'view':
      if (row?._type === 'group') {
        menuCascader[index + 1] = dataFilter(row.menuId);
        menuCascader.splice(index + 2);
      } else if (row?._type === 'menu') {
        menuCascader.splice(index + 1);
      } else {
        menuCascader.splice(1);
      }
      activeMenus[index] = row || {};
      activeMenus.splice(index + 1);
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

const dataFilter = (parentId: number) => {
  return listData.value.filter((row: TableRowData) => {
    if (row.menuType === 'M' && row.isFrame === '1') {
      row._type = 'group';
      row._icon = 'chevron-right';
    } else if (row.menuType === 'C' || (row.menuType === 'M' && row.isFrame === '0')) {
      row._type = 'menu';
      row._icon = 'menu';
    } else if (row.menuType === 'F') {
      row._type = 'button';
    }
    return row.parentId === parentId;
  });
};

onMounted(async () => {
  await onHandle('refresh');
  menuCascader.push(dataFilter(0));
});
</script>

<template>
  <Page class="flex">
    <div v-for="(list, index) in menuCascader" class="w-1/5 min-w-60 flex flex-col border-r border-neutral-200" :key="index">
      <div class="p-4 flex items-center gap-2 border-b border-neutral-200">
        <t-button @click="onHandle('create')">
          <template #icon><t-icon name="add" /></template><span>新增</span>
        </t-button>
        <div class="flex-1"></div>
        <div>{{ index + 1 }}级菜单</div>
      </div>
      <div class="flex-1 overflow-y-auto">
        <t-list size="small" split>
          <t-list-item
            v-for="row in list"
            :class="{ 'bg-neutral-100': activeMenus[index]?.menuId === row.menuId }"
            :style="{ backgroundColor: row.menuId === activeMenus[activeMenus.length - 1]?.menuId ? 'var(--td-brand-color-light)' : '' }"
            @click="onHandle('view', row, index)"
            class="cursor-pointer duration-200 hover:bg-neutral-100"
            :key="row.menuId"
          >
            <div class="flex-1 flex items-center gap-2">
              <t-icon :name="iconConverter(row.icon)" />
              <span>{{ row.menuName }}</span>
              <span class="flex-1"></span>
              <q-table-tag-col :themes="['success', 'danger']" :value="row.status" dict="sys_normal_disable" />
              <t-icon :name="row._icon" />
              <b
                :style="{
                  backgroundColor: 'var(--td-brand-color)',
                  height: row.menuId === activeMenus[activeMenus.length - 1]?.menuId ? '100%' : '0',
                }"
                class="absolute top-0 right-0 w-1 duration-200"
              ></b>
            </div>
          </t-list-item>
        </t-list>
      </div>
    </div>

    <div class="flex-1 overflow-y-auto">
      <pre>{{ activeMenus[activeMenus.length - 1] }}</pre>
    </div>

    <CreateDialog @confirm="onHandle('refresh')" ref="createDialogRef" />
  </Page>
</template>
