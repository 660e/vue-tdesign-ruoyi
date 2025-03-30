<script setup lang="ts">
import type { FormInstanceFunctions, FormProps } from 'tdesign-vue-next';

const formRef = ref<FormInstanceFunctions>();
const formData = reactive({
  userName: '',
});

const more = ref(false);

const onSubmit: FormProps['onSubmit'] = () => {
  console.log(formData);
};
</script>

<template>
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
</template>
