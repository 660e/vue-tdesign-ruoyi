import type { RouteRecordRaw } from 'vue-router';

export default [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/login/index.vue'),
  },
  {
    path: '/',
    redirect: '/home',
    name: 'layout-standard',
    component: () => import('@/layouts/standard/index.vue'),
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('@/views/home/index.vue'),
      },
    ],
  },
] as RouteRecordRaw[];
