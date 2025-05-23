export * from './login';

export interface IListParams {
  pageNum: number;
  pageSize: number;
  [key: string]: number | string;
}

export interface IResponse<T> {
  code: number;
  data?: T;
  msg: string;
  rows?: T[];
  total?: number;
}

export type TUnknownRecord = Record<string, unknown>;
