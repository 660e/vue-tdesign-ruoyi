<script setup lang="ts">
import type { QTableProps } from '../types';

defineEmits<{ handle: [value: string] }>();
defineProps<{ operations: QTableProps['operations'] }>();
</script>

<template>
  <div class="flex gap-2">
    <t-link
      v-for="operation in operations"
      :theme="operation.theme || 'primary'"
      @click="$emit('handle', operation.value)"
      class="flex items-center gap-0.5"
      :key="operation.value"
    >
      <t-icon v-if="operation.icon" :name="operation.icon" />
      <span v-if="operation.label">{{ operation.label }}</span>
    </t-link>
  </div>
</template>
