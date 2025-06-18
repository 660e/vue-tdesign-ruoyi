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

// ----- dept

export function createDept(data: AppUnknownRecord) {
  return request.post<AppResponseData<AppUnknownRecord>>('/system/dept', { data });
}

export function deleteDept(deptIds: number | string) {
  return request.delete<AppResponseData<AppUnknownRecord>>(`/system/dept/${deptIds}`);
}

export function updateDept(data: AppUnknownRecord) {
  return request.put<AppResponseData<AppUnknownRecord>>('/system/dept', { data });
}

export function listDept() {
  return request.get<AppResponseData<AppUnknownRecord[]>>('/system/dept/list');
}

// ----- post

export function createPost(data: AppUnknownRecord) {
  return request.post<AppResponseData<AppUnknownRecord>>('/system/post', { data });
}

export function deletePost(postIds: number | string) {
  return request.delete<AppResponseData<AppUnknownRecord>>(`/system/post/${postIds}`);
}

export function updatePost(data: AppUnknownRecord) {
  return request.put<AppResponseData<AppUnknownRecord>>('/system/post', { data });
}

export function listPost(params?: AppRequestListParams) {
  return request.get<AppResponseData<AppUnknownRecord[]>>('/system/post/list', { params });
}

export function exportPost(params?: AppRequestListParams) {
  return request.post<AppResponseData<Blob>>('/system/post/export', { params, responseType: 'blob' });
}

// ----- dict

export function createDictType(data: AppUnknownRecord) {
  return request.post<AppResponseData<AppUnknownRecord>>('/system/dict/type', { data });
}

export function deleteDictType(dictIds: number | string) {
  return request.delete<AppResponseData<AppUnknownRecord>>(`/system/dict/type/${dictIds}`);
}

export function updateDictType(data: AppUnknownRecord) {
  return request.put<AppResponseData<AppUnknownRecord>>('/system/dict/type', { data });
}

export function listDictType(params?: AppRequestListParams) {
  return request.get<AppResponseData<AppUnknownRecord[]>>('/system/dict/type/list', { params });
}

export function exportDictType(params?: AppRequestListParams) {
  return request.post<AppResponseData<Blob>>('/system/dict/type/export', { params, responseType: 'blob' });
}

export function refreshCache() {
  return request.post<AppResponseData<AppUnknownRecord>>('/system/dict/type/refreshCache');
}

export function createDictData(data: AppUnknownRecord) {
  return request.post<AppResponseData<AppUnknownRecord>>('/system/dict/data', { data });
}

export function deleteDictData(dictCodes: number | string) {
  return request.delete<AppResponseData<AppUnknownRecord>>(`/system/dict/data/${dictCodes}`);
}

export function updateDictData(data: AppUnknownRecord) {
  return request.put<AppResponseData<AppUnknownRecord>>('/system/dict/data', { data });
}

export function listDictData(params?: AppRequestListParams) {
  return request.get<AppResponseData<AppUnknownRecord[]>>('/system/dict/data/list', { params });
}

export function exportDictData(params?: AppRequestListParams) {
  return request.post<AppResponseData<Blob>>('/system/dict/data/export', { params, responseType: 'blob' });
}

export function getDictDataByType(dictType: string) {
  return request.get<AppResponseData<AppUnknownRecord[]>>(`/system/dict/data/type/${dictType}`);
}

// ----- notice

export function listNotice(params?: AppRequestListParams) {
  return request.get<AppResponseData<AppUnknownRecord[]>>('/system/notice/list', { params });
}
