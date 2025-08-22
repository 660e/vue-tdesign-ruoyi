<script setup lang="ts">
// import { Page } from '@/layouts/standard';
import { LMap, LMarker } from './components';
</script>

<template>
  <!-- <Page> -->
  <LMap :options="{ center: [39.906217, 116.397428] }" class="h-screen" id="map">
    <LMarker :options="{ latlng: [39.906217, 116.397428] }" />
  </LMap>
  <!-- </Page> -->
</template>
