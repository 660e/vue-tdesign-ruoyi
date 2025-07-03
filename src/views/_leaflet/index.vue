<script setup lang="ts">
import L from 'leaflet';

onMounted(() => {
  const map = L.map('map').setView([39.906217, 116.397428], 13);
  L.tileLayer('https://webrd04.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}', {
    minZoom: 6,
    maxZoom: 18,
  }).addTo(map);
});
</script>

<template>
  <div class="h-screen" id="map"></div>
</template>
