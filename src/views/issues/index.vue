<script setup lang="ts">
import { useLoading } from '@/hooks';

const { showFullscreenLoading, hideFullscreenLoading } = useLoading();

const test = (timeout: number) => {
  showFullscreenLoading();
  setTimeout(() => hideFullscreenLoading(), timeout);
};
</script>

<template>
  <div class="h-screen flex justify-center items-center bg-black">
    <div class="pt-40 flex gap-4 relative z-[9999]">
      <t-button @click="test(1000)">1000</t-button>
      <t-button @click="test(4000)">4000</t-button>
      <t-button @click="test(7000)">7000</t-button>
    </div>
  </div>
</template>
