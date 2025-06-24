<script setup lang="ts">
// import type { AppUnknownRecord } from '@/types';
// import type { ECharts, EChartsOption } from 'echarts/core';
// import { GaugeChart } from 'echarts/charts';
// import * as echarts from 'echarts/core';
import * as echarts from 'echarts';
import { getServer } from '@/apis/monitor';
import { Section } from '@/layouts/standard';
import { useLoadingStore } from '@/stores';

const loadingStore = useLoadingStore();
const serverData = ref();

let cpuChart: echarts.ECharts | null = null;
// let memChart: ECharts | null = null;
// let jvmChart: ECharts | null = null;

onMounted(async () => {
  loadingStore.show();
  try {
    serverData.value = (await getServer()).data;
    // const { cpu, mem, jvm } = serverData.value;

    cpuChart = echarts.init(document.getElementById('cpu-chart'));
    cpuChart.setOption({
      series: [
        {
          type: 'gauge',
          center: ['50%', '58%'],
          radius: '100%',
          data: [
            {
              value: 50,
              name: 'SCORE',
            },
          ],
        },
      ],
    });
    // cpuChart.setOption(
    //   getChartOptions({
    //     data: [
    //       { item: '用户使用率', count: cpu.used, percent: cpu.used / 100 },
    //       { item: '系统使用率', count: cpu.sys, percent: cpu.sys / 100 },
    //       { item: '当前空闲率', count: cpu.free, percent: cpu.free / 100 },
    //     ],
    //     items: [(item) => ({ name: item.item, value: `${item.count}%` })],
    //     text: `${cpu.cpuNum}核`,
    //   }),
    // );
    // cpuChart?.render();

    // memChart = new Chart({ container: 'mem-chart' });
    // memChart.options(
    //   getChartOptions({
    //     data: [
    //       { item: '已用内存', count: mem.used, percent: mem.used / 100 },
    //       { item: '剩余内存', count: mem.free, percent: mem.free / 100 },
    //     ],
    //     items: [(item) => ({ name: item.item as string, value: `${item.count}G` })],
    //     text: `${mem.total}G`,
    //   }),
    // );
    // memChart?.render();

    // jvmChart = new Chart({ container: 'jvm-chart' });
    // jvmChart.options(
    //   getChartOptions({
    //     data: [
    //       { item: '已用内存', count: jvm.used, percent: jvm.used / 100 },
    //       { item: '剩余内存', count: jvm.usage, percent: jvm.usage / 100 },
    //     ],
    //     items: [(item) => ({ name: item.item as string, value: `${item.count}M` })],
    //     text: `${jvm.total}M`,
    //   }),
    // );
    // jvmChart?.render();
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
        <div class="h-60 bg-neutral-100" id="cpu-chart"></div>
      </Section>
      <Section class="flex-1 p-4">
        <div class="t-descriptions__header">内存</div>
        <div class="h-60 bg-neutral-100" id="mem-chart"></div>
      </Section>
      <Section class="flex-1 p-4">
        <div class="t-descriptions__header">JVM</div>
        <div class="h-60 bg-neutral-100" id="jvm-chart"></div>
      </Section>
    </div>

    <Section>
      <div class="t-descriptions__header">磁盘</div>
      <pre>{{ serverData?.sysFiles }}</pre>
    </Section>
  </div>
</template>
