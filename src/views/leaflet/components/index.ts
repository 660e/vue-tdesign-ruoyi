import Map from './Map.vue';

export const L = { Map };

export interface LMapOptions {
  center: [number, number];

  maxZoom?: number;
  minZoom?: number;
  zoom?: number;
}
