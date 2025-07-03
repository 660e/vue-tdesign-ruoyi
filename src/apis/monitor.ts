import type { AppRequestListParams, AppResponseData, AppUnknownRecord, QTableToolbarFilterParams } from '@/types';
import { request } from '@/utils';

// ----- online

export function listOnline(params?: QTableToolbarFilterParams) {
  return request.get<AppResponseData<AppUnknownRecord[]>>('/monitor/online/list', { params });
}

export function forceLogout(tokenId: string) {
  return request.delete<AppResponseData<AppUnknownRecord>>(`/monitor/online/${tokenId}`);
}

// ----- job

export function createJob(data: AppUnknownRecord) {
  return request.post<AppResponseData<AppUnknownRecord>>('/monitor/job', { data });
}

export function deleteJob(jobIds: number | string) {
  return request.delete<AppResponseData<AppUnknownRecord>>(`/monitor/job/${jobIds}`);
}

export function updateJob(data: AppUnknownRecord) {
  return request.put<AppResponseData<AppUnknownRecord>>('/monitor/job', { data });
}

export function listJob(params?: AppRequestListParams) {
  return request.get<AppResponseData<AppUnknownRecord[]>>('/monitor/job/list', { params });
}

export function getJob(jobId: number) {
  return request.get<AppResponseData<AppUnknownRecord>>(`/monitor/job/${jobId}`);
}

export function exportJob(params?: AppRequestListParams) {
  return request.get<AppResponseData<Blob>>('/monitor/job/export', { params, responseType: 'blob' });
}

export function runJob(jobId: number, jobGroup: string) {
  return request.post<AppResponseData<AppUnknownRecord>>('/monitor/job/run', { data: { jobId, jobGroup } });
}

// ----- server

export function getServer() {
  return request.get<AppResponseData<AppUnknownRecord>>('/monitor/server');
}

// ----- operlog

export function deleteOperlog(operIds: number | string) {
  return request.delete<AppResponseData<AppUnknownRecord>>(`/monitor/operlog/${operIds}`);
}

export function listOperlog(params?: AppRequestListParams) {
  return request.get<AppResponseData<AppUnknownRecord[]>>('/monitor/operlog/list', { params });
}

export function exportOperlog(params?: AppRequestListParams) {
  return request.post<AppResponseData<Blob>>('/monitor/operlog/export', { params, responseType: 'blob' });
}

export function clearOperlog() {
  return request.delete<AppResponseData<AppUnknownRecord>>('/monitor/operlog/clean');
}

// ----- logininfor

export function deleteLogininfor(infoIds: number | string) {
  return request.delete<AppResponseData<AppUnknownRecord>>(`/monitor/logininfor/${infoIds}`);
}

export function listLogininfor(params?: AppRequestListParams) {
  return request.get<AppResponseData<AppUnknownRecord[]>>('/monitor/logininfor/list', { params });
}

export function exportLogininfor(params?: AppRequestListParams) {
  return request.post<AppResponseData<Blob>>('/monitor/logininfor/export', { params, responseType: 'blob' });
}

export function clearLogininfor() {
  return request.delete<AppResponseData<AppUnknownRecord>>('/monitor/logininfor/clean');
}

export function unlockUser(userName: string) {
  return request.get<AppResponseData<AppUnknownRecord>>(`/monitor/logininfor/unlock/${userName}`);
}

// ----- cache

export function listCacheNames() {
  return request.get<AppResponseData<AppUnknownRecord[]>>('/monitor/cache/getNames');
}

export function listCacheKeys(cacheName: string) {
  return request.get<AppResponseData<string[]>>(`/monitor/cache/getKeys/${cacheName}`);
}

export function getCacheValue(cacheName: string, key: string) {
  return request.get<AppResponseData<AppUnknownRecord>>(`/monitor/cache/getValue/${cacheName}/${key}`);
}

export function clearCacheAll() {
  return request.delete<AppResponseData<AppUnknownRecord>>('/monitor/cache/clearCacheAll');
}
