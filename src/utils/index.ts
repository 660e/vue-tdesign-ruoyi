import type { LoadingInstance } from 'tdesign-vue-next';
import { LoadingPlugin } from 'tdesign-vue-next';

export const fullscreenLoading: {
  instance: LoadingInstance | null;
  show: () => void;
  hide: () => void;
} = {
  instance: null,
  show: () => {
    fullscreenLoading.instance = LoadingPlugin({
      size: '24px',
    });
  },
  hide: () => {
    if (fullscreenLoading.instance) fullscreenLoading.instance.hide();
  },
};

export * from './data';
export * from './deepseek';
export * from './is';
export * from './request';
