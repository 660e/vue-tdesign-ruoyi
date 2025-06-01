import type { AppRequestListParams, AppResponseData } from '@/types';
import type { TUnknownRecord } from './types';
import { request } from '@/utils/index';

export function createUser(data: TUnknownRecord) {
  return request.post<AppResponseData<TUnknownRecord>>('/system/user', { data });
}

export function deleteUser(ids: number | string) {
  return request.delete<AppResponseData<TUnknownRecord>>(`/system/user/${ids}`);
}

export function updateUser(data: TUnknownRecord) {
  return request.put<AppResponseData<TUnknownRecord>>('/system/user', { data });
}

export function listUser(params?: AppRequestListParams) {
  return request.get<AppResponseData<TUnknownRecord[]>>('/system/user/list', { params });
}

export function getUser(id: number) {
  return request.get<AppResponseData<TUnknownRecord>>(`/system/user/${id || ''}`);
}

export function deptTree() {
  return request.get<AppResponseData<TUnknownRecord[]>>('/system/user/deptTree');
}

export function resetPwd(userId: number, password: string) {
  return request.put<AppResponseData<TUnknownRecord>>('/system/user/resetPwd', { data: { userId, password } });
}

//

export function dict(name: string) {
  return request.get<AppResponseData<TUnknownRecord[]>>(`/system/dict/data/type/${name}`);
}
