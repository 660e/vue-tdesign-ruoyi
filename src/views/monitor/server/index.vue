<script setup lang="ts">
import * as echarts from 'echarts';
import { getServer } from '@/apis/monitor';
import { Section } from '@/layouts/standard';
import { useLoadingStore } from '@/stores';

const loadingStore = useLoadingStore();
const serverData = ref();

const getOption = (data: { value: string }[]) => {
  return {
    series: [
      {
        type: 'gauge',
        center: ['50%', '58%'],
        radius: '100%',
        progress: { show: true },
        detail: { formatter: '{value}%', fontSize: 16 },
        data,
      },
    ],
  };
};

let cpuChart: echarts.ECharts | null = null;
let memChart: echarts.ECharts | null = null;
let jvmChart: echarts.ECharts | null = null;

onMounted(async () => {
  loadingStore.show();
  try {
    serverData.value = (await getServer()).data;
    const { cpu, mem, jvm } = serverData.value;

    cpuChart = echarts.init(document.getElementById('cpu-chart'));
    cpuChart.setOption(getOption([{ value: cpu.used }]));

    memChart = echarts.init(document.getElementById('mem-chart'));
    memChart.setOption(getOption([{ value: ((mem.used / mem.total) * 100).toFixed(2) }]));

    jvmChart = echarts.init(document.getElementById('jvm-chart'));
    jvmChart.setOption(getOption([{ value: ((jvm.used / jvm.total) * 100).toFixed(2) }]));
  } catch {
  } finally {
    loadingStore.hide();
  }
});
</script>

<template>
  <div class="p-4 grid gap-4">
    <Section class="p-4">
      <t-descriptions :column="4" :label-style="{ width: '110px' }" size="small" title="服务器信息" bordered>
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

    <div class="flex gap-4">
      <Section class="flex-1 p-4">
        <div class="t-descriptions__header">CPU</div>
        <div class="h-60 rounded bg-neutral-100" id="cpu-chart"></div>
      </Section>
      <Section class="flex-1 p-4">
        <div class="t-descriptions__header">内存</div>
        <div class="h-60 rounded bg-neutral-100" id="mem-chart"></div>
      </Section>
      <Section class="flex-1 p-4">
        <div class="t-descriptions__header">JVM</div>
        <div class="h-60 rounded bg-neutral-100" id="jvm-chart"></div>
      </Section>
    </div>

    <Section v-for="(disk, index) in serverData?.sysFiles" class="p-4" :key="index">
      <div class="t-descriptions__header flex justify-between items-center">
        <div>磁盘{{ index + 1 }}</div>
        <span class="text-sm font-normal">已使用 {{ disk.used }} / {{ disk.total }}</span>
      </div>
      <div class="h-4 flex rounded overflow-hidden bg-neutral-100">
        <b :style="{ width: `${(parseInt(disk.used) / parseInt(disk.total)) * 100}%` }" class="bg-blue-200"></b>
      </div>
    </Section>
  </div>
</template>
