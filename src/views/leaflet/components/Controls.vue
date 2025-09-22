<script setup lang="ts">
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
    <div v-if="zoom" :style="{ borderRadius: 'var(--td-radius-default)' }" class="flex flex-col m-4 shadow bg-white">
      <t-button @click="zoomIn" shape="square" theme="default" variant="text">
        <template #icon><t-icon name="plus" /></template>
      </t-button>
      <t-divider class="!m-0" />
      <t-button @click="zoomOut" shape="square" theme="default" variant="text">
        <template #icon><t-icon name="minus" /></template>
      </t-button>
    </div>
  </div>
</template>
