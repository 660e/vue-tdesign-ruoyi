<script setup lang="ts">
defineOptions({ inheritAttrs: false });
</script>

<template>
  <div class="p-4">
    <t-tree v-bind="$attrs" line />
  </div>
</template>
