<script setup lang="ts">
import type { FormInstanceFunctions, FormProps, TableRowData } from 'tdesign-vue-next';
import { createNotice, updateNotice } from '@/apis/system';
import { useDict } from '@/hooks';
import { useLoadingStore } from '@/stores';

const { confirm } = defineProps<{ confirm: () => void }>();
const loadingStore = useLoadingStore();

const visible = ref(false);
const formRef = ref<FormInstanceFunctions>();
const formData = reactive({
  noticeId: undefined,
  noticeTitle: '',
  noticeType: '1',
  status: '0',
  noticeContent: '',
});
const formRules: FormProps['rules'] = {
  noticeTitle: [{ required: true, trigger: 'blur' }],
};

const show = (row?: TableRowData) => {
  if (row?.noticeId) {
    Object.assign(formData, row);
  }
  visible.value = true;
};

const onClosed = () => {
  formRef.value?.reset();
  formData.noticeId = undefined;
};

const onConfirm = async () => {
  if ((await formRef.value?.validate()) !== true) return;

  loadingStore.show();
  try {
    const { msg } = await (formData.noticeId ? updateNotice : createNotice)(formData);
    MessagePlugin.success(msg);
    confirm();
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
    :header="`${formData.noticeId ? '修改' : '新增'}通知公告`"
    :on-closed="onClosed"
    :on-confirm="onConfirm"
    placement="center"
    width="500"
  >
    <t-form :data="formData" :rules="formRules" reset-type="initial" ref="formRef">
      <t-form-item label="公告标题" name="noticeTitle">
        <t-input v-model="formData.noticeTitle" />
      </t-form-item>
      <t-form-item label="公告类型" name="noticeType">
        <t-radio-group v-model="formData.noticeType" :options="useDict('sys_notice_type')" theme="button" variant="default-filled" />
      </t-form-item>
      <t-form-item label="状态" name="status">
        <t-radio-group v-model="formData.status" :options="useDict('sys_notice_status')" theme="button" variant="default-filled" />
      </t-form-item>
      <t-form-item label="内容" name="noticeContent">
        <t-textarea v-model="formData.noticeContent" />
      </t-form-item>
    </t-form>
  </t-dialog>
</template>
