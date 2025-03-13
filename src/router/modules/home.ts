import type { RouteRecordRaw } from 'vue-router';

export default {
  path: '/',
  redirect: '/login',
  children: [
    {
      path: 'home',
      component: () => import('@/views/home/index.vue'),
    },
    {
      path: 'login',
      component: () => import('@/login/index.vue'),
    },
  ],
} as RouteRecordRaw;
