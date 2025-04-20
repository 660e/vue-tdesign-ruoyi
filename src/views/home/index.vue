<script setup lang="ts">
import { useInfoStore } from '@/stores';

import Page from '@/layouts/standard/Page.vue';

const infoStore = useInfoStore();

console.log(infoStore.permissions);
console.log(infoStore.roles);
console.log(infoStore.user);
console.log(infoStore.routers);
console.log(infoStore.dicts.get('sys_user_sex'));
</script>

<template>
  <Page class="flex justify-center items-center">
    <img class="h-20" src="@/assets/logo.svg" />
  </Page>
</template>
