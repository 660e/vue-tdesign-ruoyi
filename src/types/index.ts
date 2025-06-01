import type { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { DICTS } from '@/constants';

export * from '@/apis/types';
export * from '@/components/types';

export type AppSystemDictKey = (typeof DICTS)[number];
export type AppSystemDictMap = Map<AppSystemDictKey, { label: string; type: string; value: string }[]>;
export type AppUnknownRecord = Record<string, unknown>;

export interface AppRequestConfig {
  requestInterceptors?: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig;
  responseInterceptors?: (response: AxiosResponse) => AxiosResponse;
}

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

export interface AppRoute {
  children?: AppRoute[];
  component: string;
  hidden: boolean;
  meta: {
    icon: string;
    link: string;
    title: string;
  };
  name: string;
  path: string;
}
