<script setup lang="ts">
import { listDictType, deleteDictType } from '@/apis/system';
import { listCacheNames, clearCacheAll } from '@/apis/monitor';
import { useHandleDelete } from '@/hooks';
import { Page } from '@/layouts/standard';
import { useLoadingStore } from '@/stores';
import CreateDialog from './dialogs/Create.vue';
import Description from './Description.vue';

const loadingStore = useLoadingStore();
const namesData = ref();
const activeNameData = ref();

const createDialogRef = ref();
const tableData = ref();
const activeRowData = ref();

const onHandle = async (value: string) => {
  switch (value) {
    case 'refresh-names':
      loadingStore.show();
      try {
        namesData.value = (await listCacheNames()).data;
      } catch {
      } finally {
        loadingStore.hide();
      }
      break;

    case 'clear-all':
      loadingStore.show();
      try {
        const { msg } = await clearCacheAll();
        MessagePlugin.success(msg);
      } catch {
      } finally {
        loadingStore.hide();
      }
      break;

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

    case 'copy':
      navigator.clipboard
        .writeText(activeRowData.value?.dictType)
        .then(() => MessagePlugin.success('代码已复制到剪贴板'))
        .catch(() => MessagePlugin.error('复制失败，请手动复制'));
      break;

    case 'create':
      createDialogRef.value.show();
      break;

    case 'edit':
      createDialogRef.value.show(activeRowData.value);
      break;

    case 'delete':
      useHandleDelete(async () => {
        loadingStore.show();
        try {
          const { msg } = await deleteDictType(activeRowData.value.dictId);
          await onHandle('refresh');
          MessagePlugin.success(msg);
          return true;
        } catch {
        } finally {
          loadingStore.hide();
        }
      }, activeRowData.value.dictName);
      break;
  }
};

onMounted(async () => await onHandle('refresh-names'));
</script>

<template>
  <Page class="flex">
    <div class="w-1/4 min-w-80 flex flex-col border-r border-neutral-200">
      <div class="p-4 flex items-center gap-2 border-b border-neutral-200">
        <div class="w-1 h-full bg-neutral-200"></div>
        <span>缓存列表</span>
        <span class="flex-1"></span>
        <t-button @click="onHandle('refresh-names')" theme="default">
          <template #icon><t-icon name="refresh" /></template><span>刷新</span>
        </t-button>
        <t-button @click="onHandle('clear-all')" theme="success">
          <template #icon><t-icon name="clear" /></template><span>清理</span>
        </t-button>
      </div>
      <div class="flex-1 overflow-y-auto pb-16">
        <t-list split>
          <t-list-item
            v-for="name in namesData"
            :style="{ backgroundColor: name.cacheName === activeNameData?.cacheName ? 'var(--td-brand-color-1)' : '' }"
            @click="activeNameData = name"
            class="cursor-pointer duration-200 hover:bg-neutral-100"
            :key="name.cacheName"
          >
            <div class="flex-1 flex items-center gap-2">
              <span>{{ name.cacheName }}</span>
              <span class="flex-1"></span>
              <t-icon name="chevron-right" />
              <b
                :style="{ backgroundColor: 'var(--td-brand-color-7)', height: name.cacheName === activeNameData?.cacheName ? '100%' : '0' }"
                class="absolute top-0 right-0 w-1 duration-200"
              ></b>
            </div>
          </t-list-item>
        </t-list>
      </div>
    </div>

    <div v-if="activeRowData" class="flex-1 flex flex-col">
      <div class="p-4 flex gap-2 border-b border-neutral-200">
        <t-button @click="onHandle('copy')" theme="success">
          <template #icon><t-icon name="copy" /></template><span>复制</span>
        </t-button>
        <t-button @click="onHandle('edit')" theme="default">
          <template #icon><t-icon name="edit" /></template><span>修改</span>
        </t-button>
        <t-button @click="onHandle('delete')" theme="danger">
          <template #icon><t-icon name="delete" /></template><span>删除</span>
        </t-button>
      </div>
      <Description :active-row-data="activeRowData" />
    </div>

    <CreateDialog :on-success="async () => await onHandle('refresh')" ref="createDialogRef" />
  </Page>
</template>
