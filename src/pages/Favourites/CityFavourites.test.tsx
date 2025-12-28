import { render, screen } from '@testing-library/react';
import { CityFavourites } from './CityFavourites';
import { vi } from 'vitest';
import type { Mock } from 'vitest';
import {CITIES} from '../../const.ts';

const mockUseAppSelector = vi.hoisted<Mock>(() => vi.fn());
const mockGetFavouritesInCity = vi.hoisted<Mock>(() => vi.fn());

const MockFavouriteOffer = vi.hoisted(() =>
  vi.fn(() => <div data-testid="favourite-offer">Favourite Offer</div>)
);

vi.mock('../../hooks/useAppSelector', () => ({
  useAppSelector: mockUseAppSelector,
}));

vi.mock('../../store/slices/favourites/favouritesSelectors.ts', () => ({
  getFavouritesInCity: mockGetFavouritesInCity,
}));

vi.mock('./FavouriteOffer.tsx', () => ({
  FavouriteOffer: MockFavouriteOffer,
}));

describe('Component: CityFavourites', () => {
  const mockCityName = CITIES.Paris;
  const mockFavourites = [
    {
      id: '1',
      title: 'Beautiful Apartment in Paris',
      type: 'apartment',
      price: 120,
      rating: 4.5,
      previewImage: 'image1.jpg',
      isPremium: true,
      isFavorite: true,
    },
    {
      id: '2',
      title: 'Cozy Studio',
      type: 'studio',
      price: 80,
      rating: 4.2,
      previewImage: 'image2.jpg',
      isPremium: false,
      isFavorite: true,
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns null when no favourites in city', () => {
    mockUseAppSelector.mockReturnValue([]);

    const { container } = render(<CityFavourites cityName={mockCityName} />);

    expect(container.firstChild).toBeNull();
    expect(mockUseAppSelector).toHaveBeenCalledWith(expect.any(Function));
  });

  it('renders city name and favourites when they exist', () => {
    mockUseAppSelector.mockReturnValue(mockFavourites);

    render(<CityFavourites cityName={mockCityName} />);

    expect(screen.getByText(mockCityName)).toBeInTheDocument();

    expect(screen.getByRole('listitem')).toHaveClass('favorites__locations-items');
    expect(screen.getByText(mockCityName).closest('.locations__item-link')).toBeInTheDocument();

    expect(MockFavouriteOffer).toHaveBeenCalledTimes(2);
    expect(MockFavouriteOffer).toHaveBeenNthCalledWith(1, { offer: mockFavourites[0] }, {});
    expect(MockFavouriteOffer).toHaveBeenNthCalledWith(2, { offer: mockFavourites[1] }, {});
  });
});
