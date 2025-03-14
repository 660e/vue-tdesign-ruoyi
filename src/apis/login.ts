import { request } from '@/utils/index';

export function captchaImage() {
  return request.get('/captchaImage');
}
