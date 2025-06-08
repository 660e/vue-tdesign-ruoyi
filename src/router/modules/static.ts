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
      icon: 'app',
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
    path: '/issues',
    children: [
      { path: '', component: () => import('@/views/issues/index.vue') },
      { path: '1', component: () => import('@/views/issues/1.vue') },
      { path: '5343', component: () => import('@/views/issues/5343.vue') },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/404.vue'),
  },
] as RouteRecordRaw[];
