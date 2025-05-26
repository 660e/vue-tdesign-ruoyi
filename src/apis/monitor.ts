import type { IListParams, IResponse, TUnknownRecord } from './types';
import { request } from '@/utils/index';

export function listOnline(params?: IListParams) {
  return request.get<IResponse<TUnknownRecord>>('/monitor/online/list', { params });
}
