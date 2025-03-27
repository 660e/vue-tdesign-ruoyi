<script setup lang="ts">
import Page from '@/layouts/standard/Page.vue';
import type { FormInstanceFunctions, FormProps, TableProps } from 'tdesign-vue-next';

const formRef = ref<FormInstanceFunctions>();
const formData = reactive({
  userName: '',
});

const more = ref(false);

const onSubmit: FormProps['onSubmit'] = () => {
  console.log(formData);
};

const tableData = ref();
const columns: TableProps['columns'] = [
  {
    colKey: 'userName',
    title: '用户名称',
  },
];
const pagination = reactive({
  current: 1,
  pageSize: 10,
  total: 1000,
});

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
  <Page class="flex flex-col">
    <div class="px-4 pt-4">
      <t-form :data="formData" @submit="onSubmit" class="gap-2 flex" label-width="0" layout="inline" ref="formRef">
        <div class="flex-1 grid gap-2 grid-cols-3 2xl:grid-cols-4 overflow-hidden">
          <t-form-item v-for="n in 10" class="!m-0" name="userName" :key="n">
            <t-input v-model="formData.userName" label="用户名称" />
          </t-form-item>
        </div>
        <t-button @click="more = !more" variant="text">
          <template #icon>
            <t-icon name="unfold-more" />
          </template>
        </t-button>
        <t-button theme="default" type="reset">
          <template #icon>
            <t-icon name="load" />
          </template>
          <span>重置</span>
        </t-button>
        <t-button type="submit">
          <template #icon>
            <t-icon name="search" />
          </template>
          <span>搜索</span>
        </t-button>
      </t-form>
    </div>
    <div class="p-4 flex gap-2 border-b border-neutral-200">
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
      <div class="flex-1"></div>
      <t-tooltip content="刷新" placement="bottom">
        <t-button shape="circle" variant="outline">
          <template #icon>
            <t-icon name="refresh" />
          </template>
        </t-button>
      </t-tooltip>
      <t-tooltip content="列设置" placement="bottom">
        <t-button shape="circle" variant="outline">
          <template #icon>
            <t-icon name="view-column" />
          </template>
        </t-button>
      </t-tooltip>
      <t-tooltip content="高级搜索" placement="bottom">
        <t-button shape="circle" variant="outline">
          <template #icon>
            <t-icon name="data-search" />
          </template>
        </t-button>
      </t-tooltip>
    </div>
    <div class="flex-1 overflow-auto">
      <t-table :columns="columns" :data="tableData" class="h-full" height="100%" row-key="id" hover />
    </div>
    <div class="p-4 flex gap-2">
      <t-button theme="default">
        <template #icon>
          <t-icon name="upload" />
        </template>
        <span>导入</span>
      </t-button>
      <t-button theme="default">
        <template #icon>
          <t-icon name="download" />
        </template>
        <span>导出</span>
      </t-button>
      <t-pagination :total="pagination.total" class="flex-1" show-jumper />
    </div>
  </Page>
</template>
