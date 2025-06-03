import { useAnimate } from '@vueuse/core';
import { is } from '@/utils';

export function useAnimateToggleHeight({
  el,
  toggle,
  from = 0,
  to = 'auto',
  duration = 140,
  easing = 'ease',
}: {
  el: Ref;
  toggle: Ref<boolean>;
  from?: number | string;
  to?: number | string;
  duration?: number;
  easing?: string;
}) {
  const isAnimating = ref(false);

  watch(toggle, async (n) => {
    const element = el.value;
    if (!element || isAnimating.value) return;

    const fromValue = is.string(from) ? from : `${from}px`;
    const toValue = is.string(to) ? to : `${to}px`;

    isAnimating.value = true;
    if (n) {
      element.style.height = fromValue;

      await nextTick();
      const height = element.scrollHeight;
      useAnimate(element, [{ height: fromValue }, { height: `${height}px` }], { duration, easing });
      element.style.height = toValue;
    } else {
      const height = element.scrollHeight;
      useAnimate(element, [{ height: `${height}px` }, { height: fromValue }], { duration, easing });
    }
    isAnimating.value = false;
  });

  return { isAnimating };
}
