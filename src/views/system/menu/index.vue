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
const tableData = ref();
const tableCascader = reactive<TableRowData[][]>([]);
const activeRowData = computed(() => activeRowsData[activeRowsData.length - 1]);
const activeRowsData = reactive<TableRowData[]>([]);

const itemMap: Record<string, { label: string; name: string; dict?: AppSystemDictKey }[]> = {
  M: [
    { label: '序号', name: 'orderNum' },
    { label: '菜单图标', name: 'icon' },
    { label: '菜单名称', name: 'menuName' },
    { label: '地址', name: 'path' },
    { label: '是否外链', name: 'isFrame' },
    { label: '显示状态', name: 'visible', dict: 'sys_show_hide' },
    { label: '菜单状态', name: 'status', dict: 'sys_normal_disable' },
  ],
  C: [
    { label: '序号', name: 'orderNum' },
    { label: '菜单图标', name: 'icon' },
    { label: '菜单名称', name: 'menuName' },
    { label: '路由地址', name: 'path' },
    { label: '组件路径', name: 'component' },
    { label: '权限字符', name: 'perms' },
    { label: '是否缓存', name: 'isCache' },
    { label: '是否外链', name: 'isFrame' },
    { label: '显示状态', name: 'visible', dict: 'sys_show_hide' },
    { label: '菜单状态', name: 'status', dict: 'sys_normal_disable' },
  ],
  F: [
    { label: '按钮名称', name: 'menuName' },
    { label: '权限字符', name: 'perms' },
    { label: '按钮状态', name: 'status', dict: 'sys_normal_disable' },
  ],
};

const dataFilter = (parentId: number) => {
  return tableData.value.filter((row: TableRowData) => row.parentId === parentId);
};

const onHandle = async (value: string, row?: TableRowData, index = 0) => {
  switch (value) {
    case 'refresh':
      loadingStore.show();
      try {
        const { data } = await listMenu();
        tableData.value = data?.map((item) => {
          if (item.menuType === 'M') {
            item._icon = item.isFrame === '1' ? 'chevron-right' : 'jump';
          }
          return item;
        });
      } catch {
      } finally {
        loadingStore.hide();
      }
      break;

    case 'view':
      if ((row?.menuType === 'M' && row?.isFrame !== '0') || row?.menuType === 'C') {
        tableCascader[index + 1] = dataFilter(row?.menuId);
        tableCascader.splice(index + 2);
        markVisibleAroundIndex(index);
      } else {
        tableCascader.splice(index + 1);
      }
      activeRowsData[index] = row || {};
      activeRowsData.splice(index + 1);
      break;

    case 'create':
      createDialogRef.value.show(undefined, index);
      break;

    case 'edit':
      createDialogRef.value.show(activeRowData.value);
      break;

    case 'delete':
      useHandleDelete(async () => {
        loadingStore.show();
        try {
          const { msg } = await deleteMenu(activeRowData.value.menuId);
          await onHandle('refresh');
          MessagePlugin.success(msg);
          return true;
        } catch {
        } finally {
          loadingStore.hide();
        }
      }, activeRowData.value.menuName);
      break;
  }
};

const markVisibleAroundIndex = (index: number) => {
  if (index === 0 || index === tableCascader.length - 1) return;
  tableCascader.flat().forEach((e) => (e._visible = false));
  [index - 1, index, index + 1].forEach((i) => tableCascader[i]?.forEach((e) => (e._visible = true)));
};

onMounted(async () => {
  await onHandle('refresh');
  tableCascader.push(dataFilter(0));
});
</script>

