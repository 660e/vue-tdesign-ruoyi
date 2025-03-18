import type { RouteRecordRaw } from 'vue-router';

export default {
  path: '/',
  children: [
    {
      path: '',
      component: () => import('@/layouts/standard/index.vue'),
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('@/views/home/index.vue'),
        },
      ],
    },
    {
      path: 'login',
      name: 'login',
      component: () => import('@/login/index.vue'),
    },
  ],
} as RouteRecordRaw;
