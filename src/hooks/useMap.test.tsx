import { renderHook } from '@testing-library/react';
import { useMap } from './useMap';
import { CityDto } from '../types/responses/cityDto';
import { vi } from 'vitest';
import { MutableRefObject } from 'react';

const leafletMocks = vi.hoisted(() => {
  const setView = vi.fn();
  const addLayer = vi.fn();
  const mapInstance = {
    setView,
    addLayer,
  };

  const Map = vi.fn().mockImplementation(() => mapInstance);
  const TileLayer = vi.fn().mockImplementation(() => ({}));

  return {
    setView,
    addLayer,
    Map,
    TileLayer,
  };
});

vi.mock('leaflet', () => ({
  Map: leafletMocks.Map,
  TileLayer: leafletMocks.TileLayer,
}));

describe('Hook: useMap', () => {
  let mapRef: MutableRefObject<HTMLElement | null>;
  let mockElement: HTMLElement;

  const mockParis: CityDto = {
    name: 'Paris',
    location: { latitude: 48.85661, longitude: 2.351499, zoom: 13 }
  };

  const mockCologne: CityDto = {
    name: 'Cologne',
    location: { latitude: 50.938361, longitude: 6.959974, zoom: 13 }
  };

  beforeEach(() => {
    mockElement = document.createElement('div');
    mapRef = { current: mockElement };
    vi.clearAllMocks();
  });

  it('creates map instance when mapRef is available', () => {
    renderHook(() => useMap(mapRef, mockParis));

    expect(leafletMocks.Map).toHaveBeenCalledWith(mockElement, {
      center: { lat: mockParis.location.latitude, lng: mockParis.location.longitude },
      zoom: mockParis.location.zoom
    });

    expect(leafletMocks.TileLayer).toHaveBeenCalledWith(
      'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
      }
    );
  });

  it('does not create map when mapRef is null', () => {
    mapRef.current = null;

    renderHook(() => useMap(mapRef, mockParis));

    expect(leafletMocks.Map).not.toHaveBeenCalled();
  });

  it('updates map view when city changes', () => {
    const { rerender } = renderHook(
      ({ city }) => useMap(mapRef, city),
      { initialProps: { city: mockParis } }
    );

    rerender({ city: mockCologne });

    expect(leafletMocks.setView).toHaveBeenCalledWith(
      { lat: mockCologne.location.latitude, lng: mockCologne.location.longitude },
      mockCologne.location.zoom,
      { animate: true, duration: 1.0 }
    );
  });

  it('creates map only on initial render', () => {
    const { rerender } = renderHook(
      ({ city }) => useMap(mapRef, city),
      { initialProps: { city: mockParis } }
    );

    rerender({ city: mockCologne });
    rerender({ city: mockParis });

    expect(leafletMocks.Map).toHaveBeenCalledTimes(1);
  });
});
