import type { AppRequestListParams, AppResponseData, AppUnknownRecord } from '@/types';
import { request } from '@/utils';

// ----- gen

export function deleteGen(tableId: number | string) {
  return request.delete<AppResponseData<AppUnknownRecord>>(`/tool/gen/${tableId}`);
}

export function listGen(params?: AppRequestListParams) {
  return request.get<AppResponseData<AppUnknownRecord[]>>('/tool/gen/list', { params });
}

export function syncGen(tableName: string) {
  return request.get<AppResponseData<AppUnknownRecord>>(`/tool/gen/synchDb/${tableName}`);
}
