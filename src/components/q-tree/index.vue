<script setup lang="ts">
import type { InputProps } from 'tdesign-vue-next';

defineOptions({ inheritAttrs: false });

const onChange: InputProps['onChange'] = (value) => {
  console.log(value);
};
</script>

<template>
  <div class="w-full p-4">
    <t-input @change="onChange" class="w-full mb-1">
      <template #prefix-icon><t-icon name="search" /></template>
    </t-input>
    <t-tree v-bind="$attrs" line />
  </div>
</template>
