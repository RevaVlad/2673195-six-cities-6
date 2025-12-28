import { render } from '@testing-library/react';
import { Map } from './Map';
import { CityDto } from '../types/responses/cityDto';
import { CityName } from '../types/cityName';

vi.mock('../hooks/useMap', () => ({
  useMap: () => ({
    setView: vi.fn(),
    removeLayer: vi.fn(),
    addLayer: vi.fn(),
  })
}));

vi.mock('leaflet', () => {
  const mockMarker = {
    setIcon: vi.fn().mockReturnThis(),
    addTo: vi.fn().mockReturnThis(),
  };

  const mockLayerGroup = {
    addTo: vi.fn().mockReturnThis(),
    remove: vi.fn(),
  };

  const MockIcon = vi.fn();
  const MockMarker = vi.fn(() => mockMarker);
  const MockLayerGroup = vi.fn(() => mockLayerGroup);

  return {
    Icon: MockIcon,
    Marker: MockMarker,
    layerGroup: MockLayerGroup,
  };
});

describe('Component: Map', () => {
  const mockCity: CityDto = {
    name: 'Paris' as CityName,
    location: { latitude: 48.85661, longitude: 2.351499, zoom: 13 }
  };

  const mockPoints = [
    { latitude: 48.86561, longitude: 2.350499, zoom: 16 },
    { latitude: 48.86661, longitude: 2.351499, zoom: 16 },
  ];

  const defaultProps = {
    city: mockCity,
    points: mockPoints,
    className: 'cities__map',
    selectedPoint: null,
  };

  it('renders map container', () => {
    const { container } = render(<Map {...defaultProps} />);

    const mapContainer = container.querySelector('.cities__map');
    expect(mapContainer).toBeInTheDocument();
  });

  it('renders with selected point', () => {
    const propsWithSelectedPoint = {
      ...defaultProps,
      selectedPoint: mockPoints[0],
    };

    const { container } = render(<Map {...propsWithSelectedPoint} />);

    const mapContainer = container.querySelector('.cities__map');
    expect(mapContainer).toBeInTheDocument();
  });
});
