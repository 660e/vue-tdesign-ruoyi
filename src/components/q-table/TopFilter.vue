<script setup lang="ts">
import type { FormInstanceFunctions } from 'tdesign-vue-next';
import type { QTableProps, QTableTopFilterQueryCondition } from '../types';
import { useElementSize } from '@vueuse/core';
import { useInfoStore } from '@/stores';
import { is } from '@/utils';

defineEmits<{ 'query-condition-change': [value: QTableTopFilterQueryCondition] }>();

const { filterItems } = defineProps<{ filterItems: QTableProps['columns'] }>();
const { dicts } = useInfoStore();
const more = ref(false);

const formRef = ref<FormInstanceFunctions>();
const formData = reactive<QTableTopFilterQueryCondition>({});
const formTemplateRef = useTemplateRef('formRef');
const { width: formWidth } = useElementSize(formTemplateRef);
const colCount = computed(() => Math.floor(formWidth.value / 260));

const formItemLabel = (item: QTableProps['column']) => {
  return item.topFilter?.label || (is.string(item.title) ? item.title : '-');
};
</script>

<template>
  <div class="px-4 pt-4">
    <t-form :data="formData" @submit="$emit('query-condition-change', formData)" class="gap-2 flex" label-width="0" layout="inline" ref="formRef">
      <div :style="{ gridTemplateColumns: `repeat(${colCount}, minmax(0, 1fr))` }" class="flex-1 grid gap-2">
        <t-form-item
          v-for="item in more ? filterItems : filterItems.slice(0, colCount)"
          :name="item.colKey"
          class="!m-0 !min-w-auto"
          :key="item.colKey"
        >
          <!-- input -->
          <t-input v-if="item.topFilter?.type === 'input'" v-model="formData[item.colKey!]">
            <template #label>{{ formItemLabel(item) }}</template>
          </t-input>

          <!-- select -->
          <t-select v-if="item.topFilter?.type === 'select'" v-model="formData[item.colKey!]" :options="dicts?.get(item.topFilter?.dict)">
            <template #label>{{ formItemLabel(item) }}</template>
          </t-select>
        </t-form-item>
      </div>

      <t-button v-if="filterItems.length > colCount" @click="more = !more" variant="text">
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
