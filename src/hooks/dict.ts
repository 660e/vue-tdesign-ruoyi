import type { AppSystemDictItem, AppSystemDictKey } from '@/types';
import { useAppStore } from '@/stores';

export function useDict(key: AppSystemDictKey, value: string): string;
export function useDict(key: AppSystemDictKey): AppSystemDictItem[];

export function useDict(key: AppSystemDictKey, value?: string) {
  const { dicts } = useAppStore();

  if (arguments.length === 2) {
    return dicts?.get(key)?.find((e) => e.value === String(value))?.label || '-';
  } else {
    return dicts?.get(key) || [];
  }
}
