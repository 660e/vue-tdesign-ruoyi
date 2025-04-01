<script setup lang="tsx">
import Page from '@/layouts/standard/Page.vue';
import type { TableProps } from 'tdesign-vue-next';
import { randomuser } from '@/apis/example';

const tableData = ref();
const columns: TableProps['columns'] = [
  {
    title: '姓名',
    cell: (_, { row }) => `${row.name.first} ${row.name.last}`,
  },
  {
    title: '性别',
    cell: (h, { row }) => {
      switch (row.gender) {
        case 'male':
          return <t-icon class="text-blue-500" name="gender-male" />;
        case 'female':
          return <t-icon class="text-red-500" name="gender-female" />;
        default:
          return '';
      }
    },
  },
];

onMounted(async () => {
  const { results, info } = await randomuser({ results: 20 });

  tableData.value = results;
  console.log(info);
});
</script>

<template>
  <Page>
    <q-table :columns="columns" :data="tableData" />
  </Page>
</template>
