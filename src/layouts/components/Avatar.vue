<script setup lang="ts">
import { useInfoStore } from '@/stores';

const { postGroup, roleGroup, user } = useInfoStore();
</script>

<template>
  <div class="flex items-center gap-2">
    <div>{{ user.nickName }}</div>
    <t-popup :overlay-inner-style="{ padding: 0 }" placement="bottom-right" trigger="click">
      <t-avatar class="cursor-pointer">{{ user.nickName }}</t-avatar>
      <template #content>
        <div class="pb-3 flex flex-col text-neutral-600">
          <div class="w-[300px] h-[150px] m-3 flex flex-col justify-center items-center rounded bg-neutral-100">
            <t-avatar size="64px">{{ user.nickName }}</t-avatar>
            <div class="font-bold pt-2 pb-1">{{ user.nickName }} · {{ roleGroup }}</div>
            <div class="text-xs">{{ user.phonenumber }}</div>
          </div>
          <div class="list-item">
            <t-icon name="file-1" /><span>用户名称</span><span class="flex-1"></span><span>{{ user.userName }}</span>
          </div>
          <div class="list-item">
            <t-icon name="file-1" /><span>安全邮箱</span><span class="flex-1"></span><span>{{ user.email }}</span>
          </div>
          <div class="list-item">
            <t-icon name="file-1" /><span>所属部门</span><span class="flex-1"></span><span>{{ user.dept.deptName }}/{{ postGroup }}</span>
          </div>
          <div class="list-item">
            <t-icon name="file-1" /><span>注册日期</span><span class="flex-1"></span><span>{{ user.createTime }}</span>
          </div>
          <div class="h-px my-3 bg-neutral-200"></div>
          <div class="list-item clickable hover:bg-blue-50"><t-icon name="file-1" /><span>修改基本资料</span></div>
          <div class="list-item clickable hover:bg-blue-50"><t-icon name="user-password" /><span>修改密码</span></div>
          <div class="list-item clickable-danger hover:bg-red-50"><t-icon name="logout" /><span>退出登录</span></div>
        </div>
      </template>
    </t-popup>
  </div>
</template>

<style scoped>
.list-item {
  display: flex;
  align-items: center;
  gap: theme('space.2');
  padding: theme('space.1') theme('space.3');
}
</style>
