<script setup lang="ts">
import type { FormInstanceFunctions, FormProps } from 'tdesign-vue-next';

const formRef = ref<FormInstanceFunctions>();
const formData = reactive({
  userName: '',
});

const onSubmit: FormProps['onSubmit'] = () => {
  console.log(formData);
};
</script>

<template>
  <div class="h-full flex flex-col">
    <div class="p-4">
      <t-form :data="formData" @submit="onSubmit" class="flex gap-2" label-width="0" ref="formRef">
        <t-form-item name="userName">
          <t-input v-model="formData.userName" label="用户名称" />
        </t-form-item>
        <t-button type="reset" variant="outline">重置</t-button>
        <t-button type="submit">搜索</t-button>
      </t-form>
    </div>
    <div>tool</div>
    <div class="flex-1">table</div>
    <div>page</div>
  </div>
</template>
