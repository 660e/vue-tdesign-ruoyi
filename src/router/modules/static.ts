import type { RouteRecordRaw } from 'vue-router';

export default [
  {
    path: '/',
    redirect: '/home',
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import('@/login/index.vue'),
      },
    ],
  },
  {
    path: '/home',
    component: () => import('@/layouts/standard/index.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/views/home/index.vue'),
      },
    ],
  },
] as RouteRecordRaw[];
