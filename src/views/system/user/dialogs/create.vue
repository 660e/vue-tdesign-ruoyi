<script setup lang="ts">
import type { FormInstanceFunctions, FormProps, TableRowData } from 'tdesign-vue-next';

const visible = ref(false);
const formRef = ref<FormInstanceFunctions>();
const formData = reactive({
  userId: undefined,
  userName: '',
});
const rules: FormProps['rules'] = {
  userName: [{ required: true, trigger: 'blur' }],
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
  visible.value = false;
};

defineExpose({ show });
</script>

<template>
  <t-dialog v-model:visible="visible" :header="`${formData.userId ? '修改' : '新增'}用户`" :on-closed="onClosed" :on-confirm="onConfirm">
    <t-form :data="formData" :rules="rules" ref="formRef">
      <t-form-item label="用户名称" name="userName">
        <t-input v-model="formData.userName" />
      </t-form-item>
    </t-form>
  </t-dialog>
</template>
