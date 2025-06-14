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

const descriptions: Record<string, { label: string; prop: string; dict?: string }[]> = {
  group: [
    { label: '序号', prop: 'orderNum' },
    { label: '类型', prop: 'menuType' },
    { label: '菜单图标', prop: 'icon' },
    { label: '菜单名称', prop: 'menuName' },
    { label: '路由地址', prop: 'path' },
    { label: '显示状态', prop: 'visible', dict: 'sys_show_hide' },
    { label: '菜单状态', prop: 'status', dict: 'sys_normal_disable' },
  ],
  link: [
    { label: '序号', prop: 'orderNum' },
    { label: '类型', prop: 'menuType' },
    { label: '菜单图标', prop: 'icon' },
    { label: '菜单名称', prop: 'menuName' },
    { label: '外链地址', prop: 'path' },
    { label: '显示状态', prop: 'visible', dict: 'sys_show_hide' },
    { label: '菜单状态', prop: 'status', dict: 'sys_normal_disable' },
  ],
  menu: [
    { label: '序号', prop: 'orderNum' },
    { label: '类型', prop: 'menuType' },
    { label: '菜单图标', prop: 'icon' },
    { label: '菜单名称', prop: 'menuName' },
    { label: '路由地址', prop: 'path' },
    { label: '组件路径', prop: 'component' },
    { label: '权限字符', prop: 'perms' },
    { label: '是否缓存', prop: 'isCache' },
    { label: '显示状态', prop: 'visible', dict: 'sys_show_hide' },
    { label: '菜单状态', prop: 'status', dict: 'sys_normal_disable' },
  ],
  button: [
    { label: '类型', prop: 'menuType' },
    { label: '按钮名称', prop: 'menuName' },
    { label: '权限字符', prop: 'perms' },
    { label: '按钮状态', prop: 'status', dict: 'sys_normal_disable' },
  ],
};

const dataFilter = (parentId: number) => {
  return listData.value.filter((row: TableRowData) => {
    switch (row.menuType) {
      case 'M':
        row._type = row.isFrame === '1' ? 'group' : 'link';
        row._icon = row.isFrame === '1' ? 'chevron-right' : 'jump';
        break;
      case 'C':
        row._type = 'menu';
        break;
      case 'F':
        row._type = 'button';
        break;
    }
    return row.parentId === parentId;
  });
};

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
      if (['group', 'menu'].includes(row?._type)) {
        menuCascader[index + 1] = dataFilter(row?.menuId);
        menuCascader.splice(index + 2);
      } else {
        menuCascader.splice(index + 1);
      }
      activeMenus[index] = row || {};
      activeMenus.splice(index + 1);
      break;

    case 'create':
      createDialogRef.value.show();
      break;

    case 'edit':
      createDialogRef.value.show(activeMenu.value);
      break;

    case 'delete': {
      const success = await useHandleDelete(() => deleteMenu(activeMenu.value.menuId), activeMenu.value.menuName);
      if (!success) return;
      await onHandle('refresh');
      break;
    }
  }
};

onMounted(async () => {
  await onHandle('refresh');
  menuCascader.push(dataFilter(0));
});
</script>

<template>
  <Page class="flex">
    <div
      v-for="(list, index) in menuCascader"
      v-show="index > menuCascader.length - 4"
      class="w-1/5 min-w-60 flex flex-col border-r border-neutral-200"
      :key="index"
    >
      <div class="p-4 flex items-center gap-2 border-b border-neutral-200">
        <t-button @click="onHandle('create')">
          <template #icon><t-icon name="add" /></template><span>新增</span>
        </t-button>
        <div class="flex-1"></div>
        <div>{{ list.some((e) => e._type === 'button') ? '按钮列表' : `${index + 1}级菜单` }}</div>
      </div>
      <div class="flex-1 overflow-y-auto">
        <t-list split>
          <t-list-item
            v-for="row in list"
            :class="{ 'bg-neutral-100': activeMenus[index]?.menuId === row.menuId }"
            :style="{ backgroundColor: row.menuId === activeMenu?.menuId ? 'var(--td-brand-color-light)' : '' }"
            @click="onHandle('view', row, index)"
            class="cursor-pointer duration-200 hover:bg-neutral-100"
            :key="row.menuId"
          >
            <div class="flex-1 flex items-center gap-2">
              <template v-if="list.some((e) => e._type === 'button')">
                <span>{{ row.menuName }}</span>
                <span class="flex-1"></span>
                <t-tag size="small" variant="light-outline">{{ row.perms }}</t-tag>
                <t-tag v-if="row.status === '1'" size="small" theme="danger" variant="light-outline">{{ useDict('sys_normal_disable', '1') }}</t-tag>
              </template>
              <template v-else>
                <span class="font-mono text-right">{{ row.orderNum.toString().padStart(3, 0) }}</span>
                <t-icon :name="iconConverter(row.icon)" />
                <span>{{ row.menuName }}</span>
                <span class="flex-1"></span>
                <t-tag v-if="row.visible === '1'" size="small" theme="warning" variant="light-outline">{{ useDict('sys_show_hide', '1') }}</t-tag>
                <t-tag v-if="row.status === '1'" size="small" theme="danger" variant="light-outline">{{ useDict('sys_normal_disable', '1') }}</t-tag>
                <t-icon v-if="row._icon" :name="row._icon" />
              </template>
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
        <t-list split>
          <t-list-item v-for="item in descriptions[activeMenu._type]" :key="item.prop">
            <div class="flex items-center">
              <span class="w-24 pr-4 text-right font-bold">{{ item.label }}</span>
              <t-icon v-if="item.prop === 'icon'" :name="iconConverter(activeMenu[item.prop])" />
              <span v-else>{{ item.dict ? useDict(item.dict as AppSystemDictKey, activeMenu[item.prop]) : activeMenu[item.prop] }}</span>
            </div>
          </t-list-item>
        </t-list>
      </div>
    </div>

    <CreateDialog @confirm="onHandle('refresh')" ref="createDialogRef" />
  </Page>
</template>
