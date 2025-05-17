import type { IRouter } from '@/apis/types';
import { defineStore } from 'pinia';

export const useInfoStore = defineStore('info', () => {
  const dicts = ref();
  const permissions = ref();
  const roles = ref();
  const routers = ref<IRouter[]>([]);
  const user = ref();

  const setDicts = (n: { dictLabel: string; dictValue: string; dictType: string }[][]) => {
    dicts.value = new Map(n.filter((e) => e.length).map((e) => [e[0].dictType, e.map((i) => ({ label: i.dictLabel, value: i.dictValue }))]));
  };
  const setPermissions = (n: unknown) => (permissions.value = n);
  const setRoles = (n: unknown) => (roles.value = n);
  const setRouters = (n: IRouter[]) => (routers.value = n);
  const setUser = (n: unknown) => (user.value = n);

  return { dicts, permissions, roles, routers, user, setDicts, setPermissions, setRoles, setRouters, setUser };
});
