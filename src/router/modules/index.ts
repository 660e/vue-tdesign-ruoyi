import type { RouteRecordRaw } from 'vue-router';

export default {
  path: '/',
  redirect: '/home',
  children: [
    {
      path: 'login',
      name: 'login',
      component: () => import('@/login/index.vue'),
    },
  ],
} as RouteRecordRaw;
