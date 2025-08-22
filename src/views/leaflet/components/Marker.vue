<script setup lang="ts">
import L from 'leaflet';

const map = inject<Ref<L.Map>>('mapInstance');

if (map) {
  watch(map, (n) => {
    if (n) {
      console.log(n);
    }
  });
}
</script>

<template>
  <div></div>
</template>
