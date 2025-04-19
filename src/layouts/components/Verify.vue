<script setup lang="ts">
const text = ref('Loading...');
const percentage = ref(0);
</script>

<template>
  <div class="h-screen flex flex-col justify-center items-center gap-4">
    <div class="text-sm leading-none">{{ text }}</div>
    <t-progress :label="false" :percentage="percentage" class="w-1/3" />
  </div>
</template>
