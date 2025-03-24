<script setup lang="ts">
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
  current: 2,
  pageSize: 5,
  total: 100,
  showJumper: true,
});

onMounted(() => {
  tableData.value = [
    { id: 1, userName: '张三' },
    { id: 2, userName: '李四' },
  ];
});
</script>

<template>
  <div class="h-full p-4 flex flex-col gap-4">
    <div class="p-4 rounded border border-neutral-200 bg-white">
      <t-form :data="formData" @submit="onSubmit" class="flex gap-2" label-width="0" ref="formRef">
        <t-form-item name="userName">
          <t-input v-model="formData.userName" label="用户名称" />
        </t-form-item>
        <t-button theme="default" type="reset">重置</t-button>
        <t-button type="submit">搜索</t-button>
      </t-form>
    </div>
    <div class="flex-1 flex flex-col rounded border border-neutral-200 bg-white">
      <div class="p-4 flex gap-2 border-b border-neutral-200">
        <t-button>新增</t-button>
        <t-button theme="default">删除</t-button>
        <t-button theme="default">导出</t-button>
        <t-button theme="default">导入</t-button>
      </div>
      <t-table :columns="columns" :data="tableData" :pagination="pagination" class="flex-1" row-key="id" />
      <div>pagination</div>
    </div>
  </div>
</template>
