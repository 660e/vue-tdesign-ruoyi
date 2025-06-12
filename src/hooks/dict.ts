import type { AppSystemDictKey } from '@/types';
import { useAppStore } from '@/stores';

export function useDict(key: AppSystemDictKey, value?: string) {
  const { dicts } = useAppStore();

  return value ? dicts?.get(key)?.find((e) => e.value === value)?.label || '-' : dicts?.get(key) || [];
}
