<script setup lang="ts">
import { Page } from '@/layouts/admin';
import { LMap, LMarker } from './components';

const markers: [number, number][] = [
  [39.95383279178168, 116.41542434692384],
  [39.91566130435608, 116.44409179687501],
  [39.87997146678059, 116.41061782836915],
  [39.91605629078665, 116.35190963745119],
];
</script>

<template>
  <Page>
    <LMap :options="{ center: [39.90870752436677, 116.39748036861421] }" class="h-full" id="map">
      <LMarker v-for="(marker, index) in markers" :options="{ latlng: marker }" :key="index" />
    </LMap>
  </Page>
</template>
