import type { RouteRecordRaw } from 'vue-router';
import type { AppRoute } from '@/types';
import { getRoutes } from '@/apis/login';
import { useAppStore } from '@/stores';
import { iconConverter } from '@/utils';
import router from './index';

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

export async function initializeRouter() {
  const { data } = await getRoutes();
  const appStore = useAppStore();
  appStore.setRoutes(standardizeRoutes(data));
  appStore.routes.push(
    ...([
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        meta: {
          icon: 'dashboard',
          title: '数据大屏',
          fullscreen: true,
        },
      },
      {
        path: 'leaflet',
        name: 'leaflet',
        component: () => import('@/views/leaflet/index.vue'),
        meta: {
          icon: 'map',
          title: '地理信息',
        },
      },
      {
        path: 'three',
        name: 'three',
        component: () => import('@/views/three/index.vue'),
        meta: {
          icon: 'chart-3d',
          title: '三维场景',
          fullscreen: true,
        },
      },
    ] as RouteRecordRaw[]),
  );
  appStore.routes.forEach((e) => router.addRoute('layout-admin', e));
}
