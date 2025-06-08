<script setup lang="ts">
import { useInfoStore } from '@/stores';

const { roleGroup, user } = useInfoStore();
</script>

<template>
  <div class="flex items-center gap-2">
    <div>{{ user.nickName }}</div>
    <t-popup :overlay-inner-style="{ padding: 0 }" placement="bottom-right" trigger="click">
      <t-avatar class="cursor-pointer">{{ user.nickName }}</t-avatar>
      <template #content>
        <div class="pb-3 flex flex-col">
          <div class="w-[300px] h-[150px] m-3 flex flex-col justify-center items-center rounded bg-neutral-100">
            <t-avatar size="64px">{{ user.nickName }}</t-avatar>
            <div class="font-bold pt-2 pb-1">{{ user.nickName }} · {{ roleGroup }}</div>
            <div class="text-xs">{{ user.email }}</div>
          </div>
          <div class="px-3 py-1 flex items-center gap-2 cursor-pointer duration-200 hover:bg-blue-50">
            <t-icon name="file-1" /><span>修改基本资料</span>
          </div>
          <div class="px-3 py-1 flex items-center gap-2 cursor-pointer duration-200 hover:bg-blue-50">
            <t-icon name="user-password" /><span>修改密码</span>
          </div>
          <div class="h-px my-3 bg-neutral-200"></div>
          <div class="px-3 py-1 flex items-center gap-2 cursor-pointer duration-200 text-red-700 hover:bg-red-50">
            <t-icon name="logout" /><span>退出登录</span>
          </div>
        </div>
      </template>
    </t-popup>
  </div>
</template>
