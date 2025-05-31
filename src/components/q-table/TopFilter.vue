<script setup lang="ts">
import type { FormInstanceFunctions, TNode } from 'tdesign-vue-next';
import type { QTableProps, QTableTopFilterQueryCondition } from '../types';
import { useElementSize } from '@vueuse/core';
import { useInfoStore } from '@/stores';

defineEmits<{ 'query-condition-change': [value: QTableTopFilterQueryCondition] }>();

const { items, options } = defineProps<{
  items: QTableProps['columns'];
  options: QTableProps['topFilterOptions'];
}>();
const { dicts } = useInfoStore();
const more = ref(false);

const formRef = ref<FormInstanceFunctions>();
const formData = reactive<QTableTopFilterQueryCondition>({});
const formTemplateRef = useTemplateRef('formRef');
const { width: formWidth } = useElementSize(formTemplateRef);
const colCount = computed(() => Math.floor(formWidth.value / 260));

const itemLabel = (item: QTableProps['column']) => (item.topFilter?.label || item.title) as string | TNode;
</script>

<template>
  <div class="px-4 pt-4">
    <t-form :data="formData" @submit="$emit('query-condition-change', formData)" class="gap-2 flex" label-width="0" layout="inline" ref="formRef">
      <div :style="{ gridTemplateColumns: `repeat(${colCount}, minmax(0, 1fr))` }" class="flex-1 grid gap-2">
        <t-form-item v-for="item in more ? items : items.slice(0, colCount)" :name="item.colKey" class="!m-0 !min-w-auto" :key="item.colKey">
          <!-- input -->
          <t-input v-if="item.topFilter?.type === 'input'" v-model="formData[item.colKey!]" :label="itemLabel(item)" />

          <!-- select -->
          <t-select
            v-if="item.topFilter?.type === 'select'"
            v-model="formData[item.colKey!]"
            :label="itemLabel(item)"
            :options="dicts?.get(item.topFilter?.dict)"
          />

          <!-- tree-select -->
          <t-tree-select
            v-if="item.topFilter?.type === 'tree-select'"
            v-model="formData[item.colKey!]"
            :data="options.treeSelect?.[item.colKey!]"
            :keys="item.topFilter.keys"
            :label="itemLabel(item)"
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
