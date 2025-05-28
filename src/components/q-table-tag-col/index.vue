<script setup lang="ts">
import type { TagProps } from 'tdesign-vue-next';
import { useInfoStore } from '@/stores';

const { value, dictType, themes } = defineProps<{ value: string; dictType: string; themes: TagProps['theme'][] }>();
const { dicts } = useInfoStore();

const index = (dicts?.get(dictType) || []).findIndex((e) => e.dictValue === value);
const dict = (dicts?.get(dictType) || []).find((e) => e.dictValue === value);
</script>

<template>
  <t-tag :theme="themes[index]" size="small">{{ dict?.dictLabel }}</t-tag>
</template>
