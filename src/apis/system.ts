import { request } from '@/utils/index';

export function dict(name: string) {
  return request.get(`/system/dict/data/type/${name}`);
}
