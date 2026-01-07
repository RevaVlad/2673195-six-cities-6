import { offersData } from './offers-slice.ts';
import { fetchOffersAction } from '../../apiActions/offers-actions.ts';
import { getOffersInCity, getOffersLoadingStatus, getOffersErrorStatus } from './offers-selectors.ts';
import { NameSpace } from '../../../const';
import { OffersListItem } from '../../../types/responses/offers/offers-list.ts';
import { CityDto } from '../../../types/responses/city-dto.ts';
import { Location } from '../../../types/location';
import { State } from '../../../types/state.ts';
import { CityName } from '../../../types/city-name.ts';
import { OffersState } from '../../../types/stateSlices/offers-state.ts';

describe('Offers Slice', () => {
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

  const createMockOffersListItem = (overrides?: Partial<OffersListItem>): OffersListItem => ({
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
    previewImage: 'img/apartment-01.jpg',
    ...overrides
  });

  const mockOffers = [
    createMockOffersListItem({ id: '1' }),
    createMockOffersListItem({ id: '2', city: createMockCityDto({ name: 'Amsterdam' }) }),
  ];

  const initialState = {
    offers: [],
    hasError: false,
    isOffersDataLoading: false,
  };

  const loadingState = {
    offers: [],
    hasError: false,
    isOffersDataLoading: true,
  };

  describe('initial state', () => {
    it('should return initial state', () => {
      const result = offersData.reducer(undefined, { type: '' });
      expect(result).toEqual(initialState);
    });
  });

  describe('extraReducers', () => {
    it('should handle fetchOffersAction.pending', () => {
      const action = { type: fetchOffersAction.pending.type };
      const result = offersData.reducer(initialState, action);

      expect(result.isOffersDataLoading).toBe(true);
      expect(result.hasError).toBe(false);
    });

    it('should handle fetchOffersAction.fulfilled', () => {
      const action = {
        type: fetchOffersAction.fulfilled.type,
        payload: mockOffers
      };
      const result = offersData.reducer(loadingState, action);

      expect(result.offers).toEqual(mockOffers);
      expect(result.isOffersDataLoading).toBe(false);
      expect(result.hasError).toBe(false);
    });

    it('should handle fetchOffersAction.rejected', () => {
      const action = { type: fetchOffersAction.rejected.type };
      const result = offersData.reducer(loadingState, action);

      expect(result.isOffersDataLoading).toBe(false);
      expect(result.hasError).toBe(true);
    });
  });

  describe('selectors', () => {
    const createMockState = (offersState: OffersState, cityName: CityName) : Pick<State, NameSpace.Offers | NameSpace.City> => ({
      [NameSpace.Offers]: offersState,
      [NameSpace.City]: {
        cityName: cityName,
      },
    });

    describe('getOffersInCity', () => {
      const parisOffer = createMockOffersListItem({
        id: '1',
        city: { name: 'Paris', location: { latitude: 48.85661, longitude: 2.351499, zoom: 13 } }
      });
      const amsterdamOffer = createMockOffersListItem({
        id: '2',
        city: { name: 'Amsterdam', location: { latitude: 52.37454, longitude: 4.897976, zoom: 13 } }
      });
      const parisOffer2 = createMockOffersListItem({
        id: '3',
        city: { name: 'Paris', location: { latitude: 48.85661, longitude: 2.351499, zoom: 13 } }
      });

      it('filters offers by city name', () => {
        const state = createMockState({
          offers: [parisOffer, amsterdamOffer, parisOffer2],
          hasError: false,
          isOffersDataLoading: false,
        }, 'Paris');

        const result = getOffersInCity(state);
        expect(result).toHaveLength(2);
        expect(result[0].id).toBe('1');
        expect(result[1].id).toBe('3');
      });

      it('returns empty array when city has no offers', () => {
        const state = createMockState({
          offers: [parisOffer, parisOffer2],
          hasError: false,
          isOffersDataLoading: false,
        }, 'Amsterdam');

        const result = getOffersInCity(state);
        expect(result).toEqual([]);
      });

      it('returns all offers when city has multiple offers', () => {
        const state = createMockState({
          offers: [parisOffer, amsterdamOffer, parisOffer2],
          hasError: false,
          isOffersDataLoading: false,
        }, 'Paris');

        const result = getOffersInCity(state);
        expect(result).toHaveLength(2);
      });

      it('returns empty array when state has no offers', () => {
        const state = createMockState({
          offers: [],
          hasError: false,
          isOffersDataLoading: false,
        }, 'Paris');

        const result = getOffersInCity(state);
        expect(result).toEqual([]);
      });
    });

    describe('getOffersLoadingStatus', () => {
      it('returns loading status when loading', () => {
        const state = createMockState({
          offers: [],
          hasError: false,
          isOffersDataLoading: true,
        }, 'Paris');

        const result = getOffersLoadingStatus(state);
        expect(result).toBe(true);
      });

      it('returns loading status when not loading', () => {
        const state = createMockState({
          offers: [],
          hasError: false,
          isOffersDataLoading: false,
        }, 'Paris');

        const result = getOffersLoadingStatus(state);
        expect(result).toBe(false);
      });
    });

    describe('getOffersErrorStatus', () => {
      it('returns error status when has error', () => {
        const state = createMockState({
          offers: [],
          hasError: true,
          isOffersDataLoading: false,
        }, 'Paris');

        const result = getOffersErrorStatus(state);
        expect(result).toBe(true);
      });

      it('returns error status when no error', () => {
        const state = createMockState({
          offers: [],
          hasError: false,
          isOffersDataLoading: false,
        }, 'Paris');

        const result = getOffersErrorStatus(state);
        expect(result).toBe(false);
      });
    });
  });
});
