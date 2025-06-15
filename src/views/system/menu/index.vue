<script setup lang="tsx">
import type { TableRowData } from 'tdesign-vue-next';
import type { AppSystemDictKey } from '@/types';
import { listMenu, deleteMenu } from '@/apis/system';
import { useDict, useHandleDelete } from '@/hooks';
import { Page } from '@/layouts/standard';
import { useLoadingStore } from '@/stores';
import { iconConverter } from '@/utils';
import CreateDialog from './dialogs/Create.vue';

const loadingStore = useLoadingStore();
const createDialogRef = ref();
const listData = ref();
const menuCascader = reactive<TableRowData[][]>([]);
const activeMenu = computed(() => activeMenus[activeMenus.length - 1]);
const activeMenus = reactive<TableRowData[]>([]);

const rowDescriptions = [
  { label: '序号', prop: 'roleSort' },
  { label: '角色名称', prop: 'roleName' },
  { label: '权限字符', prop: 'roleKey' },
  { label: '状态', prop: 'status', dictType: 'sys_normal_disable' },
  { label: '创建时间', prop: 'createTime' },
  { label: '备注', prop: 'remark' },
];

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
            :style="{ backgroundColor: row.menuId === activeMenu?.menuId ? 'var(--td-brand-color-light)' : '' }"
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
                :style="{ backgroundColor: 'var(--td-brand-color)', height: row.menuId === activeMenu?.menuId ? '100%' : '0' }"
                class="absolute top-0 right-0 w-1 duration-200"
              ></b>
            </div>
          </t-list-item>
        </t-list>
      </div>
    </div>

    <div v-if="activeMenu" class="flex-1 flex flex-col">
      <div class="p-4 flex gap-2 border-b border-neutral-200">
        <t-button @click="onHandle('edit', activeMenu)" theme="default">
          <template #icon><t-icon name="edit" /></template><span>修改</span>
        </t-button>
        <t-button @click="onHandle('delete', activeMenu)" theme="danger">
          <template #icon><t-icon name="delete" /></template><span>删除</span>
        </t-button>
      </div>
      <div class="flex-1 overflow-y-auto px-4 pb-4">
        <t-list size="small" split>
          <t-list-item v-for="item in rowDescriptions" :key="item.prop">
            <div class="flex">
              <span class="w-24 pr-4 text-right font-bold">{{ item.label }}</span>
              <span>{{ item.dictType ? useDict(item.dictType as AppSystemDictKey, activeMenu[item.prop]) : activeMenu[item.prop] }}</span>
            </div>
          </t-list-item>
        </t-list>
      </div>
    </div>

    <CreateDialog @confirm="onHandle('refresh')" ref="createDialogRef" />
  </Page>
</template>
