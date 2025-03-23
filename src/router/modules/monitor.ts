import type { RouteRecordRaw } from 'vue-router';

export default {
  path: '/monitor',
  component: () => import('@/layouts/standard/index.vue'),
  children: [
    {
      path: 'job',
      name: 'monitor-job',
      component: () => import('@/views/monitor/job/index.vue'),
    },
    {
      path: 'online',
      name: 'monitor-online',
      component: () => import('@/views/monitor/online/index.vue'),
    },
    {
      path: 'server',
      name: 'monitor-server',
      component: () => import('@/views/monitor/server/index.vue'),
    },
  ],
} as RouteRecordRaw;
