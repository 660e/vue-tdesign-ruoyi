import { DICTS } from '@/constants';

export * from '@/apis/types';
export * from '@/components/types';

export type AppSystemDictItem = (typeof DICTS)[number];
export type AppSystemDictMap = Map<AppSystemDictItem, { label: string; type: string; value: string }[]>;
export type AppUnknownRecord = Record<string, unknown>;

export interface AppRequestListParams {
  pageNum: number;
  pageSize: number;
  [key: string]: number | string;
}

export interface AppResponseData<T> {
  code: number;
  msg: string;
  data?: T;
  rows?: T;
  total?: number;
}
