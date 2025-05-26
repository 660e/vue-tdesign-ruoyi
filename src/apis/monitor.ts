import type { IResponse, TUnknownRecord } from './types';
import type { QTableTopFilterCondition } from '@/components/types';
import { request } from '@/utils/index';

export function listOnline(params?: QTableTopFilterCondition) {
  return request.get<IResponse<TUnknownRecord>>('/monitor/online/list', { params });
}
