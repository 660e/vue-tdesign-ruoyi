<script setup lang="ts">
import type { FormInstanceFunctions, FormProps, TableRowData } from 'tdesign-vue-next';
import type { AppUnknownRecord } from '@/types';
import { getUser, createUser, updateUser } from '@/apis/system';
import { useDict } from '@/hooks';
import { useLoadingStore } from '@/stores';

defineProps<{ deptTree: AppUnknownRecord[] }>();

const emit = defineEmits<{ confirm: [] }>();
const loadingStore = useLoadingStore();

const visible = ref(false);
const formRef = ref<FormInstanceFunctions>();
const formData = reactive({
  userId: undefined,
  userName: '',
  password: '',
  nickName: '',
  deptId: '',
  phonenumber: '',
  email: '',
  sex: '2',
  status: '0',
  postIds: [],
  roleIds: [],
  remark: '',
});
const formRules: FormProps['rules'] = {
  userName: [{ required: true, trigger: 'blur' }],
  password: [{ required: true, trigger: 'blur' }],
  nickName: [{ required: true, trigger: 'blur' }],
  phonenumber: [{ required: true, trigger: 'blur' }],
};
const userData = ref();

const show = async (row?: TableRowData) => {
  loadingStore.show();
  try {
    userData.value = await getUser(row?.userId);
    if (row?.userId) {
      Object.assign(formData, row);
      formData.postIds = userData.value.postIds;
      formData.roleIds = userData.value.roleIds;
    }
    visible.value = true;
  } catch {
  } finally {
    loadingStore.hide();
  }
};

const onClosed = () => {
  formRef.value?.reset();
  formData.userId = undefined;
  formData.userName = '';
  formData.password = '';
};

const onConfirm = async () => {
  if ((await formRef.value?.validate()) !== true) return;

  loadingStore.show();
  try {
    const { msg } = await (formData.userId ? updateUser : createUser)(formData);
    MessagePlugin.success(msg);
    emit('confirm');
    visible.value = false;
  } catch {
  } finally {
    loadingStore.hide();
  }
};

defineExpose({ show });
</script>

<template>
  <t-dialog
    v-model:visible="visible"
    :header="`${formData.userId ? '修改' : '新增'}用户`"
    :on-closed="onClosed"
    :on-confirm="onConfirm"
    placement="center"
    width="700"
  >
    <t-form :data="formData" :rules="formRules" class="grid grid-cols-2" reset-type="initial" ref="formRef">
      <t-form-item v-if="!formData.userId" label="用户名称" name="userName">
        <t-input v-model="formData.userName" />
      </t-form-item>
      <t-form-item v-if="!formData.userId" label="密码" name="password">
        <t-input v-model="formData.password" type="password" />
      </t-form-item>
      <t-form-item label="用户昵称" name="nickName">
        <t-input v-model="formData.nickName" />
      </t-form-item>
      <t-form-item label="所属部门" name="deptId">
        <t-tree-select v-model="formData.deptId" :data="deptTree" :keys="{ value: 'id' }" />
      </t-form-item>
      <t-form-item label="手机号码" name="phonenumber">
        <t-input v-model="formData.phonenumber" />
      </t-form-item>
      <t-form-item label="安全邮箱" name="email">
        <t-input v-model="formData.email" />
      </t-form-item>
      <t-form-item label="性别" name="sex">
        <t-radio-group v-model="formData.sex" :options="useDict('sys_user_sex')" theme="button" variant="default-filled" />
      </t-form-item>
      <t-form-item label="状态" name="status">
        <t-radio-group v-model="formData.status" :options="useDict('sys_normal_disable')" theme="button" variant="default-filled" />
      </t-form-item>
      <t-form-item class="col-span-2" label="岗位" name="postIds">
        <t-select v-model="formData.postIds" :keys="{ label: 'postName', value: 'postId' }" :options="userData?.posts" multiple />
      </t-form-item>
      <t-form-item class="col-span-2" label="角色" name="roleIds">
        <t-select v-model="formData.roleIds" :keys="{ label: 'roleName', value: 'roleId' }" :options="userData?.roles" multiple />
      </t-form-item>
      <t-form-item class="col-span-2" label="备注" name="remark">
        <t-textarea v-model="formData.remark" />
      </t-form-item>
    </t-form>
  </t-dialog>
</template>
