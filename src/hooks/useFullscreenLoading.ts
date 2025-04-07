import type { LoadingInstance } from 'tdesign-vue-next';
import { LoadingPlugin } from 'tdesign-vue-next';

export const useFullscreenLoading = () => {
  const fullscreenLoading = {
    instance: null as LoadingInstance | null,
    show: () => {
      if (!fullscreenLoading.instance) {
        fullscreenLoading.instance = LoadingPlugin({
          size: '24px',
        });
      }
    },
    hide: () => {
      if (fullscreenLoading.instance) {
        fullscreenLoading.instance.hide();
        fullscreenLoading.instance = null;
      }
    },
  };

  return fullscreenLoading;
};
