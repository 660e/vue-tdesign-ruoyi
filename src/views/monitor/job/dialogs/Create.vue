<script setup lang="ts">
import type { FormInstanceFunctions, FormProps, TableRowData } from 'tdesign-vue-next';
import { createJob, updateJob } from '@/apis/monitor';
import { useDict } from '@/hooks';
import { useLoadingStore } from '@/stores';

const { onSuccess } = defineProps<{ onSuccess: () => Promise<void> }>();
const loadingStore = useLoadingStore();

const visible = ref(false);
const formRef = ref<FormInstanceFunctions>();
const formData = reactive({
  jobId: undefined,
  jobName: '',
  jobGroup: 'DEFAULT',
  invokeTarget: '',
  cronExpression: '',
  misfirePolicy: '1',
  concurrent: '1',
});
const formRules: FormProps['rules'] = {
  jobName: [{ required: true, trigger: 'blur' }],
  invokeTarget: [{ required: true, trigger: 'blur' }],
  cronExpression: [{ required: true, trigger: 'blur' }],
};

const show = (row?: TableRowData) => {
  if (row?.jobId) {
    Object.assign(formData, row);
  }
  visible.value = true;
};

const onClosed = () => {
  formRef.value?.reset();
  formData.jobId = undefined;
};

const onConfirm = async () => {
  if ((await formRef.value?.validate()) !== true) return;

  loadingStore.show();
  try {
    const { msg } = await (formData.jobId ? updateJob : createJob)(formData);
    await onSuccess();
    MessagePlugin.success(msg);
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
    :header="`${formData.jobId ? '修改' : '新增'}定时任务`"
    @closed="onClosed"
    @confirm="onConfirm"
    placement="center"
    width="500"
  >
    <t-form :data="formData" :rules="formRules" label-width="120px" reset-type="initial" ref="formRef">
      <t-form-item label="任务名称" name="jobName">
        <t-input v-model="formData.jobName" />
      </t-form-item>
      <t-form-item label="任务分组" name="jobGroup">
        <t-radio-group v-model="formData.jobGroup" :options="useDict('sys_job_group')" theme="button" variant="default-filled" />
      </t-form-item>
      <t-form-item label="调用方法" name="invokeTarget">
        <t-textarea v-model="formData.invokeTarget" />
      </t-form-item>
      <t-form-item label="cron表达式" name="cronExpression">
        <t-input v-model="formData.cronExpression" />
      </t-form-item>
      <t-form-item label="执行策略" name="misfirePolicy">
        <t-radio-group v-model="formData.misfirePolicy" :options="useDict('sys_job_status')" theme="button" variant="default-filled" />
      </t-form-item>
      <t-form-item label="是否并发" name="concurrent">
        <t-radio-group v-model="formData.concurrent" :options="useDict('sys_job_status')" theme="button" variant="default-filled" />
      </t-form-item>
    </t-form>
  </t-dialog>
</template>
