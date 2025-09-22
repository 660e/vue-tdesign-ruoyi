<script setup lang="ts">
import type { LMapOptions } from '.';
import L from 'leaflet';

const { options } = defineProps<{ options: LMapOptions }>();
const attrs = useAttrs() as {
  id: string;
};

const map = ref<L.Map>();
provide('mapInstance', map);

onMounted(() => {
  if (!attrs.id) return;

  map.value = L.map(attrs.id, {
    attributionControl: false,
    center: options.center,
    zoom: options.zoom || 13,
    zoomControl: false,
  });
  L.tileLayer('https://webrd04.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}', {
    maxZoom: options.maxZoom || 18,
    minZoom: options.minZoom || 6,
  }).addTo(map.value);

  //   map.value.on('click', (e: L.LeafletMouseEvent) => {
  //     const latlng = e.latlng;
  //     console.log([latlng.lat, latlng.lng]);
  //   });
});

onUnmounted(() => {
  if (!map.value) return;

  map.value.remove();
  map.value = undefined;
});
</script>

<template>
  <div>
    <slot></slot>
  </div>
</template>
