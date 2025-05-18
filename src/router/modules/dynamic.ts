import type { IRoute } from '@/apis/types';
// import router from '../index';

const views = import.meta.glob('@/views/**/index.vue', { eager: true });

function addRoute(routes: IRoute[], parentPath: string, layoutName: string) {
  routes.forEach((route) => {
    switch (route.component) {
      case 'Layout': {
        if (route.children?.length) {
          parentPath = route.path;
          addRoute(route.children, parentPath, layoutName);
        }
        break;
      }

      case 'ParentView': {
        if (route.children?.length) {
          parentPath += `/${route.path}`;
          addRoute(route.children, parentPath, layoutName);
        }
        break;
      }

      default: {
        console.log(route);
        console.log(parentPath);
        console.log(layoutName);
      }
    }
  });
}

export async function initializeRouter(routes: IRoute[], layout: 'standard') {
  console.log(routes);
  console.log(views);

  // routes.forEach((route) => {
  //   router.addRoute(`layout-${layout}`, {
  //     path: route.path,
  //     redirect: '/',
  //     name: route.name,
  //   });
  // });

  addRoute(routes, '', `layout-${layout}`);
}
