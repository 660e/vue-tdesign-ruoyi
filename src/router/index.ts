import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';

const routes = import.meta.glob<{ default: RouteRecordRaw }>('./modules/*.ts', { eager: true });

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: Object.values(routes).map((route) => route.default),
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');

  if (to.name !== 'login' && !token) next({ name: 'login' });
  if (to.name === 'login' && token) next({ name: 'home' });

  next();
});

export default router;
