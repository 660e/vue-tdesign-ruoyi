<script setup lang="ts">
import { captchaImage } from '@/apis/login';

const formData = reactive({
  username: '',
  password: '',
  code: '',
  uuid: '',
});

const code = reactive<{
  src: string;
  status: 'loading' | 'success' | 'error' | undefined;
}>({
  src: '',
  status: undefined,
});

const refreshCaptcha = async () => {
  if (code.status === 'loading') return;

  code.status = 'loading';
  try {
    const { img, uuid } = await captchaImage();
    formData.uuid = uuid;
    code.src = `data:image/gif;base64,${img}`;
    code.status = 'success';
  } catch {
    code.status = 'error';
  }
};

const onSubmit = () => {
  console.log(formData);
};

onMounted(() => {
  refreshCaptcha();
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
          <div
            :class="{ 'bg-blue-50': code.status === 'loading', 'bg-red-50': code.status === 'error' }"
            @click="refreshCaptcha"
            class="h-10 w-24 ml-2 cursor-pointer flex justify-center items-center"
          >
            <t-loading v-if="code.status === 'loading'" size="small" />
            <span v-if="code.status === 'error'">刷新验证码</span>
            <img v-if="code.status === 'success'" :src="code.src" class="h-full w-full" />
          </div>
        </t-form-item>
        <t-form-item>
          <t-button size="large" theme="primary" type="submit" block>登录</t-button>
        </t-form-item>
      </t-form>
    </div>
  </div>
</template>
