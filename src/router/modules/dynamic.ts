import { getRoutes } from '@/apis/login';
import { useAppStore } from '@/stores';
import router from '../index';

export async function initializeRouter(layout: 'standard') {
  const { data } = await getRoutes();
  const appStore = useAppStore();
  appStore.setRoutes(data || []);
  appStore.routes.forEach((e) => router.addRoute(`layout-${layout}`, e));
}
