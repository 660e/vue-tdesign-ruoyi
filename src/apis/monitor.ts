import type { AppResponseData, AppUnknownRecord, QTableToolbarFilterParams } from '@/types';
import { request } from '@/utils/index';

export function listOnline(params?: QTableToolbarFilterParams) {
  return request.get<AppResponseData<AppUnknownRecord[]>>('/monitor/online/list', { params });
}
