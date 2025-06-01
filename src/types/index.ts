import { DICTS } from '@/constants';

export * from '@/apis/types';
export * from '@/components/types';

export type AppSystemDictItem = (typeof DICTS)[number];
export type AppSystemDictMap = Map<AppSystemDictItem, { label: string; type: string; value: string }[]>;

export interface AppRequestListParams {
  pageNum: number;
  pageSize: number;
  [key: string]: number | string;
}
