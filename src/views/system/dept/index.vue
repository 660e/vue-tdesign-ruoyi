<script setup lang="tsx">
import type { TableRowData } from 'tdesign-vue-next';
import type { AppSystemDictKey } from '@/types';
import { listDept, deleteDept } from '@/apis/system';
import { useDict, useHandleDelete } from '@/hooks';
import { Page } from '@/layouts/standard';
import { useLoadingStore } from '@/stores';
import { iconConverter } from '@/utils';
import CreateDialog from './dialogs/Create.vue';

const loadingStore = useLoadingStore();
const createDialogRef = ref();
const listData = ref();
const deptCascader = reactive<TableRowData[][]>([]);
const activeDept = computed(() => activeDepts[activeDepts.length - 1]);
const activeDepts = reactive<TableRowData[]>([]);

const itemMap: Record<string, { label: string; name: string; dict?: AppSystemDictKey }[]> = {
  M: [
    { label: '序号', name: 'orderNum' },
    { label: '菜单图标', name: 'icon' },
    { label: '菜单名称', name: 'deptName' },
    { label: '地址', name: 'path' },
    { label: '是否外链', name: 'isFrame' },
    { label: '显示状态', name: 'visible', dict: 'sys_show_hide' },
    { label: '菜单状态', name: 'status', dict: 'sys_normal_disable' },
  ],
  C: [
    { label: '序号', name: 'orderNum' },
    { label: '菜单图标', name: 'icon' },
    { label: '菜单名称', name: 'deptName' },
    { label: '路由地址', name: 'path' },
    { label: '组件路径', name: 'component' },
    { label: '权限字符', name: 'perms' },
    { label: '是否缓存', name: 'isCache' },
    { label: '是否外链', name: 'isFrame' },
    { label: '显示状态', name: 'visible', dict: 'sys_show_hide' },
    { label: '菜单状态', name: 'status', dict: 'sys_normal_disable' },
  ],
  F: [
    { label: '按钮名称', name: 'deptName' },
    { label: '权限字符', name: 'perms' },
    { label: '按钮状态', name: 'status', dict: 'sys_normal_disable' },
  ],
};

const dataFilter = (parentId: number) => {
  return listData.value
    .filter((row: TableRowData) => row.parentId === parentId)
    .map((row: TableRowData) => {
      if (listData.value.some((e: TableRowData) => e.parentId === row.deptId)) {
        row._icon = 'chevron-right';
      }
      return row;
    });
};

const onHandle = async (value: string, row?: TableRowData, index = 0) => {
  switch (value) {
    case 'refresh':
      loadingStore.show();
      try {
        const { data } = await listDept();
        listData.value = data;
      } catch {
      } finally {
        loadingStore.hide();
      }
      break;

    case 'view':
      if ((row?.menuType === 'M' && row?.isFrame !== '0') || row?.menuType === 'C') {
        deptCascader[index + 1] = dataFilter(row?.deptId);
        deptCascader.splice(index + 2);
        markVisibleAroundIndex(index);
      } else {
        deptCascader.splice(index + 1);
      }
      activeDepts[index] = row || {};
      activeDepts.splice(index + 1);
      break;

    case 'create':
      createDialogRef.value.show(undefined, index);
      break;

    case 'edit':
      createDialogRef.value.show(activeDept.value);
      break;

    case 'delete': {
      const success = await useHandleDelete(() => deleteDept(activeDept.value.deptId), activeDept.value.deptName);
      if (!success) return;
      await onHandle('refresh');
      break;
    }
  }
};

const markVisibleAroundIndex = (index: number) => {
  if (index === 0 || index === deptCascader.length - 1) return;
  deptCascader.flat().forEach((e) => (e._visible = false));
  [index - 1, index, index + 1].forEach((i) => deptCascader[i]?.forEach((e) => (e._visible = true)));
};

onMounted(async () => {
  await onHandle('refresh');
  deptCascader.push(dataFilter(0));
});
</script>

