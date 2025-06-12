import type { LoadingInstance } from 'tdesign-vue-next';
import { defineStore } from 'pinia';
import { LoadingPlugin } from 'tdesign-vue-next';
import NProgress from 'nprogress';

NProgress.configure({ showSpinner: false });

export const useFullscreenLoading = defineStore('loading', () => {
  const instance = ref<LoadingInstance>();
  const status = ref(0);

  const show = () => {
    if (!instance.value) {
      instance.value = LoadingPlugin({
        size: '24px',
        // indicator: () => <div class="animate-spin">Loading...</div>,
      });
      NProgress.start();
    }
    status.value += 1;
    console.info(`%c⏳ loading status: ${status.value}`, 'color: #0c0');
  };

  const hide = () => {
    if (status.value > 0) {
      status.value -= 1;
    }
    if (status.value === 0 && instance.value) {
      instance.value.hide();
      instance.value = undefined;
      NProgress.done();
    }
    console.info(`%c⏳ loading status: ${status.value}`, 'color: #0c0');
  };

  return { show, hide };
});
