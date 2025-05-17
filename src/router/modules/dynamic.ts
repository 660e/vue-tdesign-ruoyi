import type { IRoute } from '@/apis/types';
// import router from '../index';

export async function initializeRouter(routes: IRoute[], layout: 'standard') {
  console.log(layout);

  routes.forEach((route) => {
    console.log(route);
  });
}
