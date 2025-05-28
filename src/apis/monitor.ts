import type { IResponse, TUnknownRecord } from './types';
import type { QTableTopFilterQueryCondition } from '@/components/types';
import { request } from '@/utils/index';

export function listOnline(params?: QTableTopFilterQueryCondition) {
  return request.get<IResponse<TUnknownRecord[]>>('/monitor/online/list', { params });
}
