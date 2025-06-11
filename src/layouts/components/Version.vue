<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import PKG from '../../../package.json';

const data = () => {
  console.info({
    language: navigator.language,
    screen: {
      devicePixelRatio: window.devicePixelRatio,
      width: screen.width,
      height: screen.height,
    },
    userAgentData: (navigator as any).userAgentData,
    version: PKG.version,
  });
};
</script>

<template>
  <div @dblclick="data" class="cursor-default select-none">{{ PKG.version }}</div>
</template>
