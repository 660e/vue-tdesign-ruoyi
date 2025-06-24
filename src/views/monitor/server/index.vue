<script setup lang="ts">
import type { AppUnknownRecord } from '@/types';
import { Chart } from '@antv/g2';
import { getServer } from '@/apis/monitor';
import { Section } from '@/layouts/standard';
import { useLoadingStore } from '@/stores';

const loadingStore = useLoadingStore();
const serverData = ref();

const getChartOptions = (data: AppUnknownRecord[], text = '') => {
  return {
    type: 'view',
    autoFit: true,
    coordinate: { type: 'theta', outerRadius: 0.8, innerRadius: 0.5 },
    children: [
      {
        type: 'interval',
        data,
        encode: { y: 'percent', color: 'item' },
        transform: [{ type: 'stackY' }],
        legend: {
          color: { position: 'bottom', layout: { justifyContent: 'center' } },
        },
        tooltip: {
          items: [(value: AppUnknownRecord) => ({ name: value.item, value: `${(value.percent as number) * 100}%` })],
        },
      },
      {
        type: 'text',
        style: { text, x: '50%', y: '50%', fontSize: 20, textAlign: 'center' },
      },
    ],
  };
};

let cpuChart: Chart | null = null;

onMounted(async () => {
  loadingStore.show();
  try {
    serverData.value = (await getServer()).data;

    const { cpu } = serverData.value;
    cpuChart = new Chart({ container: 'cpu-chart' });
    cpuChart.options(
      getChartOptions(
        [
          { item: '用户使用率', count: cpu.used, percent: cpu.used / 100 },
          { item: '系统使用率', count: cpu.sys, percent: cpu.sys / 100 },
          { item: '当前空闲率', count: cpu.free, percent: cpu.free / 100 },
        ],
        `${cpu.cpuNum}核`,
      ),
    );
  } catch {
  } finally {
    cpuChart?.render();
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
        <div class="h-60 bg-neutral-100" id="cpu-chart"></div>
      </Section>
      <Section class="flex-1 p-4">
        <div class="t-descriptions__header">内存</div>
        <pre>{{ serverData?.cpu }}</pre>
      </Section>
      <Section class="flex-1 p-4">
        <div class="t-descriptions__header">内存</div>
        <pre>{{ serverData?.mem }}</pre>
      </Section>
    </div>

    <Section>
      <div class="t-descriptions__header">磁盘</div>
      <pre>{{ serverData?.sysFiles }}</pre>
    </Section>
  </div>
</template>
