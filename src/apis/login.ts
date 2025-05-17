import type { IResponse, IRouter } from './types';
import { request } from '@/utils/index';

export function captchaImage() {
  return request.get('/captchaImage');
}

export function login(data: { code: string; password: string; username: string; uuid: string }) {
  return request.post('/login', { data });
}

export function getInfo() {
  return request.get('/getInfo');
}

export function getRouters() {
  return request.get<IResponse<IRouter[]>>('/getRouters');
}
