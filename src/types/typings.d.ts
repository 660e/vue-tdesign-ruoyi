import 'vue-router';

declare module 'vue-router' {
  interface RouteMeta {
    frameBlank?: boolean;
    frameSrc?: string;
    fullscreen?: boolean;
    icon?: string;
    title?: string;
  }
}
