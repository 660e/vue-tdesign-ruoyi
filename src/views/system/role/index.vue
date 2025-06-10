<script setup lang="ts">
import { listRole } from '@/apis/system';
import { useFullscreenLoading } from '@/stores';
import { Page } from '@/layouts/standard';

const tableData = ref();

const onHandle = async (value: string) => {
  switch (value) {
    case 'refresh':
      useFullscreenLoading().show();
      try {
        const { rows } = await listRole({
          pageNum: 1,
          pageSize: 9999,
        });
        tableData.value = rows;
      } catch {
      } finally {
        useFullscreenLoading().hide();
      }
      break;
  }
};

onMounted(async () => await onHandle('refresh'));
</script>

<template>
  <Page class="flex">
    <div class="w-96 border-r border-neutral-200">
      <t-list size="small" split>
        <t-list-item v-for="row in tableData" class="duration-200 hover:bg-neutral-100" :key="row.roleId">
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
    <div class="flex-1">
      <pre>{{ tableData }}</pre>
    </div>
  </Page>
</template>
