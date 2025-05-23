import type { RouteRecordRaw } from 'vue-router';
import type { IRoute } from '@/apis/types';
import { defineStore } from 'pinia';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const views = import.meta.glob<{ default: any }>('@/views/**/index.vue', { eager: true });

function standardizeRoutes(routes: IRoute[], parentName = ''): RouteRecordRaw[] {
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
                icon: route.meta.icon,
                title: route.meta.title,
              },
            };
          } else if (route.children?.length) {
            return {
              path: route.path,
              name: route.name.toLowerCase(),
              redirect: '/',
              meta: {
                icon: route.meta.icon,
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
                icon: route.meta.icon,
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
                icon: route.meta.icon,
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

export const useInfoStore = defineStore('info', () => {
  const dicts = ref();
  const permissions = ref();
  const roles = ref();
  const routes = ref<RouteRecordRaw[]>([]);
  const user = ref();

  const setDicts = (n: { dictLabel: string; dictValue: string; dictType: string }[][]) => {
    dicts.value = new Map(n.filter((e) => e.length).map((e) => [e[0].dictType, e.map((i) => ({ label: i.dictLabel, value: i.dictValue }))]));
  };
  const setPermissions = (n: unknown) => (permissions.value = n);
  const setRoles = (n: unknown) => (roles.value = n);
  const setRoutes = (n: IRoute[]) => (routes.value = standardizeRoutes(n));
  const setUser = (n: unknown) => (user.value = n);

  return { dicts, permissions, roles, routes, user, setDicts, setPermissions, setRoles, setRoutes, setUser };
});
