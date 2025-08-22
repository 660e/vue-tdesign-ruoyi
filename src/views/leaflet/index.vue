<script setup lang="ts">
import { Page } from '@/layouts/standard';
import { L } from './components';
</script>

<template>
  <Page>
    <L.Map :options="{ center: [39.906217, 116.397428] }" class="h-full" id="map" />
  </Page>
</template>
