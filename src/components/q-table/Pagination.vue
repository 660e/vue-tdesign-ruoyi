<script setup lang="ts">
const pagination = reactive({
  current: 1,
  pageSize: 10,
  total: 1000,
});
</script>

<template>
  <t-pagination :total="pagination.total" class="flex-1" show-jumper />
</template>
