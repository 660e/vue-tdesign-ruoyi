import type { AppResponseData } from '@/types';
import type { TUnknownRecord } from './types';
import type { QTableTopFilterQueryCondition } from '@/components/types';
import { request } from '@/utils/index';

export function listOnline(params?: QTableTopFilterQueryCondition) {
  return request.get<AppResponseData<TUnknownRecord[]>>('/monitor/online/list', { params });
}
