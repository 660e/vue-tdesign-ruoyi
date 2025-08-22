<script setup lang="ts">
// import { Page } from '@/layouts/standard';
import { LMap, LMarker } from './components';

const markers: [number, number][] = [
  [39.90717677503745, 116.37425243854524],
  [39.908316610451465, 116.41793489456178],
  [39.937563153310435, 116.3962358236313],
  [39.90018509527413, 116.39786660671236],
];
</script>

<template>
  <!-- <Page> -->
  <LMap :options="{ center: [39.90870752436677, 116.39748036861421] }" class="h-screen" id="map">
    <LMarker v-for="(marker, index) in markers" :options="{ latlng: marker }" :key="index" />
  </LMap>
  <!-- </Page> -->
</template>
