import type { AppRequestListParams, AppResponseData, AppUnknownRecord } from '@/types';
import { fd, request } from '@/utils';

export function updateUserProfile(data: AppUnknownRecord) {
  return request.put<AppResponseData<AppUnknownRecord>>('/system/user/profile', { data });
}

export function getUserProfile() {
  return request.get<AppResponseData<AppUnknownRecord>>('/system/user/profile');
}

export function updatePassword(data: AppUnknownRecord) {
  return request.put<AppResponseData<AppUnknownRecord>>('/system/user/profile/updatePwd', { data });
}

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

export function exportUser(params?: AppRequestListParams) {
  return request.post<AppResponseData<Blob>>('/system/user/export', { params, responseType: 'blob' });
}

export function importUser(file: File, updateSupport: 0 | 1) {
  return request.post<AppResponseData<AppUnknownRecord>>('/system/user/importData', { data: fd({ file }), params: { updateSupport } });
}

export function importUserTemplate() {
  return request.post<AppResponseData<Blob>>('/system/user/importTemplate', { responseType: 'blob' });
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
