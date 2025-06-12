<script setup lang="ts">
import type { FormInstanceFunctions, FormProps, TableRowData } from 'tdesign-vue-next';
import { createRole, updateRole } from '@/apis/system';
import { useAppStore, useLoadingStore } from '@/stores';

const emit = defineEmits<{ confirm: [] }>();
const { dicts } = useAppStore();
const loadingStore = useLoadingStore();

const visible = ref(false);
const formRef = ref<FormInstanceFunctions>();
const formData = reactive({
  roleId: undefined,
  roleSort: 1,
  roleName: '',
  roleKey: '',
  status: '0',
  remark: '',
});
const formRules: FormProps['rules'] = {
  roleName: [{ required: true, trigger: 'blur' }],
  roleKey: [{ required: true, trigger: 'blur' }],
};

const show = (row?: TableRowData) => {
  if (row?.roleId) {
    Object.assign(formData, row);
  }
  visible.value = true;
};

const onClosed = () => {
  formRef.value?.reset();
  formData.roleId = undefined;
};

const onConfirm = async () => {
  if ((await formRef.value?.validate()) !== true) return;

  useLoading().show();
  try {
    const { msg } = await (formData.roleId ? updateRole(formData) : createRole(formData));
    MessagePlugin.success(msg);
    emit('confirm');
    visible.value = false;
  } catch {
  } finally {
    useLoading().hide();
  }
};

defineExpose({ show });
</script>

<template>
  <t-dialog
    v-model:visible="visible"
    :header="`${formData.roleId ? '修改' : '新增'}角色`"
    :on-closed="onClosed"
    :on-confirm="onConfirm"
    placement="center"
    width="500"
  >
    <t-form :data="formData" :rules="formRules" ref="formRef">
      <t-form-item label="序号" name="roleSort">
        <t-input-number v-model="formData.roleSort" />
      </t-form-item>
      <t-form-item label="角色名称" name="roleName">
        <t-input v-model="formData.roleName" />
      </t-form-item>
      <t-form-item label="权限字符" name="roleKey">
        <t-input v-model="formData.roleKey" />
      </t-form-item>
      <t-form-item label="状态" name="status">
        <t-radio-group v-model="formData.status" variant="default-filled">
          <t-radio-button v-for="dict in dicts?.get('sys_normal_disable')" :label="dict.label" :value="dict.value" :key="dict.value" />
        </t-radio-group>
      </t-form-item>
      <t-form-item class="col-span-2" label="备注" name="remark">
        <t-textarea v-model="formData.remark" />
      </t-form-item>
    </t-form>
  </t-dialog>
</template>
