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
    <Section class="p-4">
      <t-descriptions :column="4" :label-style="{ width: '110px' }" class="flex-2 bg-white" size="small" title="服务器信息" bordered>
        <t-descriptions-item label="服务器名称">{{ serverData?.sys.computerName }}</t-descriptions-item>
        <t-descriptions-item label="操作系统">{{ serverData?.sys.osName }}</t-descriptions-item>
        <t-descriptions-item label="Java名称">{{ serverData?.jvm.name }}</t-descriptions-item>
        <t-descriptions-item label="Java版本">{{ serverData?.jvm.version }}</t-descriptions-item>
        <t-descriptions-item label="服务器IP">{{ serverData?.sys.computerIp }}</t-descriptions-item>
        <t-descriptions-item label="系统架构">{{ serverData?.sys.osArch }}</t-descriptions-item>
        <t-descriptions-item label="启动时间">{{ serverData?.jvm.startTime }}</t-descriptions-item>
        <t-descriptions-item label="运行时长">{{ serverData?.jvm.runTime }}</t-descriptions-item>
        <t-descriptions-item :span="2" label="安装路径">{{ serverData?.jvm.home }}</t-descriptions-item>
        <t-descriptions-item :span="2" label="项目路径">{{ serverData?.sys.userDir }}</t-descriptions-item>
        <t-descriptions-item :span="4" label="运行参数">{{ serverData?.jvm.inputArgs }}</t-descriptions-item>
      </t-descriptions>
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