<template>
  <Page class="flex">
    <div class="flex relative">
      <div
        v-for="(list, index) in tableCascader"
        v-show="list[0]?._visible ?? true"
        class="w-80 flex flex-col border-r border-neutral-200"
        :key="index"
      >
        <div class="p-4 flex items-center gap-2 border-b border-neutral-200">
          <div class="w-1 h-full bg-neutral-200"></div>
          <span v-if="activeRowsData[index - 1]?.menuType === 'M'">{{ index + 1 }}级目录</span>
          <span v-else-if="activeRowsData[index - 1]?.menuType === 'C'">按钮组</span>
          <span v-else>根目录</span>
          <span class="flex-1"></span>
          <t-button @click="onHandle('create', undefined, index)">
            <template #icon><t-icon name="add" /></template><span>新增</span>
          </t-button>
        </div>
        <div class="flex-1 overflow-y-auto pb-16">
          <t-list split>
            <t-list-item
              v-for="row in list.sort((a, b) => a.orderNum - b.orderNum)"
              :class="{ 'bg-neutral-100': row.menuId === activeRowsData[index]?.menuId }"
              :style="{ backgroundColor: row.menuId === activeRowData?.menuId ? 'var(--td-brand-color-1)' : '' }"
              @click="onHandle('view', row, index)"
              class="cursor-pointer duration-200 hover:bg-neutral-100"
              :key="row.menuId"
            >
              <div class="flex-1 flex items-center gap-2">
                <template v-if="list.some((e) => e.menuType === 'F')">
                  <span>{{ row.menuName }}</span>
                  <span class="flex-1"></span>
                  <t-tag size="small" variant="light-outline">{{ row.perms }}</t-tag>
                  <t-tag v-if="row.status === '1'" size="small" theme="danger" variant="light-outline">
                    {{ useDict('sys_normal_disable', '1') }}
                  </t-tag>
                </template>
                <template v-else>
                  <span class="font-mono text-right">{{ row.orderNum.toString().padStart(3, 0) }}</span>
                  <t-icon :name="iconConverter(row.icon)" />
                  <span>{{ row.menuName }}</span>
                  <span class="flex-1"></span>
                  <t-tag v-if="row.visible === '1'" size="small" theme="warning" variant="light-outline">{{ useDict('sys_show_hide', '1') }}</t-tag>
                  <t-tag v-if="row.status === '1'" size="small" theme="danger" variant="light-outline">
                    {{ useDict('sys_normal_disable', '1') }}
                  </t-tag>
                  <t-icon v-if="row._icon" :name="row._icon" />
                </template>
                <b
                  :style="{ backgroundColor: 'var(--td-brand-color-7)', height: row.menuId === activeRowData?.menuId ? '100%' : '0' }"
                  class="absolute top-0 right-0 w-1 duration-200"
                ></b>
              </div>
            </t-list-item>
          </t-list>
        </div>
      </div>

      <div
        v-if="tableCascader.length > 3"
        class="absolute left-1/2 bottom-4 w-1/2 -translate-x-1/2 rounded border flex justify-center border-neutral-200 bg-white"
      >
        <div class="h-8 p-0.5 flex gap-0.5">
          <div
            v-for="n in tableCascader.length"
            :class="[
              (tableCascader[n - 1]?.[0]?._visible ?? true) ? 'bg-neutral-100' : '',
              n === 1 || n === tableCascader.length ? 'cursor-not-allowed' : 'cursor-pointer',
            ]"
            :style="{ color: tableCascader[n - 1]?.find((e) => e.menuId === activeRowData?.menuId) ? 'var(--td-brand-color-7)' : '' }"
            @click="markVisibleAroundIndex(n - 1)"
            class="w-6 flex justify-center items-center text-sm"
            :key="n"
          >
            {{ n }}
          </div>
        </div>
      </div>
    </div>

    <div v-if="activeRowData" class="flex-1 flex flex-col">
      <div class="p-4 flex gap-2 border-b border-neutral-200">
        <t-button @click="onHandle('edit')" theme="default">
          <template #icon><t-icon name="edit" /></template><span>修改</span>
        </t-button>
        <t-button @click="onHandle('delete')" theme="danger">
          <template #icon><t-icon name="delete" /></template><span>删除</span>
        </t-button>
      </div>
      <div class="flex-1 overflow-y-auto px-4 pb-4">
        <t-list split>
          <t-list-item v-for="item in itemMap[activeRowData.menuType]" :key="item.name">
            <div class="flex items-center">
              <span class="w-20 pr-4 text-right font-bold">{{ item.label }}</span>
              <t-icon v-if="item.name === 'icon'" :name="iconConverter(activeRowData[item.name])" />
              <span v-else>{{ item.dict ? useDict(item.dict, activeRowData[item.name]) : activeRowData[item.name] }}</span>
            </div>
          </t-list-item>
        </t-list>
      </div>
    </div>

    <CreateDialog
      :active-rows-data="activeRowsData"
      :item-map="itemMap"
      :on-success="async () => await onHandle('refresh')"
      :table-data="tableData"
      ref="createDialogRef"
    />
  </Page>
</template>
