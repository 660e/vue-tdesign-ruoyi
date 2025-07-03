<script setup lang="ts">
const onTest1 = () => {
  const DialogInstance = DialogPlugin.confirm({
    onClosed: () => DialogInstance.destroy(),
  });
};

const onTest2 = async () => {
  await new Promise((resolve) => setTimeout(() => resolve(true), 100)); // timeout > 99

  onTest1();
};
</script>

<template>
  <div class="p-4 flex gap-4">
    <t-button @click="onTest1">TEST 1</t-button>
    <t-button @click="onTest2">TEST 2</t-button>
  </div>
</template>
