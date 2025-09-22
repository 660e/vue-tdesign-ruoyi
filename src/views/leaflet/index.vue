<script setup lang="ts">
// import { Page } from '@/layouts/standard';
import { LMap } from './components';

// const markers: [number, number][] = [
//   [39.91118463226871, 116.36701583862306],
//   [39.92724662631527, 116.42864227294923],
//   [39.94633180116148, 116.38675689697266],
//   [39.88418673271746, 116.40563964843751],
// ];
</script>

<template>
  <!-- <Page> -->
  <LMap :options="{ center: [39.90870752436677, 116.39748036861421] }" class="h-screen" id="map" />

  <!-- <LMap :options="{  }" class="h-screen" id="map">
    <LMarker v-for="(marker, index) in markers" :options="{ latlng: marker }" :key="index" />
  </LMap> -->
  <!-- </Page> -->
</template>
