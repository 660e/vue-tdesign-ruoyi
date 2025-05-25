<script setup lang="ts">
import type { FormInstanceFunctions, FormProps } from 'tdesign-vue-next';
import type { QTableProps } from '../types';
import { useElementSize } from '@vueuse/core';
import { useInfoStore } from '@/stores';
import { is } from '@/utils';

const { columns } = defineProps<{ columns: QTableProps['columns'] }>();
const filters = computed(() => columns.filter((column) => column.colKey && column._topFilter));

const more = ref(false);
const infoStore = useInfoStore();

const formRef = ref<FormInstanceFunctions>();
const formData = reactive<Record<string, string>>({});
const formTemplateRef = useTemplateRef('formRef');
const { width: formWidth } = useElementSize(formTemplateRef);
const colCount = computed(() => Math.floor(formWidth.value / 260));

const formItemLabel = (filter: QTableProps['column']) => {
  return filter._topFilter?.label || (is.string(filter.title) ? filter.title : '-');
};

const onSubmit: FormProps['onSubmit'] = () => {
  console.log(formData);
};
</script>

<template>
  <div class="px-4 pt-4">
    <t-form :data="formData" @submit="onSubmit" class="gap-2 flex" label-width="0" layout="inline" ref="formRef">
      <div :style="{ gridTemplateColumns: `repeat(${colCount}, minmax(0, 1fr))` }" class="flex-1 grid gap-2">
        <t-form-item
          v-for="filter in more ? filters : filters.slice(0, colCount)"
          :name="filter.colKey"
          class="!m-0 !min-w-auto"
          :key="filter.colKey"
        >
          <!-- input -->
          <t-input v-if="filter._topFilter?.type === 'input'" v-model="formData[filter.colKey!]">
            <template #label>{{ formItemLabel(filter) }}</template>
          </t-input>

          <!-- select -->
          <t-select v-if="filter._topFilter?.type === 'select'" v-model="formData[filter.colKey!]">
            <template #label>{{ formItemLabel(filter) }}</template>
            <t-option
              v-for="option in infoStore.dicts?.get(filter._topFilter?.dictType)"
              :label="option.dictLabel"
              :value="option.dictValue"
              :key="option.dictValue"
            />
          </t-select>
        </t-form-item>
      </div>

      <t-button v-if="filters.length > colCount" @click="more = !more" variant="text">
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
