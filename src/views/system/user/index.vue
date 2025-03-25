<script setup lang="ts">
import Page from '@/layouts/standard/Page.vue';
import type { FormInstanceFunctions, FormProps, TableProps } from 'tdesign-vue-next';

const formRef = ref<FormInstanceFunctions>();
const formData = reactive({
  userName: '',
});

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
const pagination: TableProps['pagination'] = reactive({
  current: 1,
  pageSize: 10,
  total: 1000,
});

onMounted(() => {
  tableData.value = [
    { id: 1, userName: '张三' },
    { id: 2, userName: '李四' },
  ];
});
</script>

<template>
  <Page class="flex flex-col">
    <div class="px-4 pt-4">
      <t-form :data="formData" @submit="onSubmit" class="flex gap-2" label-width="0" ref="formRef">
        <t-form-item name="userName">
          <t-input v-model="formData.userName" label="用户名称" />
        </t-form-item>
        <t-button theme="default" type="reset">重置</t-button>
        <t-button type="submit">搜索</t-button>
      </t-form>
    </div>
    <div class="p-4 flex gap-2 border-b border-neutral-200">
      <t-button>新增</t-button>
      <t-button theme="default">删除</t-button>
      <t-button theme="default">导出</t-button>
      <t-button theme="default">导入</t-button>
    </div>
    <t-table :columns="columns" :data="tableData" class="flex-1" row-key="id" hover />
    <div class="p-4">
      <t-pagination :total="pagination.total" show-jumper />
    </div>
  </Page>
</template>
