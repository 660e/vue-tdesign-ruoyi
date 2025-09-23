<script setup lang="ts">
import L from 'leaflet';

defineProps<{ zoom?: boolean }>();

const map = inject<Ref<L.Map>>('mapInstance');

const zoomIn = () => {
  if (map?.value) map.value.zoomIn();
};
const zoomOut = () => {
  if (map?.value) map.value.zoomOut();
};
</script>

<template>
  <div class="absolute right-0 bottom-0 z-[1000]">
    <t-icon
      v-leaflet-stop
      class="box-content text-base p-2 mr-4 mb-2 rounded shadow cursor-pointer duration-200 hover:bg-neutral-100 bg-white"
      name="map-aiming"
    />
    <div v-leaflet-stop class="mr-4 mb-4 rounded shadow flex flex-col bg-white">
      <t-icon @click="zoomIn" class="box-content text-base p-2 rounded-tl rounded-tr cursor-pointer duration-200 hover:bg-neutral-100" name="plus" />
      <t-divider class="!m-0" />
      <t-icon
        @click="zoomOut"
        class="box-content text-base p-2 rounded-bl rounded-br cursor-pointer duration-200 hover:bg-neutral-100"
        name="minus"
      />
    </div>
  </div>
</template>
