<script setup lang="ts">
defineOptions({ inheritAttrs: false });
</script>

<template>
  <div class="h-full p-4">
    <div :class="$attrs.class" class="h-full overflow-y-auto rounded border border-neutral-200 bg-white">
      <slot></slot>
    </div>
  </div>
</template>
