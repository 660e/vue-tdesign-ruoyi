import { defineStore } from 'pinia';

export const useInfoStore = defineStore('info', () => {
  const permissions = ref([]);
  const roles = ref([]);
  const user = ref();

  return { permissions, roles, user };
});
