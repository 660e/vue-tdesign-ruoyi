<script setup lang="tsx">
import { listNotice } from '@/apis/system';
import { useDict } from '@/hooks';
import { useLoadingStore } from '@/stores';

const loadingStore = useLoadingStore();
const notices = ref();

onMounted(async () => {
  loadingStore.show();
  try {
    notices.value = await listNotice();
  } catch {
  } finally {
    loadingStore.hide();
  }
});

const NoticeType = ({ type }: { type: string }) => {
  const theme = type === '1' ? 'warning' : type === '2' ? 'primary' : 'default';
  return (
    <t-tag theme={theme} class="!mr-2" size="small" variant="light-outline">
      {useDict('sys_notice_type')?.find((e) => e.value === type)?.label}
    </t-tag>
  );
};
</script>

<template>
  <t-popup placement="top-right" trigger="click">
    <div class="flex items-center gap-1 cursor-pointer duration-200 hover:text-blue-700">
      <div v-if="notices?.total" :style="{ backgroundColor: 'var(--td-error-color-6)' }" class="px-2 rounded-full text-xs text-white">
        {{ notices.total }}
      </div>
      <t-icon name="notification" />
    </div>
    <template #content>
      <div class="w-xl">
        <t-list size="small" split>
          <t-list-item v-for="notice in notices?.rows" :key="notice.noticeId">
            <NoticeType :type="notice.noticeType" />
            <span>{{ notice.noticeTitle }}</span>
            <span class="flex-1"></span>
            <span class="text-neutral-400">{{ notice.createTime }}</span>
          </t-list-item>
        </t-list>

        <div class="pt-2 pb-1 flex justify-center">
          <t-link @click="$router.push({ name: 'system-notice' })" theme="primary">查看更多...</t-link>
        </div>
      </div>
    </template>
  </t-popup>
</template>
