import type { LoadingInstance } from 'tdesign-vue-next';
import { LoadingPlugin } from 'tdesign-vue-next';

export function useLoading() {
  const instance = ref<LoadingInstance>();
  const count = ref(0);

  const showFullscreenLoading = () => {
    if (!instance.value) {
      instance.value = LoadingPlugin({
        size: '24px',
        // indicator: () => <div class="animate-spin">Loading...</div>,
      });
    }
    count.value += 1;
    console.log('count: ', count.value);
  };

  const hideFullscreenLoading = () => {
    if (count.value > 0) {
      count.value -= 1;
    }
    if (count.value === 0 && instance.value) {
      instance.value.hide();
      instance.value = undefined;
    }
    console.log('count: ', count.value);
  };

  return { showFullscreenLoading, hideFullscreenLoading };
}
