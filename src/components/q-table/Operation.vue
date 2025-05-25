<script setup lang="ts">
defineEmits<{ 'refresh': []; 'data-search': [] }>();
</script>

<template>
  <t-tooltip content="刷新" placement="bottom">
    <t-button @click="$emit('refresh')" shape="circle" variant="outline">
      <template #icon><t-icon name="refresh" /></template>
    </t-button>
  </t-tooltip>
  <t-tooltip content="列设置" placement="bottom">
    <t-button shape="circle" variant="outline">
      <template #icon><t-icon name="view-column" /></template>
    </t-button>
  </t-tooltip>
  <t-tooltip content="高级搜索" placement="bottom">
    <t-button @click="$emit('data-search')" shape="circle" variant="outline">
      <template #icon><t-icon name="data-search" /></template>
    </t-button>
  </t-tooltip>
</template>
