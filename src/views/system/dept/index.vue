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
const listData = ref();
const deptCascader = reactive<TableRowData[][]>([]);
const activeDept = computed(() => activeDepts[activeDepts.length - 1]);
const activeDepts = reactive<TableRowData[]>([]);

const itemMap: { label: string; name: string; dict?: AppSystemDictKey }[] = [
  { label: '序号', name: 'orderNum' },
  { label: '部门名称', name: 'deptName' },
  { label: '负责人', name: 'leader' },
  { label: '联系电话', name: 'phone' },
  { label: '邮箱', name: 'email' },
  { label: '部门状态', name: 'status', dict: 'sys_normal_disable' },
];

const dataFilter = (parentId: number) => {
  return listData.value.filter((row: TableRowData) => row.parentId === parentId);
};

const onHandle = async (value: string, row?: TableRowData, index = 0) => {
  switch (value) {
    case 'refresh':
      loadingStore.show();
      try {
        const { data } = await listDept();
        listData.value = data?.map((item) => {
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
              :class="{ 'bg-neutral-100': row.deptId === activeDepts[index]?.deptId }"
              :style="{ backgroundColor: row.deptId === activeDept?.deptId ? 'var(--td-brand-color-1)' : '' }"
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
          <t-list-item v-for="item in itemMap" :key="item.name">
            <div class="flex items-center">
              <span class="w-20 pr-4 text-right font-bold">{{ item.label }}</span>
              <span>{{ item.dict ? useDict(item.dict, activeDept[item.name]) : activeDept[item.name] }}</span>
            </div>
          </t-list-item>
        </t-list>
      </div>
    </div>

    <CreateDialog :active-depts="activeDepts" :item-map="itemMap" :list-data="listData" @confirm="onHandle('refresh')" ref="createDialogRef" />
  </Page>
</template>
