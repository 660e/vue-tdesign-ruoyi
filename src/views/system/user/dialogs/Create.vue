<script setup lang="ts">
import type { FormInstanceFunctions, FormProps, TableRowData } from 'tdesign-vue-next';
import { getUser, deptTree, createUser, updateUser } from '@/apis/system';
import { useFullscreenLoading, useAppStore } from '@/stores';

const emit = defineEmits<{ confirm: [] }>();
const fullscreenLoading = useFullscreenLoading();
const { dicts } = useAppStore();

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
};
const userData = ref();

const show = async (row?: TableRowData) => {
  fullscreenLoading.show();
  try {
    userData.value = await getUser(row?.userId);
    userData.value.deptTree = (await deptTree()).data;
    if (row?.userId) {
      Object.assign(formData, row);
      formData.postIds = userData.value.postIds;
      formData.roleIds = userData.value.roleIds;
    }
    visible.value = true;
  } catch {
  } finally {
    fullscreenLoading.hide();
  }
};

const onClosed = () => {
  formRef.value?.reset();
  formData.userId = undefined;
};

const onConfirm = async () => {
  if ((await formRef.value?.validate()) !== true) return;

  fullscreenLoading.show();
  try {
    const { msg } = await (formData.userId ? updateUser(formData) : createUser(formData));
    MessagePlugin.success(msg);
    emit('confirm');
    visible.value = false;
  } catch {
  } finally {
    fullscreenLoading.hide();
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
    <t-form :data="formData" :rules="formRules" class="grid grid-cols-2" ref="formRef">
      <t-form-item v-if="!formData.userId" label="用户名称" name="userName">
        <t-input v-model="formData.userName" />
      </t-form-item>
      <t-form-item v-if="!formData.userId" label="密码" name="password">
        <t-input v-model="formData.password" type="password" />
      </t-form-item>
      <t-form-item label="用户昵称" name="nickName">
        <t-input v-model="formData.nickName" />
      </t-form-item>
      <t-form-item label="部门" name="deptId">
        <t-tree-select v-model="formData.deptId" :data="userData?.deptTree" :keys="{ value: 'id' }" />
      </t-form-item>
      <t-form-item label="手机号码" name="phonenumber">
        <t-input v-model="formData.phonenumber" />
      </t-form-item>
      <t-form-item label="邮箱" name="email">
        <t-input v-model="formData.email" />
      </t-form-item>
      <t-form-item label="性别" name="sex">
        <t-radio-group v-model="formData.sex">
          <t-radio v-for="dict in dicts?.get('sys_user_sex')" :label="dict.label" :value="dict.value" :key="dict.value" />
        </t-radio-group>
      </t-form-item>
      <t-form-item label="状态" name="status">
        <t-radio-group v-model="formData.status">
          <t-radio v-for="dict in dicts?.get('sys_normal_disable')" :label="dict.label" :value="dict.value" :key="dict.value" />
        </t-radio-group>
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
