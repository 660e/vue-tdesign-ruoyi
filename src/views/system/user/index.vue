<script setup lang="tsx">
import type { QTableProps } from '@/components/types';
import { randomuser } from '@/apis/example';
import { useLoadingStore } from '@/stores';

import Page from '@/layouts/standard/Page.vue';

const { showFullscreenLoading, hideFullscreenLoading } = useLoadingStore();

const tableData = ref();
const columns: QTableProps['columns'] = [
  {
    title: '姓名',
    cell: (_, { row }) => `${row.name.first} ${row.name.last}`,
    width: 200,
    _filter: true,
  },
  {
    title: '性别',
    cell: (_, { row }) => {
      switch (row.gender) {
        case 'male':
          return <t-icon class="text-blue-500" name="gender-male" />;
        case 'female':
          return <t-icon class="text-red-500" name="gender-female" />;
        default:
          return '-';
      }
    },
    width: 100,
    _filter: {
      type: 'select',
    },
  },
  { title: '手机', colKey: 'phone', width: 200 },
  { title: '邮箱', colKey: 'email' },
];

onMounted(async () => {
  showFullscreenLoading();

  try {
    const { results, info } = await randomuser({ results: 20 });

    tableData.value = results;
    console.log(info);
  } catch {
  } finally {
    hideFullscreenLoading();
  }
});
</script>

<template>
  <Page>
    <q-table :columns="columns" :data="tableData">
      <template #header>
        <t-button>
          <template #icon>
            <t-icon name="add" />
          </template>
          <span>新增</span>
        </t-button>
        <t-button theme="danger">
          <template #icon>
            <t-icon name="delete" />
          </template>
          <span>删除</span>
        </t-button>
      </template>
    </q-table>
  </Page>
</template>
