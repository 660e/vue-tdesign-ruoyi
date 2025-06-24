<script setup lang="ts">
import type { FormInstanceFunctions, FormProps, TableRowData } from 'tdesign-vue-next';
import { createConfig, updateConfig } from '@/apis/system';
import { useDict } from '@/hooks';
import { useLoadingStore } from '@/stores';

const { confirm } = defineProps<{ confirm: () => void }>();
const loadingStore = useLoadingStore();

const visible = ref(false);
const formRef = ref<FormInstanceFunctions>();
const formData = reactive({
  configId: undefined,
  configName: '',
  configKey: '',
  configValue: '',
  configType: 'Y',
  remark: '',
});
const formRules: FormProps['rules'] = {
  configName: [{ required: true, trigger: 'blur' }],
  configKey: [{ required: true, trigger: 'blur' }],
  configValue: [{ required: true, trigger: 'blur' }],
};

const show = (row?: TableRowData) => {
  if (row?.configId) {
    Object.assign(formData, row);
  }
  visible.value = true;
};

const onClosed = () => {
  formRef.value?.reset();
  formData.configId = undefined;
};

const onConfirm = async () => {
  if ((await formRef.value?.validate()) !== true) return;

  loadingStore.show();
  try {
    const { msg } = await (formData.configId ? updateConfig : createConfig)(formData);
    confirm();
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
    :header="`${formData.configId ? '修改' : '新增'}参数设置`"
    :on-closed="onClosed"
    :on-confirm="onConfirm"
    placement="center"
    width="500"
  >
    <t-form :data="formData" :rules="formRules" reset-type="initial" ref="formRef">
      <t-form-item label="参数名称" name="configName">
        <t-input v-model="formData.configName" />
      </t-form-item>
      <t-form-item label="参数键名" name="configKey">
        <t-input v-model="formData.configKey" />
      </t-form-item>
      <t-form-item label="参数键值" name="configValue">
        <t-input v-model="formData.configValue" />
      </t-form-item>
      <t-form-item label="系统内置" name="configType">
        <t-radio-group v-model="formData.configType" :options="useDict('sys_yes_no')" theme="button" variant="default-filled" />
      </t-form-item>
      <t-form-item label="备注" name="remark">
        <t-textarea v-model="formData.remark" />
      </t-form-item>
    </t-form>
  </t-dialog>
</template>
