import type { AppRequestListParams, AppResponseData, AppUnknownRecord } from '@/types';
import { request } from '@/utils';

// ----- gen

export function importGen(tables: string) {
  return request.post<AppResponseData<AppUnknownRecord[]>>('/tool/gen/importTable', { params: { tables } });
}

export function deleteGen(tableId: number | string) {
  return request.delete<AppResponseData<AppUnknownRecord>>(`/tool/gen/${tableId}`);
}

export function listGen(params?: AppRequestListParams) {
  return request.get<AppResponseData<AppUnknownRecord[]>>('/tool/gen/list', { params });
}

export function listGenDb(params?: AppRequestListParams) {
  return request.get<AppResponseData<AppUnknownRecord[]>>('/tool/gen/db/list', { params });
}

export function getGen(tableId: number) {
  return request.get<AppResponseData<AppUnknownRecord>>(`/tool/gen/preview/${tableId}`);
}

export function syncGen(tableName: string) {
  return request.get<AppResponseData<AppUnknownRecord>>(`/tool/gen/synchDb/${tableName}`);
}
