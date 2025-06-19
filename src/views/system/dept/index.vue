<script setup lang="tsx">
import type { TableRowData } from 'tdesign-vue-next';
import type { AppSystemDictKey } from '@/types';
import { listDept, deleteDept } from '@/apis/system';
import { useDict, useHandleDelete } from '@/hooks';
import { Page } from '@/layouts/standard';
import { useLoadingStore } from '@/stores';
import CreateDialog from './dialogs/Create.vue';

const loadingStore = useLoadingStore();
const createDialogRef = ref();
const tableData = ref();
const tableCascader = reactive<TableRowData[][]>([]);
const activeRowData = computed(() => activeRowsData[activeRowsData.length - 1]);
const activeRowsData = reactive<TableRowData[]>([]);

const itemMap: { label: string; name: string; dict?: AppSystemDictKey }[] = [
  { label: '序号', name: 'orderNum' },
  { label: '部门名称', name: 'deptName' },
  { label: '负责人', name: 'leader' },
  { label: '联系电话', name: 'phone' },
  { label: '邮箱', name: 'email' },
  { label: '部门状态', name: 'status', dict: 'sys_normal_disable' },
];

const dataFilter = (parentId: number) => {
  return tableData.value.filter((row: TableRowData) => row.parentId === parentId);
};

const onHandle = async (value: string, row?: TableRowData, index = 0) => {
  switch (value) {
    case 'refresh':
      loadingStore.show();
      try {
        const { data } = await listDept();
        tableData.value = data?.map((item) => {
          if (data.some((e) => e.parentId === item.deptId)) {
            item._icon = 'chevron-right';
          }
          return item;
        });
      } catch {
      } finally {
        loadingStore.hide();
      }
      break;

    case 'view':
      if (row?._icon) {
        tableCascader[index + 1] = dataFilter(row?.deptId);
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

    case 'delete': {
      const success = await useHandleDelete(() => deleteDept(activeRowData.value.deptId), activeRowData.value.deptName);
      if (!success) return;
      await onHandle('refresh');
      break;
    }
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
          <span v-if="index === 0">总公司</span>
          <span v-else-if="index === 1">子公司</span>
          <span v-else>{{ index - 1 }}级部门</span>
          <span class="flex-1"></span>
          <t-button @click="onHandle('create', undefined, index)">
            <template #icon><t-icon name="add" /></template><span>新增</span>
          </t-button>
        </div>
        <div class="flex-1 overflow-y-auto pb-16">
          <t-list split>
            <t-list-item
              v-for="row in list"
              :class="{ 'bg-neutral-100': row.deptId === activeRowsData[index]?.deptId }"
              :style="{ backgroundColor: row.deptId === activeRowData?.deptId ? 'var(--td-brand-color-1)' : '' }"
              @click="onHandle('view', row, index)"
              class="cursor-pointer duration-200 hover:bg-neutral-100"
              :key="row.deptId"
            >
              <div class="flex-1 flex items-center gap-2">
                <span>{{ row.deptName }}</span>
                <span class="flex-1"></span>
                <t-tag v-if="row.status === '1'" size="small" theme="danger" variant="light-outline">
                  {{ useDict('sys_normal_disable', '1') }}
                </t-tag>
                <t-icon v-if="row._icon" :name="row._icon" />
                <b
                  :style="{ backgroundColor: 'var(--td-brand-color-7)', height: row.deptId === activeRowData?.deptId ? '100%' : '0' }"
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
            :style="{ color: tableCascader[n - 1]?.find((e) => e.deptId === activeRowData?.deptId) ? 'var(--td-brand-color-7)' : '' }"
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
          <t-list-item v-for="item in itemMap" :key="item.name">
            <div class="flex items-center">
              <span class="w-20 pr-4 text-right font-bold">{{ item.label }}</span>
              <span>{{ item.dict ? useDict(item.dict, activeRowData[item.name]) : activeRowData[item.name] }}</span>
            </div>
          </t-list-item>
        </t-list>
      </div>
    </div>

    <CreateDialog
      :active-rows-data="activeRowsData"
      :item-map="itemMap"
      :table-data="tableData"
      @confirm="onHandle('refresh')"
      ref="createDialogRef"
    />
  </Page>
</template>
