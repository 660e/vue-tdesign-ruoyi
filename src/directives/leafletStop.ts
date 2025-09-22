import L from 'leaflet';

export default {
  mounted(el: HTMLElement) {
    L.DomEvent.disableClickPropagation(el);
    L.DomEvent.disableScrollPropagation(el);
  },
};
