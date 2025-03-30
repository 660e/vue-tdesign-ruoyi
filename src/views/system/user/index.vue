<script setup lang="ts">
import Page from '@/layouts/standard/Page.vue';
import type { TableProps } from 'tdesign-vue-next';

const tableData = ref();
const columns: TableProps['columns'] = [
  {
    colKey: 'userName',
    title: '用户名称',
  },
];

onMounted(() => {
  tableData.value = [
    { id: 1, userName: '1' },
    { id: 2, userName: '2' },
    { id: 3, userName: '3' },
    { id: 4, userName: '4' },
    { id: 5, userName: '5' },
    { id: 6, userName: '6' },
    { id: 7, userName: '7' },
    { id: 8, userName: '8' },
    { id: 9, userName: '9' },
    { id: 10, userName: '10' },
    { id: 11, userName: '11' },
    { id: 12, userName: '12' },
    { id: 13, userName: '13' },
    { id: 14, userName: '14' },
    { id: 15, userName: '15' },
    { id: 16, userName: '16' },
    { id: 17, userName: '17' },
    { id: 18, userName: '18' },
    { id: 19, userName: '19' },
    { id: 20, userName: '20' },
    { id: 21, userName: '21' },
    { id: 22, userName: '22' },
    { id: 23, userName: '23' },
    { id: 24, userName: '24' },
    { id: 25, userName: '25' },
    { id: 26, userName: '26' },
    { id: 27, userName: '27' },
    { id: 28, userName: '28' },
    { id: 29, userName: '29' },
    { id: 30, userName: '30' },
  ];
});
</script>

<template>
  <Page>
    <q-table :columns="columns" :data="tableData" />
  </Page>
</template>
