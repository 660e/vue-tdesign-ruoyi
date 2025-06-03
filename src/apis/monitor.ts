import type { AppResponseData, AppUnknownRecord, QTableToolbarFilterParams } from '@/types';
import { request } from '@/utils';

export function listOnline(params?: QTableToolbarFilterParams) {
  return request.get<AppResponseData<AppUnknownRecord[]>>('/monitor/online/list', { params });
}

export function forceLogout(tokenId: string) {
  return request.delete<AppResponseData<AppUnknownRecord>>(`/monitor/online/${tokenId}`);
}
