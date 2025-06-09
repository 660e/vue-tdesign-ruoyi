<script setup lang="ts">
import type { ProgressStatus } from 'tdesign-vue-next';
import { getInfo } from '@/apis/login';
import { dict, getUserProfile } from '@/apis/system';
import { DICTS } from '@/constants';
import { useAppStore } from '@/stores';

const emit = defineEmits<{ done: [] }>();
const { setPermissions, setPostGroup, setRoleGroup, setRoles, setUser, setDicts, signOut } = useAppStore();
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
    setProgress('获取用户资料', 20);
    const { data, postGroup, roleGroup } = await getUserProfile();
    setUser(data);
    setPostGroup(postGroup);
    setRoleGroup(roleGroup);

    setProgress('获取用户权限', 40);
    const { permissions, roles } = await getInfo();
    setPermissions(permissions);
    setRoles(roles);

    setProgress('获取字典数据', 60);
    const dicts = await Promise.all(DICTS.map((e) => dict(e)));
    setDicts(dicts.map((e) => e.data));

    setProgress('初始化完成', 100, 'success');
    setTimeout(() => emit('done'), 500);
  } catch {
    setProgress('初始化失败，请重新登录', 100, 'error');
  }
});
</script>

<template>
  <div class="h-screen flex flex-col justify-center">
    <div class="relative flex justify-center">
      <div class="absolute bottom-5 text-sm leading-none text-neutral-400">{{ progress.text }}</div>
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
