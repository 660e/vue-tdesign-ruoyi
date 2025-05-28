import type { IListParams, IResponse, TUnknownRecord } from './types';
import { request } from '@/utils/index';

export function listUser(params?: IListParams) {
  return request.get<IResponse<TUnknownRecord[]>>('/system/user/list', { params });
}

export function getUser(id = '') {
  return request.get<IResponse<TUnknownRecord>>(`/system/user/${id}`);
}

export function deptTree() {
  return request.get<IResponse<TUnknownRecord[]>>('/system/user/deptTree');
}

export function dict(name: string) {
  return request.get<IResponse<TUnknownRecord[]>>(`/system/dict/data/type/${name}`);
}
