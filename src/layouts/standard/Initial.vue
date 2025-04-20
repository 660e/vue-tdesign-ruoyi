<script setup lang="ts">
import { getInfo, getRouters } from '@/apis/login';
import { dict } from '@/apis/system';
import { useInfoStore } from '@/stores';

const emit = defineEmits<{ done: [] }>();
const infoStore = useInfoStore();
const text = ref();
const percentage = ref(0);

const DICTS = ['sys_user_sex', 'sys_show_hide'];

onMounted(async () => {
  text.value = '获取用户信息';
  percentage.value = 20;
  const { permissions, roles, user } = await getInfo();
  infoStore.setPermissions(permissions);
  infoStore.setRoles(roles);
  infoStore.setUser(user);

  text.value = '获取路由信息';
  percentage.value = 40;
  const { data } = await getRouters();
  infoStore.setRouters(data);

  text.value = '获取字典信息';
  percentage.value = 60;
  const dicts = await Promise.all(DICTS.map((e) => dict(e)));
  infoStore.setDicts(dicts.map((e) => e.data));

  text.value = '初始化完成';
  percentage.value = 100;
  setTimeout(() => emit('done'), 500);
});
</script>

<template>
  <div class="h-screen flex justify-center items-center">
    <div class="w-1/3 relative">
      <div class="absolute -top-6 left-1/2 -translate-x-1/2 text-sm leading-none text-neutral-500">{{ text }}</div>
      <t-progress :label="false" :percentage="percentage" />
    </div>
  </div>
</template>
