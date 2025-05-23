<script setup lang="ts">
import type { QTableProps } from '../types';

defineProps<{ handles: QTableProps['handles'] }>();
defineEmits<{ handle: [value: string] }>();
</script>

<template>
  <div class="flex gap-2">
    <t-link v-for="handle in handles" :theme="handle.theme || 'primary'" @click="$emit('handle', handle.value)" :key="handle.value">
      {{ handle.label }}
    </t-link>
  </div>
</template>
