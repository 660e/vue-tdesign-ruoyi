import { defineStore } from 'pinia';

export const useInfoStore = defineStore('info', () => {
  const permissions = ref();
  const roles = ref();
  const user = ref();
  const routers = ref();
  const dicts = ref();

  const setPermissions = (n: unknown) => (permissions.value = n);
  const setRoles = (n: unknown) => (roles.value = n);
  const setUser = (n: unknown) => (user.value = n);
  const setRouters = (n: unknown) => (routers.value = n);
  const setDicts = (n: { dictLabel: string; dictValue: string; dictType: string }[][]) => {
    dicts.value = new Map(n.filter((e) => e.length).map((e) => [e[0].dictType, e.map((i) => ({ label: i.dictLabel, value: i.dictValue }))]));
  };

  return { permissions, setPermissions, roles, setRoles, user, setUser, routers, setRouters, dicts, setDicts };
});
