import 'vue-router';

declare module 'vue-router' {
  interface RouteMeta {
    frameBlank?: boolean;
    frameSrc?: string;
    icon?: string;
    title?: string;
  }
}
