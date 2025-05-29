<script setup lang="ts">
import type { TableRowData } from 'tdesign-vue-next';
import { resetPwd } from '@/apis/system';
import { useLoading } from '@/hooks';

const { showFullscreenLoading, hideFullscreenLoading } = useLoading();

const visible = ref(false);

const show = async (row?: TableRowData) => {
  showFullscreenLoading();
  console.log(row);

  visible.value = true;
  hideFullscreenLoading();
};

const onClosed = () => {
  console.log('Dialog closed');
};

const onConfirm = async () => {
  showFullscreenLoading();
  try {
    console.log(resetPwd);
    visible.value = false;
  } catch {
  } finally {
    hideFullscreenLoading();
  }
};

defineExpose({ show });
</script>

<template>
  <t-dialog v-model:visible="visible" :on-closed="onClosed" :on-confirm="onConfirm" header="新密码">
    <div>Lorem ipsum dolor sit amet.</div>
  </t-dialog>
</template>
