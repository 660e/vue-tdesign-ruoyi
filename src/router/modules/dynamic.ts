import type { IRoute } from '@/apis/types';
// import router from '../index';

// const views = import.meta.glob('@/views/**/index.vue', { eager: true });

function addRoute(routes: IRoute[]) {
  routes.forEach((route) => {
    switch (route.component) {
      case 'Layout': {
        console.log(route.path);
        break;
      }

      case 'ParentView': {
        if (route.children?.length) {
          addRoute(route.children);
        }
        break;
      }

      default: {
        console.log(route);
      }
    }
  });
}

export async function initializeRouter(routes: IRoute[], layout: 'standard') {
  const layoutName = `layout-${layout}`;

  console.log(layoutName);
  console.log(routes);

  // routes.forEach((route) => {
  //   router.addRoute(`layout-${layout}`, {
  //     path: route.path,
  //     redirect: '/',
  //     name: route.name,
  //   });
  // });

  addRoute(routes);
}
