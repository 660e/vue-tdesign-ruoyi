import L from 'leaflet';

import LControls from './Controls.vue';
import LMap from './Map.vue';
import LMarker from './Marker.vue';

export { LControls, LMap, LMarker };

type LatLng = [number, number] | { lat: number; lng: number } | L.LatLng;

export interface LMapOptions {
  center: LatLng;

  maxZoom?: number;
  minZoom?: number;
  zoom?: number;
}

export interface LMarkerOptions {
  latlng: LatLng;
}
