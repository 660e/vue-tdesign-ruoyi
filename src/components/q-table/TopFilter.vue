<script setup lang="ts">
import type { FormInstanceFunctions, FormProps } from 'tdesign-vue-next';
import type { QTableProps } from '../types';
import { useElementSize } from '@vueuse/core';

const { columns } = defineProps<{ columns: QTableProps['columns'] }>();

const formRef = ref<FormInstanceFunctions>();
const formData = reactive<Record<string, string>>({});

const items = useTemplateRef('formRef');
const { width } = useElementSize(items);
const cols = computed(() => Math.floor(width.value / 260));

const more = ref(false);

const filters = computed(() => columns.filter((column) => column.colKey && column._topFilter));
const sliceFilters = computed(() => filters.value.slice(0, cols.value));

const onSubmit: FormProps['onSubmit'] = () => {
  console.log(formData);
};
</script>

<template>
  <div class="px-4 pt-4">
    <t-form :data="formData" @submit="onSubmit" class="gap-2 flex" label-width="0" layout="inline" ref="formRef">
      <div :style="{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }" class="flex-1 grid gap-2">
        <t-form-item v-for="filter in more ? filters : sliceFilters" :name="filter.colKey" class="!m-0 !min-w-auto" :key="filter.colKey">
          <t-input v-model="formData[filter.colKey!]" label="用户名称" />
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
