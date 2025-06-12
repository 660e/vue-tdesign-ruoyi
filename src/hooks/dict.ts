import type { AppSystemDictKey } from '@/types';
import { useAppStore } from '@/stores';

export function useDict(key: AppSystemDictKey, value?: string) {
  const { dicts } = useAppStore();

  if (arguments.length === 2) {
    return dicts?.get(key)?.find((e) => e.value === value)?.label || '-';
  } else {
    return dicts?.get(key) || [];
  }
}
