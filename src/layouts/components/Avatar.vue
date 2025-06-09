<script setup lang="ts">
import { useAppStore } from '@/stores';

const { postGroup, roleGroup, user, signOut } = useAppStore();
const visible = ref(true);
const confirmSignOut = ref(false);

const onBeforeOpen = () => {
  confirmSignOut.value = false;
};
</script>

<template>
  <div @click="visible = true" class="cursor-pointer flex items-center gap-2">
    <div>{{ user.nickName }}</div>
    <t-avatar image="https://picsum.photos/200" />
  </div>

  <t-drawer v-model:visible="visible" :on-before-open="onBeforeOpen" size="350">
    <div
      :class="[user.sex === '0' ? 'bg-blue-100' : user.sex === '1' ? 'bg-red-100' : 'bg-neutral-100']"
      class="h-36 flex flex-col justify-center items-center rounded"
    >
      <t-avatar image="https://picsum.photos/200" size="64px" />
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
        <t-icon name="calendar-2" /><span>注册时间</span><span class="flex-1"></span><span>{{ user.createTime }}</span>
      </div>
      <t-divider class="!my-3" />
      <div class="list-item clickable rounded hover:!pl-2 hover:bg-blue-50"><t-icon name="file-1" /><span>修改基本资料</span></div>
      <div class="list-item clickable rounded hover:!pl-2 hover:bg-blue-50"><t-icon name="lock-on" /><span>修改密码</span></div>
    </div>

    <template #footer>
      <div class="flex">
        <t-button @click="confirmSignOut = true" class="flex-1" theme="danger" variant="outline">退出登录</t-button>
        <t-button v-if="confirmSignOut" @click="signOut" theme="danger">确认</t-button>
      </div>
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
