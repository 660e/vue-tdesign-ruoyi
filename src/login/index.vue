<script setup lang="ts">
import type { FormProps } from 'tdesign-vue-next';
import { MessagePlugin } from 'tdesign-vue-next';
import { captchaImage, login } from '@/apis/login';

const formData = reactive({
  username: 'admin',
  password: 'admin123',
  code: '',
  uuid: '',
});

const rules: FormProps['rules'] = {
  username: [{ required: true, trigger: 'blur' }],
  password: [{ required: true, trigger: 'blur' }],
  code: [{ required: true, trigger: 'blur' }],
};

const disabled = ref(false);
const code = reactive<{
  src: string;
  status: 'loading' | 'success' | 'error' | undefined;
}>({
  src: '',
  status: undefined,
});

const refreshCaptcha = async () => {
  if (code.status === 'loading' || disabled.value) return;

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

const router = useRouter();
const onSubmit: FormProps['onSubmit'] = async ({ validateResult }) => {
  if (validateResult === true) {
    disabled.value = true;

    try {
      const { code, msg, token } = await login(formData);
      if (code === 200) {
        localStorage.setItem('token', token);
        router.push({ name: 'home' });
        return;
      }
      MessagePlugin.error(msg);
      disabled.value = false;
      refreshCaptcha();
    } catch {
      disabled.value = false;
    }
  }
};

onMounted(() => {
  refreshCaptcha();
});
</script>

<template>
  <div class="h-screen flex justify-center items-center">
    <div class="p-6 rounded border border-neutral-200">
      <t-form :data="formData" :disabled="disabled" :rules="rules" @submit="onSubmit" class="w-80" label-width="0">
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
            :class="{
              'bg-blue-50': code.status === 'loading',
              'bg-red-50': code.status === 'error',
              'cursor-not-allowed': disabled,
              'cursor-pointer': !disabled,
            }"
            @click="refreshCaptcha"
            class="h-10 w-24 ml-2 flex justify-center items-center"
          >
            <t-loading v-if="code.status === 'loading'" size="small" />
            <span v-if="code.status === 'error'">刷新验证码</span>
            <img v-if="code.status === 'success'" :src="code.src" class="h-full w-full" />
          </div>
        </t-form-item>
        <t-form-item>
          <t-button :loading="disabled" size="large" type="submit" block>登录</t-button>
        </t-form-item>
      </t-form>
    </div>
  </div>
</template>
