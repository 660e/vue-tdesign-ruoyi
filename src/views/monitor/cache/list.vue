<script setup lang="ts">
import { listDictType, deleteDictType } from '@/apis/system';
import { listCacheNames, listCacheKeys, getCacheValue, clearCacheAll } from '@/apis/monitor';
import { useHandleDelete } from '@/hooks';
import { Page } from '@/layouts/standard';
import { useLoadingStore } from '@/stores';

const loadingStore = useLoadingStore();
const namesData = ref();
const activeName = ref();
const keysData = ref();
const activeKeyData = ref();

const createDialogRef = ref();
const tableData = ref();
const activeRowData = ref();

const clearAll = async () => {
  loadingStore.show();
  try {
    const { msg } = await clearCacheAll();
    MessagePlugin.success(msg);
  } catch {
  } finally {
    loadingStore.hide();
  }
};

const getNames = async () => {
  loadingStore.show();
  try {
    namesData.value = (await listCacheNames()).data;
  } catch {
  } finally {
    loadingStore.hide();
  }
};

const getKeys = async (cacheName: string) => {
  loadingStore.show();
  try {
    keysData.value = (await listCacheKeys(cacheName)).data;
    activeName.value = cacheName;
  } catch {
  } finally {
    loadingStore.hide();
  }
};

const getValue = async (key: string) => {
  loadingStore.show();
  try {
    activeKeyData.value = (await getCacheValue(activeName.value, key)).data;
  } catch {
  } finally {
    loadingStore.hide();
  }
};

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

onMounted(async () => await getNames());
</script>

<template>
  <Page class="flex">
    <div class="w-80 flex flex-col border-r border-neutral-200">
      <div class="p-4 flex items-center gap-2 border-b border-neutral-200">
        <div class="w-1 h-full bg-neutral-200"></div>
        <span>缓存列表</span>
        <span class="flex-1"></span>
        <t-button @click="getNames" theme="default">
          <template #icon><t-icon name="refresh" /></template><span>刷新</span>
        </t-button>
        <t-button @click="clearAll" theme="success">
          <template #icon><t-icon name="clear" /></template><span>清理</span>
        </t-button>
      </div>
      <div class="flex-1 overflow-y-auto pb-16">
        <t-list split>
          <t-list-item
            v-for="row in namesData"
            :style="{ backgroundColor: row.cacheName === activeName ? 'var(--td-brand-color-1)' : '' }"
            @click="getKeys(row.cacheName)"
            class="cursor-pointer duration-200 hover:bg-neutral-100"
            :key="row.cacheName"
          >
            <div class="flex-1 flex items-center gap-2">
              <span>{{ row.cacheName }}</span>
              <span class="flex-1"></span>
              <t-link class="flex items-center gap-0.5" theme="primary">
                <t-icon name="clear" />
                <span>清理</span>
              </t-link>
              <b
                :style="{ backgroundColor: 'var(--td-brand-color-7)', height: row.cacheName === activeName ? '100%' : '0' }"
                class="absolute top-0 right-0 w-1 duration-200"
              ></b>
            </div>
          </t-list-item>
        </t-list>
      </div>
    </div>

    <div v-if="keysData?.length" class="w-[400px] flex flex-col border-r border-neutral-200">
      <div class="p-4 flex items-center gap-2 border-b border-neutral-200">
        <div class="w-1 h-full bg-neutral-200"></div>
        <span>键名列表</span>
        <span class="flex-1"></span>
        <t-button @click="onHandle('refresh-names')" theme="default">
          <template #icon><t-icon name="refresh" /></template><span>刷新</span>
        </t-button>
      </div>
      <div class="flex-1 overflow-y-auto pb-16">
        <t-list split>
          <t-list-item
            v-for="row in keysData"
            :style="{ backgroundColor: row === activeKeyData.cacheName ? 'var(--td-brand-color-1)' : '' }"
            @click="getValue(row)"
            class="cursor-pointer duration-200 hover:bg-neutral-100"
            :key="row"
          >
            <div class="flex-1 flex items-center gap-2">
              <span>{{ row }}</span>
              <span class="flex-1"></span>
              <t-link class="flex items-center gap-0.5" theme="primary">
                <t-icon name="clear" />
                <span>清理</span>
              </t-link>
              <b
                :style="{ backgroundColor: 'var(--td-brand-color-7)', height: row === activeKeyData.cacheName ? '100%' : '0' }"
                class="absolute top-0 right-0 w-1 duration-200"
              ></b>
            </div>
          </t-list-item>
        </t-list>
      </div>
    </div>
  </Page>
</template>
