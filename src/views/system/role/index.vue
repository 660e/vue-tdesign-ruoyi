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
  <Page>
    <div>
      <pre>{{ tableData }}</pre>
    </div>
  </Page>
</template>
