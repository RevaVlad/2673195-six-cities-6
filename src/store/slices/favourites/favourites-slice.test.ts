import { favouritesData } from './favourites-slice.ts';
import { fetchFavouriteAction } from '../../apiActions/favourite-actions.ts';
import { OffersList } from '../../../types/responses/offers/offers-list';
import { CityDto } from '../../../types/responses/city-dto';
import { Location } from '../../../types/location';
import { NameSpace } from '../../../const';
import { getFavouritesInCity } from './favourites-selectors.ts';

describe('Favourites Slice', () => {
  const createMockLocation = (overrides?: Partial<Location>): Location => ({
    latitude: 48.85661,
    longitude: 2.351499,
    zoom: 13,
    ...overrides
  });

  const createMockCityDto = (overrides?: Partial<CityDto>): CityDto => ({
    name: 'Paris',
    location: createMockLocation(),
    ...overrides
  });

  const mockFavourites: OffersList = [
    {
      id: '1',
      title: 'Beautiful & luxurious apartment at great location',
      type: 'apartment',
      price: 120,
      city: createMockCityDto({ name: 'Paris' }),
      location: createMockLocation({
        latitude: 48.865610000000004,
        longitude: 2.350499,
        zoom: 16
      }),
      isFavorite: true,
      isPremium: true,
      rating: 4.8,
      previewImage: 'img/apartment-01.jpg'
    },
    {
      id: '2',
      title: 'Wood and stone place',
      type: 'room',
      price: 80,
      city: createMockCityDto({ name: 'Cologne' }),
      location: createMockLocation({
        latitude: 50.949361,
        longitude: 6.976974,
        zoom: 16
      }),
      isFavorite: true,
      isPremium: false,
      rating: 4.3,
      previewImage: 'img/room.jpg'
    },
    {
      id: '3',
      title: 'Cozy apartment',
      type: 'apartment',
      price: 100,
      city: createMockCityDto({ name: 'Paris' }),
      location: createMockLocation({
        latitude: 48.855610,
        longitude: 2.352499,
        zoom: 16
      }),
      isFavorite: true,
      isPremium: false,
      rating: 4.5,
      previewImage: 'img/apartment-02.jpg'
    }
  ];

  describe('initial state', () => {
    it('should return initial state with hasError: true', () => {
      const result = favouritesData.reducer(undefined, { type: '' });
      expect(result).toEqual({
        favourites: [],
        hasError: true,
        isFavouritesDataLoading: false,
      });
    });
  });

  describe('extraReducers', () => {
    describe('fetchFavouriteAction', () => {
      it('should handle fetchFavouriteAction.pending', () => {
        const initialState = {
          favourites: [],
          hasError: true,
          isFavouritesDataLoading: false,
        };

        const action = { type: fetchFavouriteAction.pending.type };
        const result = favouritesData.reducer(initialState, action);

        expect(result.isFavouritesDataLoading).toBe(true);
        expect(result.hasError).toBe(false);
      });

      it('should handle fetchFavouriteAction.fulfilled', () => {
        const loadingState = {
          favourites: [],
          hasError: false,
          isFavouritesDataLoading: true,
        };

        const action = {
          type: fetchFavouriteAction.fulfilled.type,
          payload: mockFavourites
        };
        const result = favouritesData.reducer(loadingState, action);

        expect(result.favourites).toEqual(mockFavourites);
        expect(result.hasError).toBe(false);
        expect(result.isFavouritesDataLoading).toBe(true);
      });

      it('should handle fetchFavouriteAction.rejected', () => {
        const loadingState = {
          favourites: [],
          hasError: false,
          isFavouritesDataLoading: true,
        };

        const action = { type: fetchFavouriteAction.rejected.type };
        const result = favouritesData.reducer(loadingState, action);

        expect(result.isFavouritesDataLoading).toBe(false);
        expect(result.hasError).toBe(true);
      });
    });
  });

  describe('selectors', () => {
    const createMockState = (favourites: OffersList) => ({
      [NameSpace.Favourites]: {
        favourites,
        hasError: false,
        isFavouritesDataLoading: false,
      }
    });

    it('filters favourites by city name', () => {
      const state = createMockState(mockFavourites);
      const result = getFavouritesInCity(state, 'Paris');

      expect(result).toHaveLength(2);
      expect(result[0].id).toBe('1');
      expect(result[1].id).toBe('3');
    });

    it('returns empty array when city has no favourites', () => {
      const state = createMockState(mockFavourites);
      const result = getFavouritesInCity(state, 'Amsterdam');

      expect(result).toEqual([]);
    });

    it('returns all favourites for city when multiple cities exist', () => {
      const state = createMockState(mockFavourites);
      const result = getFavouritesInCity(state, 'Cologne');

      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('2');
    });

    it('returns empty array when state has no favourites', () => {
      const emptyState = createMockState([]);
      const result = getFavouritesInCity(emptyState, 'Paris');

      expect(result).toEqual([]);
    });
  });
});
