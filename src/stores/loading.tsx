import type { LoadingInstance } from 'tdesign-vue-next';
import { LoadingPlugin } from 'tdesign-vue-next';
import { defineStore } from 'pinia';

export const useLoadingStore = defineStore('loading', () => {
  const instance = ref<LoadingInstance>();

  const showFullscreenLoading = () => {
    if (!instance.value) {
      instance.value = LoadingPlugin({
        size: '24px',
        // indicator: () => <div class="animate-spin">Loading...</div>,
      });
    }
  };

  const hideFullscreenLoading = () => {
    if (instance.value) {
      instance.value.hide();
      instance.value = undefined;
    }
  };

  return { showFullscreenLoading, hideFullscreenLoading };
});
