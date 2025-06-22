<script setup lang="ts">
import { getServer } from '@/apis/monitor';
import { useLoadingStore } from '@/stores';

const loadingStore = useLoadingStore();
const serverData = ref();

onMounted(async () => {
  loadingStore.show();
  try {
    serverData.value = await getServer();
  } catch {
  } finally {
    loadingStore.hide();
  }
});
</script>

<template>
  <pre>{{ serverData }}</pre>
</template>
