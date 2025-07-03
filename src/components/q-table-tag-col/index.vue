<script setup lang="ts">
import type { TagProps } from 'tdesign-vue-next';
import type { AppSystemDictKey } from '@/types';
import { useDict } from '@/hooks';

const { value, dict, themes } = defineProps<{ value: number | string; dict: AppSystemDictKey; themes?: TagProps['theme'][] }>();

const index = useDict(dict).findIndex((e) => e.value === String(value));
const item = useDict(dict).find((e) => e.value === String(value));
</script>

<template>
  <t-tag :theme="themes?.[index]" class="q-table-tag-col" size="small" variant="light-outline">{{ item?.label }}</t-tag>
</template>
