import type { RouteRecordRaw } from 'vue-router';

export default {
  path: '/tool',
  component: () => import('@/layouts/standard/index.vue'),
  children: [
    {
      path: 'gen',
      name: 'tool-gen',
      component: () => import('@/views/tool/gen/index.vue'),
    },
  ],
} as RouteRecordRaw;
