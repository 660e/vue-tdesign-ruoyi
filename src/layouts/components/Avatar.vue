<script setup lang="ts">
import { useAppStore } from '@/stores';

const { postGroup, roleGroup, user, signOut } = useAppStore();
const visible = ref(false);
</script>

<template>
  <div @click="visible = true" class="cursor-pointer flex items-center gap-2">
    <div>{{ user.nickName }}</div>
    <t-avatar />
  </div>

  <t-drawer v-model:visible="visible" size="350">
    <div class="h-36 flex flex-col justify-center items-center rounded bg-neutral-100">
      <t-avatar size="64px" />
      <div class="font-bold pt-2 pb-1">{{ user.nickName }} · {{ roleGroup }}</div>
      <div class="text-xs">{{ user.phonenumber }}</div>
    </div>
    <div class="pt-3">
      <div class="list-item">
        <t-icon name="desktop" /><span>用户名称</span><span class="flex-1"></span><span>{{ user.userName }}</span>
      </div>
      <div class="list-item">
        <t-icon name="mail" /><span>安全邮箱</span><span class="flex-1"></span><span>{{ user.email }}</span>
      </div>
      <div class="list-item">
        <t-icon name="tree-square-dot" /><span>所属部门</span><span class="flex-1"></span><span>{{ user.dept.deptName }}/{{ postGroup }}</span>
      </div>
      <div class="list-item">
        <t-icon name="calendar-2" /><span>注册日期</span><span class="flex-1"></span><span>{{ user.createTime }}</span>
      </div>
      <div class="h-px my-3 bg-neutral-200"></div>
      <div class="list-item clickable rounded hover:!pl-2 hover:bg-blue-50"><t-icon name="file-1" /><span>修改基本资料</span></div>
      <div class="list-item clickable rounded hover:!pl-2 hover:bg-blue-50"><t-icon name="lock-on" /><span>修改密码</span></div>
    </div>

    <template #footer>
      <t-button @click="signOut" theme="danger" variant="outline" block>退出登录</t-button>
    </template>
  </t-drawer>
</template>

<style scoped>
.list-item {
  display: flex;
  align-items: center;
  gap: theme('space.2');
  padding: theme('space.1') 0;
}
</style>
