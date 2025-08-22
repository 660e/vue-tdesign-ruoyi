import LMap from './Map.vue';
import LMarker from './Marker.vue';

export { LMap, LMarker };

export interface LMapOptions {
  center: [number, number];

  maxZoom?: number;
  minZoom?: number;
  zoom?: number;
}
