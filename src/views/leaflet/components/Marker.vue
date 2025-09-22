<script setup lang="ts">
import type { LMarkerOptions } from '.';
import L from 'leaflet';

const { options } = defineProps<{ options: LMarkerOptions }>();
const map = inject<Ref<L.Map>>('mapInstance');

if (map) {
  watch(map, (n) => {
    if (n) initialize(n);
  });
}

const initialize = (mapInstance: L.Map) => {
  const marker = L.marker(options.latlng);

  mapInstance.addLayer(marker);
};
</script>

<template v-if="$slots.default">
  <slot></slot>
</template>
