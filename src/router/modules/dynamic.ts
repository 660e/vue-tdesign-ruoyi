import type { IRoute } from '@/apis/types';
import { getRoutes } from '@/apis/login';
import { useInfoStore } from '@/stores';
import router from '../index';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const views = import.meta.glob<{ default: any }>('@/views/**/index.vue', { eager: true });

function addRoute(layoutName: string, parentPath: string, routes: IRoute[]) {
  routes.forEach((route) => {
    switch (route.component) {
      case 'Layout': {
        router.addRoute(layoutName, {
          path: route.path,
          redirect: '/',
          name: route.name,
          meta: route.meta,
        });
        if (route.children?.length) {
          parentPath = route.path;
          addRoute(layoutName, parentPath, route.children);
        }
        break;
      }

      case 'ParentView': {
        // TODO
        if (route.children?.length) {
          parentPath += `/${route.path}`;
          addRoute(layoutName, parentPath, route.children);
        }
        break;
      }

      default: {
        try {
          router.addRoute(layoutName, {
            path: `${parentPath}/${route.path}`,
            name: route.name,
            component: views[`/src/views/${route.component}.vue`].default,
            meta: route.meta,
          });
        } catch {
          // TODO
        }
      }
    }
  });
}

export async function initializeRouter(layout: 'standard') {
  const { data } = await getRoutes();
  const infoStore = useInfoStore();
  infoStore.setRoutes(data || []);
  addRoute(`layout-${layout}`, '', infoStore.routes);

  // console.log(router.getRoutes());
}