<template>
  <Page class="flex">
    <div class="flex relative">
      <div
        v-for="(list, index) in deptCascader"
        v-show="list[0]?._visible ?? true"
        class="w-80 flex flex-col border-r border-neutral-200"
        :key="index"
      >
        <div class="p-4 flex items-center gap-2 border-b border-neutral-200">
          <div class="w-1 h-full bg-neutral-200"></div>
          <span v-if="activeDepts[index - 1]?.menuType === 'M'">{{ index + 1 }}级目录</span>
          <span v-else-if="activeDepts[index - 1]?.menuType === 'C'">按钮组</span>
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
              :class="{ 'bg-neutral-100': activeDepts[index]?.deptId === row.deptId }"
              :style="{ backgroundColor: row.deptId === activeDept?.deptId ? 'var(--td-brand-color-1)' : '' }"
              @click="onHandle('view', row, index)"
              class="cursor-pointer duration-200 hover:bg-neutral-100"
              :key="row.deptId"
            >
              <div class="flex-1 flex items-center gap-2">
                <template v-if="list.some((e) => e.menuType === 'F')">
                  <span>{{ row.deptName }}</span>
                  <span class="flex-1"></span>
                  <t-tag size="small" variant="light-outline">{{ row.perms }}</t-tag>
                  <t-tag v-if="row.status === '1'" size="small" theme="danger" variant="light-outline">
                    {{ useDict('sys_normal_disable', '1') }}
                  </t-tag>
                </template>
                <template v-else>
                  <span class="font-mono text-right">{{ row.orderNum.toString().padStart(3, 0) }}</span>
                  <t-icon :name="iconConverter(row.icon)" />
                  <span>{{ row.deptName }}</span>
                  <span class="flex-1"></span>
                  <t-tag v-if="row.visible === '1'" size="small" theme="warning" variant="light-outline">{{ useDict('sys_show_hide', '1') }}</t-tag>
                  <t-tag v-if="row.status === '1'" size="small" theme="danger" variant="light-outline">
                    {{ useDict('sys_normal_disable', '1') }}
                  </t-tag>
                  <t-icon v-if="row._icon" :name="row._icon" />
                </template>
                <b
                  :style="{ backgroundColor: 'var(--td-brand-color-7)', height: row.deptId === activeDept?.deptId ? '100%' : '0' }"
                  class="absolute top-0 right-0 w-1 duration-200"
                ></b>
              </div>
            </t-list-item>
          </t-list>
        </div>
      </div>

      <div
        v-if="deptCascader.length > 3"
        class="absolute left-1/2 bottom-4 w-1/2 -translate-x-1/2 rounded border flex justify-center border-neutral-200 bg-white"
      >
        <div class="h-8 p-0.5 flex gap-0.5">
          <div
            v-for="n in deptCascader.length"
            :class="[
              (deptCascader[n - 1]?.[0]?._visible ?? true) ? 'bg-neutral-100' : '',
              n === 1 || n === deptCascader.length ? 'cursor-not-allowed' : 'cursor-pointer',
            ]"
            :style="{ color: deptCascader[n - 1]?.find((e) => e.deptId === activeDept?.deptId) ? 'var(--td-brand-color-7)' : '' }"
            @click="markVisibleAroundIndex(n - 1)"
            class="w-6 flex justify-center items-center text-sm"
            :key="n"
          >
            {{ n }}
          </div>
        </div>
      </div>
    </div>

    <div v-if="activeDept" class="flex-1 flex flex-col">
      <div class="p-4 flex gap-2 border-b border-neutral-200">
        <t-button @click="onHandle('edit', activeDept)" theme="default">
          <template #icon><t-icon name="edit" /></template><span>修改</span>
        </t-button>
        <t-button @click="onHandle('delete', activeDept)" theme="danger">
          <template #icon><t-icon name="delete" /></template><span>删除</span>
        </t-button>
      </div>
      <div class="flex-1 overflow-y-auto px-4 pb-4">
        <t-list split>
          <t-list-item v-for="item in itemMap[activeDept.menuType]" :key="item.name">
            <div class="flex items-center">
              <span class="w-20 pr-4 text-right font-bold">{{ item.label }}</span>
              <t-icon v-if="item.name === 'icon'" :name="iconConverter(activeDept[item.name])" />
              <span v-else>{{ item.dict ? useDict(item.dict, activeDept[item.name]) : activeDept[item.name] }}</span>
            </div>
          </t-list-item>
        </t-list>
      </div>
    </div>

    <CreateDialog :active-menus="activeDepts" :item-map="itemMap" :list-data="listData" @confirm="onHandle('refresh')" ref="createDialogRef" />
  </Page>
</template>
