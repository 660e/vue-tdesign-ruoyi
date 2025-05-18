<script setup lang="ts">
import type { ProgressStatus } from 'tdesign-vue-next';
import { getInfo } from '@/apis/login';
import { dict } from '@/apis/system';
import { DICTS } from '@/constants';
import { useInfoStore } from '@/stores';

const emit = defineEmits<{ done: [] }>();
const infoStore = useInfoStore();
const progress = reactive<{
  text: string;
  percentage: number;
  status?: ProgressStatus;
}>({
  text: '',
  percentage: 0,
  status: undefined,
});

const setProgress = (text: string, percentage: number, status?: ProgressStatus) => {
  progress.text = text;
  progress.percentage = percentage;
  progress.status = status;
};

onMounted(async () => {
  try {
    setProgress('获取用户信息', 0);
    const { permissions, roles, user } = await getInfo();
    infoStore.setPermissions(permissions);
    infoStore.setRoles(roles);
    infoStore.setUser(user);

    setProgress('获取字典信息', 20);
    const dicts = await Promise.all(DICTS.map((e) => dict(e)));
    infoStore.setDicts(dicts.map((e) => e.data));

    setProgress('初始化完成', 100, 'success');
    setTimeout(() => emit('done'), 500);
  } catch {
    setProgress('初始化失败，请重新登录', 100, 'error');
  }
});

const router = useRouter();
const signOut = () => {
  localStorage.removeItem('token');
  router.push({ name: 'login' });
};
</script>

<template>
  <div class="h-screen flex flex-col justify-center">
    <div class="relative flex justify-center">
      <div class="absolute bottom-5 text-sm leading-none text-neutral-500">{{ progress.text }}</div>
      <t-progress :label="false" :percentage="progress.percentage" :status="progress.status" class="w-1/3" />
      <div v-if="progress.status === 'error'" class="absolute top-5">
        <t-button @click="signOut">重新登录</t-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.t-progress :deep(.t-progress__info) {
  margin: 0;
}
</style>
