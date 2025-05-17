import type { IRoute } from '@/apis/types';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
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
  ],
});

router.beforeEach((to, _, next) => {
  const token = localStorage.getItem('token');

  if (to.name !== 'login' && !token) {
    next({ name: 'login' });
    return;
  }
  if (to.name === 'login' && token) {
    next({ name: 'home' });
    return;
  }

  next();
});

export async function initializeRouter(routes: IRoute[]) {
  console.log(routes);
}

export default router;
