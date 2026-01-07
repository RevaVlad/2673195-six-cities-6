import { render, screen, fireEvent } from '@testing-library/react';
import CitiesPlaces from './cities-places.tsx';
import { SortProvider } from '../../hocs/sort-context.tsx';
import { CityName } from '../../types/city-name.ts';
import { vi } from 'vitest';
import { OffersList } from '../../types/responses/offers/offers-list.ts';
import { Location } from '../../types/location.ts';
import { CityDto } from '../../types/responses/city-dto.ts';

const MockOffersListComponent = vi.hoisted(() =>
  vi.fn(({ offers, onActivePointChange }: {
    offers: OffersList;
    onActivePointChange: (location: Location | null) => void;
  }) => (
    <div>
      {offers.map((offer) => (
        <div
          key={offer.id}
          data-testid={`offer-${offer.id}`}
          onMouseEnter={() => onActivePointChange(offer.location)}
          onMouseLeave={() => onActivePointChange(null)}
        >
          {offer.title}
        </div>
      ))}
    </div>
  ))
);

const MockMap = vi.hoisted(() =>
  vi.fn(({ city, points, className, selectedPoint }: {
    city: CityDto;
    points: Location[];
    className: string;
    selectedPoint: Location | null;
  }) => (
    <div data-testid="map" className={className}>
      City: {city.name}, Points: {points.length}, Selected: {selectedPoint?.latitude}
    </div>
  ))
);

vi.mock('../../components/offers-list-component.tsx', () => ({
  OffersListComponent: MockOffersListComponent,
}));

vi.mock('../../components/map.tsx', () => ({
  Map: MockMap,
}));

vi.mock('../../hooks/use-sort.ts', () => ({
  useSort: () => ({
    currentSortType: 'Popular',
    setCurrentSortType: vi.fn(),
  }),
}));

describe('Component: CitiesPlaces', () => {
  const mockOffers: OffersList = [
    {
      id: '1',
      title: 'Offer 1',
      type: 'apartment',
      price: 120,
      city: {
        name: 'Amsterdam' as CityName,
        location: {
          latitude: 52.370216,
          longitude: 4.895168,
          zoom: 10
        }
      },
      location: {
        latitude: 52.370216,
        longitude: 4.895168,
        zoom: 10
      },
      isFavorite: false,
      isPremium: true,
      rating: 4.5,
      previewImage: 'image1.jpg'
    },
    {
      id: '2',
      title: 'Offer 2',
      type: 'room',
      price: 80,
      city: {
        name: 'Amsterdam' as CityName,
        location: {
          latitude: 52.370216,
          longitude: 4.895168,
          zoom: 10
        }
      },
      location: {
        latitude: 52.350216,
        longitude: 4.875168,
        zoom: 10
      },
      isFavorite: true,
      isPremium: false,
      rating: 3.8,
      previewImage: 'image2.jpg'
    },
  ];

  const city: CityName = 'Amsterdam';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('displays correct number of offers in header', () => {
    render(
      <SortProvider>
        <CitiesPlaces city={city} offers={mockOffers} />
      </SortProvider>
    );

    expect(screen.getByText(`${mockOffers.length} places to stay in ${city}`)).toBeInTheDocument();
  });

  it('renders all offers', () => {
    render(
      <SortProvider>
        <CitiesPlaces city={city} offers={mockOffers} />
      </SortProvider>
    );

    mockOffers.forEach((offer) => {
      expect(screen.getByTestId(`offer-${offer.id}`)).toBeInTheDocument();
    });
  });

  it('renders map with correct data', () => {
    render(
      <SortProvider>
        <CitiesPlaces city={city} offers={mockOffers} />
      </SortProvider>
    );

    expect(screen.getByTestId('map')).toBeInTheDocument();
  });

  it('handles mouse enter on offer', () => {
    render(
      <SortProvider>
        <CitiesPlaces city={city} offers={mockOffers} />
      </SortProvider>
    );

    const offer = screen.getByTestId('offer-1');
    fireEvent.mouseEnter(offer);

    const mapCalls = MockMap.mock.calls;
    expect(mapCalls.length).toBeGreaterThan(0);
    const lastMapCall = mapCalls[mapCalls.length - 1];
    expect(lastMapCall[0].selectedPoint).toEqual(mockOffers[0].location);
  });

  it('handles mouse leave on offer', () => {
    render(
      <SortProvider>
        <CitiesPlaces city={city} offers={mockOffers} />
      </SortProvider>
    );

    const offer = screen.getByTestId('offer-1');
    fireEvent.mouseEnter(offer);
    fireEvent.mouseLeave(offer);

    const mapCalls = MockMap.mock.calls;
    expect(mapCalls.length).toBeGreaterThan(0);
    const lastMapCall = mapCalls[mapCalls.length - 1];
    expect(lastMapCall[0].selectedPoint).toBeNull();
  });
});
