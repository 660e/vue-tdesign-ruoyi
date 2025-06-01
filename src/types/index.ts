import { DICTS } from '@/constants';

export type AppSystemDictItem = (typeof DICTS)[number];
export type AppSystemDictMap = Map<AppSystemDictItem, { label: string; type: string; value: string }[]>;
