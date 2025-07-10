<script setup lang="ts">
import { Page } from '@/layouts/standard';
// import L from 'leaflet';

// // https://webrd04.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}

// let map: L.Map | null = null;

// onMounted(() => {
//   map = L.map('map', {
//     center: [39.906217, 116.397428],
//     zoom: 13,
//     attributionControl: false,
//     zoomControl: false,
//   });
//   L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     minZoom: 6,
//     maxZoom: 18,
//   }).addTo(map);
// });
</script>

<template>
  <Page>
    <l-map class="h-full" />
  </Page>
</template>
