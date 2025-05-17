import { createRouter, createWebHistory } from 'vue-router';
import routes from './modules/static';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
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

export * from './modules/dynamic';
export default router;
