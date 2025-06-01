import type { LoadingInstance } from 'tdesign-vue-next';
import type { AppFullscreenLoadingController } from '@/types';
import { LoadingPlugin } from 'tdesign-vue-next';

export function useFullscreenLoading(): AppFullscreenLoadingController {
  const instance = ref<LoadingInstance>();
  const count = ref(0);

  const show = () => {
    if (!instance.value) {
      instance.value = LoadingPlugin({
        size: '24px',
        // indicator: () => <div class="animate-spin">Loading...</div>,
      });
    }
    count.value += 1;
    console.log('loading count:', count.value);
  };

  const hide = () => {
    if (count.value > 0) {
      count.value -= 1;
    }
    if (count.value === 0 && instance.value) {
      instance.value.hide();
      instance.value = undefined;
    }
    console.log('loading count:', count.value);
  };

  return { show, hide };
}
