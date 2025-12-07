import { createRouter, createWebHistory } from 'vue-router';
import { useAppStore } from '@/stores';
import { initializeRouter } from './modules/dynamic';
import routes from './modules/static';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior: () => ({ top: 0, left: 0 }),
});

router.beforeEach(async (to, _, next) => {
  const token = localStorage.getItem('token');
  const appStore = useAppStore();

  if (to.name !== 'login' && !token) {
    return next({ name: 'login' });
  }
  if (to.name === 'login' && token) {
    return next({ name: 'home' });
  }
  if (!appStore.routes.length && token) {
    await initializeRouter();
    return next(to);
  }

  next();
});

export * from './modules/dynamic';
export default router;
