<script setup lang="ts">
import { Page } from '@/layouts/standard';
import L from 'leaflet';

let map: L.Map | null = null;

onMounted(() => {
  map = L.map('map', {
    center: [39.906217, 116.397428],
    zoom: 13,
    attributionControl: false,
  });
  L.tileLayer('https://webrd04.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}', {
    minZoom: 6,
    maxZoom: 18,
  }).addTo(map);
});
</script>

<template>
  <Page>
    <div class="h-full" id="map"></div>
  </Page>
</template>
