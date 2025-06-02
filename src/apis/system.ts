import type { AppRequestListParams, AppResponseData, AppUnknownRecord } from '@/types';
import { request } from '@/utils/index';

export function createUser(data: AppUnknownRecord) {
  return request.post<AppResponseData<AppUnknownRecord>>('/system/user', { data });
}

export function deleteUser(userIds: number | string) {
  return request.delete<AppResponseData<AppUnknownRecord>>(`/system/user/${userIds}`);
}

export function updateUser(data: AppUnknownRecord) {
  return request.put<AppResponseData<AppUnknownRecord>>('/system/user', { data });
}

export function listUser(params?: AppRequestListParams) {
  return request.get<AppResponseData<AppUnknownRecord[]>>('/system/user/list', { params });
}

export function getUser(userId: number) {
  return request.get<AppResponseData<AppUnknownRecord>>(`/system/user/${userId || ''}`);
}

export function deptTree() {
  return request.get<AppResponseData<AppUnknownRecord[]>>('/system/user/deptTree');
}

export function resetPwd(userId: number, password: string) {
  return request.put<AppResponseData<AppUnknownRecord>>('/system/user/resetPwd', { data: { userId, password } });
}

//

export function dict(name: string) {
  return request.get<AppResponseData<AppUnknownRecord[]>>(`/system/dict/data/type/${name}`);
}
