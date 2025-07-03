import type { RouteRecordRaw } from 'vue-router';
import type { AppRoute } from '@/types';
import { getRoutes } from '@/apis/login';
import { useAppStore } from '@/stores';
import { iconConverter } from '@/utils';
import router from '../index';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const views = import.meta.glob<{ default: any }>('@/views/**/(index|list).vue', { eager: true });

function standardizeRoutes(routes: AppRoute[] = [], parentName = ''): RouteRecordRaw[] {
  return routes
    .filter((route) => !route.hidden)
    .map((route) => {
      switch (route.component) {
        case 'Layout': {
          if (route.meta.link) {
            return {
              path: '/frame',
              name: 'frame',
              component: () => import('@/views/home/index.vue'), // TODO
              meta: {
                frameBlank: true,
                frameSrc: route.meta.link,
                icon: iconConverter(route.meta.icon),
                title: route.meta.title,
              },
            };
          } else if (route.children?.length) {
            return {
              path: route.path,
              name: route.name.toLowerCase(),
              redirect: '/',
              meta: {
                icon: iconConverter(route.meta.icon),
                title: route.meta.title,
              },
              children: standardizeRoutes(route.children, route.name.toLowerCase()),
            };
          } else {
            return {} as RouteRecordRaw; // TODO
          }
        }

        case 'ParentView': {
          if (route.children?.length) {
            return {
              path: route.path,
              name: `${parentName}-${route.name.toLowerCase()}`,
              redirect: '/',
              meta: {
                icon: iconConverter(route.meta.icon),
                title: route.meta.title,
              },
              children: standardizeRoutes(route.children, `${parentName}-${route.name.toLowerCase()}`),
            };
          } else {
            return {} as RouteRecordRaw; // TODO
          }
        }

        default: {
          const view = views[`/src/views/${route.component}.vue`];
          if (view) {
            return {
              path: route.path,
              name: `${parentName}-${route.name.toLowerCase()}`,
              component: markRaw(view.default),
              meta: {
                icon: iconConverter(route.meta.icon),
                title: route.meta.title,
              },
            };
          } else {
            return {
              // TODO
              path: '404',
              component: () => import('@/views/404.vue'),
            };
          }
        }
      }
    });
}

export async function initializeRouter(layout: 'standard') {
  const { data } = await getRoutes();
  const appStore = useAppStore();
  appStore.setRoutes(standardizeRoutes(data));
  appStore.routes.forEach((e) => router.addRoute(`layout-${layout}`, e));
}
