<script setup lang="ts">
import { getServer } from '@/apis/monitor';
import { useLoadingStore } from '@/stores';

const loadingStore = useLoadingStore();
const serverData = ref();

onMounted(async () => {
  loadingStore.show();
  try {
    serverData.value = (await getServer()).data;
  } catch {
  } finally {
    loadingStore.hide();
  }
});
</script>

<template>
  <div>服务器信息</div>
  <pre>{{ serverData?.sys }}</pre>
  <div>虚拟机信息</div>
  <pre>{{ serverData?.jvm }}</pre>
  <div>CPU</div>
  <pre>{{ serverData?.cpu }}</pre>
  <div>内存</div>
  <pre>{{ serverData?.mem }}</pre>
  <div>磁盘</div>
  <pre>{{ serverData?.sysFiles }}</pre>
</template>
