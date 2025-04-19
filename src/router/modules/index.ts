import type { RouteRecordRaw } from 'vue-router';

export default {
  path: '/',
  redirect: '/verify',
  children: [
    {
      path: 'login',
      name: 'login',
      component: () => import('@/login/index.vue'),
    },
    {
      path: 'verify',
      name: 'verify',
      component: () => import('@/layouts/components/Verify.vue'),
    },
  ],
} as RouteRecordRaw;
