<script setup lang="ts">
import type { FormInstanceFunctions, FormProps } from 'tdesign-vue-next';
import { useElementSize } from '@vueuse/core';

const formRef = ref<FormInstanceFunctions>();
const formData = reactive({
  userName: '',
});

const items = useTemplateRef('formRef');
const { width } = useElementSize(items);
const cols = computed(() => Math.floor(width.value / 260));

const more = ref(false);

const filters = Array(5).fill(0);
const sliceFilters = computed(() => {
  return filters.slice(0, cols.value);
});

const onSubmit: FormProps['onSubmit'] = () => {
  console.log(formData);
};
</script>

<template>
  <div class="px-4 pt-4">
    <t-form :data="formData" @submit="onSubmit" class="gap-2 flex" label-width="0" layout="inline" ref="formRef">
      <div :style="{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }" class="flex-1 grid gap-2">
        <t-form-item v-for="n in more ? filters : sliceFilters" class="!m-0 !min-w-auto" name="userName" :key="n">
          <t-input v-model="formData.userName" label="用户名称" />
        </t-form-item>
      </div>
      <t-button v-if="filters.length > cols" @click="more = !more" variant="text">
        <template #icon><t-icon name="unfold-more" /></template>
      </t-button>
      <t-button theme="default" type="reset">
        <template #icon><t-icon name="load" /></template><span>重置</span>
      </t-button>
      <t-button type="submit">
        <template #icon><t-icon name="search" /></template><span>搜索</span>
      </t-button>
    </t-form>
  </div>
</template>
