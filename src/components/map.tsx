import {useRef, useEffect, useCallback} from 'react';
import {Icon, Marker, layerGroup} from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { CityDto } from '../types/responses/city-dto.ts';
import type { Location } from '../types/location.ts';
import {useMap} from '../hooks/use-map.ts';
import {URL_MARKER_SELECTED, URL_MARKER_DEFAULT} from '../const.ts';

type MapProps = {
  city: CityDto;
  points: Location[];
  className: string;
  selectedPoint: Location | null;
};

const defaultMarkerIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

const selectedMarkerIcon = new Icon({
  iconUrl: URL_MARKER_SELECTED,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

export function Map({city, points, className, selectedPoint}: MapProps) {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  const checkIsSelected = useCallback((point: Location) =>
    selectedPoint && point.latitude === selectedPoint.latitude && point.longitude === selectedPoint.longitude,
  [selectedPoint]);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);
      points.forEach((point) => {
        const marker = new Marker({
          lat: point.latitude,
          lng: point.longitude
        });

        const markerIcon = checkIsSelected(point) ? selectedMarkerIcon : defaultMarkerIcon;

        marker
          .setIcon(markerIcon)
          .addTo(markerLayer);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, points, city, checkIsSelected]);

  return <div className={className} ref={mapRef}></div>;
}
