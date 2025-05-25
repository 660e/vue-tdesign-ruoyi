import { useAnimate } from '@vueuse/core';

export function useToggleHeight(elementRef: Ref<HTMLElement | null>, visible: Ref<boolean>, duration = 140, easing = 'ease') {
  const isAnimating = ref(false);

  watch(visible, async (n) => {
    const el = elementRef.value;
    if (!el || isAnimating.value) return;

    isAnimating.value = true;

    if (n) {
      el.style.height = '0px';

      await nextTick();
      const height = el.scrollHeight;
      useAnimate(el, [{ height: '0px' }, { height: `${height}px` }], { duration, easing });
      el.style.height = 'auto';
    } else {
      const height = el.scrollHeight;
      useAnimate(el, [{ height: `${height}px` }, { height: '0px' }], { duration, easing });
    }

    isAnimating.value = false;
  });

  return { isAnimating };
}
