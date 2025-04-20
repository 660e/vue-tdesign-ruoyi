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
  const setDicts = (n: unknown) => {
    console.log(n);
    dicts.value = n;
  };

  return { permissions, setPermissions, roles, setRoles, user, setUser, routers, setRouters, dicts, setDicts };
});
