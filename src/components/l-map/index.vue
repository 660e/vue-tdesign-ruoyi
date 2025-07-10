<script setup lang="ts">
import L from 'leaflet';

const attrs = useAttrs() as {
  id: string;
};

let map: L.Map | null = null;

onMounted(() => {
  if (!attrs.id) return;

  map = L.map(attrs.id, {
    center: [39.906217, 116.397428],
    zoom: 13,
    attributionControl: false,
    zoomControl: false,
  });
  L.tileLayer('https://webrd04.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}', {
    minZoom: 6,
    maxZoom: 18,
  }).addTo(map);
});

onUnmounted(() => {
  if (!map) return;

  map.remove();
  map = null;
});
</script>

<template>
  <div>
    <slot></slot>
  </div>
</template>
