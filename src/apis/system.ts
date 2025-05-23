import type { IDict, IListParams, IResponse, TUnknownRecord } from './types';
import { request } from '@/utils/index';

export function listUser(params?: IListParams) {
  return request.get<IResponse<TUnknownRecord>>('/system/user/list', { params });
}

export function dict(name: string) {
  return request.get<IResponse<IDict[]>>(`/system/dict/data/type/${name}`);
}
