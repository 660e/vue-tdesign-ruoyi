import { createRouter, createWebHistory } from 'vue-router';
import { useInfoStore } from '@/stores';
import { initializeRouter } from './modules/dynamic';
import routes from './modules/static';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior: () => ({ top: 0, left: 0 }),
  routes,
});

router.beforeEach(async (to, _, next) => {
  const token = localStorage.getItem('token');
  const infoStore = useInfoStore();

  if (to.name !== 'login' && !token) {
    return next({ name: 'login' });
  }
  if (to.name === 'login' && token) {
    return next({ name: 'home' });
  }
  if (!infoStore.routes.length && token) {
    await initializeRouter('standard');
    return next(to);
  }

  next();
});

export * from './modules/dynamic';
export default router;
