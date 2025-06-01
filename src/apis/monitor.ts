import type { AppResponseData, AppUnknownRecord } from '@/types';
import type { QTableTopFilterQueryCondition } from '@/components/types';
import { request } from '@/utils/index';

export function listOnline(params?: QTableTopFilterQueryCondition) {
  return request.get<AppResponseData<AppUnknownRecord[]>>('/monitor/online/list', { params });
}
