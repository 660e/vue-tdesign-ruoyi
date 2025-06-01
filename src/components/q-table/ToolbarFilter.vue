<script setup lang="ts">
import type { FormInstanceFunctions, TNode } from 'tdesign-vue-next';
import type { QTableProps } from '@/types';
import type { QTableTopFilterQueryCondition } from '../types';
import { useElementSize } from '@vueuse/core';
import { useInfoStore } from '@/stores';
import { is } from '@/utils';

const emit = defineEmits<{ 'query-condition-change': [value: QTableTopFilterQueryCondition] }>();
const { items, options } = defineProps<{
  items: QTableProps['columns'];
  options: QTableProps['topFilterOptions'];
}>();

const createEmptyFormData = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result: any = {};

  items.forEach((item) => {
    switch (item.toolbarFilter?.type) {
      case 'date-range':
        result[item.colKey!] = [];
        break;
      case 'input':
      case 'select':
      case 'tree-select':
        result[item.colKey!] = '';
        break;
      default:
        result[item.colKey!] = undefined;
    }
  });

  return result;
};

const more = ref(false);
const { dicts } = useInfoStore();
const formRef = ref<FormInstanceFunctions>();
const formData = reactive(createEmptyFormData());
const formTemplateRef = useTemplateRef('formRef');
const { width: formWidth } = useElementSize(formTemplateRef);
const colCount = computed(() => Math.floor(formWidth.value / 260));

const itemLabel = (item: QTableProps['column']) => (item.toolbarFilter?.label || item.title) as string | TNode;

const onSubmit = () => {
  const result: QTableTopFilterQueryCondition = {};

  items.forEach((item) => {
    const value = formData[item.colKey!];
    switch (item.toolbarFilter?.type) {
      case 'date-range':
        if (is.array(value) && value.length === 2) {
          result[item.toolbarFilter.keys?.start || 'start'] = value[0];
          result[item.toolbarFilter.keys?.end || 'end'] = value[1];
        }
        break;
      case 'input':
      case 'select':
      case 'tree-select':
        if (value !== '' && value !== undefined) {
          result[item.colKey!] = value;
        }
        break;
    }
  });

  emit('query-condition-change', result);
};
</script>

<template>
  <div class="px-4 pt-4">
    <t-form :data="formData" @submit="onSubmit" class="gap-2 flex" label-width="0" layout="inline" ref="formRef">
      <div :style="{ gridTemplateColumns: `repeat(${colCount}, minmax(0, 1fr))` }" class="flex-1 grid gap-2">
        <t-form-item v-for="item in more ? items : items.slice(0, colCount)" :name="item.colKey" class="!m-0 !min-w-auto" :key="item.colKey">
          <!-- date-range -->
          <t-date-range-picker
            v-if="item.toolbarFilter?.type === 'date-range'"
            v-model="formData[item.colKey!]"
            :label="itemLabel(item)"
            class="w-full"
            clearable
          />

          <!-- input -->
          <t-input v-if="item.toolbarFilter?.type === 'input'" v-model="formData[item.colKey!]" :label="itemLabel(item)" clearable />

          <!-- select -->
          <t-select
            v-if="item.toolbarFilter?.type === 'select'"
            v-model="formData[item.colKey!]"
            :label="itemLabel(item)"
            :options="dicts?.get(item.toolbarFilter?.dict)"
            clearable
          />

          <!-- tree-select -->
          <t-tree-select
            v-if="item.toolbarFilter?.type === 'tree-select'"
            v-model="formData[item.colKey!]"
            :data="options.treeSelect?.[item.colKey!]"
            :keys="item.toolbarFilter.keys"
            :label="itemLabel(item)"
            clearable
          />
        </t-form-item>
      </div>

      <t-button v-if="items.length > colCount" @click="more = !more" variant="text">
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
