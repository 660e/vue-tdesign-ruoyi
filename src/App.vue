<script setup lang="ts">
import type { GlobalConfigProvider } from 'tdesign-vue-next';

const globalConfig: GlobalConfigProvider = {};
</script>

<template>
  <t-config-provider :global-config="globalConfig">
    <RouterView />
  </t-config-provider>
</template>
