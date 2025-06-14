import type { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { DICTS } from '@/constants';

export * from '@/apis/types';
export * from '@/components/types';

export type AppSystemDictKey = (typeof DICTS)[number];
export type AppSystemDictMap = Map<AppSystemDictKey, AppSystemDictItem[]>;
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
  checkedKeys?: number[];
  data?: T;
  depts?: T;
  menus?: T;
  postGroup?: string;
  roleGroup?: string;
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

export interface AppSystemDictItem {
  label: string;
  type: string;
  value: string;
}
