import { getRoutes } from '@/apis/login';
import { useInfoStore } from '@/stores';
import router from '../index';

export async function initializeRouter(layout: 'standard') {
  const { data } = await getRoutes();
  const infoStore = useInfoStore();
  infoStore.setRoutes(data || []);
  infoStore.routes.forEach((e) => router.addRoute(`layout-${layout}`, e));
}
