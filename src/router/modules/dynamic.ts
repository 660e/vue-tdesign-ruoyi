import type { IRoute } from '@/apis/types';
import router from '../index';

const views = import.meta.glob('@/views/**/index.vue', { eager: true });

export async function initializeRouter(routes: IRoute[], layout: 'standard') {
  console.log(views);

  routes.forEach((route) => {
    console.log(route);

    router.addRoute(`layout-${layout}`, {
      path: route.path,
      redirect: '/',
      name: route.name,
    });
  });
}
