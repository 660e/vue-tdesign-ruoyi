<script setup lang="ts">
import type { QTableProps } from '../types';

defineEmits<{ handle: [value: string] }>();
defineProps<{ handles: QTableProps['handles'] }>();
</script>

<template>
  <div class="flex gap-2">
    <t-link
      v-for="handle in handles"
      :theme="handle.theme || 'primary'"
      @click="$emit('handle', handle.value)"
      class="flex items-center gap-0.5"
      :key="handle.value"
    >
      <t-icon v-if="handle.icon" :name="handle.icon" />
      <span v-if="handle.label">{{ handle.label }}</span>
    </t-link>
  </div>
</template>
