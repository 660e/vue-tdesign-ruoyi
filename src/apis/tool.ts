import type { AppRequestListParams, AppResponseData, AppUnknownRecord } from '@/types';
import { request } from '@/utils';

// ----- gen

export function importTable(tables: string) {
  return request.post<AppResponseData<AppUnknownRecord[]>>('/tool/gen/importTable', { params: { tables } });
}

export function deleteTable(tableId: number | string) {
  return request.delete<AppResponseData<AppUnknownRecord>>(`/tool/gen/${tableId}`);
}

export function listTable(params?: AppRequestListParams) {
  return request.get<AppResponseData<AppUnknownRecord[]>>('/tool/gen/list', { params });
}

export function listTableDb(params?: AppRequestListParams) {
  return request.get<AppResponseData<AppUnknownRecord[]>>('/tool/gen/db/list', { params });
}

export function getTable(tableId: number) {
  return request.get<AppResponseData<AppUnknownRecord>>(`/tool/gen/preview/${tableId}`);
}

export function syncTable(tableName: string) {
  return request.get<AppResponseData<AppUnknownRecord>>(`/tool/gen/synchDb/${tableName}`);
}

export function exportTable(tables: string) {
  return request.get<Blob>('tool/gen/batchGenCode', { params: { tables }, responseType: 'blob' });
}
