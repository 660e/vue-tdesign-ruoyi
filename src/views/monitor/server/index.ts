export function getCpuChartOptions(data) {
  return {
    type: 'view',
    autoFit: true,
    coordinate: { type: 'theta', outerRadius: 0.8, innerRadius: 0.5 },
    children: [
      {
        type: 'interval',
        data: [
          { item: '用户使用率', count: data.used, percent: data.used / 100 },
          { item: '系统使用率', count: data.sys, percent: data.sys / 100 },
          { item: '当前空闲率', count: data.free, percent: data.free / 100 },
        ],
        encode: { y: 'percent', color: 'item' },
        transform: [{ type: 'stackY' }],
        legend: {
          color: { position: 'bottom', layout: { justifyContent: 'center' } },
        },
        tooltip: {
          items: [
            (value) => ({
              name: value.item,
              value: `${value.percent * 100}%`,
            }),
          ],
        },
      },
      {
        type: 'text',
        style: { text: `${data.cpuNum}核`, x: '50%', y: '50%', fontSize: 20, textAlign: 'center' },
      },
    ],
  };
}
