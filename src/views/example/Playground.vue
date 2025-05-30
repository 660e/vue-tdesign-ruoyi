<script setup lang="ts">
const onAlert = async () => {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 1000);
  });

  const DialogInstance = DialogPlugin.alert({
    body: '这是一个测试',
    onConfirm: () => DialogInstance.hide(),
    onClosed: () => DialogInstance.destroy(),
  });
};
</script>

<template>
  <div class="h-screen flex justify-end items-end">
    <t-button @click="onAlert">测试</t-button>
  </div>
</template>
