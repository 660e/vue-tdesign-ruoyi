<script setup lang="ts">
const visible = ref(false);

const show = async (userId: number) => {
  visible.value = true;
  console.log(userId);
};

defineExpose({ show });
</script>

<template>
  <t-dialog v-model:visible="visible" header="分配角色" width="1000" />
</template>
