import 'vue-router';

declare module 'vue-router' {
  interface RouteMeta {
    icon?: string;
    link?: string;
    title?: string;
  }
}
