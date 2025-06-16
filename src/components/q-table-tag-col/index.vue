<script setup lang="ts">
import type { TagProps } from 'tdesign-vue-next';
import type { AppSystemDictKey } from '@/types';
import { useDict } from '@/hooks';

const { value, dict, themes } = defineProps<{ value: string; dict: AppSystemDictKey; themes: TagProps['theme'][] }>();

const index = useDict(dict).findIndex((e) => e.value === value);
const item = useDict(dict).find((e) => e.value === value);
</script>

<template>
  <t-tag :theme="themes[index]" size="small" variant="light-outline">{{ item?.label }}</t-tag>
</template>
