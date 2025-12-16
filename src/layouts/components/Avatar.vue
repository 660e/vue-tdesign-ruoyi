<script setup lang="ts">
import type { FormProps } from 'tdesign-vue-next';
import { updateUserProfile, updatePassword } from '@/apis/system';
import { useDict } from '@/hooks';
import { useAppStore, useLoadingStore } from '@/stores';

const { postGroup, roleGroup, user, signOut } = useAppStore();
const loadingStore = useLoadingStore();
const visible = ref(false);
const editType = ref();
const confirmSignOut = ref(false);

const formData = reactive({
  nickName: '',
  email: '',
  sex: '2',
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
});
const formRules: FormProps['rules'] = {
  nickName: [{ required: true, trigger: 'blur' }],
  oldPassword: [{ required: true, trigger: 'blur' }],
  newPassword: [{ required: true, trigger: 'blur' }],
  confirmPassword: [{ required: true, trigger: 'blur' }],
};

const onBeforeOpen = () => {
  editType.value = null;
  confirmSignOut.value = false;
};

const onEdit = (type: 'profile' | 'password') => {
  editType.value = type;
  switch (type) {
    case 'profile':
      formData.nickName = user.nickName;
      formData.email = user.email;
      formData.sex = user.sex;
      break;
    case 'password':
      break;
  }
};

const onSubmit: FormProps['onSubmit'] = async ({ validateResult }) => {
  if (validateResult === true) {
    loadingStore.show();
    switch (editType.value) {
      case 'profile':
        try {
          const { code } = await updateUserProfile({
            email: formData.email,
            nickName: formData.nickName,
            sex: formData.sex,
          });
          if (code) window.location.reload();
        } catch {
        } finally {
          loadingStore.hide();
        }
        break;
      case 'password':
        try {
          const { code } = await updatePassword({
            newPassword: formData.newPassword,
            oldPassword: formData.oldPassword,
          });
          if (code) signOut();
        } catch {
        } finally {
          loadingStore.hide();
        }
        break;
    }
  }
};
</script>

<template>
  <div @click="visible = true" class="cursor-pointer flex items-center gap-2">
    <div>{{ user.nickName }}</div>
    <t-avatar image="https://picsum.photos/200" />
  </div>

  <t-drawer v-model:visible="visible" @before-open="onBeforeOpen" size="350">
    <div class="h-full overflow-y-auto p-6">
      <div class="h-36 flex flex-col justify-center items-center rounded text-neutral-800 bg-neutral-100">
        <t-avatar image="https://picsum.photos/200" size="64px" />
        <div class="font-bold pt-2 pb-1">{{ user.nickName }} · {{ roleGroup }}</div>
        <div class="text-xs">{{ user.phonenumber }}</div>
      </div>

      <div v-if="!editType" class="pt-4">
        <t-list size="small" split>
          <t-list-item>
            <t-icon class="mr-2" name="desktop" />
            <span>用户名称</span><span class="flex-1"></span><span>{{ user.userName }}</span>
          </t-list-item>
          <t-list-item>
            <t-icon class="mr-2" name="mail" />
            <span>安全邮箱</span><span class="flex-1"></span><span>{{ user.email }}</span>
          </t-list-item>
          <t-list-item>
            <t-icon class="mr-2" name="tree-square-dot" />
            <span>所属部门</span><span class="flex-1"></span><span>{{ user.dept.deptName }}/{{ postGroup }}</span>
          </t-list-item>
          <t-list-item>
            <t-icon class="mr-2" name="calendar-2" />
            <span>注册时间</span><span class="flex-1"></span><span>{{ user.createTime }}</span>
          </t-list-item>
        </t-list>
        <div class="py-6 flex gap-2">
          <t-button @click="onEdit('profile')" class="flex-1" variant="outline">修改基本资料</t-button>
          <t-button @click="onEdit('password')" class="flex-1" variant="outline">修改密码</t-button>
        </div>
      </div>

      <div v-else class="py-6">
        <t-form :data="formData" :rules="formRules" @reset="() => (editType = null)" @submit="onSubmit" label-width="0">
          <template v-if="editType === 'profile'">
            <t-form-item label="用户昵称" name="nickName">
              <t-input v-model="formData.nickName" label="用户昵称" />
            </t-form-item>
            <t-form-item label="安全邮箱" name="email">
              <t-input v-model="formData.email" label="安全邮箱" />
            </t-form-item>
            <t-form-item label="性别" name="sex">
              <t-radio-group v-model="formData.sex" :options="useDict('sys_user_sex')" class="w-full!" theme="button" variant="default-filled" />
            </t-form-item>
          </template>
          <template v-if="editType === 'password'">
            <t-form-item label="原密码" name="oldPassword">
              <t-input v-model="formData.oldPassword" label="原密码" type="password" />
            </t-form-item>
            <t-form-item label="新密码" name="newPassword">
              <t-input v-model="formData.newPassword" label="新密码" type="password" />
            </t-form-item>
            <t-form-item label="确认密码" name="confirmPassword">
              <t-input v-model="formData.confirmPassword" label="确认密码" type="password" />
            </t-form-item>
          </template>
          <t-form-item>
            <div class="flex-1 flex gap-2">
              <t-button class="flex-1" type="submit">保存</t-button>
              <t-button class="flex-1" theme="default" type="reset">取消</t-button>
            </div>
          </t-form-item>
        </t-form>
      </div>
    </div>

    <template #footer>
      <div class="flex">
        <t-button @click="confirmSignOut = true" class="flex-1" theme="danger" variant="outline">退出登录</t-button>
        <t-button v-if="confirmSignOut" @click="signOut" theme="danger">确认</t-button>
      </div>
    </template>
  </t-drawer>
</template>
