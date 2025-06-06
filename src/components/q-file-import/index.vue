<script setup lang="ts">
import type { UploadProps } from 'tdesign-vue-next';
import type { QTableProps } from '@/types';
import { useFullscreenLoading } from '@/stores';
import { is } from '@/utils';

const emit = defineEmits<{ confirm: [] }>();
const fullscreenLoading = useFullscreenLoading();
const visible = ref(false);
const importParams = ref<QTableProps['fileImport']>();
const replace = ref(false);

const show = (fileImport: QTableProps['fileImport']) => {
  importParams.value = fileImport;
  visible.value = true;
};

const downloadTemplate = async () => {
  fullscreenLoading.show();
  try {
    const data = await importParams.value?.template?.();
    console.log(data); // TODO
  } catch {
  } finally {
    fullscreenLoading.hide();
  }
};

const requestMethod: UploadProps['requestMethod'] = (file) => {
  return new Promise(async () => {
    if (is.array(file)) return;

    fullscreenLoading.show();
    try {
      const response = await importParams.value?.api(file.raw!, replace.value);
      console.log(response); // TODO
      emit('confirm');
      visible.value = false;
    } catch {
    } finally {
      fullscreenLoading.hide();
    }
  });
};

defineExpose({ show });
</script>

<template>
  <t-dialog v-model:visible="visible" :footer="false" header="导入">
    <t-upload
      :accept="importParams?.templateType ? `.${importParams.templateType}` : undefined"
      :auto-upload="false"
      :request-method="requestMethod"
      draggable
    />
    <div v-if="importParams?.template || importParams?.replaceable" class="flex pt-4">
      <t-link v-if="importParams.template" @click="downloadTemplate" theme="primary">下载模板</t-link>
      <div class="flex-1"></div>
      <t-checkbox v-if="importParams.replaceable" v-model="replace">覆盖原数据</t-checkbox>
    </div>
  </t-dialog>
</template>

<style scoped>
:global(.t-dialog .t-dialog__body) {
  padding-bottom: 0;
}
.t-upload :deep(.t-upload__dragger) {
  width: auto;
}
</style>
