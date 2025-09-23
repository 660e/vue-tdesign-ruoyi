<script setup lang="ts">
import L from 'leaflet';

defineProps<{ zoom?: boolean }>();

const map = inject<Ref<L.Map>>('mapInstance');
const currentZoom = ref(0);
const maxZoom = ref(0);
const minZoom = ref(0);

if (map) {
  watch(map, (n) => {
    if (n) {
      currentZoom.value = n.getZoom();
      maxZoom.value = n.getMaxZoom();
      minZoom.value = n.getMinZoom();

      map.value.on('zoomend', () => (currentZoom.value = map.value.getZoom()));
    }
  });
}

const zoomIn = () => {
  if (map?.value && currentZoom.value < maxZoom.value) map.value.zoomIn();
};
const zoomOut = () => {
  if (map?.value && currentZoom.value > minZoom.value) map.value.zoomOut();
};

onUnmounted(() => {
  if (map?.value) map.value.off('zoomend');
});
</script>

<template>
  <div class="absolute right-0 bottom-0 z-[1000]">
    <t-icon
      v-leaflet-stop
      class="box-content text-base p-2 mr-4 mb-2 rounded shadow cursor-pointer duration-200 hover:bg-neutral-100 bg-white"
      name="map-aiming"
    />
    <div v-leaflet-stop class="mr-4 mb-4 rounded shadow flex flex-col bg-white">
      <t-icon
        :class="[currentZoom >= maxZoom ? 'cursor-not-allowed text-neutral-400' : 'cursor-pointer hover:bg-neutral-100']"
        @click="zoomIn"
        class="box-content text-base p-2 rounded-tl rounded-tr duration-200"
        name="plus"
      />
      <t-divider class="!m-0" />
      <t-icon
        :class="[currentZoom <= minZoom ? 'cursor-not-allowed text-neutral-400' : 'cursor-pointer hover:bg-neutral-100']"
        @click="zoomOut"
        class="box-content text-base p-2 rounded-bl rounded-br duration-200"
        name="minus"
      />
    </div>
  </div>
</template>
