<script setup lang="ts">
import type { QTableProps } from '../types';

defineEmits<{ handle: [value: string] }>();
defineProps<{ operations: QTableProps['operations'] }>();
</script>

<template>
  <div class="flex gap-2">
    <template v-for="operation in operations" :key="operation.value">
      <t-popconfirm
        v-if="operation.popconfirm"
        :content="operation.popconfirm.content"
        :on-confirm="() => $emit('handle', operation.value)"
        :theme="operation.popconfirm.theme || 'danger'"
      >
        <t-link :theme="operation.theme || 'primary'" class="flex items-center gap-0.5">
          <t-icon v-if="operation.icon" :name="operation.icon" />
          <span v-if="operation.label">{{ operation.label }}</span>
        </t-link>
      </t-popconfirm>
      <t-link v-else :theme="operation.theme || 'primary'" @click="$emit('handle', operation.value)" class="flex items-center gap-0.5">
        <t-icon v-if="operation.icon" :name="operation.icon" />
        <span v-if="operation.label">{{ operation.label }}</span>
      </t-link>
    </template>
  </div>
</template>
