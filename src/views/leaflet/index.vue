<script setup lang="ts">
// import { Page } from '@/layouts/standard';
import { LMap, LMarker } from './components';

const markers: [number, number][] = [
  [39.91, 116.38],
  [39.91, 116.43],
];
</script>

<template>
  <!-- <Page> -->
  <LMap :options="{ center: [39.91, 116.4] }" class="h-screen" id="map">
    <LMarker v-for="(marker, index) in markers" :options="{ latlng: marker }" :key="index" />
  </LMap>
  <!-- </Page> -->
</template>
