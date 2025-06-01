import type { AppRequestListParams } from '@/types';
import type { IResponse, TUnknownRecord } from './types';
import { request } from '@/utils/index';

export function createUser(data: TUnknownRecord) {
  return request.post<IResponse<TUnknownRecord>>('/system/user', { data });
}

export function deleteUser(ids: number | string) {
  return request.delete<IResponse<TUnknownRecord>>(`/system/user/${ids}`);
}

export function updateUser(data: TUnknownRecord) {
  return request.put<IResponse<TUnknownRecord>>('/system/user', { data });
}

export function listUser(params?: AppRequestListParams) {
  return request.get<IResponse<TUnknownRecord[]>>('/system/user/list', { params });
}

export function getUser(id: number) {
  return request.get<IResponse<TUnknownRecord>>(`/system/user/${id || ''}`);
}

export function deptTree() {
  return request.get<IResponse<TUnknownRecord[]>>('/system/user/deptTree');
}

export function resetPwd(userId: number, password: string) {
  return request.put<IResponse<TUnknownRecord>>('/system/user/resetPwd', { data: { userId, password } });
}

//

export function dict(name: string) {
  return request.get<IResponse<TUnknownRecord[]>>(`/system/dict/data/type/${name}`);
}
