import type { RouteRecordRaw } from 'vue-router';

export default [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/login/index.vue'),
  },
  {
    path: '/',
    name: 'layout-standard',
    component: () => import('@/layouts/standard/index.vue'),
    redirect: '/home',
    meta: {
      icon: 'desktop',
    },
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('@/views/home/index.vue'),
        meta: {
          icon: 'home',
          title: '首页',
        },
      },
    ],
  },
  {
    path: '/example',
    children: [
      {
        path: 'playground',
        component: () => import('@/views/example/Playground.vue'),
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/404.vue'),
  },
] as RouteRecordRaw[];
