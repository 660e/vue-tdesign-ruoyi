// import type { RouteRecordRaw } from 'vue-router';
import type { IRoute } from '@/apis/types';
import router from '../index';

// const views = import.meta.glob('@/views/**/index.vue', { eager: true });

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
        // try {
        //   const item = {
        //     path: `${parentPath}/${route.path}`,
        //     redirect: undefined,
        //     name: route.name,
        //     component: views[`/src/views/${route.component}.vue`],
        //   };
        //   router.addRoute(layoutName, item as RouteRecordRaw);
        // } catch {
        //   console.log(route);
        // }
      }
    }
  });
}

export async function initializeRouter(routes: IRoute[], layout: 'standard') {
  addRoute(routes, '', `layout-${layout}`);

  console.log(router.getRoutes());
}
