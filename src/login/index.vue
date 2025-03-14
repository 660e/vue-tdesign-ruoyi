<script setup lang="ts">
import { captchaImage } from '@/apis/login';

const formData = reactive({
  username: '',
  password: '',
});

const onSubmit = () => {
  console.log(formData);
};

onMounted(async () => {
  await captchaImage();
});
</script>

<template>
  <div class="h-screen flex justify-center items-center">
    <div class="p-6 rounded border border-neutral-200">
      <t-form :data="formData" @submit="onSubmit" class="w-80" label-width="0">
        <t-form-item name="username">
          <t-input v-model="formData.username" placeholder="账户" size="large" clearable>
            <template #prefix-icon>
              <t-icon name="desktop" />
            </template>
          </t-input>
        </t-form-item>
        <t-form-item name="password">
          <t-input v-model="formData.password" placeholder="密码" size="large" type="password" clearable>
            <template #prefix-icon>
              <t-icon name="lock-on" />
            </template>
          </t-input>
        </t-form-item>
        <t-form-item>
          <t-button size="large" theme="primary" type="submit" block>登录</t-button>
        </t-form-item>
      </t-form>
    </div>
  </div>
</template>
