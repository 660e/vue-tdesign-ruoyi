<script setup lang="ts">
import type { TagProps } from 'tdesign-vue-next';
import type { AppSystemDictKey } from '@/types';
import { useInfoStore } from '@/stores';

const { value, dict, themes } = defineProps<{ value: string; dict: AppSystemDictKey; themes: TagProps['theme'][] }>();
const { dicts } = useInfoStore();

const index = (dicts?.get(dict) || []).findIndex((e) => e.value === value);
const item = (dicts?.get(dict) || []).find((e) => e.value === value);
</script>

<template>
  <t-tag :theme="themes[index]" size="small">{{ item?.label }}</t-tag>
</template>
