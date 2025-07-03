<script setup lang="ts">
import { listCacheNames, listCacheKeys, getCacheValue, clearCacheAll, clearCacheName, clearCacheKey } from '@/apis/monitor';
import { Page } from '@/layouts/standard';
import { useLoadingStore } from '@/stores';

const loadingStore = useLoadingStore();
const namesData = ref();
const activeName = ref();
const keysData = ref();
const activeKey = ref();
const activeValue = ref();

const reset = (level: 1 | 2) => {
  switch (level) {
    case 1:
      activeName.value = '';
      keysData.value = [];
      activeKey.value = '';
      activeValue.value = null;
      break;
    case 2:
      activeKey.value = '';
      activeValue.value = null;
      break;
  }
};

const getNames = async () => {
  loadingStore.show();
  try {
    namesData.value = (await listCacheNames()).data;
    reset(1);
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
    reset(2);
  } catch {
  } finally {
    loadingStore.hide();
  }
};

const getValue = async (key: string) => {
  loadingStore.show();
  try {
    activeValue.value = (await getCacheValue(activeName.value, key)).data;
    activeKey.value = key;
  } catch {
  } finally {
    loadingStore.hide();
  }
};

const clearAll = async () => {
  loadingStore.show();
  try {
    const { msg } = await clearCacheAll();
    MessagePlugin.success(msg);
    reset(1);
  } catch {
  } finally {
    loadingStore.hide();
  }
};

const clearName = async (cacheName: string) => {
  loadingStore.show();
  try {
    const { msg } = await clearCacheName(cacheName);
    await getNames();
    MessagePlugin.success(msg);
  } catch {
  } finally {
    loadingStore.hide();
  }
};

const clearKey = async (key: string) => {
  loadingStore.show();
  try {
    const { msg } = await clearCacheKey(key);
    await getKeys(activeName.value);
    MessagePlugin.success(msg);
  } catch {
  } finally {
    loadingStore.hide();
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
              <t-link @click.stop="clearName(row.cacheName)" class="flex items-center gap-0.5" theme="primary">
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
        <t-button @click="getKeys(activeName)" theme="default">
          <template #icon><t-icon name="refresh" /></template><span>刷新</span>
        </t-button>
      </div>
      <div class="flex-1 overflow-y-auto pb-16">
        <t-list split>
          <t-list-item
            v-for="row in keysData"
            :style="{ backgroundColor: row === activeKey ? 'var(--td-brand-color-1)' : '' }"
            @click="getValue(row)"
            class="cursor-pointer duration-200 hover:bg-neutral-100"
            :key="row"
          >
            <div class="flex-1 flex items-center gap-2">
              <span>{{ row }}</span>
              <span class="flex-1"></span>
              <t-link @click.stop="clearKey(row)" class="flex items-center gap-0.5" theme="primary">
                <t-icon name="clear" />
                <span>清理</span>
              </t-link>
              <b
                :style="{ backgroundColor: 'var(--td-brand-color-7)', height: row === activeKey ? '100%' : '0' }"
                class="absolute top-0 right-0 w-1 duration-200"
              ></b>
            </div>
          </t-list-item>
        </t-list>
      </div>
    </div>

    <div v-if="activeValue" class="flex-1 flex flex-col border-r border-neutral-200">
      <div class="p-4 flex items-center gap-2 border-b border-neutral-200">
        <div class="w-1 h-8 bg-neutral-200"></div>
        <span>缓存内容</span>
      </div>
      <div v-if="activeValue.cacheValue" class="flex-1 overflow-auto p-4">
        <pre>{{ activeValue.cacheValue }}</pre>
      </div>
    </div>
  </Page>
</template>
