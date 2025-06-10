<script setup lang="ts">
import type { TagProps } from 'tdesign-vue-next';
import type { AppSystemDictKey } from '@/types';
import { useAppStore } from '@/stores';

const { value, dict, themes } = defineProps<{ value: string; dict: AppSystemDictKey; themes: TagProps['theme'][] }>();
const { dicts } = useAppStore();

const index = (dicts?.get(dict) || []).findIndex((e) => e.value === value);
const item = (dicts?.get(dict) || []).find((e) => e.value === value);
</script>

<template>
  <t-tag :theme="themes[index]" size="small" variant="light">{{ item?.label }}</t-tag>
</template>
