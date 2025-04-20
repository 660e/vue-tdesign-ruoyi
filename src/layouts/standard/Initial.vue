<script setup lang="ts">
import { getInfo, getRouters } from '@/apis/login';
import { useInfoStore } from '@/stores';

const emit = defineEmits<{ done: [] }>();
const infoStore = useInfoStore();
const text = ref();
const percentage = ref(0);

onMounted(async () => {
  text.value = '获取用户信息';
  percentage.value = 10;
  const { permissions, roles, user } = await getInfo();
  infoStore.setPermissions(permissions);
  infoStore.setRoles(roles);
  infoStore.setUser(user);

  text.value = '获取路由信息';
  percentage.value = 20;
  const { data } = await getRouters();
  infoStore.setRouters(data);

  // TODO

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
