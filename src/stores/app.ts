import type { RouteRecordRaw } from 'vue-router';
import type { AppRoute, AppSystemDictMap } from '@/types';
import { iconConverter } from '@/utils';
import { defineStore } from 'pinia';
import router from '@/router';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const views = import.meta.glob<{ default: any }>('@/views/**/index.vue', { eager: true });

function standardizeRoutes(routes: AppRoute[], parentName = ''): RouteRecordRaw[] {
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

export const useAppStore = defineStore('app', () => {
  const dicts = ref<AppSystemDictMap>();
  const permissions = ref();
  const postGroup = ref();
  const roleGroup = ref();
  const roles = ref();
  const routes = ref<RouteRecordRaw[]>([]);
  const user = ref();

  const setDicts = (n: unknown) => {
    const availableDicts = (n as { dictLabel: string; dictType: string; dictValue: string }[][]).filter((e) => e.length);
    const standardizeDicts = availableDicts.map((e) => e.map((i) => ({ label: i.dictLabel, type: i.dictType, value: i.dictValue })));
    dicts.value = new Map(standardizeDicts.map((e) => [e[0].type, e])) as AppSystemDictMap;
  };
  const setPermissions = (n: unknown) => (permissions.value = n);
  const setPostGroup = (n = '-') => (postGroup.value = n);
  const setRoleGroup = (n = '-') => (roleGroup.value = n);
  const setRoles = (n: unknown) => (roles.value = n);
  const setRoutes = (n: AppRoute[]) => (routes.value = standardizeRoutes(n));
  const setUser = (n: unknown) => (user.value = n);

  const signOut = () => {
    localStorage.removeItem('token');
    router.push({ name: 'login' });
  };

  return {
    dicts,
    permissions,
    postGroup,
    roleGroup,
    roles,
    routes,
    user,

    setDicts,
    setPermissions,
    setPostGroup,
    setRoleGroup,
    setRoles,
    setRoutes,
    setUser,

    signOut,
  };
});
