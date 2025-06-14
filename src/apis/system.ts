import type { AppRequestListParams, AppResponseData, AppUnknownRecord } from '@/types';
import { fd, request } from '@/utils';

// ----- user

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

export function getDeptTree() {
  return request.get<AppResponseData<AppUnknownRecord[]>>('/system/user/deptTree');
}

export function resetPwd(userId: number, password: string) {
  return request.put<AppResponseData<AppUnknownRecord>>('/system/user/resetPwd', { data: { userId, password } });
}

// ----- role

export function createRole(data: AppUnknownRecord) {
  return request.post<AppResponseData<AppUnknownRecord>>('/system/role', { data });
}

export function deleteRole(roleIds: number | string) {
  return request.delete<AppResponseData<AppUnknownRecord>>(`/system/role/${roleIds}`);
}

export function updateRole(data: AppUnknownRecord) {
  return request.put<AppResponseData<AppUnknownRecord>>('/system/role', { data });
}

export function listRole(params?: AppRequestListParams) {
  return request.get<AppResponseData<AppUnknownRecord[]>>('/system/role/list', { params });
}

export function getDeptTreeByRoleId(roleId: number) {
  return request.get<AppResponseData<AppUnknownRecord[]>>(`/system/role/deptTree/${roleId}`);
}

export function listAllocated(params?: AppRequestListParams) {
  return request.get<AppResponseData<AppUnknownRecord[]>>('/system/role/authUser/allocatedList', { params });
}

export function listUnallocated(params?: AppRequestListParams) {
  return request.get<AppResponseData<AppUnknownRecord[]>>('/system/role/authUser/unallocatedList', { params });
}

export function allocateUsers(roleId: number, userIds: string) {
  return request.put<AppResponseData<AppUnknownRecord>>('/system/role/authUser/selectAll', { params: { roleId, userIds } });
}

export function unallocateUsers(roleId: number, userIds: string) {
  return request.put<AppResponseData<AppUnknownRecord>>('/system/role/authUser/cancelAll', { params: { roleId, userIds } });
}

// ----- menu

export function createMenu(data: AppUnknownRecord) {
  return request.post<AppResponseData<AppUnknownRecord>>('/system/menu', { data });
}

export function deleteMenu(menuIds: number | string) {
  return request.delete<AppResponseData<AppUnknownRecord>>(`/system/menu/${menuIds}`);
}

export function updateMenu(data: AppUnknownRecord) {
  return request.put<AppResponseData<AppUnknownRecord>>('/system/menu', { data });
}

export function listMenu() {
  return request.get<AppResponseData<AppUnknownRecord[]>>('/system/menu/list');
}

export function getMenuTreeByRoleId(roleId: number) {
  return request.get<AppResponseData<AppUnknownRecord[]>>(`/system/menu/roleMenuTreeselect/${roleId}`);
}

// ----- notice

export function listNotice(params?: AppRequestListParams) {
  return request.get<AppResponseData<AppUnknownRecord[]>>('/system/notice/list', { params });
}

// ----- dict

export function dict(name: string) {
  return request.get<AppResponseData<AppUnknownRecord[]>>(`/system/dict/data/type/${name}`);
}
