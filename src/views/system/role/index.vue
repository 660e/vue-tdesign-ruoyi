<script setup lang="ts">
import { listRole } from '@/apis/system';
import { Page } from '@/layouts/standard';
import { useLoading } from '@/stores';

const currentData = ref();
const listData = ref();

const onHandle = async (value: string) => {
  switch (value) {
    case 'refresh':
      useLoading().show();
      try {
        const { rows } = await listRole({
          pageNum: 1,
          pageSize: 9999,
        });
        listData.value = rows;
      } catch {
      } finally {
        useLoading().hide();
      }
      break;
  }
};

onMounted(async () => await onHandle('refresh'));
</script>

<template>
  <Page class="flex">
    <div class="w-96 flex flex-col border-r border-neutral-200">
      <div class="p-4 flex gap-2 border-b border-neutral-200">
        <t-input class="flex-1 !w-0" clearable>
          <template #prefix-icon><t-icon name="search" /></template>
        </t-input>
        <t-radio-group default-value="1" variant="default-filled">
          <t-radio-button value="1">
            <div class="flex items-center gap-1"><span>序号</span><t-icon name="arrow-down" /></div>
          </t-radio-button>
          <t-radio-button value="2">
            <div class="flex items-center gap-1"><span>状态</span><t-icon name="arrow-down" /></div>
          </t-radio-button>
        </t-radio-group>
      </div>
      <div class="flex-1 overflow-y-auto">
        <t-list size="small" split>
          <t-list-item
            v-for="row in listData"
            :style="{ backgroundColor: row.roleId === currentData?.roleId ? 'var(--td-brand-color-light)' : '' }"
            @click="currentData = row"
            class="cursor-pointer duration-200 hover:bg-neutral-100"
            :key="row.roleId"
          >
            <div class="flex-1 flex items-center gap-2">
              <span class="w-8 overflow-x-hidden font-mono text-right">{{ row.roleSort.toString().padStart(3, 0) }}</span>
              <span>{{ row.roleName }}（{{ row.roleKey }}）</span>
              <span class="flex-1"></span>
              <q-table-tag-col :themes="['success', 'danger']" :value="row.status" dict="sys_normal_disable" />
              <t-icon name="chevron-right" />
            </div>
          </t-list-item>
        </t-list>
      </div>
    </div>
    <div class="flex-1 overflow-y-auto">
      <pre>{{ currentData }}</pre>
    </div>
  </Page>
</template>
