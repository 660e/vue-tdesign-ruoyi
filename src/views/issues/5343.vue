<script setup lang="ts">
// https://github.com/Tencent/tdesign-vue-next/issues/5343
const visible = ref(false);
const formRef = ref();
const formData = reactive({ a: '', b: '' });
const rules = { a: [{ required: true }], b: [{ required: true }] };
</script>

<template>
  <div class="p-4">
    <t-button @click="visible = true">TEST</t-button>

    <t-dialog v-model:visible="visible" @confirm="formRef?.validate">
      <t-form :data="formData" :rules="rules" ref="formRef">
        <t-form-item label="A" name="a">
          <t-input v-model="formData.a" />
        </t-form-item>
        <t-form-item label="B" name="b">
          <t-input v-model="formData.b" />
        </t-form-item>
      </t-form>
    </t-dialog>
  </div>
</template>
