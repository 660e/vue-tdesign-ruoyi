import { useAnimate } from '@vueuse/core';

export function useAnimateToggleHeight({
  el,
  toggle,
  from = '0px',
  to = 'auto',
  duration = 140,
  easing = 'ease',
}: {
  el: Ref;
  toggle: Ref<boolean>;
  from?: string;
  to?: string;
  duration?: number;
  easing?: string;
}) {
  const isAnimating = ref(false);

  watch(toggle, async (n) => {
    const element = el.value instanceof HTMLElement ? el.value : el.value.$el;
    if (!element || isAnimating.value) return;

    isAnimating.value = true;
    if (n) {
      element.style.height = from;

      await nextTick();
      const height = element.scrollHeight;
      useAnimate(element, [{ height: from }, { height: `${height}px` }], { duration, easing });
      element.style.height = to;
    } else {
      const height = element.scrollHeight;
      useAnimate(element, [{ height: `${height}px` }, { height: from }], { duration, easing });
    }
    isAnimating.value = false;
  });

  return { isAnimating };
}
