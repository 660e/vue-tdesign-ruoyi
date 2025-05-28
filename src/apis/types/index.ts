export * from './login';

export interface IListParams {
  pageNum: number;
  pageSize: number;
  [key: string]: number | string;
}

export interface IResponse<T> {
  code: number;
  msg: string;
  data?: T;
  rows?: T;
  total?: number;
}

export type TUnknownRecord = Record<string, unknown>;
