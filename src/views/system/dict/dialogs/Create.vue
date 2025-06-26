<script setup lang="ts">
import type { FormInstanceFunctions, FormProps, TableRowData } from 'tdesign-vue-next';
import { createDictType, updateDictType } from '@/apis/system';
import { useDict } from '@/hooks';
import { useLoadingStore } from '@/stores';

const { onSuccess } = defineProps<{ onSuccess: () => Promise<void> }>();
const loadingStore = useLoadingStore();

const visible = ref(false);
const formRef = ref<FormInstanceFunctions>();
const formData = reactive({
  dictId: undefined,
  dictName: '',
  dictType: '',
  status: '0',
  remark: '',
});
const formRules: FormProps['rules'] = {
  dictName: [{ required: true, trigger: 'blur' }],
  dictType: [{ required: true, trigger: 'blur' }],
};

const show = (row?: TableRowData) => {
  if (row?.dictId) {
    Object.assign(formData, row);
  }
  visible.value = true;
};

const onClosed = () => {
  formRef.value?.reset();
  formData.dictId = undefined;
};

const onConfirm = async () => {
  if ((await formRef.value?.validate()) !== true) return;

  loadingStore.show();
  try {
    const { msg } = await (formData.dictId ? updateDictType : createDictType)(formData);
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
    :header="`${formData.dictId ? '修改' : '新增'}字典类型`"
    @closed="onClosed"
    @confirm="onConfirm"
    placement="center"
    width="500"
  >
    <t-form :data="formData" :rules="formRules" reset-type="initial" ref="formRef">
      <t-form-item label="字典名称" name="dictName">
        <t-input v-model="formData.dictName" />
      </t-form-item>
      <t-form-item label="字典类型" name="dictType">
        <t-input v-model="formData.dictType" />
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
