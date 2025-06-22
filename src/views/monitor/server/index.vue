<script setup lang="ts">
import { getServer } from '@/apis/monitor';
import { Section } from '@/layouts/standard';
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
  <div class="p-4 grid gap-4">
    <Section>
      <div>服务器信息</div>
      <pre>{{ serverData?.sys }}</pre>
    </Section>

    <Section>
      <div>虚拟机信息</div>
      <pre>{{ serverData?.jvm }}</pre>
    </Section>

    <Section>
      <div>CPU</div>
      <pre>{{ serverData?.cpu }}</pre>
    </Section>

    <Section>
      <div>内存</div>
      <pre>{{ serverData?.mem }}</pre>
    </Section>

    <Section>
      <div>磁盘</div>
      <pre>{{ serverData?.sysFiles }}</pre>
    </Section>
  </div>
</template>
