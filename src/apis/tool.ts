import type { AppRequestListParams, AppResponseData, AppUnknownRecord } from '@/types';
import { request } from '@/utils';

// ----- gen

export function listGen(params?: AppRequestListParams) {
  return request.get<AppResponseData<AppUnknownRecord[]>>('/tool/gen/list', { params });
}
