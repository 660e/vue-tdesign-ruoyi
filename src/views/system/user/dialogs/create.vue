<script setup lang="ts">
import type { FormInstanceFunctions, FormProps, TableRowData } from 'tdesign-vue-next';
import { useInfoStore } from '@/stores';

const { dicts } = useInfoStore();
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
  postIds: '',
  roleIds: '',
  remark: '',
});
const rules: FormProps['rules'] = {
  userName: [{ required: true, trigger: 'blur' }],
  password: [{ required: true, trigger: 'blur' }],
  nickName: [{ required: true, trigger: 'blur' }],
};

const show = (row?: TableRowData) => {
  visible.value = true;

  if (row) {
    Object.assign(formData, row);
  }
};

const onClosed = () => {
  formRef.value?.reset();
};

const onConfirm = () => {
  console.log(formData);
  visible.value = false;
};

defineExpose({ show });
</script>

<template>
  <t-dialog v-model:visible="visible" :header="`${formData.userId ? '修改' : '新增'}用户`" :on-closed="onClosed" :on-confirm="onConfirm" width="700">
    <t-form :data="formData" :rules="rules" class="grid grid-cols-2" ref="formRef">
      <t-form-item label="用户名称" name="userName">
        <t-input v-model="formData.userName" />
      </t-form-item>
      <t-form-item v-if="!formData.userId" label="密码" name="password">
        <t-input v-model="formData.password" type="password" />
      </t-form-item>
      <div v-else></div>
      <t-form-item label="用户昵称" name="nickName">
        <t-input v-model="formData.nickName" />
      </t-form-item>
      <t-form-item label="部门" name="deptId">
        <t-select v-model="formData.deptId" />
      </t-form-item>
      <t-form-item label="手机号码" name="phonenumber">
        <t-input v-model="formData.phonenumber" />
      </t-form-item>
      <t-form-item label="邮箱" name="email">
        <t-input v-model="formData.email" />
      </t-form-item>
      <t-form-item label="性别" name="sex">
        <t-radio-group v-model="formData.sex">
          <t-radio v-for="dict in dicts?.get('sys_user_sex')" :label="dict.dictLabel" :value="dict.dictValue" :key="dict.dictValue" />
        </t-radio-group>
      </t-form-item>
      <t-form-item label="状态" name="status">
        <t-radio-group v-model="formData.status">
          <t-radio v-for="dict in dicts?.get('sys_normal_disable')" :label="dict.dictLabel" :value="dict.dictValue" :key="dict.dictValue" />
        </t-radio-group>
      </t-form-item>
      <t-form-item class="col-span-2" label="岗位" name="postIds">
        <t-select v-model="formData.postIds" />
      </t-form-item>
      <t-form-item class="col-span-2" label="角色" name="roleIds">
        <t-select v-model="formData.roleIds" />
      </t-form-item>
      <t-form-item class="col-span-2" label="备注" name="remark">
        <t-textarea v-model="formData.remark" />
      </t-form-item>
    </t-form>
  </t-dialog>
</template>
