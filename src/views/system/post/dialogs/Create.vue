<script setup lang="ts">
import type { FormInstanceFunctions, FormProps, TableRowData } from 'tdesign-vue-next';
import { createPost, updatePost } from '@/apis/system';
import { useDict } from '@/hooks';
import { useLoadingStore } from '@/stores';

const emit = defineEmits<{ confirm: [] }>();
const loadingStore = useLoadingStore();

const visible = ref(false);
const formRef = ref<FormInstanceFunctions>();
const formData = reactive({
  postId: undefined,
  postSort: 0,
  postName: '',
  password: '',
  postCode: '',
  status: '0',
  remark: '',
});
const formRules: FormProps['rules'] = {
  postSort: [{ required: true, trigger: 'blur' }],
  postName: [{ required: true, trigger: 'blur' }],
  postCode: [{ required: true, trigger: 'blur' }],
};

const show = (row?: TableRowData) => {
  if (row?.postId) {
    Object.assign(formData, row);
  }
  visible.value = true;
};

const onClosed = () => {
  formRef.value?.reset();
  formData.postId = undefined;
};

const onConfirm = async () => {
  if ((await formRef.value?.validate()) !== true) return;

  loadingStore.show();
  try {
    const { msg } = await (formData.postId ? updatePost : createPost)(formData);
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
    :header="`${formData.postId ? '修改' : '新增'}岗位`"
    :on-closed="onClosed"
    :on-confirm="onConfirm"
    placement="center"
    width="500"
  >
    <t-form :data="formData" :rules="formRules" reset-type="initial" ref="formRef">
      <t-form-item label="序号" name="postSort">
        <t-input-number v-model="formData.postSort" />
      </t-form-item>
      <t-form-item label="岗位名称" name="postName">
        <t-input v-model="formData.postName" />
      </t-form-item>
      <t-form-item label="岗位编码" name="postCode">
        <t-input v-model="formData.postCode" />
      </t-form-item>
      <t-form-item label="状态" name="status">
        <t-radio-group v-model="formData.status" :options="useDict('sys_normal_disable')" theme="button" variant="default-filled" />
      </t-form-item>
      <t-form-item label="备注" name="remark">
        <t-textarea v-model="formData.remark" />
      </t-form-item>
    </t-form>
  </t-dialog>
</template>
