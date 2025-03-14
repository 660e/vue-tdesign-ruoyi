<script setup lang="ts">
import { captchaImage } from '@/apis/login';

const formData = reactive({
  username: '',
  password: '',
  code: '',
  uuid: '',
});

const codeImg = ref();

const refreshCaptcha = async (mounted?: boolean) => {
  if (mounted || codeImg.value) {
    codeImg.value = null;
    const { img, uuid } = await captchaImage();
    codeImg.value = `data:image/gif;base64,${img}`;
    formData.uuid = uuid;
  }
};

const onSubmit = () => {
  console.log(formData);
};

onMounted(() => {
  refreshCaptcha(true);
});
</script>

<template>
  <div class="h-screen flex justify-center items-center">
    <div class="p-6 rounded border border-neutral-200">
      <t-form :data="formData" @submit="onSubmit" class="w-80" label-width="0">
        <t-form-item name="username">
          <t-input v-model="formData.username" placeholder="账户" size="large">
            <template #prefix-icon>
              <t-icon name="desktop" />
            </template>
          </t-input>
        </t-form-item>
        <t-form-item name="password">
          <t-input v-model="formData.password" placeholder="密码" size="large" type="password">
            <template #prefix-icon>
              <t-icon name="lock-on" />
            </template>
          </t-input>
        </t-form-item>
        <t-form-item name="code">
          <t-input v-model="formData.code" class="flex-1 !w-0" placeholder="验证码" size="large">
            <template #prefix-icon>
              <t-icon name="barcode-1" />
            </template>
          </t-input>
          <div @click="refreshCaptcha()" class="h-10 w-24 ml-2 cursor-pointer flex justify-center items-center">
            <img v-if="codeImg" :src="codeImg" class="h-full w-full" />
            <t-loading v-else size="small" />
          </div>
        </t-form-item>
        <t-form-item>
          <t-button size="large" theme="primary" type="submit" block>登录</t-button>
        </t-form-item>
      </t-form>
    </div>
  </div>
</template>
