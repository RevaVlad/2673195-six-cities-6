import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import type { OffersList } from '../../types/responses/offers/offers-list.ts';
import type { Location } from '../../types/location.ts';
import { NearPlaces } from './near-places.tsx';
import { OfferCardStyle } from '../../const.ts';

const mockGetNearbyOffers = vi.hoisted(() => vi.fn());

const MockOffersListComponent = vi.hoisted(() =>
  vi.fn(({ offers, cardStyle}: {
    offers: OffersList;
    cardStyle: OfferCardStyle;
    onActivePointChange: (location: Location | null) => void;
  }) => (
    <div data-testid="offers-list">
      Offers: {offers.length}, Style: {cardStyle}
    </div>
  ))
);

vi.mock('../../hooks/use-app-selector', () => ({
  useAppSelector: mockGetNearbyOffers,
}));

vi.mock('../../components/offers-list-component.tsx', () => ({
  OffersListComponent: MockOffersListComponent,
}));

describe('Component: NearPlaces', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders title', () => {
    const mockOffers = [
      { id: '1', title: 'Offer 1', type: 'apartment', price: 100, city: { name: 'Amsterdam', location: { latitude: 52.370216, longitude: 4.895168, zoom: 10 } }, location: { latitude: 52.370216, longitude: 4.895168, zoom: 10 }, isFavorite: false, isPremium: true, rating: 4.5, previewImage: 'img1.jpg' },
      { id: '2', title: 'Offer 2', type: 'room', price: 80, city: { name: 'Amsterdam', location: { latitude: 52.370216, longitude: 4.895168, zoom: 10 } }, location: { latitude: 52.350216, longitude: 4.875168, zoom: 10 }, isFavorite: true, isPremium: false, rating: 3.8, previewImage: 'img2.jpg' },
    ] as OffersList;

    mockGetNearbyOffers.mockReturnValue(mockOffers);

    render(<NearPlaces />);

    expect(screen.getByText('Other places in the neighbourhood')).toBeInTheDocument();
  });

  it('shows only first 3 offers', () => {
    const mockOffers = [
      { id: '1', title: 'Offer 1', type: 'apartment', price: 100, city: { name: 'Amsterdam', location: { latitude: 52.370216, longitude: 4.895168, zoom: 10 } }, location: { latitude: 52.370216, longitude: 4.895168, zoom: 10 }, isFavorite: false, isPremium: true, rating: 4.5, previewImage: 'img1.jpg' },
      { id: '2', title: 'Offer 2', type: 'room', price: 80, city: { name: 'Amsterdam', location: { latitude: 52.370216, longitude: 4.895168, zoom: 10 } }, location: { latitude: 52.350216, longitude: 4.875168, zoom: 10 }, isFavorite: true, isPremium: false, rating: 3.8, previewImage: 'img2.jpg' },
      { id: '3', title: 'Offer 3', type: 'house', price: 150, city: { name: 'Amsterdam', location: { latitude: 52.370216, longitude: 4.895168, zoom: 10 } }, location: { latitude: 52.360216, longitude: 4.885168, zoom: 10 }, isFavorite: false, isPremium: true, rating: 4.2, previewImage: 'img3.jpg' },
      { id: '4', title: 'Offer 4', type: 'apartment', price: 120, city: { name: 'Amsterdam', location: { latitude: 52.370216, longitude: 4.895168, zoom: 10 } }, location: { latitude: 52.340216, longitude: 4.865168, zoom: 10 }, isFavorite: false, isPremium: false, rating: 4.0, previewImage: 'img4.jpg' },
      { id: '5', title: 'Offer 5', type: 'room', price: 70, city: { name: 'Amsterdam', location: { latitude: 52.370216, longitude: 4.895168, zoom: 10 } }, location: { latitude: 52.330216, longitude: 4.855168, zoom: 10 }, isFavorite: true, isPremium: true, rating: 4.7, previewImage: 'img5.jpg' }
    ] as OffersList;

    mockGetNearbyOffers.mockReturnValue(mockOffers);

    render(<NearPlaces />);

    expect(screen.getByTestId('offers-list')).toHaveTextContent('Offers: 3');
  });

  it('shows correct card style', () => {
    const mockOffers = [{ id: '1', title: 'Offer 1' }];

    mockGetNearbyOffers.mockReturnValue(mockOffers);

    render(<NearPlaces />);

    expect(MockOffersListComponent).toHaveBeenCalledWith(
      expect.objectContaining({
        cardStyle: OfferCardStyle.NearPlace,
        offers: mockOffers.slice(0, 3)
      }),
      expect.anything()
    );
  });
});

