import type { App, Directive } from 'vue';
import leafletStop from './leafletStop';

const directives: Record<string, Directive> = {
  'leaflet-stop': leafletStop,
};

export default {
  install(app: App) {
    Object.keys(directives).forEach((key) => {
      app.directive(key, directives[key]);
    });
  },
};
