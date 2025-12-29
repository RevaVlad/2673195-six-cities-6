import { render, screen } from '@testing-library/react';
import { NearPlacesMap } from './NearPlacesMap';
import { vi } from 'vitest';
import {CityDto} from '../../types/responses/cityDto.ts';
import {Location} from '../../types/location.ts';

const mockUseAppSelector = vi.hoisted(() => vi.fn());
const MockMap = vi.hoisted(() => vi.fn(({ city, points, selectedPoint }:
{
  city: CityDto;
  points: Location[];
  className: string;
  selectedPoint: Location | null;
}) => (
  <div data-testid="map">
    City: {city.name}, Points: {points.length}, Selected: {selectedPoint ? 'Yes' : 'No'}
  </div>
)));

const MockSpinner = vi.hoisted(() => vi.fn(() => <div data-testid="spinner">Loading...</div>));

vi.mock('../../hooks/useAppSelector', () => ({
  useAppSelector: mockUseAppSelector,
}));

vi.mock('../../components/Map.tsx', () => ({
  Map: MockMap,
}));

vi.mock('../../components/Spinner.tsx', () => ({
  Spinner: MockSpinner,
}));

describe('Component: NearPlacesMap', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('shows spinner when loading', () => {
    mockUseAppSelector
      .mockReturnValueOnce(true)
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(null)
      .mockReturnValueOnce([]);

    render(<NearPlacesMap />);

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
    expect(screen.queryByTestId('map')).not.toBeInTheDocument();
  });

  it('shows spinner when there is an error', () => {
    mockUseAppSelector
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(true)
      .mockReturnValueOnce(null)
      .mockReturnValueOnce([]);

    render(<NearPlacesMap />);

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
    expect(screen.queryByTestId('map')).not.toBeInTheDocument();
  });

  it('shows spinner when city is not available', () => {
    mockUseAppSelector
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(null)
      .mockReturnValueOnce([]);

    render(<NearPlacesMap />);

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
    expect(screen.queryByTestId('map')).not.toBeInTheDocument();
  });

  it('shows map when all data is available', () => {
    const mockCity = { name: 'Amsterdam', location: { latitude: 52.370216, longitude: 4.895168, zoom: 10 } };
    const mockPoints = [
      { latitude: 52.370216, longitude: 4.895168 },
      { latitude: 52.350216, longitude: 4.875168 }
    ];

    mockUseAppSelector
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(mockCity)
      .mockReturnValueOnce(mockPoints);

    render(<NearPlacesMap />);

    expect(screen.getByTestId('map')).toBeInTheDocument();
    expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();
    expect(screen.getByTestId('map')).toHaveTextContent(`City: ${mockCity.name}, Points: ${mockPoints.length}, Selected: No`);
  });

  it('passes correct props to Map component', () => {
    const mockCity = { name: 'Amsterdam', location: { latitude: 52.370216, longitude: 4.895168, zoom: 10 } };
    const mockPoints = [
      { latitude: 52.370216, longitude: 4.895168 },
      { latitude: 52.350216, longitude: 4.875168 }
    ];

    mockUseAppSelector
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(mockCity)
      .mockReturnValueOnce(mockPoints);

    render(<NearPlacesMap />);

    expect(MockMap).toHaveBeenCalledWith(
      expect.objectContaining({
        city: mockCity,
        points: mockPoints,
        className: 'offer__map map',
        selectedPoint: null
      }),
      expect.anything()
    );
  });

  it('has correct container class', () => {
    mockUseAppSelector
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(false)
      .mockReturnValueOnce({ name: 'Amsterdam' })
      .mockReturnValueOnce([]);

    const { container } = render(<NearPlacesMap />);

    const mapContainer = container.querySelector('.offer__map.map');
    expect(mapContainer).toBeInTheDocument();
  });
});
