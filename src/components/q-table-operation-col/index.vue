<script setup lang="tsx">
import type { QTableOperation } from '@/types';

defineProps<{ operations: QTableOperation[] }>();

const emit = defineEmits<{ handle: [value: string] }>();

const emitHandle = (operation: QTableOperation) => {
  if (operation.popconfirm) return;
  emit('handle', operation.value);
};

const OperationLink = ({ operation }: { operation: QTableOperation }) => {
  return (
    <t-link theme={operation.theme || 'primary'} onClick={() => emitHandle(operation)} class="flex items-center gap-0.5">
      {operation.icon && <t-icon name={operation.icon} />}
      {operation.label && <span>{operation.label}</span>}
    </t-link>
  );
};
</script>

<template>
  <div class="flex gap-2">
    <template v-for="operation in operations" :key="operation.value">
      <t-popconfirm
        v-if="operation.popconfirm"
        :content="operation.popconfirm.content"
        :on-confirm="() => $emit('handle', operation.value)"
        :theme="operation.popconfirm.theme || 'danger'"
        placement="left"
      >
        <OperationLink :operation="operation" />
      </t-popconfirm>
      <OperationLink v-else :operation="operation" />
    </template>
  </div>
</template>
