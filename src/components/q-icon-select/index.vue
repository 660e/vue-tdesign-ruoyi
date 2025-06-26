<script setup lang="ts">
import { manifest } from 'tdesign-icons-vue-next';

const model = defineModel<string | undefined>('modelValue', { required: true });
</script>

<template>
  <t-select v-model="model" :popup-props="{ overlayInnerClassName: 'q-icon-select__popup' }" class="q-icon-select">
    <t-option v-for="option in manifest" :value="option.stem" :key="option.stem">
      <t-icon :name="option.stem" />
    </t-option>
    <template #valueDisplay><t-icon :name="model" class="mr-2" />{{ model }}</template>
  </t-select>
</template>

<style>
.q-icon-select__popup {
  width: 600px;
}
.q-icon-select__popup .t-select__list {
  padding: theme('space.2');
  display: flex;
  flex-wrap: wrap;
}
.q-icon-select__popup .t-select-option {
  font-size: theme('space.6');
  height: auto;
  margin: 0;
  padding: theme('space.1');
}
.q-icon-select__popup .t-select-option > span {
  display: flex;
}
</style>
