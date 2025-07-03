import type { RouteRecordRaw } from 'vue-router';
import type { AppSystemDictMap } from '@/types';
import { defineStore } from 'pinia';
import router from '@/router';

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
  const setRoutes = (n: RouteRecordRaw[]) => (routes.value = n);
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
