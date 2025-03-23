import type { RouteRecordRaw } from 'vue-router';

export default {
  path: '/system',
  component: () => import('@/layouts/standard/index.vue'),
  children: [
    {
      path: 'config',
      name: 'system-config',
      component: () => import('@/views/system/config/index.vue'),
    },
    {
      path: 'dept',
      name: 'system-dept',
      component: () => import('@/views/system/dept/index.vue'),
    },
    {
      path: 'dict',
      name: 'system-dict',
      component: () => import('@/views/system/dict/index.vue'),
    },
    {
      path: 'menu',
      name: 'system-menu',
      component: () => import('@/views/system/menu/index.vue'),
    },
    {
      path: 'notice',
      name: 'system-notice',
      component: () => import('@/views/system/notice/index.vue'),
    },
    {
      path: 'post',
      name: 'system-post',
      component: () => import('@/views/system/post/index.vue'),
    },
    {
      path: 'role',
      name: 'system-role',
      component: () => import('@/views/system/role/index.vue'),
    },
    {
      path: 'user',
      name: 'system-user',
      component: () => import('@/views/system/user/index.vue'),
    },
  ],
} as RouteRecordRaw;
