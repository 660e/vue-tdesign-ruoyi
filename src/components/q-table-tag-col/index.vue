<script setup lang="ts">
import type { TagProps } from 'tdesign-vue-next';
import { useInfoStore } from '@/stores';

const model = defineModel<string | number>({ required: true });
const { dictType, themes } = defineProps<{ dictType: string; themes: TagProps['theme'][] }>();

const infoStore = useInfoStore();
const dicts = infoStore.dicts?.get(dictType) || [];

const dict = dicts?.find((e) => e.dictValue === model.value);
const index = dicts?.findIndex((e) => e.dictValue === model.value);
</script>

<template>
  <t-tag :theme="themes[index]" size="small">{{ dict?.dictLabel }}</t-tag>
</template>
