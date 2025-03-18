import type { RouteRecordRaw } from 'vue-router';

export default {
  path: '/',
  children: [
    {
      path: '',
      name: 'home',
      component: () => import('@/views/home/index.vue'),
    },
    {
      path: 'login',
      name: 'login',
      component: () => import('@/login/index.vue'),
    },
  ],
} as RouteRecordRaw;
